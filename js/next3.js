// kecil tapi kepake: animasi fade-in pas load
document.addEventListener("DOMContentLoaded", () => {
  const surat = document.querySelector(".surat");
  surat.style.opacity = 0;
  surat.style.transform = "translateY(20px)";

  setTimeout(() => {
    surat.style.transition = "0.8s ease";
    surat.style.opacity = 1;
    surat.style.transform = "translateY(0)";
  }, 100);
});

// ===== PARTICLES =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 0.5,
  vx: Math.random() * 0.25 - 0.125,
  vy: Math.random() * 0.25 - 0.125,
  a: Math.random() * 0.5 + 0.3
}));

function animate() {
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
  requestAnimationFrame(animate);
}
animate();

const go = (url) => {
  document.body.style.transition = "opacity .6s ease";
  document.body.style.opacity = 0;
  setTimeout(() => window.location.href = url, 600);
};

document.getElementById("prev").onclick = () => go("index.html");