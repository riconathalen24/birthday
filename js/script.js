// ================= BUTTON TRANSITION =================
document.getElementById("nextBtn").onclick = () => {
  document.body.style.transition = "opacity .8s ease";
  document.body.style.opacity = 0;
  setTimeout(() => location.href = "next.html", 800);
};

// ================= FLOATING CARDS =================
const images = Array.from({ length: 5 }, (_, i) =>
  `./images/img${i + 1}.jpeg`
);

const bg = document.getElementById("background");
const cards = [];

images.forEach((src, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${src})`;

  const depth = 1 + (i % 5);
  card.dataset.depth = depth;
  card.dataset.scale = 0.85 + depth * 0.05;
  card.dataset.rotate = Math.random() * 12 - 6;
  card.dataset.float = Math.random() * Math.PI * 2;
  card.dataset.floatSpeed = 0.002 + Math.random() * 0.002;

  bg.appendChild(card);
  cards.push(card);
});

function layout() {
  const vw = innerWidth;
  cards.forEach((card, i) => {
    card.style.left = `${(i % 5) * (vw / 5) + 120}px`;
    card.style.top = `${Math.floor(i / 5) * 260 + 160}px`;
  });
}
layout();
addEventListener("resize", layout);

let tx = 0, ty = 0, cx = 0, cy = 0;
document.addEventListener("mousemove", e => {
  tx = e.clientX / innerWidth - 0.5;
  ty = e.clientY / innerHeight - 0.5;
});

function animateCards() {
  cx += (tx - cx) * 0.06;
  cy += (ty - cy) * 0.06;

  cards.forEach(card => {
    const d = +card.dataset.depth;
    const s = +card.dataset.scale;
    let p = +card.dataset.float + +card.dataset.floatSpeed;
    card.dataset.float = p;

    card.style.transform = `
      translate(-50%, -50%)
      translate(${cx * d * 30}px, ${cy * d * 30 + Math.sin(p) * 10}px)
      scale(${s})
      rotate(${+card.dataset.rotate + cx * d * 4}deg)
    `;
  });

  requestAnimationFrame(animateCards);
}
animateCards();

// ================= PARTICLES =================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 0.5,
  vx: Math.random() * 0.25 - 0.125,
  vy: Math.random() * 0.25 - 0.125,
  a: Math.random() * 0.5 + 0.3
}));

function animateParticles() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== HARD MOBILE + SAFARI BLOCK =====
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function isIOSSafari() {
  return /iP(ad|hone|od)/.test(navigator.userAgent) &&
         /WebKit/.test(navigator.userAgent) &&
         !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);
}

if (isMobileDevice() || isIOSSafari()) {
  document.body.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align:center;
      background:linear-gradient(135deg,#f8dfe8,#e8e6f7);
      font-family:sans-serif;
      padding:40px;
      flex-direction:column;
    ">
      <h2 style="margin-bottom:16px;">AHAHAHA GABISA DIBUKA 😜</h2>
      <p>Buka dari laptop yaa.</p>
    </div>
  `;
}
