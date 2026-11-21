'use strict';

const sceneNames = ['GOLDEN HOUR', 'AFTER DARK', 'AMBER DUNES'];
const captionNames = ['01 / GOLDEN HOUR', '02 / AFTER DARK', '03 / AMBER DUNES'];
const camera = document.getElementById('camera');
const print = document.getElementById('polaroid');
const photoCaption = document.getElementById('photoCaption');
const sceneName = document.getElementById('sceneName');
const captureBtn = document.getElementById('captureBtn');
const captureText = document.getElementById('captureText');
const hint = document.getElementById('hint');
const flash = document.getElementById('flash');
const flashRing = document.getElementById('flashRing');
let selectedScene = 0;
let shotTimer = [];
let busy = false;

function schedule(fn, delay) {
  const id = setTimeout(fn, delay);
  shotTimer.push(id);
}
function stopScheduled() {
  for (const id of shotTimer) clearTimeout(id);
  shotTimer = [];
}
function resetShot() {
  stopScheduled();
  busy = false;
  captureBtn.disabled = false;
  captureText.textContent = 'CAPTURE MOMENT';
  camera.classList.remove('snapping');
  print.classList.remove('printed', 'developed');
  flash.classList.remove('active');
  flashRing.classList.remove('active');
  hint.innerHTML = 'A little magic, one click away. <span>PRESS SPACE TO CAPTURE</span>';
}
function chooseScene(direction) {
  selectedScene = (selectedScene + direction + sceneNames.length) % sceneNames.length;
  resetShot();
  sceneName.textContent = sceneNames[selectedScene];
  photoCaption.textContent = captionNames[selectedScene];
  for (const svg of document.querySelectorAll('.landscape')) {
    svg.classList.toggle('active', Number(svg.dataset.landscape) === selectedScene);
  }
}

function captureMoment() {
  if (busy) return;
  resetShot();
  busy = true;
  captureBtn.disabled = true;
  captureText.textContent = 'CAPTURING...';
  // Restart CSS animations even after multiple shots.
  void flash.offsetWidth;
  camera.classList.add('snapping');
  flash.classList.add('active');
  flashRing.classList.add('active');
  schedule(() => camera.classList.remove('snapping'), 250);
  schedule(() => {
    print.classList.add('printed');
    captureText.textContent = 'DEVELOPING...';
    hint.textContent = 'A moment becoming a memory...';
  }, 430);
  schedule(() => print.classList.add('developed'), 1350);
  schedule(() => {
    busy = false;
    captureBtn.disabled = false;
    captureText.textContent = 'CAPTURE AGAIN';
    hint.textContent = 'Beautiful things take a moment. Capture another?';
  }, 3000);
}

captureBtn.addEventListener('click', captureMoment);
document.getElementById('resetBtn').addEventListener('click', resetShot);
document.getElementById('scenePrev').addEventListener('click', () => chooseScene(-1));
document.getElementById('sceneNext').addEventListener('click', () => chooseScene(1));
document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !event.repeat && !['BUTTON', 'INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
    event.preventDefault();
    captureMoment();
  }
});

// Low-key parallax, restrained to keep the camera looking like a real object.
if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.addEventListener('pointermove', event => {
    const dx = (event.clientX / innerWidth - .5) * 2;
    const dy = (event.clientY / innerHeight - .5) * 2;
    camera.style.setProperty('--ry', `${(dx * 5).toFixed(2)}deg`);
    camera.style.setProperty('--rx', `${(-dy * 4).toFixed(2)}deg`);
  }, { passive: true });
  document.addEventListener('pointerleave', () => {
    camera.style.setProperty('--ry', '0deg');
    camera.style.setProperty('--rx', '0deg');
  });
}

// Ambient cinematic dust (2D canvas). Entire project works without external dependencies.
const canvas = document.getElementById('dust');
const ctx = canvas.getContext('2d');
const motionReduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
let particles = [];
let width = 0, height = 0;
let lastTime = 0;
function resizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  width = innerWidth; height = innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(110, Math.round(width * height / 10000));
  particles = Array.from({length:count}, () => ({
    x:Math.random()*width,y:Math.random()*height,
    r:Math.random()*1.4+.25,
    speed:Math.random()*.26+.08,
    wobble:Math.random()*Math.PI*2,
    alpha:Math.random()*.42+.13
  }));
}
function drawDust(now=0) {
  const step = lastTime ? Math.min((now-lastTime)/16.67,3) : 1;
  lastTime = now;
  ctx.clearRect(0,0,width,height);
  for (const p of particles) {
    if (!motionReduced) {
      p.y -= p.speed*step;
      p.x += Math.sin(now*.0005+p.wobble)*.12*step;
      if (p.y < -5) {p.y=height+5;p.x=Math.random()*width;}
    }
    const alpha = p.alpha*(.75+.25*Math.sin(now*.0015+p.wobble));
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(228,183,113,${alpha})`;ctx.fill();
  }
  if (!motionReduced) requestAnimationFrame(drawDust);
}
addEventListener('resize', resizeCanvas, {passive:true});
resizeCanvas();
requestAnimationFrame(drawDust);
