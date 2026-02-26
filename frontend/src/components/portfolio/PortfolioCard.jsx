// Showcase – Creatix-style: dark theme, green accent, nav, hero, stats, about, services, projects, reviews, marquee, footer.
// All content driven by dossier (profile, education, technicalSkills, capstoneProject, achievements, etc.).
import { useState, useEffect, useRef } from 'react';

const navItems = ['About', 'Services', 'Projects', 'Contact'];

export default function PortfolioCard({ dossier }) {
  const p = dossier?.profile || {};
  const edu = dossier?.education || [];
  const skills = dossier?.technicalSkills || [];
  const cap = dossier?.capstoneProject || {};
  const achievements = dossier?.achievements || [];
  const volunteering = dossier?.volunteering || [];
  const sportsArts = dossier?.sportsArts || [];
  const strengths = dossier?.strengths || [];

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const refs = { hero: heroRef, about: aboutRef, services: servicesRef, projects: projectsRef, contact: contactRef };

  const name = p.name || 'Portfolio';
  const role = p.role || p.track || 'Professional';
  const skillList = (skills || []).flatMap((s) => (s.items || []).filter(Boolean));
  const skillCategories = (skills || []).filter((s) => (s.items || []).length > 0);

  const aboutParts = [];
  if (name) aboutParts.push(`${name.split(' ')[0]} is a ${role}.`);
  if (strengths.length > 0) aboutParts.push(`Specializing in ${strengths.map((s) => s.name).join(', ')}.`);
  if (cap?.title) aboutParts.push(`Recent work includes ${cap.title}.`);
  if (skillList.length > 0) aboutParts.push(`Expertise spans ${skillList.slice(0, 6).join(', ')}${skillList.length > 6 ? ' and more' : ''}.`);
  const aboutText =
    aboutParts.length > 0
      ? aboutParts.join(' ')
      : `Welcome to my portfolio. I focus on ${role} and bringing ideas to life with clarity and creativity.`;

  const stats = [
    { num: edu.length, label: 'Education' },
    { num: achievements.length, label: 'Achievements' },
    { num: skillList.length, label: 'Skills' },
    { num: (cap?.title ? 1 : 0) + achievements.length, label: 'Projects' },
  ].map((s) => ({ ...s, num: s.num > 0 ? String(s.num) : '—', plus: s.num > 0 && s.num >= 10 }));

  const services = skillCategories.slice(0, 4).map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    name: (s.category || 'Skills').charAt(0).toUpperCase() + (s.category || 'skills').slice(1),
  }));

  const projectCards = [
    cap?.title && { title: cap.title, subtitle: cap.role || 'Featured project', emoji: '🎯' },
    achievements[0] && { title: achievements[0].title, subtitle: achievements[0].date || achievements[0].description || 'Achievement', emoji: '🏆' },
    achievements[1] && { title: achievements[1].title, subtitle: achievements[1].date || achievements[1].description || 'Achievement', emoji: '✨' },
  ].filter(Boolean);

  const reviewItems = achievements.slice(0, 3).map((a) => ({
    name: a.title,
    role: a.date || 'Highlight',
    review: a.description || a.title,
  }));
  if (reviewItems.length === 0 && strengths.length > 0) {
    reviewItems.push(
      ...strengths.slice(0, 3).map((s) => ({
        name: s.name,
        role: 'Strength',
        review: s.description || `I bring ${s.name} to every project.`,
      }))
    );
  }

  const marqueeSource = [...strengths.map((s) => s.name), ...skillList.slice(0, 8)].filter(Boolean);
  const marqueeDisplay = marqueeSource.length > 0 ? marqueeSource : ['Create', 'Build', 'Ship', 'Grow'];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = [
        ['hero', heroRef],
        ['about', aboutRef],
        ['services', servicesRef],
        ['projects', projectsRef],
        ['contact', contactRef],
      ];
      let current = 'hero';
      sections.forEach(([key, ref]) => {
        if (ref.current && window.scrollY >= ref.current.offsetTop - 120) current = key;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (key) => {
    const ref = refs[key];
    if (ref?.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-creatix-bg text-creatix-white overflow-x-hidden font-sans">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 md:py-5 border-b border-white/10 transition-all duration-300 ${
          scrolled ? 'bg-creatix-bg/90 backdrop-blur-md py-3 shadow-lg' : 'bg-creatix-bg/80 backdrop-blur-sm'
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 font-syne font-extrabold text-lg text-creatix-white"
        >
          <span className="w-7 h-7 rounded-md bg-creatix-green flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-black">
              <polygon points="8,1 15,14 1,14" fill="currentColor" />
            </svg>
          </span>
          {name.split(' ')[0] || 'Portfolio'}
        </button>
        <ul className="hidden md:flex gap-8 list-none">
          {navItems.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-sm font-medium transition-colors relative pb-0.5 border-none bg-transparent cursor-pointer ${
                  activeSection === item.toLowerCase() ? 'text-creatix-white' : 'text-creatix-gray'
                } hover:text-creatix-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-creatix-green after:transition-all after:duration-300 ${
                  activeSection === item.toLowerCase() ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="bg-creatix-green text-black border-0 rounded-full py-2.5 px-5 font-syne font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[0_6px_20px_rgba(181,242,61,0.35)] transition-all"
        >
          Get in touch →
        </button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} id="hero" className="min-h-screen flex items-center pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_40%,rgba(181,242,61,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto w-full relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-creatix-green/10 border border-creatix-green/25 rounded-full py-1.5 px-4 text-xs font-semibold text-creatix-green uppercase tracking-wider mb-6 portfolio-reveal">
              <span className="w-2.5 h-2.5 rounded-full bg-creatix-green shadow-[0_0_0_4px_rgba(181,242,61,0.2)] animate-pulse" />
              {role} · Portfolio
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-creatix-white mb-5 portfolio-reveal portfolio-reveal-delay-1">
              Hi, I'm <span className="text-creatix-green">{name.split(' ')[0] || 'Here'}</span>
              <br />
              {role}
            </h1>
            <p className="text-creatix-gray text-base leading-relaxed max-w-md mb-8 portfolio-reveal portfolio-reveal-delay-2">
              {aboutText}
            </p>
            <div className="flex flex-wrap gap-3 portfolio-reveal portfolio-reveal-delay-3">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 bg-creatix-green text-black border-0 rounded-full py-3.5 px-6 font-syne font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[0_8px_28px_rgba(181,242,61,0.4)] transition-all"
              >
                View projects →
              </button>
              <button
                type="button"
                onClick={() => scrollTo('about')}
                className="inline-flex items-center gap-2 bg-transparent text-creatix-white border border-white/10 rounded-full py-3.5 px-6 font-syne font-semibold text-sm hover:border-white/30 hover:bg-white/5 transition-all"
              >
                About me
              </button>
            </div>
          </div>

          <div className="relative portfolio-reveal portfolio-reveal-delay-2">
            <div className="bg-creatix-card rounded-3xl border border-white/10 overflow-hidden aspect-[4/5] flex items-end p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f2a10] to-[#0d1a06] flex items-end justify-center">
                <div className="w-3/4 h-[90%] bg-gradient-to-b from-[#2d3d1a] to-[#1a2510] rounded-[200px_200px_0_0] relative overflow-hidden">
                  <span className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[45%] h-[35%] rounded-full bg-creatix-green/20 blur-xl" />
                </div>
              </div>
              <div className="absolute top-5 right-5 bg-creatix-card2 border border-white/10 rounded-xl py-3.5 px-4 animate-float">
                <div className="text-creatix-gray text-[10px] uppercase tracking-wider mb-1">Experience</div>
                <div className="font-syne font-bold text-creatix-white flex items-center gap-1.5">
                  {edu.length > 0 ? `${edu.length}+ Education` : 'Portfolio'}
                </div>
              </div>
              <div className="absolute bottom-10 left-5 bg-creatix-card2 border border-white/10 rounded-xl py-3.5 px-4 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-creatix-gray text-[10px] uppercase tracking-wider mb-1">Highlights</div>
                <div className="font-syne font-bold text-creatix-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-creatix-green" />
                  {achievements.length + (cap?.title ? 1 : 0)} Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 px-6 md:px-12 bg-creatix-card border-y border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
          {stats.map((s) => (
            <div
              key={s.label}
              className="fade-in flex flex-col items-center gap-1 p-5 rounded-xl border border-white/10 bg-creatix-card2 hover:border-creatix-green/30 hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              <div className="font-syne font-extrabold text-2xl text-creatix-white">
                {s.num}
                {s.plus && <span className="text-creatix-green">+</span>}
              </div>
              <div className="text-sm text-creatix-gray">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} id="about" className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="fade-in">
            <span className="inline-block bg-creatix-green/10 border border-creatix-green/25 text-creatix-green rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider mb-5">
              About
            </span>
            <h2 className="font-syne font-extrabold text-2xl md:text-3xl leading-tight mb-5">
              Turning ideas into reality
            </h2>
            <p className="text-creatix-gray leading-relaxed mb-4">{aboutText}</p>
            {(p.location || p.phone) && (
              <p className="text-creatix-gray text-sm mb-6">
                {[p.location, p.phone].filter(Boolean).join(' · ')}
              </p>
            )}
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 bg-creatix-green/10 border border-creatix-green/25 rounded-full py-2 px-5 text-sm font-semibold text-creatix-green hover:bg-creatix-green/20 transition-colors"
            >
              Get in touch <span className="text-base">→</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 fade-in">
            <div className="rounded-2xl border border-white/10 bg-creatix-card aspect-[3/4] flex items-center justify-center text-4xl opacity-30 mt-10 relative overflow-hidden">
              <span>💻</span>
              <span className="absolute bottom-4 left-4 bg-creatix-green text-black rounded-lg py-1.5 px-3 font-syne font-bold text-xs uppercase">
                Tech
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-creatix-card aspect-[3/4] flex items-center justify-center text-4xl opacity-30 relative overflow-hidden mb-10">
              <span>🎯</span>
              <span className="absolute bottom-4 left-4 bg-creatix-green text-black rounded-lg py-1.5 px-3 font-syne font-bold text-xs uppercase">
                Focus
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (skill categories) */}
      <section ref={servicesRef} id="services" className="py-20 md:py-24 px-6 md:px-12 bg-creatix-card border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 fade-in">
            <div>
              <span className="inline-block bg-creatix-green/10 border border-creatix-green/25 text-creatix-green rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider mb-4">
                Services & skills
              </span>
              <h2 className="font-syne font-extrabold text-2xl md:text-3xl leading-tight">
                What I bring to the table
              </h2>
            </div>
            <p className="text-creatix-gray text-sm max-w-md leading-relaxed">
              From development to delivery — skills and tools I use to build and ship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col gap-4">
              {services.map((s, i) => (
                <div
                  key={s.num}
                  className="fade-in bg-creatix-bg border border-white/10 rounded-2xl p-6 md:p-7 flex items-center justify-between cursor-default hover:border-creatix-green/35 hover:-translate-y-0.5 hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-creatix-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-5 relative">
                    <span className="font-syne text-xs font-bold text-creatix-green bg-creatix-green/10 rounded-lg py-1.5 px-2.5">
                      {s.num}
                    </span>
                    <span className="font-syne font-bold text-base">{s.name}</span>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-creatix-green/10 text-creatix-green flex items-center justify-center text-lg group-hover:bg-creatix-green group-hover:text-black transition-all group-hover:-rotate-45">
                    →
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="fade-in bg-gradient-to-br from-[#1a2510] to-[#0d1708] border border-creatix-green/20 rounded-2xl p-8 flex flex-col gap-4">
                <p className="text-creatix-gray text-sm leading-relaxed">
                  I combine strategy, clean code, and user focus to deliver solutions that scale.
                </p>
                <div className="bg-creatix-green text-black rounded-xl py-3 px-4 text-sm font-semibold inline-block max-w-xs">
                  Ready to start a project? 🚀
                </div>
                <div className="self-end bg-creatix-card border border-white/10 text-creatix-white rounded-xl py-2.5 px-4 text-sm">
                  Let's build something great →
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 bg-creatix-card2 border border-white/10 rounded-full py-2 px-4 text-sm mt-2 hover:border-creatix-green/40 hover:text-creatix-green transition-all"
                >
                  <span className="w-7 h-7 rounded-full bg-creatix-green flex items-center justify-center text-black text-xs">👤</span>
                  Get in touch
                </button>
              </div>
              <div className="fade-in rounded-2xl border border-white/10 bg-creatix-card2 h-44 flex items-center justify-center text-5xl opacity-70">
                🖥️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={projectsRef} id="projects" className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="fade-in mb-10">
          <span className="inline-block bg-creatix-green/10 border border-creatix-green/25 text-creatix-green rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider mb-4">
            Projects
          </span>
          <h2 className="font-syne font-extrabold text-2xl md:text-3xl">
            Recent <span className="text-creatix-green">work</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {(projectCards.length > 0 ? projectCards : [{ title: 'Featured project', subtitle: 'View case study', emoji: '🎯' }]).map((proj, i) => (
            <div
              key={i}
              className="fade-in bg-creatix-card border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-creatix-green/35 hover:-translate-y-0.5 transition-all cursor-default"
            >
              <span className="text-4xl">{proj.emoji}</span>
              <div>
                <div className="font-syne font-bold text-lg mb-1">{proj.title}</div>
                <div className="text-creatix-gray text-sm">{proj.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS / Highlights */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-creatix-card border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-12">
            <span className="inline-block bg-creatix-green/10 border border-creatix-green/25 text-creatix-green rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider mb-4">
              Highlights
            </span>
            <h2 className="font-syne font-extrabold text-2xl md:text-3xl">
              What I've <span className="text-creatix-green">achieved</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {(reviewItems.length > 0 ? reviewItems : [{ name: 'Achievement', role: 'Highlight', review: 'Building things that matter.' }]).map((r, i) => (
              <div
                key={i}
                className="fade-in bg-creatix-card2 border border-white/10 rounded-xl p-6 flex flex-col gap-3 hover:border-creatix-green/30 transition-all"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-creatix-green text-sm">★</span>
                  ))}
                </div>
                <p className="text-creatix-gray text-sm leading-relaxed">"{r.review}"</p>
                <div>
                  <div className="font-syne font-bold text-sm">{r.name}</div>
                  <div className="text-creatix-green text-xs">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-creatix-green overflow-hidden py-4 border-t border-white/10">
        <div className="flex gap-8 animate-marquee w-max">
          {[...marqueeDisplay, ...marqueeDisplay].map((item, i) => (
            <div key={i} className="flex items-center gap-3 font-syne font-bold text-base text-black uppercase tracking-wide whitespace-nowrap">
              <span className="text-black/50">✦</span>
              {item}
            </div>
                ))}
              </div>
      </div>

      {/* FOOTER */}
      <footer ref={contactRef} id="contact" className="py-14 px-6 md:px-12 border-t border-white/10 bg-creatix-bg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-syne font-extrabold text-creatix-white mb-3">
              <span className="w-7 h-7 rounded-md bg-creatix-green flex items-center justify-center">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-black">
                  <polygon points="8,1 15,14 1,14" fill="currentColor" />
                </svg>
                      </span>
              {name}
            </div>
            <p className="text-creatix-gray text-sm leading-relaxed max-w-xs">
              {aboutText.slice(0, 120)}
              {aboutText.length > 120 ? '…' : ''}
            </p>
          </div>
          <div>
            <h4 className="font-syne font-bold text-sm mb-4">Profile</h4>
            <ul className="list-none space-y-2">
              <li><button type="button" onClick={() => scrollTo('about')} className="text-creatix-gray text-sm hover:text-creatix-white transition-colors bg-none border-none cursor-pointer p-0">About</button></li>
              <li><button type="button" onClick={() => scrollTo('services')} className="text-creatix-gray text-sm hover:text-creatix-white transition-colors bg-none border-none cursor-pointer p-0">Skills</button></li>
              <li><button type="button" onClick={() => scrollTo('projects')} className="text-creatix-gray text-sm hover:text-creatix-white transition-colors bg-none border-none cursor-pointer p-0">Projects</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syne font-bold text-sm mb-4">Contact</h4>
            <ul className="list-none space-y-2">
              {p.email && (
                <li>
                  <a href={`mailto:${p.email}`} className="text-creatix-gray text-sm hover:text-creatix-white transition-colors">
                    {p.email}
                  </a>
                  </li>
              )}
              {p.linkedIn && (
                <li>
                  <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="text-creatix-gray text-sm hover:text-creatix-white transition-colors">
                    LinkedIn
                  </a>
                  </li>
              )}
              {p.github && (
                <li>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-creatix-gray text-sm hover:text-creatix-white transition-colors">
                    GitHub
                  </a>
                  </li>
              )}
              </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-creatix-gray text-xs">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>Built with portfolio builder</p>
        </div>
        </footer>
    </div>
  );
}
