import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ── Utility ──────────────────────────────────────────────────────────────────
const cn = (...cls) => cls.filter(Boolean).join(" ");

// ── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Services", "Portfolio", "Technologies", "Contact"];

const STATS = [
  { value: "350+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "40+", label: "Tech Experts" },
];

const SERVICES = [
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    desc: "Custom AI models, NLP systems, and intelligent automation that evolve with your business needs.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-cyan-400/60",
    glow: "hover:shadow-cyan-500/20",
  },
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Blazing-fast, pixel-perfect web applications built with modern frameworks and serverless architecture.",
    color: "from-violet-500/20 to-purple-500/20",
    border: "hover:border-violet-400/60",
    glow: "hover:shadow-violet-500/20",
  },
  {
    icon: "📱",
    title: "Mobile Engineering",
    desc: "Cross-platform iOS & Android apps with native performance and stunning UX that users love.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "hover:border-pink-400/60",
    glow: "hover:shadow-pink-500/20",
  },
  {
    icon: "☁️",
    title: "Cloud Infrastructure",
    desc: "Scalable, secure cloud architectures on AWS, GCP, and Azure with DevOps pipelines built-in.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "hover:border-emerald-400/60",
    glow: "hover:shadow-emerald-500/20",
  },
  {
    icon: "🔐",
    title: "Cybersecurity",
    desc: "Enterprise-grade security audits, penetration testing, and zero-trust architecture design.",
    color: "from-amber-500/20 to-orange-500/20",
    border: "hover:border-amber-400/60",
    glow: "hover:shadow-amber-500/20",
  },
  {
    icon: "📊",
    title: "Data Analytics",
    desc: "Real-time dashboards, BI integrations, and predictive analytics that turn raw data into revenue.",
    color: "from-indigo-500/20 to-blue-500/20",
    border: "hover:border-indigo-400/60",
    glow: "hover:shadow-indigo-500/20",
  },
];

const WHY_US = [
  { icon: "⚡", title: "Lightning Fast Delivery", desc: "Agile sprints and CI/CD pipelines ensure your product ships weeks ahead of competitors." },
  { icon: "🎯", title: "Precision Engineering", desc: "Every line of code is reviewed, tested, and optimized for performance at scale." },
  { icon: "🔄", title: "Continuous Innovation", desc: "We stay ahead of the curve — R&D is baked into every engagement." },
  { icon: "🤝", title: "Dedicated Partnership", desc: "A named team, weekly syncs, and 24/7 Slack access. You're never in the dark." },
];

const PORTFOLIO = [
  { tag: "AI Platform", title: "NeuralDesk", desc: "Enterprise knowledge management powered by GPT-4 fine-tuning", color: "from-cyan-900/60 to-blue-900/60", accent: "#22d3ee" },
  { tag: "FinTech", title: "PayStream", desc: "Real-time global payment orchestration for 50M+ transactions/mo", color: "from-violet-900/60 to-purple-900/60", accent: "#a78bfa" },
  { tag: "HealthTech", title: "MediScan AI", desc: "FDA-cleared diagnostic imaging AI with 97.4% accuracy", color: "from-pink-900/60 to-rose-900/60", accent: "#f472b6" },
  { tag: "SaaS", title: "FlowBase", desc: "No-code workflow builder processing 200M+ automations daily", color: "from-emerald-900/60 to-teal-900/60", accent: "#34d399" },
];

const TECHS = [
  "React", "Next.js", "TypeScript", "Python", "TensorFlow", "PyTorch",
  "Kubernetes", "Docker", "AWS", "GCP", "PostgreSQL", "Redis",
  "GraphQL", "Rust", "Go", "Solidity",
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, NovaTech Inc.",
    avatar: "SC",
    text: "AuraTech Solutions rebuilt our entire data pipeline in 8 weeks. Performance improved 10x. Genuinely world-class engineers.",
    stars: 5,
  },
  {
    name: "Marcus Okafor",
    role: "Founder, AeroFlow",
    avatar: "MO",
    text: "The AI they built for us processes 500k predictions daily with sub-20ms latency. Unbelievable work.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "VP Engineering, Luminary",
    avatar: "PS",
    text: "Three agencies failed before AuraTech Solutions. They delivered in 6 weeks what others couldn't in 6 months.",
    stars: 5,
  },
];

// ── Animated Background Grid ──────────────────────────────────────────────────
function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7dd3fc" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Radial glow top-left */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]" />
      {/* Radial glow center-right */}
      <div className="absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      {/* Radial glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-600/8 blur-[100px]" />
    </div>
  );
}

// ── Floating Particles ────────────────────────────────────────────────────────
function Particles() {
  const dots = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    color: ["#38bdf8", "#818cf8", "#a78bfa", "#34d399"][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#020817]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-white font-black text-sm">AT</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Tech</span>
          </span>
        </div>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">
            Sign In
          </a>
          <a
            href="#contact"
            className="relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #7c3aed)" }}
          >
            <span className="relative z-10">Get Started →</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn("block h-0.5 bg-white transition-all", menuOpen && "rotate-45 translate-y-2")} />
            <span className={cn("block h-0.5 bg-white transition-all", menuOpen && "opacity-0")} />
            <span className={cn("block h-0.5 bg-white transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020817]/95 backdrop-blur-xl border-t border-white/5 px-6 pb-6"
          >
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block py-3 text-slate-300 hover:text-white border-b border-white/5 text-sm" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <a href="#contact" className="mt-4 block text-center py-3 rounded-xl font-semibold text-white" style={{ background: "linear-gradient(135deg,#0ea5e9,#7c3aed)" }}>
              Get Started →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">Now accepting projects for Q3 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">Transforming</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                Ideas Into
              </span>
              <br />
              <span className="text-white">Digital Reality</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-xl mb-10 font-light"
            >
              We engineer AI-powered products, scalable platforms, and breakthrough experiences for startups and enterprises redefining their industries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#contact"
                className="group relative px-8 py-4 rounded-2xl font-bold text-white text-base overflow-hidden shadow-2xl shadow-blue-500/30"
                style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#6d28d9 100%)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-2xl font-bold text-slate-300 text-base border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-sm"
              >
                View Projects
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-4 text-center hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-1">{s.value}</div>
                  <div className="text-slate-500 text-xs font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Futuristic visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const orbitIcons = [
    { icon: "🤖", label: "AI", angle: 0, radius: 160, dur: 14 },
    { icon: "🌐", label: "Web", angle: 90, radius: 160, dur: 14 },
    { icon: "📱", label: "Mobile", angle: 180, radius: 160, dur: 14 },
    { icon: "☁️", label: "Cloud", angle: 270, radius: 160, dur: 14 },
  ];

  return (
    <div className="relative w-[480px] h-[480px] flex items-center justify-center">
      {/* Outer orbit ring */}
      <div className="absolute w-80 h-80 rounded-full border border-white/5" />
      <div className="absolute w-[340px] h-[340px] rounded-full border border-cyan-500/10 animate-spin" style={{ animationDuration: "30s" }} />

      {/* Orbiting icons */}
      {orbitIcons.map((item) => (
        <motion.div
          key={item.label}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: item.dur, repeat: Infinity, ease: "linear" }}
          style={{ width: item.radius * 2, height: item.radius * 2, borderRadius: "50%" }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: item.dur, repeat: Infinity, ease: "linear" }}
            style={{ marginTop: 0 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0f172a] border border-white/10 flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform backdrop-blur-xl">
              {item.icon}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Central dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative w-56 h-44 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] backdrop-blur-xl overflow-hidden shadow-2xl"
        style={{ boxShadow: "0 0 80px rgba(99,102,241,0.3), 0 0 40px rgba(34,211,238,0.15)" }}
      >
        {/* Fake dashboard UI */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="h-2 w-20 rounded bg-white/10" />
          </div>
          {/* Mini chart bars */}
          <div className="flex items-end gap-1 h-14 mb-3">
            {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: `linear-gradient(to top, #0ea5e9, #6d28d9)` }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.8 + i * 0.06, duration: 0.6 }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 rounded bg-violet-500/40" />
            <div className="flex-1 h-2 rounded bg-cyan-500/30" />
          </div>
        </div>
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating info cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute -left-8 top-16 rounded-2xl border border-white/8 bg-[#0f172a]/90 backdrop-blur-xl px-4 py-3 shadow-xl"
      >
        <div className="text-xs text-slate-400 mb-1">Revenue Growth</div>
        <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">+284%</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute -right-6 bottom-20 rounded-2xl border border-white/8 bg-[#0f172a]/90 backdrop-blur-xl px-4 py-3 shadow-xl"
      >
        <div className="text-xs text-slate-400 mb-1">Uptime SLA</div>
        <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">99.99%</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-xl px-4 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-xs text-emerald-400 font-semibold">All Systems Operational</div>
        </div>
      </motion.div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 mb-6">
              <span className="text-violet-400 text-sm font-medium">About AuraTech</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              We Don't Just Build —<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">We Engineer the Future</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Founded in 2013, AuraTech Technology is a full-stack digital innovation studio working with Fortune 500s and Series A startups alike. Our engineers, designers, and AI researchers collaborate to create products that define markets.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              We've shipped products used by 50M+ users, processed $2B+ in transactions through systems we built, and launched 3 unicorns. Our obsession is craftsmanship — every detail, every millisecond, every interaction.
            </p>
            <div className="flex gap-4">
              <a href="#services" className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">
                Our Services →
              </a>
            </div>
          </motion.div>

          {/* Right — value props */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-white font-bold text-sm mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="relative py-32">
      {/* Section glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 mb-6">
            <span className="text-blue-400 text-sm font-medium">What We Build</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-5">
            Services That <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Scale</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            End-to-end technology services from ideation to global deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={cn(
                "relative rounded-3xl border border-white/8 bg-gradient-to-br p-8 overflow-hidden cursor-default transition-all duration-300",
                svc.color,
                svc.border,
                `hover:shadow-2xl ${svc.glow}`
              )}
            >
              {/* Glowing corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 bg-white" />

              <div className="text-4xl mb-5">{svc.icon}</div>
              <h3 className="text-white font-bold text-xl mb-3">{svc.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-white transition-colors cursor-pointer group">
                Learn more
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────────────
function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 mb-5">
              <span className="text-pink-400 text-sm font-medium">Case Studies</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white">
              Products That <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">Shipped</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm">Real products, real impact. See what we've built for the world's most ambitious teams.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PORTFOLIO.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={cn("rounded-3xl border border-white/8 bg-gradient-to-br overflow-hidden group cursor-pointer", item.color)}
              style={{ minHeight: 220 }}
            >
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-slate-400 mb-5 inline-block">
                    {item.tag}
                  </span>
                  <h3 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all"
                    style={{ color: "white" }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 font-semibold text-sm transition-colors" style={{ color: item.accent }}>
                  View Case Study →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Technologies ──────────────────────────────────────────────────────────────
function Technologies() {
  return (
    <section id="technologies" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
            Built With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Best-in-Class</span> Tech
          </h2>
          <p className="text-slate-500">The tools we trust to ship world-class products.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {TECHS.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-3 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm text-slate-300 text-sm font-semibold hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/8 transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 mb-6">
            <span className="text-amber-400 text-sm font-medium">Client Love</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white">
            Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Builders</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm p-8 hover:border-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/10 transition-all"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-8 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-xs font-black">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="relative py-32">
      {/* Glow blob */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
            <span className="text-cyan-400 text-sm font-medium">Start a Project</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-5">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Together</span>
          </h2>
          <p className="text-slate-400 text-lg">Ready to turn your vision into a product? Tell us about it.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-xl p-10"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-slate-400 text-sm mb-2 font-medium">Your Name</label>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white px-5 py-4 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2 font-medium">Work Email</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white px-5 py-4 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                placeholder="john@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-slate-400 text-sm mb-2 font-medium">Tell Us About Your Project</label>
            <textarea
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-white/5 text-white px-5 py-4 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all resize-none"
              placeholder="Describe your vision, timeline, and budget..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90 active:scale-98 relative overflow-hidden group"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#6d28d9)" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">AT</span>
              </div>
              <span className="text-white font-bold text-lg">
                Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Tech</span> Technology
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Engineering the future of digital products. From AI to mobile — we build what matters.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-5">Company</h4>
            {["About", "Services", "Portfolio", "Careers", "Blog"].map((l) => (
              <a key={l} href="#" className="block text-slate-500 text-sm mb-3 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-5">Connect</h4>
            {["LinkedIn", "Twitter/X", "GitHub", "Dribbble"].map((l) => (
              <a key={l} href="#" className="block text-slate-500 text-sm mb-3 hover:text-cyan-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2026 AuraTech Technology. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Crafted with precision. Built for scale.</p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "#020817",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      <BackgroundGrid />
      <Particles />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Technologies />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
