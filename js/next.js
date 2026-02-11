// ===== PAGE TRANSITION =====
const go = (url) => {
  document.body.style.transition = "opacity .6s ease";
  document.body.style.opacity = 0;
  setTimeout(() => window.location.href = url, 600);
};

document.getElementById("prev").onclick = () => go("index.html");
document.getElementById("next").onclick = () => go("next2.html");

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

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("show"), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));
