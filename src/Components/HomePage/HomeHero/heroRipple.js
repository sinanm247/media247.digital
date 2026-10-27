const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const SIM = `
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec3 uDrops[16];
uniform float uRadii[16];
uniform int uCount;
uniform float uFade;
varying vec2 vUv;

void main() {
  float h = texture2D(uState, vUv).r * 2.0 - 1.0;
  float vel = texture2D(uState, vUv).g * 2.0 - 1.0;
  float n = texture2D(uState, vUv + vec2(0.0, uTexel.y)).r * 2.0 - 1.0;
  float s = texture2D(uState, vUv - vec2(0.0, uTexel.y)).r * 2.0 - 1.0;
  float e = texture2D(uState, vUv + vec2(uTexel.x, 0.0)).r * 2.0 - 1.0;
  float w = texture2D(uState, vUv - vec2(uTexel.x, 0.0)).r * 2.0 - 1.0;
  vel += (n + s + e + w - 4.0 * h) * 0.16;
  vel *= 0.972;
  h += vel;
  h *= uFade;

  for (int i = 0; i < 16; i++) {
    if (i < uCount) {
    float d = distance(vUv, uDrops[i].xy);
    float radius = uRadii[i];
    h += exp(-(d * d) / (radius * radius)) * uDrops[i].z;
    }
  }

  gl_FragColor = vec4(clamp(h, -1.0, 1.0) * 0.5 + 0.5, clamp(vel, -1.0, 1.0) * 0.5 + 0.5, 0.0, 1.0);
}
`;

const DRAW = `
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec2 uOrigin;
uniform vec2 uSpan;
varying vec2 vUv;

void main() {
  float hL = texture2D(uState, vUv - vec2(uTexel.x, 0.0)).r * 2.0 - 1.0;
  float hR = texture2D(uState, vUv + vec2(uTexel.x, 0.0)).r * 2.0 - 1.0;
  float hD = texture2D(uState, vUv - vec2(0.0, uTexel.y)).r * 2.0 - 1.0;
  float hU = texture2D(uState, vUv + vec2(0.0, uTexel.y)).r * 2.0 - 1.0;
  vec2 grad = vec2(hR - hL, hU - hD);
  vec2 uv = uOrigin + vUv * uSpan + grad * 0.42;
  uv = clamp(uv, vec2(0.001), vec2(0.999));
  gl_FragColor = texture2D(uImage, vec2(uv.x, 1.0 - uv.y));
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function program(gl, fragment) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, 'aPos');
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function cover(imageWidth, imageHeight, viewWidth, viewHeight) {
  const imageAspect = imageWidth / imageHeight;
  const viewAspect = viewWidth / viewHeight;
  if (imageAspect > viewAspect) {
    const spanX = viewAspect / imageAspect;
    return { originX: (1 - spanX) / 2, originY: 0, spanX, spanY: 1 };
  }
  const spanY = imageAspect / viewAspect;
  return { originX: 0, originY: 1 - spanY, spanX: 1, spanY };
}

export function attachHeroRipple(section, image, canvas) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !section || !image || !canvas) return () => {};

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) return () => {};

  const sim = program(gl, SIM);
  const draw = program(gl, DRAW);
  if (!sim || !draw) return () => {};

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const makeTarget = (width, height) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.clearColor(0.5, 0.5, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { texture, fb };
  };

  let simW = 2;
  let simH = 2;
  let targets = [makeTarget(simW, simH), makeTarget(simW, simH)];
  let readIndex = 0;
  const imageTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, imageTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  let frame = 0;
  let running = false;
  let ready = false;
  let lastStamp = 0;
  let lastX = 0;
  let lastY = 0;
  let hasLast = false;
  const drops = [];
  let disposed = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(2, Math.round(rect.width * dpr));
    const height = Math.max(2, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const nextW = Math.max(2, Math.round(Math.min(rect.width, 520)));
    const nextH = Math.max(2, Math.round(nextW * (rect.height / Math.max(rect.width, 1))));
    if (nextW === simW && nextH === simH) return;
    simW = nextW;
    simH = nextH;
    targets.forEach((target) => {
      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, simW, simH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb);
      gl.viewport(0, 0, simW, simH);
      gl.clearColor(0.5, 0.5, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
  };

  const upload = () => {
    if (!image.naturalWidth) return;
    gl.bindTexture(gl.TEXTURE_2D, imageTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };

  const resetField = () => {
    targets.forEach((target) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb);
      gl.viewport(0, 0, simW, simH);
      gl.clearColor(0.5, 0.5, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  const drawQuad = (prog) => {
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  };

  const step = () => {
    if (disposed) return;
    const now = performance.now();
    resize();
    const current = targets[readIndex];
    const next = targets[1 - readIndex];
    const count = Math.min(drops.length, 16);

    gl.bindFramebuffer(gl.FRAMEBUFFER, next.fb);
    gl.viewport(0, 0, simW, simH);
    drawQuad(sim);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, current.texture);
    gl.uniform1i(gl.getUniformLocation(sim, 'uState'), 0);
    gl.uniform2f(gl.getUniformLocation(sim, 'uTexel'), 1 / simW, 1 / simH);
    const points = new Float32Array(16 * 3);
    const radii = new Float32Array(16);
    for (let i = 0; i < count; i += 1) {
      points[i * 3] = drops[i].x;
      points[i * 3 + 1] = drops[i].y;
      points[i * 3 + 2] = drops[i].strength;
      radii[i] = drops[i].radius;
    }
    gl.uniform3fv(gl.getUniformLocation(sim, 'uDrops[0]'), points);
    gl.uniform1fv(gl.getUniformLocation(sim, 'uRadii[0]'), radii);
    gl.uniform1i(gl.getUniformLocation(sim, 'uCount'), count);
    const idle = now - lastStamp;
    gl.uniform1f(gl.getUniformLocation(sim, 'uFade'), idle > 180 ? 0.86 : 0.994);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    drops.length = 0;
    readIndex = 1 - readIndex;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    drawQuad(draw);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, targets[readIndex].texture);
    gl.uniform1i(gl.getUniformLocation(draw, 'uImage'), 0);
    gl.uniform1i(gl.getUniformLocation(draw, 'uState'), 1);
    gl.uniform2f(gl.getUniformLocation(draw, 'uTexel'), 1 / simW, 1 / simH);
    const frameBox = canvas.getBoundingClientRect();
    const fit = cover(image.naturalWidth || 1, image.naturalHeight || 1, frameBox.width || 1, frameBox.height || 1);
    gl.uniform2f(gl.getUniformLocation(draw, 'uOrigin'), fit.originX, fit.originY);
    gl.uniform2f(gl.getUniformLocation(draw, 'uSpan'), fit.spanX, fit.spanY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (count > 0) section.classList.remove('is-settling');
    if (!section.classList.contains('is-rippling')) section.classList.add('is-rippling');
    if (idle > 220 && count === 0) section.classList.add('is-settling');

    const calm = idle > 1200 && count === 0;
    if (calm) {
      running = false;
      frame = 0;
      resetField();
      section.classList.remove('is-rippling', 'is-settling');
      return;
    }
    frame = requestAnimationFrame(step);
  };

  const wake = () => {
    if (!running) {
      running = true;
      frame = requestAnimationFrame(step);
    }
  };

  const stamp = (event, fromClick = false) => {
    if (!ready) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    if (x < 0 || y < 0 || x > 1 || y > 1) return;
    const now = performance.now();
    const dt = Math.max(16, now - lastStamp);
    const dist = hasLast ? Math.hypot(x - lastX, y - lastY) : 0;
    if (!fromClick && hasLast && dist < 0.002) return;
    const speed = dist / (dt / 1000);
    const amount = Math.min(1, speed / 1.6);
    const radius = 0.012 + amount * 0.034;
    const strength = (fromClick ? 0.16 : 0.035) + amount * 0.22;
    const steps = Math.max(1, Math.ceil(dist / (radius * 0.55)));
    for (let i = 1; i <= steps && drops.length < 16; i += 1) {
      const t = i / steps;
      drops.push({
        x: hasLast ? lastX + (x - lastX) * t : x,
        y: hasLast ? lastY + (y - lastY) * t : y,
        radius,
        strength,
      });
    }
    lastX = x;
    lastY = y;
    hasLast = true;
    lastStamp = now;
    section.classList.remove('is-settling');
    section.classList.add('is-rippling');
    wake();
  };

  const onLeave = () => {
    hasLast = false;
  };

  const onReady = () => {
    upload();
    resize();
    ready = true;
  };

  const onDown = (event) => stamp(event, true);

  section.addEventListener('pointermove', stamp);
  section.addEventListener('pointerdown', onDown);
  section.addEventListener('pointerleave', onLeave);
  if (image.complete && image.naturalWidth) onReady();
  else image.addEventListener('load', onReady, { once: true });

  return () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    section.classList.remove('is-rippling');
    section.removeEventListener('pointermove', stamp);
    section.removeEventListener('pointerdown', onDown);
    section.removeEventListener('pointerleave', onLeave);
    image.removeEventListener('load', onReady);
    gl.deleteProgram(sim);
    gl.deleteProgram(draw);
    gl.deleteBuffer(buffer);
    gl.deleteTexture(imageTex);
    targets.forEach((target) => {
      gl.deleteFramebuffer(target.fb);
      gl.deleteTexture(target.texture);
    });
  };
}
