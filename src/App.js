import React, { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaChild,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa";

import {
  SiDjango,
  SiFlask,
  SiRedux,
  SiTailwindcss,
  SiPostgresql,
  SiSqlite,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiPlotly,
  SiFastapi,
} from "react-icons/si";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    // Handle scroll for navbar background change
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "skills", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animated gradient background
    const ctx = gsap.context(() => {
      gsap.to(".gradient-blob-1", {
        x: 100,
        y: -50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".gradient-blob-2", {
        x: -80,
        y: 100,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".gradient-blob-3", {
        x: 60,
        y: 80,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const navItems = ["home", "skills", "projects", "about", "contact"];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
      // Wait for menu collapse animation
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);
      }, 300); // match your menu animation duration
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <motion.nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <div className="nav-container">
          <motion.div
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="logo-icon"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
            <span className="logo-text">Portfolio</span>
          </motion.div>

          <ul className="nav-links">
            {navItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item)}
                  className={`nav-link ${
                    activeSection === item ? "active" : ""
                  }`}
                  data-testid={`nav-${item}`}
                >
                  <span className="nav-link-text">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                  {/* {activeSection === item && (
                    <motion.div
                      className="nav-underline"
                      layoutId="nav-underline"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )} */}
                </button>
              </motion.li>
            ))}
          </ul>

          <motion.button
            className="cta-nav-button"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            data-testid="nav-cta-button"
          >
            <span>Let's Talk</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            data-testid="mobile-menu-button"
          >
            <motion.div
              className="hamburger-line"
              animate={
                mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
              }
            />
            <motion.div
              className="hamburger-line"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.div
              className="hamburger-line"
              animate={
                mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={
            mobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-menu-content">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`mobile-nav-link ${
                  activeSection === item ? "active" : ""
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.3, delay: index * 0.1 }}
                data-testid={`mobile-nav-${item}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        ref={heroRef}
        className="hero-section"
        style={{ opacity, scale }}
      >
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>

        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="hero-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hi, I'm
            </motion.p>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sachin
            </motion.h1>
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              I build reliable and scalable web applications, focusing on clean
              code, performance, and real-world usability. I enjoy turning ideas
              into practical products that people actually enjoy using.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                className="cta-primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                data-testid="view-projects-btn"
                onClick={() => scrollToSection("projects")}
              >
                View Projects
              </motion.button>
              <motion.button
                className="cta-secondary"
                onClick={() => window.open("/resume_sample.pdf", "_blank")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="view-resume-btn"
              >
                View Resume
              </motion.button>
            </motion.div>
          </motion.div>

          {/* <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="image-glow"></div>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="Profile"
              className="profile-image"
            />
          </motion.div> */}
          {/* Replaces the static image with interactive Tech Universe */}
          <div
            className="hero-image-wrapper"
            style={{ flex: 1, minWidth: "300px" }}
          >
            <TechUniverse />
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {(() => {
            const startYear = 2024;
            const currentYear = new Date().getFullYear();
            const yearDisplay =
              startYear === currentYear
                ? startYear
                : `${startYear}–${currentYear}`;

            return <p>© {yearDisplay} Sachin Shankuri.</p>;
          })()}
          <div className="social-links">
            <motion.a
              href="https://github.com/sachin07sachin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              data-testid="footer-github"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/shankuri-sachin-reddy/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              data-testid="footer-linkedin"
            >
              <FaLinkedin />
            </motion.a>
            {/* <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              data-testid="footer-twitter"
            >
              <FaTwitter />
            </motion.a> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

// ----------------------------------------------------------------
// NEW COMPONENT: Interactive Tech Universe (Touch Enabled)
// ----------------------------------------------------------------
const TechUniverse = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 });

  // Unified handler for Mouse AND Touch
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Check if it's a touch event or mouse event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const mouseXPct = (clientX - rect.left) / width - 0.5;
    const mouseYPct = (clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const FloatingIcon = ({ children, depth, initialX, initialY, color }) => {
    const xMove = useTransform(mouseX, [-0.5, 0.5], [-depth * 50, depth * 50]);
    const yMove = useTransform(mouseY, [-0.5, 0.5], [-depth * 50, depth * 50]);

    return (
      <motion.div
        style={{
          position: "absolute",
          top: initialY,
          left: initialX,
          x: xMove,
          y: yMove,
          color: color,
          zIndex: depth * 10,
        }}
        animate={{
          y: [0, -10, 0], // Keeps floating automatically even without interaction
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            fontSize: `${20 + depth * 10}px`,
            opacity: 0.7 + depth * 0.1,
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        >
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="tech-universe"
      // Attach the handler to both events
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        perspective: 1000,
        touchAction: "none", // Prevents scrolling while dragging the universe
      }}
    >
      {/* Central Glowing Core */}
      <motion.div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)",
          boxShadow: "0 0 40px rgba(99,102,241,0.2)",
          position: "absolute",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Backend Orbit */}
      <FloatingIcon depth={1} initialX="20%" initialY="20%" color="#3776AB">
        <FaPython />
      </FloatingIcon>
      <FloatingIcon depth={1.2} initialX="70%" initialY="15%" color="#FFFFFF">
        <SiFlask />
      </FloatingIcon>
      <FloatingIcon depth={1.5} initialX="80%" initialY="70%" color="#4169E1">
        <SiPostgresql />
      </FloatingIcon>
      <FloatingIcon depth={0.8} initialX="15%" initialY="60%" color="#009688">
        <SiFastapi />
      </FloatingIcon>

      {/* Frontend Orbit */}
      <FloatingIcon depth={2} initialX="65%" initialY="30%" color="#61DAFB">
        <FaReact />
      </FloatingIcon>
      <FloatingIcon depth={2.2} initialX="10%" initialY="40%" color="#06B6D4">
        <SiTailwindcss />
      </FloatingIcon>
      <FloatingIcon depth={2.5} initialX="40%" initialY="80%" color="#E34F26">
        <FaHtml5 />
      </FloatingIcon>

      {/* Tools & Core */}
      <FloatingIcon depth={3.5} initialX="80%" initialY="40%" color="#FF9900">
        <FaAws />
      </FloatingIcon>
      <FloatingIcon depth={3} initialX="25%" initialY="75%" color="#F05032">
        <FaGitAlt />
      </FloatingIcon>
      <FloatingIcon depth={4} initialX="50%" initialY="10%" color="#F7DF1E">
        <FaJs />
      </FloatingIcon>
    </motion.div>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    // Backend
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "Flask", icon: <SiFlask />, color: "#FFFFFF" },
    { name: "Django", icon: <SiDjango />, color: "#0C4B33" },
    { name: "REST API", icon: <SiFastapi />, color: "#009688" },

    // Frontend
    { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
    { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
    { name: "Redux", icon: <SiRedux />, color: "#764ABC" },

    // Databases
    { name: "SQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "SQLite", icon: <SiSqlite />, color: "#003B57" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },

    // Data / ML
    { name: "Pandas", icon: <SiPandas />, color: "#E70488" },
    { name: "NumPy", icon: <SiNumpy />, color: "#4D77CF" },
    { name: "Matplotlib", icon: <SiPlotly />, color: "#11557C" },
    { name: "Seaborn", icon: <SiPlotly />, color: "#4C72B0" },
    { name: "Plotly", icon: <SiPlotly />, color: "#3F4F75" },
    { name: "Scikit-learn", icon: <SiScikitlearn />, color: "#F7931E" },

    // Tools & Cloud
    { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
    { name: "GitHub", icon: <FaGithub />, color: "##ffffff" },
    { name: "AWS", icon: <FaAws />, color: "#FF9900" },
  ];

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" data-testid="skills-title">
            Skills & Technologies
          </h2>
          <p className="section-subtitle">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
              data-testid={`skill-${skill.name.toLowerCase()}`}
            >
              <motion.div
                className="skill-icon"
                style={{ color: skill.color }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {skill.icon}
              </motion.div>
              <h3 className="skill-name">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "BlogApp",
      description:
        "A full-stack blog platform with user authentication, role-based admin access, rich-text post creation, and a commenting system. Includes secure login, database-driven content management, and responsive UI.",
      tags: [
        "Python",
        "Flask",
        "HTML",
        "CSS",
        "JavaScript",
        "SQLAlchemy",
        "SQLite",
        "Bootstrap",
      ],
      image: "https://www.thebubbletrends.com/images/blog.jpg",
      github: "https://github.com/sachin07sachin/BlogApp",
      demo: "",
    },
    {
      id: 2,
      title: "LEGO Data Analysis",
      description: `This project analyzes LEGO-related data using a Jupyter Notebook to explore trends and patterns across different LEGO sets and themes.
        The notebook performs exploratory data analysis to understand: 
        • Distribution of LEGO sets across themes and years
        • Trends in LEGO releases over time
        • Insights into LEGO themes, parts, and categories`,
      tags: ["Pandas ", "Matplotlib "],
      image:
        "https://revival-strapi.s3.eu-west-2.amazonaws.com/Bricks_LEGO_Trivia_1_fe19a94b8b.png",
      github: "https://github.com/sachin07sachin/Lego_analysis",
      demo: "",
    },
    {
      id: 3,
      title: "Google Trends Search Interest Analysis",
      description: `This project analyzes Google Trends search interest data using a Jupyter Notebook to understand how public interest in specific topics changes over time.
        The notebook performs exploratory data analysis and visualization to uncover:
        • Trends in search popularity over time
        • Comparisons between different search terms
        • Seasonal or long-term patterns in user interest`,
      tags: ["Pandas ", "Matplotlib "],
      image:
        "https://www.aimtechnologies.co/wp-content/uploads/2023/12/Media-Data-Analysis.jpeg",
      github:
        "https://github.com/sachin07sachin/google-trends-data-visualization",
      demo: "",
    },
  ];

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" data-testid="projects-title">
            Featured Projects
          </h2>
          <p className="section-subtitle">
            {/* Some of my recent work and side projects */}
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: 0 }}
              data-testid={`project-${project.id}`}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <motion.div
                  className="project-overlay"
                  // initial={{ opacity: 0 }}
                  // whileHover={{ opacity: 1 }}
                  // transition={{ duration: 0.3 }}
                >
                  <div className="project-links">
                    {/* CONDITIONAL RENDERING FOR GITHUB BUTTON */}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-testid={`project-${project.id}-github`}
                      >
                        <FaGithub /> Code
                      </motion.a>
                    )}

                    {/* CONDITIONAL RENDERING FOR DEMO BUTTON */}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-testid={`project-${project.id}-demo`}
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 1. DATA: Updated content for Education, but kept variable name 'timeline'
  const timeline = [
    {
      year: "2024",
      title: "Bachelor of Technology", // Used in place of Job Title
      company: "TKR College of Engineering and Technology", // Used in place of Company Name
      description:
        "Major in Electronics and Communication Engineering | CGPA : 7.31/10",
    },
    {
      year: "2020",
      title: "Higher Secondary (12th)",
      company: "NSR Impulse Junior College",
      description:
        "Major in Physics, Chemistry, and Mathematics. Achieved 96.8% in final board examinations.",
    },
    {
      year: "2018",
      title: "Secondary School (10th)",
      company: "Jawahar Navodaya Vidyalaya",
      description: "Achieved 76% in final board examinations with distinction.",
    },
  ];

  // 2. ANIMATION STATE: Logic for the "Boy to Man" transition
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 2500); // Cycles every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  // Configuration for the stages (Child -> Teen -> Grad)
  const stages = [
    { icon: <FaChild size={100} />, label: "10th Grade" },
    { icon: <FaUser size={110} />, label: "12th Grade" },
    { icon: <FaUserGraduate size={120} />, label: "Bachelor's" },
  ];

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" data-testid="about-title">
            About Me
          </h2>
          <p className="section-subtitle">My academic journey</p>
        </motion.div>

        <div className="about-content">
          {/* LEFT SIDE: Kept class 'about-text' but replaced paragraphs with Animation */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Added inline style to center the animation within the existing layout
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            {/* Animation Container */}
            <div
              style={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  style={{ color: "#64ffda" }} // You can adjust this hex code to match your theme color
                >
                  {stages[stage].icon}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Label Text */}
            <motion.h3
              key={`label-${stage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: "20px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {stages[stage].label}
            </motion.h3>
          </motion.div>

          {/* RIGHT SIDE: Kept class 'timeline' and structure exact */}
          <motion.div
            className="timeline"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 10 }}
                data-testid={`timeline-${index}`}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    // Using environment variables for security
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: process.env.REACT_APP_EMAILJS_NAME, // Your name
          from_email: formData.email,
          to_email: process.env.REACT_APP_EMAILJS_EMAIL, // Your receiving email
          subject: formData.subject,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          // alert("Thank you! I will get back to you as soon as possible.");
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
          // Clear success message after 5 seconds
          setTimeout(() => setStatus(""), 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          // alert("Something went wrong. Please try again.");
          setStatus("error");
          setTimeout(() => setStatus(""), 5000);
        },
      );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" data-testid="contact-title">
            Get In Touch
          </h2>
          <p className="section-subtitle">
            Let's work together on your next project
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="contact-form"
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Your name"
                data-testid="contact-name-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="your.email@example.com"
                data-testid="contact-email-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="What is this regarding?"
                data-testid="contact-subject-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="form-input"
                placeholder="Tell me about your project..."
                data-testid="contact-message-input"
              ></textarea>
            </div>
            {/* <motion.button
              type="submit"
              className="form-submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-testid="contact-submit-btn"
            >
              Send Message
            </motion.button> */}
            <motion.button
              type="submit"
              className="form-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
            {/* --- NEW: Success/Error Message Display --- */}
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: "#4ade80",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                ✅ Message sent successfully! I'll get back to you soon.
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: "#ef4444",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                ❌ Something went wrong. Please try again later.
              </motion.p>
            )}
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-text">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            {/* <div className="contact-methods">
              <motion.a
                href="mailto:john.doe@example.com"
                className="contact-method"
                whileHover={{ x: 10 }}
                data-testid="contact-email-link"
              >
                <FaEnvelope className="contact-icon" />
                <span>john.doe@example.com</span>
              </motion.a>
            </div> */}
            <div className="social-links-contact">
              <motion.a
                href="https://github.com/sachin07sachin"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                data-testid="contact-github"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/shankuri-sachin-reddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                data-testid="contact-linkedin"
              >
                <FaLinkedin />
              </motion.a>
              {/* <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                data-testid="contact-twitter"
              >
                <FaTwitter />
              </motion.a> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default App;
