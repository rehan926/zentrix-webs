import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";
import TypedText from "@/components/TypedText";
import Navigation from "@/components/Navigation";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [email, setEmail] = useState("");
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      // Animate sections on login
      gsap.from(heroRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power4.out",
      });

      // Scroll-triggered animations
      const sections = [aboutRef, featuresRef, servicesRef, pricingRef];
      sections.forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Animate feature cards
      gsap.utils.toArray(".feature-card").forEach((card: any) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      // Animate service cards
      gsap.utils.toArray(".service-card").forEach((card: any, index: number) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    
    gsap.to(".login-container", {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        setIsLoggedIn(true);
        toast.success("Welcome to Zentrix!");
      },
    });
  };

  const handleDownload = () => {
    toast.success("Download started...");
    
    // Confetti animation
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#facc15", "#eab308", "#fef3c7"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#facc15", "#eab308", "#fef3c7"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <ParticlesBackground id="login-particles" particleCount={100} />
        
        <div className="login-container w-full max-w-md mx-auto px-4 z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-8 text-center glow-text">
            Zentrix Login
          </h1>
          <Card className="glass-effect p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-secondary/50 border-border focus:border-primary transition-all"
                required
              />
              <Input
                type="password"
                placeholder="Enter any password"
                className="bg-secondary/50 border-border focus:border-primary transition-all"
              />
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg py-6 animate-glow-pulse"
              >
                Login
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  if (showDownloads) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden text-center px-4">
        <ParticlesBackground id="downloads-particles" particleCount={150} />
        
        <div className="z-10 animate-float">
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4 glow-text">
            Assignments Download Here
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            Click below to download your latest assignments.
          </p>
          <Button
            onClick={handleDownload}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-12 py-6 mb-8 animate-glow-pulse"
          >
            📥 Download Now
          </Button>
          <br />
          <Button
            onClick={() => setShowDownloads(false)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const features = [
    {
      title: "Innovative Tech",
      description: "Cutting-edge solutions for tomorrow.",
    },
    {
      title: "User Focused",
      description: "Designs that truly understand users.",
    },
    {
      title: "Secure & Reliable",
      description: "Built for trust and scalability.",
    },
  ];

  const services = [
    { title: "SER 1", description: "ALL ASSIGNMENTS PRACTICAL/LAB." },
    { title: "SER 2", description: "High-quality web solutions built to scale." },
    { title: "SER 3", description: "Empower your business with modern cloud tech." },
    { title: "SER 4", description: "Custom mobile apps for iOS and Android." },
    { title: "SER 5", description: "Leverage AI to enhance your business processes." },
    { title: "SER 6", description: "Protect your digital assets with top-tier security." },
    { title: "SER 7", description: "Unlock insights with advanced data analytics." },
    { title: "SER 8", description: "Craft intuitive and engaging user interfaces." },
    { title: "SER 9", description: "Strategic IT solutions for your business growth." },
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: "$99/month",
      description: "Essential features for startups.",
    },
    {
      title: "Pro",
      price: "$299/month",
      description: "Advanced tools for growing businesses.",
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large enterprises.",
    },
  ];

  return (
    <div className="w-full">
      <Navigation />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <ParticlesBackground id="home-particles" particleCount={80} />
        
        <div className="max-w-5xl mx-auto px-4 text-center z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-6 glow-text animate-fade-in">
            Welcome to Zentrix
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in-up">
            Empowering innovation with cutting-edge technology solutions.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 h-8 animate-fade-in-up">
            <TypedText
              strings={[
                "Your journey to innovation starts here.",
                "Discover next-gen AI solutions.",
                "Unleash the future with Zentrix.",
                "Premium tech for elite performance.",
              ]}
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6 hover-lift"
            >
              Explore Services
            </Button>
            <Button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6 hover-lift"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 md:py-32 bg-card/30 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 glow-text">
            About Us
          </h2>
          <div className="text-muted-foreground text-lg md:text-xl space-y-6">
            <p>
              Zentrix is a leading provider of innovative technology solutions,
              dedicated to helping businesses thrive in the digital age.
            </p>
            <p>
              Our team of experts combines cutting-edge technology with creative
              thinking to deliver exceptional results.
            </p>
            <p className="text-foreground/90 font-medium">
              Join us on our journey to unleash the future of innovation. THE "CEO" OF
              ZENTRIX MR RIHAN ATIK (BIHAR) INDIA, CONTACT NO-62068821XX
              EMAIL-RIHANATIK13@GMAIL.COM
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-20 md:py-32 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 glow-text">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card glass-effect p-8 hover-lift border-primary/30"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-lg">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="py-20 md:py-32 bg-card/30 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 glow-text">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card glass-effect p-6 hover-lift"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Button
                onClick={() => setShowDownloads(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                Download Brochure
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-20 md:py-32 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 glow-text">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="glass-effect p-8 hover-lift border-primary/30"
            >
              <h3 className="text-3xl font-bold text-primary mb-4">{plan.title}</h3>
              <p className="text-4xl font-extrabold text-foreground mb-4">
                {plan.price}
              </p>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold w-full"
              >
                {plan.price === "Custom" ? "Contact Us" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-card/30 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 glow-text">
          Contact Us
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent successfully! We'll get back to you soon.");
          }}
          className="max-w-md mx-auto px-4 space-y-6"
        >
          <Input
            type="text"
            placeholder="Your Name"
            className="bg-secondary/50 border-border focus:border-primary transition-all"
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            className="bg-secondary/50 border-border focus:border-primary transition-all"
            required
          />
          <Textarea
            placeholder="Your Message"
            className="bg-secondary/50 border-border focus:border-primary transition-all h-32"
            required
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg py-6 hover-lift"
          >
            Send Message
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Index;
