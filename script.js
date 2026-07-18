/* =====================================================
   IZZA USMAN — PORTFOLIO SCRIPT
   ===================================================== */
(function(){
  "use strict";

  const GH_USERNAME = "opullenceee";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Loader ---------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("hidden"), 500);
  });

  /* ---------------- Year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- AOS ---------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: prefersReducedMotion,
    });
  }

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("main .section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll(){
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    backToTop.classList.toggle("show", y > 600);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = docH > 0 ? `${(y / docH) * 100}%` : "0%";

    let current = "home";
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (y >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- Mobile menu ---------------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinksList = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    const open = navLinksList.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", open);
  });
  navLinksList.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinksList.classList.remove("open");
    menuToggle.classList.remove("open");
  }));

  /* ---------------- Search ---------------- */
  const searchToggle = document.getElementById("searchToggle");
  const searchPanel = document.getElementById("searchPanel");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");
  const searchResults = document.getElementById("searchResults");

  const searchIndex = [
    { id: "home", label: "Home", keywords: "hero intro izza usman" },
    { id: "about", label: "About", keywords: "about bio ics grade 11" },
    { id: "skills", label: "Skills", keywords: "skills html css javascript python tools" },
    { id: "projects", label: "Projects", keywords: "projects pixel calculator weatherly student management github analyzer" },
    { id: "education", label: "Education", keywords: "education grade 11 physics mathematics computer science" },
    { id: "github", label: "GitHub", keywords: "github stats repos followers contribution" },
    { id: "certifications", label: "Certifications", keywords: "certifications certificates badges" },
    { id: "contact", label: "Contact", keywords: "contact email linkedin instagram message form" },
  ];

  function openSearch(){
    searchPanel.classList.add("open");
    setTimeout(() => searchInput.focus(), 200);
    renderResults("");
  }
  function closeSearch(){
    searchPanel.classList.remove("open");
    searchInput.value = "";
  }
  searchToggle.addEventListener("click", () => {
    searchPanel.classList.contains("open") ? closeSearch() : openSearch();
  });
  searchClose.addEventListener("click", closeSearch);
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") closeSearch();
  });

  function renderResults(query){
    const q = query.trim().toLowerCase();
    const matches = searchIndex.filter(item =>
      !q || item.label.toLowerCase().includes(q) || item.keywords.includes(q)
    );
    searchResults.innerHTML = matches.map(m =>
      `<li><a href="#${m.id}" data-target="${m.id}">${m.label}</a></li>`
    ).join("") || `<li style="padding:10px 16px;color:var(--mocha);font-size:.88rem;">No matches</li>`;

    searchResults.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => closeSearch());
    });
  }
  searchInput.addEventListener("input", e => renderResults(e.target.value));

  /* ---------------- Smooth nav scroll offset ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });

  /* ---------------- Custom cursor + sparkle trail ---------------- */
  const cursorDot = document.getElementById("cursorDot");
  const sparkleCanvas = document.getElementById("sparkleTrail");
  if (cursorDot && sparkleCanvas && !window.matchMedia("(hover:none)").matches) {
    const ctx = sparkleCanvas.getContext("2d");
    let w = (sparkleCanvas.width = window.innerWidth);
    let h = (sparkleCanvas.height = window.innerHeight);
    window.addEventListener("resize", () => {
      w = sparkleCanvas.width = window.innerWidth;
      h = sparkleCanvas.height = window.innerHeight;
    });

    let particles = [];
    let lastSpawn = 0;

    window.addEventListener("mousemove", e => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      const now = performance.now();
      if (now - lastSpawn > 40 && !prefersReducedMotion) {
        lastSpawn = now;
        particles.push({
          x: e.clientX, y: e.clientY,
          size: Math.random() * 3 + 2,
          life: 1,
          vy: -Math.random() * 0.6 - 0.2,
          vx: (Math.random() - 0.5) * 0.6,
          hue: Math.random() > 0.5 ? "#EFBFC2" : "#F3D8CE",
        });
      }
    });

    document.querySelectorAll("a, button, .pill, .tool-chip, .cert-card").forEach(el => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("grow"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("grow"));
    });

    function drawSparkles(){
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.02;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x + s * 0.3, p.y - s * 0.3);
        ctx.lineTo(p.x + s, p.y);
        ctx.lineTo(p.x + s * 0.3, p.y + s * 0.3);
        ctx.lineTo(p.x, p.y + s);
        ctx.lineTo(p.x - s * 0.3, p.y + s * 0.3);
        ctx.lineTo(p.x - s, p.y);
        ctx.lineTo(p.x - s * 0.3, p.y - s * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      particles = particles.filter(p => p.life > 0);
      requestAnimationFrame(drawSparkles);
    }
    drawSparkles();
  } else if (cursorDot) {
    cursorDot.style.display = "none";
  }

  /* ---------------- Hero mouse parallax ---------------- */
  const heroInner = document.getElementById("heroInner");
  const heroChar = document.getElementById("heroCharacter");
  if (heroInner && !prefersReducedMotion) {
    document.querySelector(".hero").addEventListener("mousemove", e => {
      const { innerWidth: w2, innerHeight: h2 } = window;
      const x = (e.clientX / w2 - 0.5) * 2;
      const y = (e.clientY / h2 - 0.5) * 2;
      if (window.gsap) {
        gsap.to(heroChar, { x: x * 14, y: y * 10, duration: 0.6, ease: "power2.out" });
        gsap.to(".hero-decor", { x: x * -8, y: y * -6, duration: 0.8, ease: "power2.out" });
      }
    });
  }

  /* ---------------- Typed.js hero role ---------------- */
  if (window.Typed) {
    new Typed("#typedRole", {
      strings: [
        "Computer Science Student",
        "Frontend Developer",
        "UI/UX Enthusiast",
        "Future AI Engineer",
      ],
      typeSpeed: 48,
      backSpeed: 28,
      backDelay: 1400,
      startDelay: 400,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ---------------- GSAP scroll reveals ---------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".section-title").forEach(title => {
      gsap.fromTo(title, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    });

    // animate skill bars into view
    document.querySelectorAll(".skill-bars i").forEach(bar => {
      ScrollTrigger.create({
        trigger: bar,
        start: "top 90%",
        onEnter: () => bar.classList.add("in-view"),
        once: true,
      });
    });
  }

  /* ---------------- Three.js hero particles ---------------- */
  (function initParticles(){
    const canvas = document.getElementById("heroParticles");
    if (!canvas || !window.THREE || prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    function resizeRenderer(){
      const w3 = canvas.clientWidth || window.innerWidth;
      const h3 = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w3, h3, false);
      camera.aspect = w3 / h3;
      camera.updateProjectionMatrix();
    }
    resizeRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 220;
    const positions = new Float32Array(count * 3);
    const colorPalette = [0xFFDBDD, 0xE5E6B5, 0xF3D8CE, 0xCB8D95, 0xD1C791];
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      c.set(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.9, vertexColors: true, transparent: true, opacity: 0.85,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", e => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    let raf;
    function animate(){
      raf = requestAnimationFrame(animate);
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0003;
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", resizeRenderer);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf); else animate();
    });
  })();

  /* ---------------- Chart.js: Skills radar ---------------- */
  (function skillsRadar(){
    const el = document.getElementById("skillsRadar");
    if (!el || !window.Chart) return;
    new Chart(el, {
      type: "radar",
      data: {
        labels: ["HTML", "CSS", "JavaScript", "Python", "C++", "UI/UX"],
        datasets: [{
          label: "Proficiency",
          data: [95, 92, 85, 55, 60, 78],
          backgroundColor: "rgba(203,141,149,0.28)",
          borderColor: "#A7626B",
          borderWidth: 2,
          pointBackgroundColor: "#79513A",
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            angleLines: { color: "rgba(91,49,19,0.12)" },
            grid: { color: "rgba(91,49,19,0.12)" },
            pointLabels: { color: "#5B3113", font: { family: "DM Sans", size: 12, weight: "600" } },
            ticks: { display: false, backdropColor: "transparent" },
            suggestedMin: 0, suggestedMax: 100,
          },
        },
      },
    });
  })();

  /* ---------------- GitHub API integration ---------------- */
  (function githubSection(){
    const repoList = document.getElementById("ghRepoList");
    const activityList = document.getElementById("ghActivityList");
    const langCanvas = document.getElementById("ghLangChart");
    if (!repoList) return;

    const els = {
      repos: document.getElementById("ghRepos"),
      followers: document.getElementById("ghFollowers"),
      following: document.getElementById("ghFollowing"),
      gists: document.getElementById("ghGists"),
    };

    function timeAgo(dateStr){
      const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
      const units = [["year",31536000],["month",2592000],["day",86400],["hour",3600],["minute",60]];
      for (const [name, secs] of units) {
        const val = Math.floor(diff / secs);
        if (val >= 1) return `${val} ${name}${val > 1 ? "s" : ""} ago`;
      }
      return "just now";
    }
async function fetchJSON() {
  const res = await fetch("https://portfolio-git-main-opullencee.vercel.app/api/github")

  if (!res.ok) {
    throw new Error(`Backend API error ${res.status}`);
  }

  return res.json();
}

    async function loadGitHub(){
      try {
      const github = await fetchJSON();

const user = github.user;
const repos = github.repos;
const events = github.events;

els.repos.textContent = user.public_repos ?? "–";
els.followers.textContent = user.followers ?? "–";
els.following.textContent = user.following ?? "–";
els.gists.textContent = user.public_gists ?? "–";

        // repo list (top 6 by recency)
        const topRepos = [...repos].slice(0, 6);
        repoList.innerHTML = topRepos.map(r => `
          <div class="gh-repo-card">
            <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
            <p>${r.description ? r.description : "No description provided."}</p>
            <div class="gh-repo-meta">
              <span>★ ${r.stargazers_count}</span>
              <span>⑂ ${r.forks_count}</span>
              <span>${r.language || "—"}</span>
            </div>
          </div>
        `).join("") || `<p class="gh-loading">No public repositories yet.</p>`;

        // language chart
        const langCounts = {};
        repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
        const labels = Object.keys(langCounts);
        const data = Object.values(langCounts);

        if (langCanvas && window.Chart && labels.length) {
          new Chart(langCanvas, {
            type: "doughnut",
            data: {
              labels,
              datasets: [{
                data,
                backgroundColor: ["#CB8D95","#E5E6B5","#F3D8CE","#D1C791","#A7626B","#969752","#B08F7A","#EFBFC2"],
                borderColor: "#FBF4EC",
                borderWidth: 3,
              }],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: "bottom", labels: { color: "#5B3113", font: { family: "DM Sans", size: 11 } } },
              },
            },
          });
        } else if (langCanvas) {
          langCanvas.parentElement.innerHTML = `<h3>Top Languages</h3><p class="gh-loading">Not enough public data yet.</p>`;
        }

        // recent activity
        try {
        // Events already loaded from the Vercel backend
          if (events.length) {
            activityList.innerHTML = events.slice(0, 8).map(ev => {
              const map = {
                PushEvent: `Pushed to ${ev.repo.name}`,
                CreateEvent: `Created ${ev.payload.ref_type || "repo"} in ${ev.repo.name}`,
                WatchEvent: `Starred ${ev.repo.name}`,
                ForkEvent: `Forked ${ev.repo.name}`,
                IssuesEvent: `${ev.payload.action} an issue in ${ev.repo.name}`,
                PullRequestEvent: `${ev.payload.action} a pull request in ${ev.repo.name}`,
              };
              const label = map[ev.type] || `${ev.type.replace("Event","")} on ${ev.repo.name}`;
              return `<li><span>${label}</span><time>${timeAgo(ev.created_at)}</time></li>`;
            }).join("");
          } else {
            activityList.innerHTML = `<li class="gh-loading">No recent public activity.</li>`;
          }
        } catch {
          activityList.innerHTML = `<li class="gh-error">Activity feed unavailable right now.</li>`;
        }

      } catch (err) {
        repoList.innerHTML = `<p class="gh-error">Couldn't load GitHub data right now. Please try again shortly.</p>`;
        activityList.innerHTML = `<li class="gh-error">Activity feed unavailable right now.</li>`;
        Object.values(els).forEach(el => el.textContent = "–");
      }
    }

    // lazy-load when section enters viewport
    const ghSection = document.getElementById("github");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { loadGitHub(); io.disconnect(); }
      });
    }, { threshold: 0.15 });
    io.observe(ghSection);
  })();

  /* ---------------- Contact form (EmailJS) ---------------- */

emailjs.init({
  publicKey: "si6Z_JlW0JZcmmr2Q"
});

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const cfSubmit = document.getElementById("cfSubmit");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    cfSubmit.classList.add("sending");
    cfSubmit.disabled = true;
    cfSubmit.querySelector(".btn-label").textContent = "Sending...";

    emailjs.sendForm(
      "service_qfqdphc",
      "template_vaa0mqf",
      contactForm
    )
    .then(() => {

      cfSubmit.classList.remove("sending");
      cfSubmit.disabled = false;
      cfSubmit.querySelector(".btn-label").textContent = "Send Message";

      formSuccess.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 5000);

    })
    .catch((error) => {

      console.error("EmailJS Error:", error);

      cfSubmit.classList.remove("sending");
      cfSubmit.disabled = false;
      cfSubmit.querySelector(".btn-label").textContent = "Send Message";

      alert("Failed to send your message. Please try again.");

    });

  });

}
  /* ---------------- Lazy-load images (data-src convention, future-proof) ---------------- */
  document.querySelectorAll("img[data-src]").forEach(img => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src;
          io.unobserve(img);
        }
      });
    });
    io.observe(img);
  });

})();
