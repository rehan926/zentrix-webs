<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zentrix - Unleash the Future</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    * {
      box-sizing: border-box; /* Ensure padding/margin don't mess with layout */
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #0f0f0f;
      color: white;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      width: 100vw; /* Full viewport width */
      overflow-x: hidden;
    }

    /* LOGIN PAGE */
    #login-page {
      min-height: 100vh;
      width: 100vw; /* Full viewport width */
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a1a, #2d3748);
      position: relative;
      overflow: hidden;
    }

    #particles-js, #downloads-particles, #home-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw; /* Full viewport width */
      height: 100%; /* Match parent height */
      z-index: 0;
    }

    .login-container {
      z-index: 1;
      opacity: 0;
      transform: translateY(40px);
      width: 90%; /* Responsive width */
      max-width: 500px; /* Prevent over-stretching on large screens */
      margin: 0 auto; /* Center horizontally */
    }

    #main-content, #downloads-page {
      display: none;
      width: 100vw; /* Full viewport width */
    }

    #main-content.active, #downloads-page.active {
      display: block;
    }

    .cta-button {
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 4px 15px rgba(250, 204, 21, 0.4);
    }

    .cta-button:hover {
      background-color: #facc15;
      color: #0f0f0f;
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 10px 25px rgba(250, 204, 21, 0.6);
    }

    .feature-card, .service-option {
      opacity: 0;
      transform: translateY(40px);
    }

    .feature-card {
      background: linear-gradient(135deg, #1f2937, #374151);
      border: 1px solid #facc15;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 25px rgba(250, 204, 21, 0.5);
    }

    .service-option {
      background: #1f2937;
      border-radius: 12px;
      padding: 20px;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .service-option:hover {
      transform: scale(1.03) translateY(-5px);
      box-shadow: 0 10px 25px rgba(250, 204, 21, 0.4);
    }

    .pdf-download {
      background-color: #facc15;
      color: #0f0f0f;
      font-weight: bold;
      padding: 12px 24px;
      border-radius: 8px;
      display: inline-block;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .pdf-download:hover {
      background-color: #eab308;
      transform: scale(1.05) translateY(-2px);
    }

    /* DOWNLOAD PAGE */
    #downloads-page {
      position: relative;
      background: radial-gradient(circle at top left, #111, #0f0f0f 70%);
      text-align: center;
      min-height: 100vh;
      width: 100vw; /* Full viewport width */
      padding: 10% 5%; /* Responsive padding */
      box-sizing: border-box;
      overflow: hidden;
    }

    .download-container {
      position: relative;
      z-index: 1;
      animation: floatText 5s ease-in-out infinite;
    }

    @keyframes floatText {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .download-btn {
      margin-top: 2rem;
      background-color: #facc15;
      color: #111;
      font-weight: bold;
      padding: 14px 36px;
      border-radius: 12px;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 4px 20px rgba(250, 204, 21, 0.4);
    }

    .download-btn:hover {
      transform: scale(1.07) translateY(-3px);
      box-shadow: 0 8px 25px rgba(250, 204, 21, 0.6);
      background-color: #eab308;
    }

    #back-home {
      display: inline-block;
      margin-top: 50px;
      font-size: 1.2rem;
    }

    /* Download success pop-up */
    #download-success {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      padding: 30px 50px;
      border-radius: 15px;
      color: #facc15;
      font-size: 1.5rem;
      font-weight: bold;
      box-shadow: 0 0 30px rgba(250,204,21,0.6);
      z-index: 1000;
    }

    /* Premium Styles */
    #home {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      width: 100vw; /* Full viewport width */
    }

    .hero-content {
      z-index: 1;
      width: 90%; /* Responsive width */
      max-width: 4xl; /* Match Tailwind's max-w-4xl */
      margin: 0 auto; /* Center horizontally */
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: #d1d5db;
      margin-bottom: 2rem;
    }

    .cta-secondary {
      margin-left: 1rem;
      background: transparent;
      border: 2px solid #facc15;
      color: #facc15;
    }

    .cta-secondary:hover {
      background: #facc15;
      color: #0f0f0f;
    }

    /* Ensure nav spans full width */
    nav {
      width: 100vw; /* Full viewport width */
    }
  </style>
</head>
<body>
  <!-- LOGIN PAGE -->
  <section id="login-page">
    <div id="particles-js"></div>
    <div class="login-container max-w-md mx-auto px-4 text-center">
      <h1 class="text-5xl font-extrabold text-yellow-400 mb-8">Zentrix Login</h1>
      <div class="bg-gray-900 p-8 rounded-lg shadow-2xl">
        <form id="login-form" class="space-y-6">
          <input type="email" id="email" placeholder="Enter your email" class="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400" required>
          <input type="password" id="password" placeholder="Enter any password" class="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400">
          <button type="submit" class="w-full px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg cta-button">Login</button>
        </form>
      </div>
    </div>
  </section>

  <!-- MAIN PAGE -->
  <div id="main-content">
    <nav class="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-3xl font-extrabold text-yellow-400">Zentrix</div>
        <div class="space-x-6">
          <a href="#home" class="text-gray-300 hover:text-yellow-400">Home</a>
          <a href="#about" class="text-gray-300 hover:text-yellow-400">About</a>
          <a href="#features" class="text-gray-300 hover:text-yellow-400">Features</a>
          <a href="#services" class="text-gray-300 hover:text-yellow-400">Services</a>
          <a href="#pricing" class="text-gray-300 hover:text-yellow-400">Pricing</a>
          <a href="#contact" class="text-gray-300 hover:text-yellow-400">Contact</a>
        </div>
      </div>
    </nav>

    <section id="home" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-center">
      <div id="home-particles"></div>
      <div class="hero-content max-w-4xl mx-auto px-4">
        <h1 class="text-7xl font-extrabold text-yellow-400 mb-6" id="hero-title">Welcome to Zentrix</h1>
        <p class="hero-subtitle">Empowering innovation with cutting-edge technology solutions.</p>
        <p class="text-xl text-gray-300 mb-10"><span id="typed-text"></span></p>
        <a href="#services" class="cta-button px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg">Explore Services</a>
        <a href="#contact" class="cta-button cta-secondary px-8 py-4 font-semibold rounded-lg">Get in Touch</a>
      </div>
    </section>

    <section id="about" class="py-20 bg-gray-800 text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-12">About Us</h2>
      <div class="max-w-4xl mx-auto px-4 text-gray-300 text-lg">
        <p class="mb-6">Zentrix is a leading provider of innovative technology solutions, dedicated to helping businesses thrive in the digital age.</p>
        <p class="mb-6">Our team of experts combines cutting-edge technology with creative thinking to deliver exceptional results.</p>
        <p>Join us on our journey to unleash the future of innovation. THE "CEO" OF ZENTRIX MR RIHAN ATIK (BIHAR) INDIA, CONTACT NO-62068821XX EMAIL-RIHANATIK13@GMAIL.COM </p>
      </div>
    </section>

    <section id="features" class="py-20 bg-gray-800 text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-12">Our Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="feature-card p-8 rounded-lg"><h3 class="text-2xl mb-4">Innovative Tech</h3><p>Cutting-edge solutions for tomorrow.</p></div>
        <div class="feature-card p-8 rounded-lg"><h3 class="text-2xl mb-4">User Focused</h3><p>Designs that truly understand users.</p></div>
        <div class="feature-card p-8 rounded-lg"><h3 class="text-2xl mb-4">Secure & Reliable</h3><p>Built for trust and scalability.</p></div>
      </div>
    </section>

    <section id="services" class="py-20 text-center bg-gray-900">
      <h2 class="text-4xl font-bold text-yellow-400 mb-12">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 1</h3>
          <p class="mb-6 text-gray-300">ALL ASSIGNMENTS PRACTICAL/LAB.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 2</h3>
          <p class="mb-6 text-gray-300">High-quality web solutions built to scale.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 3</h3>
          <p class="mb-6 text-gray-300">Empower your business with modern cloud tech.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 4</h3>
          <p class="mb-6 text-gray-300">Custom mobile apps for iOS and Android.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 5</h3>
          <p class="mb-6 text-gray-300">Leverage AI to enhance your business processes.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 6</h3>
          <p class="mb-6 text-gray-300">Protect your digital assets with top-tier security.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 7</h3>
          <p class="mb-6 text-gray-300">Unlock insights with advanced data analytics.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 8</h3>
          <p class="mb-6 text-gray-300">Craft intuitive and engaging user interfaces.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">SER 9</h3>
          <p class="mb-6 text-gray-300">Strategic IT solutions for your business growth.</p>
          <a href="#" class="pdf-download">Download Brochure</a>
        </div>
      </div>
    </section>

    <section id="pricing" class="py-20 bg-gray-800 text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-12">Pricing Plans</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">Basic</h3>
          <p class="mb-6 text-gray-300">$99/month - Essential features for startups.</p>
          <a href="#contact" class="pdf-download">Get Started</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">Pro</h3>
          <p class="mb-6 text-gray-300">$299/month - Advanced tools for growing businesses.</p>
          <a href="#contact" class="pdf-download">Get Started</a>
        </div>
        <div class="service-option">
          <h3 class="text-2xl mb-4 text-yellow-400">Enterprise</h3>
          <p class="mb-6 text-gray-300">Custom - Tailored solutions for large enterprises.</p>
          <a href="#contact" class="pdf-download">Contact Us</a>
        </div>
      </div>
    </section>

    <section id="contact" class="py-20 bg-gray-800 text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-12">Contact Us</h2>
      <form class="max-w-md mx-auto space-y-6">
        <input type="text" placeholder="Your Name" class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white">
        <input type="email" placeholder="Your Email" class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white">
        <textarea placeholder="Your Message" class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white h-32"></textarea>
        <button type="submit" class="w-full px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg cta-button">Send</button>
      </form>
    </section>
  </div>

  <!-- DOWNLOADS PAGE -->
  <section id="downloads-page">
    <div id="downloads-particles"></div>
    <div class="download-container">
      <h1 class="text-5xl font-extrabold text-yellow-400 mb-4">Assignments Download Here</h1>
      <p class="text-gray-300 text-lg mb-6">Click below to download your latest assignments.</p>
      <a href="BCA_lab.pdf" download class="download-btn" id="download-btn">📥 Download Now</a><br>
      <a href="#" id="back-home" class="text-yellow-400 underline hover:text-yellow-300">← Back to Home</a>
    </div>
  </section>

  <div id="download-success">✅ Download Started...</div>

  <!-- SCRIPT -->
  <script>
    gsap.registerPlugin(ScrollTrigger);

    // Initialize particles for login page
    particlesJS("particles-js", {
      particles: {
        number: { value: 100 },
        color: { value: "#facc15" },
        size: { value: 3 },
        move: { enable: true, speed: 2 },
        line_linked: { enable: true, color: "#facc15" }
      }
    });

    // Initialize Typed.js for hero section
    new Typed('#typed-text', {
      strings: ['Your journey to innovation starts here.', 'Discover next-gen AI solutions.', 'Unleash the future with Zentrix.', 'Premium tech for elite performance.'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    // Login page animation
    window.onload = () => {
      gsap.to(".login-container", { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" });
    };

    // Login form submission
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let email = document.getElementById("email").value.trim();
      let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!regex.test(email)) return alert("Please enter a valid email address!");
      gsap.to("#login-page", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          document.getElementById("login-page").style.display = "none";
          document.getElementById("main-content").classList.add("active");
          gsap.fromTo("#main-content", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" });
          initHomeAnimations();
          gsap.to(".feature-card, .service-option", { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power4.out" });
        }
      });
    });

    // Home page animations
    function initHomeAnimations() {
      particlesJS("home-particles", {
        particles: {
          number: { value: 80 },
          color: { value: "#facc15" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          move: { enable: true, speed: 1.5, direction: "none", random: true },
          line_linked: { enable: true, color: "#facc15", opacity: 0.3 }
        }
      });

      gsap.from("#hero-title", { duration: 1.8, y: -120, opacity: 0, ease: "elastic.out(1, 0.5)" });
      gsap.from(".hero-subtitle", { duration: 1.5, delay: 0.3, opacity: 0, x: -60, ease: "power4.out" });
      gsap.from("#typed-text", { duration: 1.2, delay: 0.8, opacity: 0, scale: 0.9, ease: "power4.out" });
      gsap.from(".cta-button", { duration: 1.5, delay: 1.2, opacity: 0, y: 60, stagger: 0.3, ease: "back.out(1.5)" });

      // Scroll animations for sections
      const sections = ["#about", "#features", "#services", "#pricing", "#contact"];
      sections.forEach(section => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Parallax effect for particles
      gsap.to("#home-particles", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          scrub: 1
        }
      });
    }

    // PDF download buttons
    document.querySelectorAll(".pdf-download").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("main-content").style.display = "none";
        document.getElementById("downloads-page").classList.add("active");
        gsap.from(".download-container", { opacity: 0, y: 50, duration: 1.2, ease: "power4.out" });
        particlesJS("downloads-particles", {
          particles: {
            number: { value: 150 },
            color: { value: ["#facc15", "#ffffff"] },
            shape: { type: "circle" },
            size: { value: 2 },
            move: { enable: true, speed: 3 },
            line_linked: { enable: true, color: "#facc15" }
          }
        });
      });
    });

    // Download button with confetti animation
    document.getElementById("download-btn").addEventListener("click", () => {
      const msg = document.getElementById("download-success");
      msg.style.display = "block";
      gsap.fromTo(msg, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" });
      setTimeout(() => gsap.to(msg, { opacity: 0, duration: 1.2, ease: "power4.in", onComplete: () => msg.style.display = "none" }), 2000);

      // Confetti animation
      const duration = 2 * 1000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    });

    // Back to home button
    document.getElementById("back-home").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("downloads-page").classList.remove("active");
      document.getElementById("main-content").style.display = "block";
      gsap.from("#main-content", { opacity: 0, duration: 1.2, ease: "power4.out" });
    });
  </script>
</body>
</html>
