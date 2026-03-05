import { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Dark mode shader — warm amber particles on black
const darkShader = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

// Light mode shader — soft golden glow on warm cream
const lightShader = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  // Start with warm cream base
  vec3 col=vec3(0.996, 0.988, 0.97);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // Soft warm highlights instead of bright particles
    col-=.0008/d*(cos(sin(i)*vec3(0.2,0.35,0.5))+1.);
    float b=noise(i+p+bg*1.731);
    col-=.001*b/length(max(p,vec2(b*p.x*.02,p.y)));
    // Mix toward warm golden tones at edges
    col=mix(col,vec3(0.98, 0.95, 0.88)-vec3(bg*.06,bg*.08,bg*.12),d*0.5);
  }
  // Clamp to keep it light
  col=clamp(col, vec3(0.88, 0.85, 0.78), vec3(1.0, 0.995, 0.98));
  O=vec4(col,1);
}`;

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext('webgl2');
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = darkShader;
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
    this.vertexSrc = `#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}`;
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  }
  updateMove(d) { this.mouseMove = d; }
  updateMouse(c) { this.mouseCoords = c; }
  updatePointerCoords(c) { this.pointerCoords = c; }
  updatePointerCount(n) { this.nbrOfPointers = n; }
  updateScale(s) { this.scale = s; this.gl.viewport(0, 0, this.canvas.width * s, this.canvas.height * s); }
  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
  }
  test(source) {
    const gl = this.gl;
    const s = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    const r = gl.getShaderParameter(s, gl.COMPILE_STATUS) ? null : gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    return r;
  }
  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }
  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
  }
  init() {
    const gl = this.gl, p = this.program;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(p, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    p._resolution = gl.getUniformLocation(p, 'resolution');
    p._time = gl.getUniformLocation(p, 'time');
    p._move = gl.getUniformLocation(p, 'move');
    p._touch = gl.getUniformLocation(p, 'touch');
    p._pointerCount = gl.getUniformLocation(p, 'pointerCount');
    p._pointers = gl.getUniformLocation(p, 'pointers');
  }
  updateShader(source) { this.reset(); this.shaderSource = source; this.setup(); this.init(); }
  render(now = 0) {
    const gl = this.gl, p = this.program;
    if (!p || gl.getProgramParameter(p, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(p._resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(p._time, now * 1e-3);
    gl.uniform2f(p._move, ...this.mouseMove);
    gl.uniform2f(p._touch, ...this.mouseCoords);
    gl.uniform1i(p._pointerCount, this.nbrOfPointers);
    gl.uniform2fv(p._pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  constructor(element, scale) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];
    const map = (el, s, x, y) => [x * s, el.height - y * s];
    element.addEventListener('pointerdown', (e) => { this.active = true; this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY)); });
    element.addEventListener('pointerup', (e) => { if (this.count === 1) this.lastCoords = this.first; this.pointers.delete(e.pointerId); this.active = this.pointers.size > 0; });
    element.addEventListener('pointerleave', (e) => { if (this.count === 1) this.lastCoords = this.first; this.pointers.delete(e.pointerId); this.active = this.pointers.size > 0; });
    element.addEventListener('pointermove', (e) => { if (!this.active) return; this.lastCoords = [e.clientX, e.clientY]; this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY)); this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY]; });
  }
  updateScale(s) { this.scale = s; }
  get count() { return this.pointers.size; }
  get move() { return this.moves; }
  get coords() { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]; }
  get first() { return this.pointers.values().next().value || this.lastCoords; }
}

export default function ShaderBackground({ children }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);
  const frameRef = useRef(null);
  const { theme } = useTheme();

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const renderer = new WebGLRenderer(canvas, dpr);
    const pointers = new PointerHandler(canvas, dpr);
    rendererRef.current = renderer;
    pointersRef.current = pointers;

    renderer.setup();
    renderer.init();

    const shaderSrc = theme === 'light' ? lightShader : darkShader;
    if (renderer.test(shaderSrc) === null) {
      renderer.updateShader(shaderSrc);
    }

    const resize = () => {
      const d = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * d;
      canvas.height = window.innerHeight * d;
      renderer.updateScale(d);
      pointers.updateScale(d);
    };

    const loop = (now) => {
      renderer.updateMouse(pointers.first);
      renderer.updatePointerCount(pointers.count);
      renderer.updatePointerCoords(pointers.coords);
      renderer.updateMove(pointers.move);
      renderer.render(now);
      frameRef.current = requestAnimationFrame(loop);
    };

    loop(0);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      renderer.reset();
    };
  }, []);

  // Swap shader when theme changes
  useEffect(() => {
    if (!rendererRef.current) return;
    const shaderSrc = theme === 'light' ? lightShader : darkShader;
    if (rendererRef.current.test(shaderSrc) === null) {
      rendererRef.current.updateShader(shaderSrc);
    }
  }, [theme]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full touch-none z-0"
        style={{ background: theme === 'light' ? '#fefcf7' : '#09090b' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
