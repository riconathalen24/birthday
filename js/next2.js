document.addEventListener("DOMContentLoaded", () => {
    const letter = document.getElementById("clickableLetter");
    const container = document.querySelector(".container");

    letter.addEventListener("click", () => {
        letter.classList.add("pop-out");

        setTimeout(() => {
            container.style.opacity = "0";
            
            setTimeout(() => {
                window.location.href = "lastpage.html"; 
            }, 500);
        }, 1000);
    });
});

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
    alpha: Math.random() * 0.5 + 0.3
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
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    const container = document.querySelector(".container");
    container.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "next.html"; 
    }, 500);
});

// ===== "NO" BUTTON =====
const prevBtn = document.getElementById("backBtn");
let dodge = 0;

prevBtn.addEventListener("mouseenter", () => {
  if (dodge >10) return;
  dodge++;
  prevBtn.style.transform =
    `translate(${Math.random()*160-80}px, ${Math.random()*120-60}px)`;
});

prevBtn.addEventListener("click", e => {
  if (dodge < 10) e.preventDefault();
  else go("next.html");
});
