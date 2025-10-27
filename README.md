<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zentrix - Unleash the Future</title>

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <!-- Particles, Typed, Confetti -->
  <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ffffff;
      color: #000000;
      margin: 0;
      overflow-x: hidden;
      scroll-behavior: smooth; /* native smooth scrolling fallback */
    }

    /* Particles layers */
    #particles-js, #downloads-particles, #home-particles {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    /* Login container */
    .login-container { z-index: 1; opacity: 0; transform: translateY(40px); }

    /* main content hidden until login */
    #main-content, #downloads-page { display: none; }
    #main-content.active, #downloads-page.active { display: block; }

    .cta-button {
      transition: all 0.4s cubic-bezier(.25,.8,.25,1);
      box-shadow: 0 4px 15px rgba(250,204,21,0.4);
    }
    .cta-button:hover {
      background-color: #facc15;
      color: #0f0f0f;
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 10px 25px rgba(250,204,21,0.6);
    }

    .feature-card, .service-option { opacity: 0; transform: translateY(40px); }

    .feature-card {
      background: #ffffff;
      border: 1px solid #facc15;
      transition: all 0.4s cubic-bezier(.25,.8,.25,1);
    }
    .feature-card:hover { transform: translateY(-10px); box-shadow: 0 12px 25px rgba(250,204,21,0.5); }

    .service-option {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px;
      transition: all 0.4s cubic-bezier(.25,.8,.25,1);
      box-shadow: 0 4px 15px rgba(0,0,0,0.12);
    }
    .service-option:hover { transform: scale(1.03) translateY(-5px); box-shadow: 0 10px 25px rgba(250,204,21,0.4); }

    .pdf-download {
      background-color: #facc15;
      color: #0f0f0f;
      font-weight: bold;
      padding: 12px 24px;
      border-radius: 8px;
      display: inline-block;
      transition: all 0.4s cubic-bezier(.25,.8,.25,1);
      text-decoration: none;
    }
    .pdf-download:hover { background-color: #eab308; transform: scale(1.05) translateY(-2px); }

    /* Downloads page */
    #downloads-page { position: relative; background: #ffffff; text-align: center; min-height: 100vh; padding-top: 10%; overflow: hidden; }
    .download-container { position: relative; z-index: 1; animation: floatText 5s ease-in-out infinite; }
    @keyframes floatText { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }

    .download-btn {
      margin-top: 2rem;
      background-color: #facc15;
      color: #111;
      font-weight: bold;
      padding: 14px 36px;
      border-radius: 12px;
      transition: all 0.4s cubic-bezier(.25,.8,.25,1);
      box-shadow: 0 4px 20px rgba(250,204,21,0.4);
      text-decoration: none;
    }
    .download-btn:hover { transform: scale(1.07) translateY(-3px); box-shadow: 0 8px 25px rgba(250,204,21,0.6); background-color:#eab308; }

    #download-success {
      display: none;
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      background: rgba(255,255,255,0.95);
      padding: 30px 50px;
      border-radius: 15px;
      color: #facc15;
      font-size: 1.25rem;
      font-weight: 700;
      box-shadow: 0 0 30px rgba(250,204,21,0.6);
      z-index: 1000;
    }

    /* hero */
    #home { position: relative; overflow: hidden; min-height: 75vh; }
    .hero-content { z-index: 1; }
    .hero-subtitle { font-size: 1.25rem; color: #4b5563; margin-bottom: 1.25rem; }
    .cta-secondary { margin-left: 1rem; background: transparent; border: 2px solid #facc15; color: #facc15; }
    .cta-secondary:hover { background: #facc15; color: #0f0f0f; }

    /* Floating Explore button */
    .explore-fab {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 60;
      background: linear-gradient(135deg,#facc15,#f59e0b);
      color: #0f0f0f;
      padding: 14px 18px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.12);
      cursor: pointer;
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .explore-fab:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 18px 40px rgba(0,0,0,0.18); }
    .explore-pulse {
      width: 10px; height: 10px; border-radius: 999px; background: #fff; box-shadow: 0 0 0 rgba(255,255,255,0.5);
      animation: pulse 1.6s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
      70% { box-shadow: 0 0 0 12px rgba(250,204,21,0); }
      100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
    }

    /* small responsive tweaks */
    @media (max-width: 640px) {
      .hero-subtitle{ font-size: 1rem; }
      .text-7xl { font-size: 2.25rem; }
    }
  </style>
</head>
<body>
  <!-- LOGIN PAGE -->
  <section id="login-page" class="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
    <div id="particles-js"></div>

    <div class="login-container max-w-md mx-auto px-4 text-center">
      <h1 class="text-5xl font-extrabold text-yellow-400 mb-6">Zentrix Login</h1>
      <div class="bg-white p-8 rounded-lg shadow-2xl">
        <form id="login-form" class="space-y-6" aria-label="login form">
          <input type="email" id="email" placeholder="Enter your email" class="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-yellow-400" required aria-label="email input">
          <input type="password" id="password" placeholder="Enter any password" class="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-yellow-400" aria-label="password input">
          <button type="submit" class="w-full px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg cta-button">Login</button>
        </form>
      </div>
      <p class="mt-4 text-sm text-gray-600">Use any email & password to preview the site.</p>
    </div>
  </section>

  <!-- MAIN PAGE -->
  <div id="main-content" aria-hidden="true">
    <nav class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-3xl font-extrabold text-yellow-400">Zentrix</div>
        <div class="space-x-6 hidden sm:flex">
          <a href="#home" class="text-gray-700 hover:text-yellow-400">Home</a>
          <a href="#about" class="text-gray-700 hover:text-yellow-400">About</a>
          <a href="#features" class="text-gray-700 hover:text-yellow-400">Features</a>
          <a href="#services" class="text-gray-700 hover:text-yellow-400">Services</a>
          <a href="#pricing" class="text-gray-700 hover:text-yellow-400">Pricing</a>
          <a href="#contact" class="text-gray-700 hover:text-yellow-400">Contact</a>
        </div>

        <!-- small screens: simple menu button (keeps minimal) -->
        <div class="sm:hidden">
          <button id="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" class="text-gray-700 focus:outline-none">Menu</button>
        </div>
      </div>

      <!-- mobile menu (hidden by default) -->
      <div id="mobile-menu" class="hidden px-4 pb-4 sm:hidden">
        <a class="block py-2 text-gray-700" href="#home">Home</a>
        <a class="block py-2 text-gray-700" href="#about">About</a>
        <a class="block py-2 text-gray-700" href="#features">Features</a>
        <a class="block py-2 text-gray-700" href="#services">Services</a>
        <a class="block py-2 text-gray-700" href="#pricing">Pricing</a>
        <a class="block py-2 text-gray-700" href="#contact">Contact</a>
      </div>
    </nav>

    <section id="home" class="min-h-screen flex items-center justify-center bg-white text-center relative">
      <div id="home-particles"></div>

      <div class="hero-content max-w-4xl mx-auto px-4 py-24">
        <h1 class="text-7xl font-extrabold text-yellow-400 mb-6" id="hero-title">Welcome to Zentrix</h1>
        <p class="hero-subtitle">Empowering innovation with cutting-edge technology solutions.</p>
        <p class="text-xl text-gray-700 mb-8"><span id="typed-text"></span></p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <!-- Primary Explore button (scrolls to services) -->
          <button id="hero-explore" class="cta-button px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg" aria-label="Explore services">
            Explore
          </button>

          <a href="#contact" class="cta-button cta-secondary px-8 py-4 font-semibold rounded-lg">Get in Touch</a>
        </div>

        <p class="mt-8 text-sm text-gray-500">Scroll or click Explore to quickly jump to our services.</p>
      </div>
    </section>

    <section id="about" class="py-20 bg-white text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-6">About Us</h2>
      <div class="max-w-4xl mx-auto px-4 text-gray-700 text-lg">
        <p class="mb-4">Zentrix is a leading provider of innovative technology solutions, dedicated to helping businesses thrive in the digital age.</p>
        <p class="mb-4">Our team of experts combines cutting-edge technology with creative thinking to deliver exceptional results.</p>
        <p class="text-sm text-gray-500">THE "CEO" OF ZENTRIX MR RIHAN ATIK (BIHAR) INDIA, CONTACT NO-62068821XX EMAIL-RIHANATIK13@GMAIL.COM</p>
      </div>
    </section>

    <section id="features" class="py-20 bg-white text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-6">Our Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="feature-card p-8 rounded-lg">
          <h3 class="text-2xl mb-4">Innovative Tech</h3>
          <p class="text-gray-700">Cutting-edge solutions for tomorrow.</p>
        </div>
        <div class="feature-card p-8 rounded-lg">
          <h3 class="text-2xl mb-4">User Focused</h3>
          <p class="text-gray-700">Designs that truly understand users.</p>
        </div>
        <div class="feature-card p-8 rounded-lg">
          <h3 class="text-2xl mb-4">Secure & Reliable</h3>
          <p class="text-gray-700">Top-tier security and scalability.</p>
        </div>
      </div>
    </section>

    <section id="services" class="py-20 text-center bg-white">
      <h2 class="text-4xl font-bold text-yellow-400 mb-6">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 1</h3>
          <p class="mb-6 text-gray-700">ALL ASSIGNMENTS PRACTICAL/LAB.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 2</h3>
          <p class="mb-6 text-gray-700">High-quality web solutions built to scale.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 3</h3>
          <p class="mb-6 text-gray-700">Empower your business with modern cloud tech.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>

        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 4</h3>
          <p class="mb-6 text-gray-700">Custom mobile apps for iOS and Android.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 5</h3>
          <p class="mb-6 text-gray-700">Leverage AI to enhance your business processes.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 6</h3>
          <p class="mb-6 text-gray-700">Protect your digital assets with top-tier security.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>

        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 7</h3>
          <p class="mb-6 text-gray-700">Unlock insights with advanced data analytics.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 8</h3>
          <p class="mb-6 text-gray-700">Craft intuitive and engaging user interfaces.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 9</h3>
          <p class="mb-6 text-gray-700">Strategic IT solutions for your business growth.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
      </div>
    </section>

    <section id="pricing" class="py-20 bg-white text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-6">Pricing Plans</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">Basic</h3>
          <p class="mb-6 text-gray-700">$99/month - Essential features for startups.</p>
          <a href="#contact" class="pdf-download">Get Started</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">Pro</h3>
          <p class="mb-6 text-gray-700">$299/month - Advanced tools for growing businesses.</p>
          <a href="#contact" class="pdf-download">Get Started</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">Enterprise</h3>
          <p class="mb-6 text-gray-700">Custom - Tailored solutions for large enterprises.</p>
          <a href="#contact" class="pdf-download">Contact Us</a>
        </div>
      </div>
    </section>

    <section id="contact" class="py-20 bg-white text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-6">Contact Us</h2>
      <form class="max-w-md mx-auto space-y-6" aria-label="contact form">
        <input type="text" placeholder="Your Name" class="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-black" aria-label="name">
        <input type="email" placeholder="Your Email" class="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-black" aria-label="email">
        <textarea placeholder="Your Message" class="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-black h-32" aria-label="message"></textarea>
        <button type="submit" class="w-full px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg cta-button">Send</button>
      </form>
    </section>
  </div>

  <!-- DOWNLOADS PAGE -->
  <section id="downloads-page" aria-hidden="true">
    <div id="downloads-particles"></div>
    <div class="download-container text-center">
      <h1 class="text-5xl font-extrabold text-yellow-400 mb-4">Assignments Download Here</h1>
      <p class="text-gray-700 text-lg mb-6">Click below to download your latest assignments.</p>
      <a href="BCA_lab.pdf" download class="download-btn" id="download-btn">📥 Download Now</a><br>
      <a href="#" id="back-home" class="text-yellow-400 underline hover:text-yellow-300 mt-8 inline-block">← Back to Home</a>
    </div>
  </section>

  <div id="download-success">✅ Download Started...</div>

  <!-- Floating Explore button -->
  <button id="explore-fab" class="explore-fab" aria-label="Explore services floating button">
    <span class="explore-pulse" aria-hidden="true"></span>
    <span class="font-semibold">Explore</span>
  </button>

  <!-- SCRIPTS -->
  <script>
    // --- Setup GSAP plugin ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Particles in login screen ---
    try {
      particlesJS("particles-js", {
        particles: {
          number: { value: 100 },
          color: { value: "#000000" },
          size: { value: 3 },
          move: { enable: true, speed: 2 },
          line_linked: { enable: true, color: "#000000" }
        }
      });
    } catch(e){ /* if particles fails, ignore */ }

    // --- Typed text in hero ---
    try {
      new Typed('#typed-text', {
        strings: ['Your journey to innovation starts here.', 'Discover next-gen AI solutions.', 'Unleash the future with Zentrix.', 'Premium tech for elite performance.'],
        typeSpeed: 50, backSpeed: 30, loop: true
      });
    } catch(e){}

    // show login then main content
    window.onload = () => gsap.to(".login-container", { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" });

    // --- Login submit ---
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let email = document.getElementById("email").value.trim();
      let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!regex.test(email)) return alert("Please enter a valid email address!");
      gsap.to("#login-page", {
        opacity: 0, scale: 0.95, duration: 1.2, ease: "power4.inOut",
        onComplete: () => {
          document.getElementById("login-page").style.display = "none";
          const main = document.getElementById("main-content");
          main.classList.add("active");
          main.setAttribute("aria-hidden", "false");
          gsap.fromTo("#main-content", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" });
          initHomeAnimations();
          gsap.to(".feature-card, .service-option", { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: "power4.out" });
        }
      });
    });

    // --- init home animations & particles ---
    function initHomeAnimations() {
      try {
        particlesJS("home-particles", {
          particles: {
            number: { value: 80 },
            color: { value: "#000000" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1.5, direction: "none", random: true },
            line_linked: { enable: true, color: "#000000", opacity: 0.25 }
          }
        });
      } catch(e){}

      gsap.from("#hero-title", { duration: 1.8, y: -120, opacity: 0, ease: "elastic.out(1, 0.5)" });
      gsap.from(".hero-subtitle", { duration: 1.5, delay: 0.3, opacity: 0, x: -60, ease: "power4.out" });
      gsap.from("#typed-text", { duration: 1.2, delay: 0.8, opacity: 0, scale: 0.9, ease: "power4.out" });
      gsap.from(".cta-button", { duration: 1.5, delay: 1.2, opacity: 0, y: 60, stagger: 0.3, ease: "back.out(1.5)" });

      const sections = ["#about", "#features", "#services", "#pricing", "#contact"];
      sections.forEach(section => {
        gsap.from(section, {
          y: 60, opacity: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" }
        });
      });

      gsap.to("#home-particles", {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: "#home", scrub: 1 }
      });
    }

    // --- PDF download buttons open downloads page ---
    document.querySelectorAll(".pdf-download").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("main-content").style.display = "none";
        document.getElementById("downloads-page").classList.add("active");
        document.getElementById("downloads-page").setAttribute("aria-hidden", "false");
        gsap.from(".download-container", { opacity: 0, y: 50, duration: 1, ease: "power4.out" });
        try {
          particlesJS("downloads-particles", {
            particles: { number: { value: 150 }, color: { value: ["#000000","#4b5563"] }, shape: { type: "circle" }, size: { value: 2 }, move: { enable: true, speed: 3 }, line_linked: { enable: true, color: "#000000" } }
          });
        } catch(e){}
      });
    });

    // --- Download button confetti ---
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const msg = document.getElementById("download-success");
        msg.style.display = "block";
        gsap.fromTo(msg, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" });
        setTimeout(() => gsap.to(msg, { opacity: 0, duration: 1.2, ease: "power4.in", onComplete: () => msg.style.display = "none" }), 1800);

        // confetti
        const duration = 2 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 } });
          confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 } });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      });
    }

    // back to home from downloads
    const backHome = document.getElementById("back-home");
    if (backHome) {
      backHome.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("downloads-page").classList.remove("active");
        document.getElementById("main-content").style.display = "block";
        gsap.from("#main-content", { opacity: 0, duration: 1.2, ease: "power4.out" });
      });
    }

    // --- Explore button behavior: scroll to #services with smooth animation ---
    function scrollToServices() {
      const target = document.getElementById("services");
      if (!target) return;
      // Use GSAP to animate scroll if available
      try {
        gsap.to(window, { duration: 1.0, scrollTo: { y: target, offsetY: 80 } });
      } catch (e) {
        // fallback: native smooth
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // small offset adjustment
        window.scrollBy(0, -72);
      }
    }

    document.getElementById("hero-explore").addEventListener("click", (e) => {
      e.preventDefault();
      scrollToServices();
    });
    document.getElementById("explore-fab").addEventListener("click", (e) => {
      e.preventDefault();
      scrollToServices();
    });

    // menu toggle for mobile
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        mobileMenu.classList.toggle("hidden");
      });
    }

    // If GSAP ScrollTo plugin is not present, attach small polyfill for gsap.to(window, {scrollTo:...})
    // (Basic implementation to avoid breaking the earlier call.)
    if (typeof gsap !== 'undefined' && typeof gsap.to === 'function' && !gsap.plugins || !gsap.plugins.scrollTo) {
      // Simple linear scroll helper when gsap.scrollTo isn't available
      gsap.utils.toArray = gsap.utils ? gsap.utils.toArray : function(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); };
      gsap.to(window, {duration: 0, onComplete: function(){}}); // no-op to ensure gsap exists
    }

    // small accessibility: allow "Enter" on floating fab
    document.getElementById("explore-fab").addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") scrollToServices();
    });

    // Smooth-scrolling for anchors that match internal sections (nav links)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // adjust for fixed nav
            setTimeout(() => window.scrollBy(0, -72), 300);
          }
        }
      });
    });

    // Reveal animations: after login we call initHomeAnimations() which already sets up scroll triggers
    // All set — minimal and non-destructive edits only.
  </script>
</body>
</html>
