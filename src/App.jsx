import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, MapPin, Clock, ChevronDown, ChevronRight, Star, Shield, Heart, Users, Award, Sparkles, Menu, X, CheckCircle, ArrowRight, Mail, Calendar, MessageCircle, Stethoscope, Eye, Smile, Baby, Scissors, Crown, Zap, MoveRight } from "lucide-react";

// ─── Color Palette ───
const colors = {
  primary: "#0A6E5C",
  primaryDark: "#085446",
  primaryLight: "#0D8A72",
  accent: "#C8A45C",
  accentLight: "#D4B876",
  cream: "#FAF8F4",
  warmWhite: "#FFFDF9",
  dark: "#1A1A2E",
  darkGray: "#2D3436",
  midGray: "#636E72",
  lightGray: "#DFE6E9",
  success: "#00B894",
  whatsapp: "#25D366",
};

// ─── Scroll Animation Hook ───
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

// ─── Animated Counter ───
function Counter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal(0.3);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Tooth SVG Icon ───
const ToothIcon = ({ size = 24, color = colors.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C9.5 2 7 3.5 6 6C5 8.5 5.5 11 6 13C6.5 15 7 18 8 20C8.5 21 9.5 22 10 22C11 22 11 20 12 20C13 20 13 22 14 22C14.5 22 15.5 21 16 20C17 18 17.5 15 18 13C18.5 11 19 8.5 18 6C17 3.5 14.5 2 12 2Z" />
  </svg>
);

// ─── Dental Service Icons ───
const serviceIcons = {
  checkup: Stethoscope,
  cosmetic: Sparkles,
  orthodontic: Smile,
  surgery: Scissors,
  pediatric: Baby,
  crown: Crown,
  rootcanal: Zap,
  implant: Shield,
  whitening: Eye,
};

// ─── Services Data ───
const services = [
  { key: "checkup", title: "Checkup & Diagnosis", desc: "Comprehensive oral examination with digital X-rays and personalized treatment planning for optimal dental health.", color: "#0A6E5C" },
  { key: "cosmetic", title: "Cosmetic Dentistry", desc: "Transform your smile with veneers, bonding, and aesthetic treatments designed to give you the confidence you deserve.", color: "#C8A45C" },
  { key: "orthodontic", title: "Orthodontic Treatment", desc: "Straighten your teeth with modern braces and clear aligners for a perfectly aligned, beautiful smile.", color: "#2D8B75" },
  { key: "rootcanal", title: "Root Canal Treatment", desc: "Advanced endodontic care to save damaged teeth with precision techniques and minimal discomfort.", color: "#8B6914" },
  { key: "crown", title: "Crowns & Bridges", desc: "Restore damaged or missing teeth with premium quality crowns and bridges that look and feel natural.", color: "#0D8A72" },
  { key: "implant", title: "Dental Implants", desc: "Permanent tooth replacement with state-of-the-art titanium implants for a lifetime of confident smiles.", color: "#085446" },
  { key: "surgery", title: "Oral Surgery", desc: "Expert surgical procedures including wisdom tooth removal and complex extractions with utmost care.", color: "#6B5B3A" },
  { key: "pediatric", title: "Pediatric Dentistry", desc: "Gentle, friendly dental care for children in a comfortable environment that makes every visit fun.", color: "#0A6E5C" },
  { key: "whitening", title: "Teeth Whitening", desc: "Professional whitening treatments to remove stains and brighten your smile by several shades safely.", color: "#C8A45C" },
];

// ─── Team Data ───
const team = [
  { name: "Dr. Sharma", role: "Chief Dental Surgeon", qualification: "BDS, MDS (Prosthodontics)", exp: "18+ Years Experience", color: "#0A6E5C" },
  { name: "Dr. Adhikari", role: "Orthodontist", qualification: "BDS, MDS (Orthodontics)", exp: "12+ Years Experience", color: "#C8A45C" },
  { name: "Dr. Maharjan", role: "Endodontist", qualification: "BDS, MDS (Endodontics)", exp: "10+ Years Experience", color: "#2D8B75" },
  { name: "Dr. Thapa", role: "Oral Surgeon", qualification: "BDS, MDS (Oral Surgery)", exp: "15+ Years Experience", color: "#8B6914" },
];

// ─── Testimonials ───
const testimonials = [
  { name: "Sita Devi K.", text: "I was terrified of dentists my whole life. The team here changed everything. They were so gentle and patient with me. My new dentures look absolutely natural!", rating: 5, treatment: "Complete Dentures" },
  { name: "Rajesh M.", text: "After years of hiding my smile, I finally got the confidence to laugh freely. The orthodontic treatment was worth every penny. Best dental clinic in Baneshwor!", rating: 5, treatment: "Orthodontic Braces" },
  { name: "Anita S.", text: "Brought my 6-year-old daughter here and she actually enjoyed the visit! The pediatric dentist was amazing with kids. We found our family dentist.", rating: 5, treatment: "Pediatric Care" },
  { name: "Bikram T.", text: "The root canal procedure was completely painless. I couldn't believe it. The doctor explained every step and made sure I was comfortable throughout.", rating: 5, treatment: "Root Canal" },
  { name: "Priya G.", text: "Got dental implants done here and the results are incredible. The team's expertise and the clinic's hygiene standards are truly world-class.", rating: 5, treatment: "Dental Implants" },
];

// ─── FAQ Data ───
const faqs = [
  { q: "What are your opening hours?", a: "We are open Sunday through Friday, 10:00 AM to 7:00 PM. Saturday consultations are available by appointment only. We also accommodate emergency cases outside regular hours." },
  { q: "Do you accept walk-in patients?", a: "Yes, we welcome walk-in patients! However, we recommend booking an appointment to minimize your waiting time and ensure you get dedicated attention from our specialists." },
  { q: "Is the first consultation free?", a: "We offer a complimentary initial consultation that includes a basic oral examination and treatment recommendations. X-rays and detailed diagnostics are charged separately at affordable rates." },
  { q: "What payment methods do you accept?", a: "We accept cash, bank transfers, eSewa, Khalti, and all major debit/credit cards. We also offer flexible payment plans for extensive treatments like implants and orthodontic procedures." },
  { q: "How do I book an appointment?", a: "You can book an appointment by calling us at 984-1337575, messaging us on WhatsApp, visiting our Facebook page, or using the appointment form on this website. We'll confirm your slot within an hour." },
];

// ─── Main Component ───
export default function DentalCareCenterWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", date: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Doctors", id: "team" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const isScrolled = scrollY > 80;

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: colors.darkGray, background: colors.warmWhite, overflowX: "hidden" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-3deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.05); opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 300px; } }
        @keyframes grain { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-5%,-10%); } 30% { transform: translate(3%,-15%); } 50% { transform: translate(12%,9%); } 70% { transform: translate(9%,4%); } 90% { transform: translate(-1%,7%); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes borderGlow { 0%, 100% { border-color: ${colors.accent}33; } 50% { border-color: ${colors.accent}88; } }
        @keyframes whatsappPulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); } 70% { box-shadow: 0 0 0 20px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }

        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-50px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(50px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }
        
        .service-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(10,110,92,0.15); }
        
        .team-card { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .team-card:hover { transform: translateY(-12px); }
        .team-card:hover .team-overlay { opacity: 1; }
        
        .nav-link { position: relative; transition: color 0.3s; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: ${colors.accent}; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: ${colors.accent}; }
        
        .btn-primary { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); position: relative; overflow: hidden; }
        .btn-primary::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; background: rgba(255,255,255,0.15); border-radius: 50%; transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s; }
        .btn-primary:hover::before { width: 300px; height: 300px; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(10,110,92,0.3); }
        
        .btn-accent { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .btn-accent:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(200,164,92,0.3); }
        
        .faq-item { transition: all 0.3s; }
        .faq-item:hover { background: ${colors.cream}; }
        
        .whatsapp-btn { animation: whatsappPulse 2s infinite; }
        .whatsapp-btn:hover { transform: scale(1.1); }

        .gold-line { background: linear-gradient(90deg, transparent, ${colors.accent}, transparent); }
        
        .grain-overlay { position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; pointer-events: none; opacity: 0.03; z-index: 9998; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); animation: grain 8s steps(10) infinite; }

        input, select, textarea { transition: border-color 0.3s, box-shadow 0.3s; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: ${colors.primary} !important; box-shadow: 0 0 0 3px ${colors.primary}22; }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .section-title { font-size: 2rem !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .hero-buttons { flex-direction: column; align-items: stretch !important; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: isScrolled ? "12px 0" : "20px 0",
        background: isScrolled ? "rgba(255,253,249,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        borderBottom: isScrolled ? `1px solid ${colors.lightGray}` : "1px solid transparent",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
              display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 15px ${colors.primary}33`,
            }}>
              <ToothIcon size={24} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: isScrolled ? colors.dark : "#fff", lineHeight: 1.1, transition: "color 0.4s" }}>Dental Care</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: isScrolled ? colors.accent : colors.accentLight, transition: "color 0.4s" }}>CENTER PVT. LTD.</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {navLinks.map(link => (
              <span key={link.id} className="nav-link" onClick={() => scrollTo(link.id)}
                style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, color: isScrolled ? colors.darkGray : "rgba(255,255,255,0.9)", letterSpacing: 0.5, transition: "color 0.4s" }}>
                {link.label}
              </span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("appointment")}
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`, color: "#fff",
                border: "none", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                cursor: "pointer", letterSpacing: 0.5,
              }}>
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenu(!mobileMenu)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: isScrolled ? colors.dark : "#fff", padding: 8 }}
            className="mobile-menu-btn">
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(255,253,249,0.98)", backdropFilter: "blur(20px)",
            padding: "20px 24px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.3s ease",
          }}>
            {navLinks.map(link => (
              <div key={link.id} onClick={() => scrollTo(link.id)}
                style={{ padding: "14px 0", fontSize: 16, fontWeight: 500, color: colors.darkGray, cursor: "pointer", borderBottom: `1px solid ${colors.lightGray}` }}>
                {link.label}
              </div>
            ))}
            <button className="btn-primary" onClick={() => { scrollTo("appointment"); setMobileMenu(false); }}
              style={{
                width: "100%", marginTop: 16, background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                color: "#fff", border: "none", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}>
              Book Appointment
            </button>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section id="hero" style={{
        minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
        background: `linear-gradient(135deg, ${colors.dark} 0%, #16213E 50%, ${colors.primaryDark} 100%)`,
        overflow: "hidden",
      }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}15, transparent 70%)`, animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "8%", width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, ${colors.accent}10, transparent 70%)`, animation: "float2 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 3, height: 3, background: colors.accent, borderRadius: "50%", boxShadow: `0 0 20px ${colors.accent}66`, animation: "pulse 3s infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "20%", width: 4, height: 4, background: colors.accentLight, borderRadius: "50%", boxShadow: `0 0 15px ${colors.accentLight}66`, animation: "pulse 4s infinite 1s" }} />
        <div style={{ position: "absolute", bottom: "30%", right: "35%", width: 2, height: 2, background: "#fff", borderRadius: "50%", boxShadow: "0 0 10px rgba(255,255,255,0.3)", animation: "pulse 5s infinite 2s" }} />
        
        {/* Hero pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `radial-gradient(${colors.accent} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
              background: "rgba(255,255,255,0.08)", borderRadius: 100, marginBottom: 28,
              border: "1px solid rgba(255,255,255,0.1)", animation: "fadeInUp 0.8s ease",
              backdropFilter: "blur(10px)",
            }}>
              <MapPin size={14} color={colors.accent} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500, letterSpacing: 1 }}>NEW BANESHWOR, KATHMANDU</span>
            </div>

            {/* Main heading */}
            <h1 className="hero-title" style={{
              fontFamily: "'Playfair Display', serif", fontSize: "4rem", fontWeight: 700,
              color: "#fff", lineHeight: 1.1, marginBottom: 8, animation: "fadeInUp 0.8s ease 0.1s both",
            }}>
              Your Smile,{" "}
              <span style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Our Passion
              </span>
            </h1>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 400,
              color: "rgba(255,255,255,0.6)", lineHeight: 1.3, marginBottom: 28,
              fontStyle: "italic", animation: "fadeInUp 0.8s ease 0.2s both",
            }}>
              Exceptional Dental Care in the Heart of Kathmandu
            </h2>

            <p style={{
              fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", maxWidth: 540,
              marginBottom: 40, animation: "fadeInUp 0.8s ease 0.3s both",
            }}>
              Where advanced technology meets compassionate care. Experience dentistry reimagined — for you and your entire family.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons" style={{ display: "flex", gap: 16, alignItems: "center", animation: "fadeInUp 0.8s ease 0.4s both", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("appointment")}
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                  color: "#fff", border: "none", padding: "16px 36px", borderRadius: 12,
                  fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  letterSpacing: 0.5,
                }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <a href="tel:9841337575" style={{ textDecoration: "none" }}>
                <button className="btn-accent" style={{
                  background: "rgba(255,255,255,0.08)", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)", padding: "16px 36px", borderRadius: 12,
                  fontSize: 16, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  backdropFilter: "blur(10px)", letterSpacing: 0.5,
                }}>
                  <Phone size={18} /> Call Now
                </button>
              </a>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 32, marginTop: 52, animation: "fadeInUp 0.8s ease 0.6s both", flexWrap: "wrap" }}>
              {[
                { icon: Shield, label: "NMC Certified" },
                { icon: Award, label: "20+ Years" },
                { icon: Users, label: "15,000+ Patients" },
              ].map((badge, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <badge.icon size={16} color={colors.accent} />
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image area - decorative dental element */}
          <div style={{
            position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)",
            width: 380, height: 380, borderRadius: "50%",
            background: `conic-gradient(from 45deg, ${colors.primary}22, ${colors.accent}22, ${colors.primary}22)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "float 10s ease-in-out infinite",
            border: `2px solid ${colors.accent}22`,
          }}>
            <div style={{
              width: 300, height: 300, borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${colors.primary}33, ${colors.primaryDark}44)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${colors.primary}33`,
            }}>
              <div style={{
                width: 200, height: 200, borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.primary}44, ${colors.accent}22)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `inset 0 0 40px ${colors.primary}22`,
              }}>
                <ToothIcon size={80} color={colors.accent} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 80 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill={colors.warmWhite} />
        </svg>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section style={{ padding: "0 24px", marginTop: -30, position: "relative", zIndex: 10 }}>
        <div className="stats-grid" style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          background: "#fff", borderRadius: 20, overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
          border: `1px solid ${colors.lightGray}`,
        }}>
          {[
            { value: 20, suffix: "+", label: "Years of Excellence", icon: Award },
            { value: 15000, suffix: "+", label: "Happy Patients", icon: Heart },
            { value: 25, suffix: "+", label: "Expert Dentists", icon: Users },
            { value: 98, suffix: "%", label: "Patient Satisfaction", icon: Star },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "36px 24px", textAlign: "center",
              borderRight: i < 3 ? `1px solid ${colors.lightGray}` : "none",
            }}>
              <stat.icon size={24} color={colors.accent} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: colors.primary, lineHeight: 1 }}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 13, color: colors.midGray, marginTop: 6, fontWeight: 500, letterSpacing: 0.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT SECTION ═══════════════ */}
      <section id="about" style={{ padding: "100px 24px 80px" }}>
        <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <RevealBlock direction="left">
            <div style={{ position: "relative" }}>
              {/* Image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "4/3.5", borderRadius: 20,
                background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)`,
                border: `2px solid ${colors.primary}15`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 16, position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
                <ToothIcon size={60} color={colors.primary} />
                <span style={{ fontSize: 14, color: colors.midGray, fontWeight: 500 }}>Clinic Photo</span>
              </div>
              {/* Floating card */}
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                background: "#fff", borderRadius: 16, padding: "20px 24px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.1)", border: `1px solid ${colors.lightGray}`,
                animation: "float2 5s ease-in-out infinite",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award size={22} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: colors.dark }}>20+</div>
                    <div style={{ fontSize: 12, color: colors.midGray, fontWeight: 500 }}>Years Serving Nepal</div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock direction="right">
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>ABOUT OUR CLINIC</div>
            <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 20 }}>
              A Legacy of Trust in{" "}
              <span style={{ color: colors.primary }}>Dental Excellence</span>
            </h2>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`, borderRadius: 2, marginBottom: 24 }} />
            <p style={{ fontSize: 16, lineHeight: 1.9, color: colors.midGray, marginBottom: 20 }}>
              Nestled in the heart of New Baneshwor, Dental Care Center Pvt. Ltd. has been the trusted choice for families across Kathmandu seeking exceptional oral healthcare. Our commitment goes beyond treating teeth — we build lasting relationships founded on trust, transparency, and genuine care.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: colors.midGray, marginBottom: 32 }}>
              With state-of-the-art equipment, a team of NMC-certified specialists, and a warm, welcoming environment, we ensure every patient leaves with a healthier, more confident smile.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                "NMC Certified Doctors",
                "Modern Equipment",
                "Painless Procedures",
                "Affordable Pricing",
                "Family-Friendly",
                "Emergency Care",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle size={18} color={colors.primary} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: colors.darkGray }}>{item}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════ SERVICES SECTION ═══════════════ */}
      <section id="services" style={{ padding: "80px 24px 100px", background: colors.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>WHAT WE OFFER</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 16 }}>
                Comprehensive Dental{" "}
                <span style={{ color: colors.primary }}>Services</span>
              </h2>
              <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`, borderRadius: 2, margin: "0 auto 16px" }} />
              <p style={{ fontSize: 16, color: colors.midGray, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                From routine checkups to advanced procedures, we offer complete dental solutions under one roof.
              </p>
            </div>
          </RevealBlock>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {services.map((service, i) => {
              const Icon = serviceIcons[service.key];
              return (
                <RevealBlock key={i} delay={i * 80}>
                  <div className="service-card" style={{
                    background: "#fff", borderRadius: 16, padding: 32,
                    border: `1px solid ${colors.lightGray}`,
                    cursor: "pointer", position: "relative", overflow: "hidden",
                    height: "100%",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 4,
                      background: `linear-gradient(90deg, ${service.color}, ${service.color}88)`,
                    }} />
                    <div style={{
                      width: 56, height: 56, borderRadius: 14,
                      background: `${service.color}10`,
                      display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                    }}>
                      <Icon size={26} color={service.color} />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: colors.dark, marginBottom: 10 }}>{service.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.midGray }}>{service.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 18, color: service.color, fontSize: 13, fontWeight: 600 }}>
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US BANNER ═══════════════ */}
      <section style={{
        padding: "80px 24px",
        background: `linear-gradient(135deg, ${colors.dark} 0%, #16213E 50%, ${colors.primaryDark} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(${colors.accent} 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>THE DIFFERENCE</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                Why Families Choose{" "}
                <span style={{ color: colors.accent }}>Dental Care Center</span>
              </h2>
            </div>
          </RevealBlock>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: Shield, title: "Trusted & Certified", desc: "All our dentists are NMC-registered specialists with years of hands-on experience in advanced dental procedures.", color: colors.primary },
              { icon: Heart, title: "Patient-First Approach", desc: "We listen before we treat. Every patient receives a personalized treatment plan tailored to their unique needs and comfort.", color: colors.accent },
              { icon: Zap, title: "Painless Technology", desc: "Advanced equipment and gentle techniques ensure minimal discomfort. Most patients are surprised by how easy their visit is.", color: colors.primaryLight },
              { icon: Clock, title: "Flexible Scheduling", desc: "Open 7 days with extended hours. Walk-ins welcome. Emergency appointments available because dental pain doesn't wait.", color: colors.accentLight },
              { icon: Award, title: "Affordable Excellence", desc: "Premium dental care doesn't have to break the bank. Transparent pricing with flexible payment options for all treatments.", color: colors.primary },
              { icon: Sparkles, title: "Modern Clinic", desc: "Clean, hygienic, and equipped with the latest dental technology. A comfortable environment that puts you at ease from arrival.", color: colors.accent },
            ].map((item, i) => (
              <RevealBlock key={i} delay={i * 100}>
                <div style={{
                  padding: 32, borderRadius: 16,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s",
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${item.color}15`, border: `1px solid ${item.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  }}>
                    <item.icon size={24} color={item.color} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#fff", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TEAM SECTION ═══════════════ */}
      <section id="team" style={{ padding: "100px 24px", background: colors.warmWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>MEET THE EXPERTS</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 16 }}>
                Our{" "}
                <span style={{ color: colors.primary }}>Dental Team</span>
              </h2>
              <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`, borderRadius: 2, margin: "0 auto 16px" }} />
              <p style={{ fontSize: 16, color: colors.midGray, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                Skilled, compassionate, and dedicated to your oral health.
              </p>
            </div>
          </RevealBlock>

          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {team.map((doc, i) => (
              <RevealBlock key={i} delay={i * 120}>
                <div className="team-card" style={{
                  borderRadius: 20, overflow: "hidden", position: "relative",
                  background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                  border: `1px solid ${colors.lightGray}`,
                }}>
                  {/* Photo placeholder */}
                  <div style={{
                    width: "100%", aspectRatio: "3/3.5",
                    background: `linear-gradient(180deg, ${doc.color}12, ${doc.color}06)`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      width: 90, height: 90, borderRadius: "50%",
                      background: `${doc.color}15`, border: `2px solid ${doc.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Users size={36} color={doc.color} />
                    </div>
                    <div style={{ fontSize: 12, color: colors.midGray, marginTop: 12, fontWeight: 500 }}>Doctor Photo</div>
                    {/* Overlay on hover */}
                    <div className="team-overlay" style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(180deg, transparent, ${doc.color}ee)`,
                      opacity: 0, transition: "opacity 0.4s",
                      display: "flex", alignItems: "flex-end", padding: 20,
                    }}>
                      <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.6 }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{doc.qualification}</div>
                        <div style={{ opacity: 0.8 }}>{doc.exp}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "20px 20px 24px", textAlign: "center" }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: colors.dark, marginBottom: 4 }}>{doc.name}</h4>
                    <div style={{ fontSize: 13, color: doc.color, fontWeight: 500 }}>{doc.role}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" style={{ padding: "100px 24px", background: colors.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>PATIENT STORIES</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 16 }}>
                What Our Patients{" "}
                <span style={{ color: colors.primary }}>Say</span>
              </h2>
              <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`, borderRadius: 2, margin: "0 auto" }} />
            </div>
          </RevealBlock>

          <RevealBlock>
            <div style={{
              background: "#fff", borderRadius: 24, padding: "48px 52px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
              border: `1px solid ${colors.lightGray}`, position: "relative",
              minHeight: 280,
            }}>
              {/* Quote mark */}
              <div style={{
                position: "absolute", top: 24, left: 40, fontSize: 120,
                fontFamily: "'Playfair Display', serif", color: `${colors.primary}08`,
                lineHeight: 1, fontWeight: 700,
              }}>"</div>

              <div style={{ position: "relative", zIndex: 2 }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={colors.accent} color={colors.accent} />
                  ))}
                </div>

                {/* Testimonial text */}
                <p style={{
                  fontSize: 19, lineHeight: 1.8, color: colors.darkGray,
                  fontStyle: "italic", fontFamily: "'Playfair Display', serif",
                  marginBottom: 28, fontWeight: 400, minHeight: 90,
                  transition: "opacity 0.5s",
                }}>
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16, color: colors.dark }}>{testimonials[activeTestimonial].name}</div>
                    <div style={{ fontSize: 13, color: colors.primary, fontWeight: 500, marginTop: 2 }}>{testimonials[activeTestimonial].treatment}</div>
                  </div>

                  {/* Navigation dots */}
                  <div style={{ display: "flex", gap: 8 }}>
                    {testimonials.map((_, i) => (
                      <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                        width: i === activeTestimonial ? 28 : 10, height: 10,
                        borderRadius: 5, border: "none", cursor: "pointer",
                        background: i === activeTestimonial
                          ? `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`
                          : colors.lightGray,
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════ BEFORE/AFTER ═══════════════ */}
      <section style={{
        padding: "80px 24px",
        background: `linear-gradient(135deg, ${colors.primary}08, ${colors.accent}05)`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>TRANSFORMATIONS</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 16 }}>
                Smile{" "}
                <span style={{ color: colors.primary }}>Gallery</span>
              </h2>
              <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`, borderRadius: 2, margin: "0 auto 16px" }} />
              <p style={{ fontSize: 16, color: colors.midGray, maxWidth: 500, margin: "0 auto" }}>See the transformations we create every day.</p>
            </div>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {["Dental Implants", "Teeth Whitening", "Orthodontics"].map((label, i) => (
              <RevealBlock key={i} delay={i * 120}>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                  border: `1px solid ${colors.lightGray}`,
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div style={{
                      aspectRatio: "1/1", background: `${colors.primary}08`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      borderRight: `1px solid ${colors.lightGray}`,
                    }}>
                      <Smile size={32} color={colors.midGray} />
                      <div style={{ fontSize: 11, color: colors.midGray, marginTop: 8, fontWeight: 600 }}>BEFORE</div>
                    </div>
                    <div style={{
                      aspectRatio: "1/1", background: `${colors.primary}05`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}>
                      <Sparkles size={32} color={colors.accent} />
                      <div style={{ fontSize: 11, color: colors.accent, marginTop: 8, fontWeight: 600 }}>AFTER</div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px", textAlign: "center", background: `${colors.primary}05` }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: colors.dark }}>{label}</div>
                    <div style={{ fontSize: 12, color: colors.midGray, marginTop: 2 }}>Patient photo placeholder</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ APPOINTMENT FORM ═══════════════ */}
      <section id="appointment" style={{ padding: "100px 24px", background: colors.warmWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "start" }}>
            <RevealBlock direction="left">
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>BOOK YOUR VISIT</div>
                <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 20 }}>
                  Schedule Your{" "}
                  <span style={{ color: colors.primary }}>Appointment</span>
                </h2>
                <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`, borderRadius: 2, marginBottom: 24 }} />
                <p style={{ fontSize: 16, lineHeight: 1.8, color: colors.midGray, marginBottom: 36 }}>
                  Take the first step towards a healthier smile. Book your appointment today and experience dental care like never before.
                </p>

                {/* Contact info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { icon: Phone, label: "Call Us", value: "984-1337575 / 01-4485118", href: "tel:9841337575" },
                    { icon: MapPin, label: "Visit Us", value: "BICC, Panityanki, New Baneshwor, Kathmandu", href: "#" },
                    { icon: Clock, label: "Working Hours", value: "Sun - Fri: 10AM - 7PM | Sat: By Appointment" },
                    { icon: Mail, label: "Email", value: "info@dentalcarecenter.com.np" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                        background: `${colors.primary}08`, border: `1px solid ${colors.primary}15`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <item.icon size={20} color={colors.primary} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: colors.midGray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 15, fontWeight: 500, color: colors.darkGray }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            <RevealBlock direction="right">
              <div style={{
                background: "#fff", borderRadius: 24, padding: "40px 36px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
                border: `1px solid ${colors.lightGray}`,
              }}>
                {formSubmitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: `${colors.success}15`, margin: "0 auto 24px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      animation: "scaleIn 0.5s ease",
                    }}>
                      <CheckCircle size={40} color={colors.success} />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: colors.dark, marginBottom: 12 }}>Thank You!</h3>
                    <p style={{ fontSize: 15, color: colors.midGray, lineHeight: 1.7 }}>Your appointment request has been received. We'll confirm your booking within 1 hour.</p>
                    <button onClick={() => setFormSubmitted(false)} style={{
                      marginTop: 24, background: "none", border: `1px solid ${colors.primary}`,
                      color: colors.primary, padding: "10px 24px", borderRadius: 8,
                      fontSize: 14, fontWeight: 500, cursor: "pointer",
                    }}>Book Another</button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: colors.dark, marginBottom: 28 }}>Request an Appointment</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <input placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${colors.lightGray}`, fontSize: 15, fontFamily: "'Outfit', sans-serif", background: colors.warmWhite }} />
                      <input placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${colors.lightGray}`, fontSize: 15, fontFamily: "'Outfit', sans-serif", background: colors.warmWhite }} />
                      <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                        style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${colors.lightGray}`, fontSize: 15, fontFamily: "'Outfit', sans-serif", background: colors.warmWhite, color: formData.service ? colors.darkGray : colors.midGray }}>
                        <option value="">Select Service</option>
                        {services.map(s => <option key={s.key} value={s.key}>{s.title}</option>)}
                      </select>
                      <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                        style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${colors.lightGray}`, fontSize: 15, fontFamily: "'Outfit', sans-serif", background: colors.warmWhite, color: colors.darkGray }} />
                      <textarea placeholder="Additional message (optional)" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                        style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${colors.lightGray}`, fontSize: 15, fontFamily: "'Outfit', sans-serif", background: colors.warmWhite, resize: "vertical" }} />
                      <button className="btn-primary" onClick={() => setFormSubmitted(true)}
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                          color: "#fff", border: "none", padding: "16px", borderRadius: 12,
                          fontSize: 16, fontWeight: 600, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        }}>
                        <Calendar size={18} /> Confirm Appointment
                      </button>
                    </div>
                    <div style={{ textAlign: "center", marginTop: 20 }}>
                      <p style={{ fontSize: 13, color: colors.midGray }}>Or call directly: <a href="tel:9841337575" style={{ color: colors.primary, fontWeight: 600, textDecoration: "none" }}>984-1337575</a></p>
                    </div>
                  </>
                )}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section style={{ padding: "80px 24px 100px", background: colors.cream }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>QUESTIONS?</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2 }}>
                Frequently Asked{" "}
                <span style={{ color: colors.primary }}>Questions</span>
              </h2>
            </div>
          </RevealBlock>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div className="faq-item" style={{
                  background: "#fff", borderRadius: 14,
                  border: `1px solid ${activeFaq === i ? colors.primary + '30' : colors.lightGray}`,
                  overflow: "hidden", transition: "all 0.3s",
                }}>
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    style={{
                      width: "100%", padding: "20px 24px", background: "none", border: "none",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      cursor: "pointer", textAlign: "left",
                    }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: colors.dark, flex: 1, paddingRight: 16 }}>{faq.q}</span>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: activeFaq === i ? colors.primary : `${colors.primary}08`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.3s", transform: activeFaq === i ? "rotate(180deg)" : "none",
                    }}>
                      <ChevronDown size={16} color={activeFaq === i ? "#fff" : colors.primary} />
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div style={{ padding: "0 24px 20px", animation: "slideDown 0.3s ease" }}>
                      <p style={{ fontSize: 15, lineHeight: 1.8, color: colors.midGray }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MAP & CONTACT ═══════════════ */}
      <section id="contact" style={{ padding: "80px 24px 0", background: colors.warmWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>FIND US</div>
              <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: colors.dark, lineHeight: 1.2, marginBottom: 16 }}>
                Visit Our{" "}
                <span style={{ color: colors.primary }}>Clinic</span>
              </h2>
              <p style={{ fontSize: 16, color: colors.midGray }}>BICC, Panityanki, New Baneshwor, Kathmandu, Nepal</p>
            </div>
          </RevealBlock>

          <RevealBlock>
            <div style={{
              borderRadius: 20, overflow: "hidden", height: 400,
              background: `${colors.primary}08`, border: `1px solid ${colors.lightGray}`,
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
              gap: 16, position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0, opacity: 0.05,
                backgroundImage: `
                  linear-gradient(${colors.primary} 1px, transparent 1px),
                  linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }} />
              <MapPin size={48} color={colors.primary} />
              <div style={{ fontSize: 18, fontWeight: 600, color: colors.dark }}>Google Maps Embed</div>
              <div style={{ fontSize: 14, color: colors.midGray }}>Interactive map will be embedded here</div>
              <div style={{
                padding: "10px 24px", background: `${colors.primary}10`, borderRadius: 8,
                fontSize: 14, color: colors.primary, fontWeight: 500,
              }}>
                New Baneshwor, Kathmandu 123456
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════ CTA BAND ═══════════════ */}
      <section style={{
        padding: "60px 24px", marginTop: 80,
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            Ready for a Healthier Smile?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 32, lineHeight: 1.7 }}>
            Don't wait for a dental emergency. Book your checkup today and take the first step towards lasting oral health.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-accent" onClick={() => scrollTo("appointment")}
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                color: "#fff", border: "none", padding: "16px 36px", borderRadius: 12,
                fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
              }}>
              <Calendar size={18} /> Book Appointment
            </button>
            <a href="https://wa.me/9779841337575?text=Hello!%20I%20would%20like%20to%20book%20an%20appointment." style={{ textDecoration: "none" }}>
              <button className="btn-accent" style={{
                background: "rgba(255,255,255,0.12)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)", padding: "16px 36px", borderRadius: 12,
                fontSize: 16, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                backdropFilter: "blur(10px)",
              }}>
                <MessageCircle size={18} /> WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ padding: "64px 24px 0", background: colors.dark }}>
        <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.3fr", gap: 48, paddingBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ToothIcon size={24} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>Dental Care</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: colors.accent }}>CENTER PVT. LTD.</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.4)", maxWidth: 280 }}>
              Providing exceptional dental care to families in Kathmandu for over two decades. Your trusted partner in oral health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" }}>Quick Links</h4>
            {navLinks.map(link => (
              <div key={link.id} onClick={() => scrollTo(link.id)}
                style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: "6px 0", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = colors.accent}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>
                {link.label}
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" }}>Services</h4>
            {services.slice(0, 6).map(s => (
              <div key={s.key} style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", padding: "6px 0" }}>{s.title}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Phone size={16} color={colors.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>984-1337575<br />01-4485118</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <MapPin size={16} color={colors.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>BICC, Panityanki<br />New Baneshwor, Kathmandu</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Clock size={16} color={colors.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Sun - Fri: 10AM - 7PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 0", textAlign: "center",
        }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            © 2026 Dental Care Center Pvt. Ltd. All rights reserved. |{" "}
            <span style={{ color: colors.accent }}>Designed by The Divine Tech Innovation Pvt. Ltd.</span>
          </p>
        </div>
      </footer>

      {/* ═══════════════ FLOATING WHATSAPP ═══════════════ */}
      <a href="https://wa.me/9779841337575?text=Hello!%20I%20would%20like%20to%20inquire%20about%20dental%20services."
        target="_blank" rel="noopener noreferrer"
        className="whatsapp-btn"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 999,
          width: 60, height: 60, borderRadius: "50%",
          background: colors.whatsapp, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 6px 20px rgba(37,211,102,0.4)`,
          transition: "transform 0.3s", cursor: "pointer", textDecoration: "none",
        }}>
        <MessageCircle size={28} color="#fff" fill="#fff" />
      </a>

      {/* ═══════════════ BACK TO TOP ═══════════════ */}
      {scrollY > 500 && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 100, right: 30, zIndex: 998,
            width: 44, height: 44, borderRadius: 12,
            background: `${colors.dark}ee`, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease", backdropFilter: "blur(10px)",
          }}>
          <ChevronDown size={20} color="#fff" style={{ transform: "rotate(180deg)" }} />
        </button>
      )}
    </div>
  );
}

// ─── RevealBlock Component ───
function RevealBlock({ children, direction = "up", delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  const className = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${className} ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
