/* =====================================================
   PORTFOLIO DATA
   -----------------------------------------------------
   This file holds every piece of editable content.
   You normally do NOT edit it by hand — open admin.html,
   change things there, and press "Save".

   How it works:
   - DEFAULT_DATA below is the fallback / factory content.
   - Edits made in admin.html are stored in the browser
     (localStorage key: portfolio_data_v1) and override it.
   - "Download data file" in admin.html gives you a fresh
     copy of this file so the changes become permanent
     for every visitor (replace this file with it).
===================================================== */

const PORTFOLIO_STORAGE_KEY = 'portfolio_data_v1';

const DEFAULT_DATA = {
  /* ---------- Site / meta ---------- */
  meta: {
    siteTitle: 'Masud Hashemi — Portfolio',
    favicon: '💠',
    accent: '#06b6d4',
    accentSoft: '#0891b2'
  },

  /* ---------- Hero / header ---------- */
  profile: {
    name: 'Masud Hashemi',
    roles: ['Web Developer', 'Java & C# Developer', 'UI Enthusiast', 'Photographer'],
    tagline: 'I build clean, fast and thoughtful interfaces for the web and desktop.',
    location: 'Kabul, Afghanistan',
    availability: 'Open to work',
    photo: 'pictures/profile.jpg',
    resumeUrl: '',
    email: 'chitrarupgraphics@gmail.com',
    phone: ''
  },

  /* ---------- Navigation ---------- */
  nav: [
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Journey', target: 'journey' },
    { label: 'Services', target: 'services' },
    { label: 'Projects', target: 'projects' },
    { label: 'Certificates', target: 'certificates' },
    { label: 'Contact', target: 'contact' }
  ],

  /* ---------- Social links (footer + hero) ---------- */
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/masud-hashemi-b4511b381/', icon: 'icons/linkedin.png' },
    { label: 'GitHub', url: 'https://github.com/', icon: 'icons/github.png' },
    { label: 'Email', url: 'mailto:chitrarupgraphics@gmail.com', icon: 'icons/email.png' }
  ],

  /* ---------- About ---------- */
  about: {
    heading: 'About Me',
    body: "Hello! I'm Masud Hashemi, a passionate web developer with a knack for creating dynamic and user-friendly websites. With a strong foundation in HTML, CSS and JavaScript, I enjoy bringing ideas to life in the digital world. When I'm not coding, you can find me exploring new technologies or indulging in photography.",
    highlights: [
      'Clean, semantic and accessible markup',
      'Comfortable across web and desktop stacks',
      'Detail-driven UI and interaction design'
    ]
  },

  /* ---------- Stats strip ---------- */
  stats: [
    { value: 6, suffix: '+', label: 'Technologies' },
    { value: 4, suffix: '', label: 'Projects shipped' },
    { value: 2, suffix: '+', label: 'Years learning' },
    { value: 1, suffix: '', label: 'Certificates' }
  ],

  /* ---------- Skills (card front + certificate modal) ---------- */
  skills: [
    {
      name: 'HTML', image: 'pictures/html.png', level: 90, category: 'Frontend',
      blurb: 'Semantic structure, forms and accessibility fundamentals.',
      certificate: {
        image: 'certificates/certificate-html-css-.jpg',
        title: 'HTML & CSS Certificate',
        issuedTo: 'Masud Hashemi',
        issuedBy: 'SoloLearn',
        issueDate: 'Jan 10, 2024',
        level: 'Beginner–Intermediate',
        id: 'SL-HTM-2024-19327',
        covered: 'HTML Structure, CSS Styling, Responsive Web Layouts'
      }
    },
    {
      name: 'CSS', image: 'pictures/css.jpeg', level: 85, category: 'Frontend',
      blurb: 'Flexbox, grid, animation and responsive layout systems.',
      certificate: {
        image: 'certificates/certificate-html-css-.jpg',
        title: 'HTML & CSS Certificate',
        issuedTo: 'Masud Hashemi',
        issuedBy: 'SoloLearn',
        issueDate: 'Jan 10, 2024',
        level: 'Beginner–Intermediate',
        id: 'SL-HTM-2024-19327',
        covered: 'HTML Structure, CSS Styling, Responsive Web Layouts'
      }
    },
    {
      name: 'JavaScript', image: 'pictures/js.png', level: 75, category: 'Frontend',
      blurb: 'DOM work, events, ES6+ and small interactive apps.',
      certificate: {
        image: 'certificates/certificate-html-css-.jpg',
        title: 'JavaScript Certificate',
        issuedTo: 'Masud Hashemi',
        issuedBy: 'SoloLearn',
        issueDate: 'Mar 4, 2024',
        level: 'Intermediate',
        id: 'SL-JS-2024-20514',
        covered: 'ES6, DOM Manipulation, Events, Async Basics'
      }
    },
    {
      name: 'Java', image: 'pictures/java.png', level: 70, category: 'Backend',
      blurb: 'OOP, Swing desktop apps and JDBC database access.',
      certificate: {
        image: 'certificates/certificate-html-css-.jpg',
        title: 'Java Fundamentals',
        issuedTo: 'Masud Hashemi',
        issuedBy: 'SoloLearn',
        issueDate: 'Jun 18, 2024',
        level: 'Intermediate',
        id: 'SL-JAVA-2024-33108',
        covered: 'OOP, Collections, Exceptions, Swing'
      }
    },
    {
      name: 'C#', image: 'pictures/c srp.png', level: 60, category: 'Backend',
      blurb: '.NET basics, WinForms and object-oriented patterns.',
      certificate: {
        image: 'certificates/certificate-html-css-.jpg',
        title: 'C# Fundamentals',
        issuedTo: 'Masud Hashemi',
        issuedBy: 'SoloLearn',
        issueDate: 'Aug 2, 2024',
        level: 'Beginner',
        id: 'SL-CS-2024-41220',
        covered: 'Syntax, OOP, LINQ Basics'
      }
    },
    {
      name: 'Python', image: 'pictures/py.jpeg', level: 65, category: 'Backend',
      blurb: 'Scripting, automation and data handling basics.',
      certificate: {
        image: 'certificates/certificate-html-css-.jpg',
        title: 'Python Core',
        issuedTo: 'Masud Hashemi',
        issuedBy: 'SoloLearn',
        issueDate: 'Oct 21, 2024',
        level: 'Intermediate',
        id: 'SL-PY-2024-55901',
        covered: 'Data Types, Functions, Files, Modules'
      }
    }
  ],

  /* ---------- Journey: experience + education timeline ---------- */
  journey: [
    {
      type: 'Education',
      title: 'Computer Science Studies',
      org: 'Self-directed & online programs',
      period: '2023 — Present',
      description: 'Building a strong base in programming fundamentals, data structures and web technologies through structured online courses and hands-on projects.'
    },
    {
      type: 'Experience',
      title: 'Freelance Web Developer',
      org: 'Independent',
      period: '2024 — Present',
      description: 'Designing and building responsive landing pages and small business sites with vanilla HTML, CSS and JavaScript.'
    },
    {
      type: 'Experience',
      title: 'Desktop Application Projects',
      org: 'Personal',
      period: '2024 — 2025',
      description: 'Built management-style desktop tools in Java Swing backed by MySQL, covering CRUD flows, reporting and printable documents.'
    }
  ],

  /* ---------- Services ---------- */
  services: [
    {
      icon: '🖥️',
      title: 'Web Development',
      description: 'Responsive, hand-written front-ends that load fast and look sharp on every screen size.'
    },
    {
      icon: '🎨',
      title: 'UI Design',
      description: 'Clean interface design with consistent spacing, type and colour — from wireframe to live page.'
    },
    {
      icon: '🗄️',
      title: 'Desktop & Database',
      description: 'Java / C# desktop applications wired to MySQL for records, reporting and day-to-day operations.'
    },
    {
      icon: '📷',
      title: 'Photography',
      description: 'Product and portrait photography, edited and optimised for use across the web.'
    }
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      title: 'Employee Management System',
      tag: 'Desktop',
      thumb: 'pictures/images.jpeg',
      overview: 'A lightweight desktop application designed to manage employee records, salaries, attendance and payslips with a clean and simple UI.',
      languages: 'Java (Swing), MySQL',
      tools: 'IntelliJ IDEA, XAMPP / MySQL',
      frontend: 'Java Swing UI',
      database: 'MySQL with JDBC',
      repo: 'https://github.com/',
      demo: ''
    },
    {
      title: 'Personal Portfolio',
      tag: 'Web',
      thumb: 'pictures/html.png',
      overview: 'The site you are looking at — a fully hand-coded, data-driven portfolio with an in-browser admin panel for editing every detail.',
      languages: 'HTML, CSS, JavaScript',
      tools: 'VS Code, Git',
      frontend: 'Vanilla JS rendering engine',
      database: 'localStorage-backed content store',
      repo: 'https://github.com/',
      demo: ''
    },
    {
      title: 'Inventory Tracker',
      tag: 'Desktop',
      thumb: 'pictures/c srp.png',
      overview: 'Stock keeping tool that tracks items in and out, low-stock alerts and monthly summaries for a small retail workflow.',
      languages: 'C#, SQL',
      tools: 'Visual Studio, SQL Server',
      frontend: 'WinForms',
      database: 'SQL Server',
      repo: 'https://github.com/',
      demo: ''
    },
    {
      title: 'Landing Page Collection',
      tag: 'Web',
      thumb: 'pictures/css.jpeg',
      overview: 'A growing set of responsive landing page templates exploring layout, motion and modern CSS techniques.',
      languages: 'HTML, CSS, JavaScript',
      tools: 'VS Code, Figma',
      frontend: 'CSS Grid & Flexbox',
      database: '—',
      repo: 'https://github.com/',
      demo: ''
    }
  ],

  /* ---------- Testimonials ---------- */
  testimonials: [
    {
      quote: 'Masud delivered exactly what we described, and the layout held up perfectly on every device we tested.',
      author: 'Project Client',
      role: 'Small business owner'
    },
    {
      quote: 'Careful with detail and quick to iterate. The admin panel he built saved us from touching code at all.',
      author: 'Collaborator',
      role: 'Designer'
    }
  ],

  /* ---------- Contact ---------- */
  contact: {
    heading: 'Get In Touch',
    blurb: 'Have a project in mind or just want to say hello? Send a message and I will get back to you.',
    email: 'chitrarupgraphics@gmail.com',
    phone: '',
    location: 'Kabul, Afghanistan',
    formEnabled: true
  },

  /* ---------- Footer ---------- */
  footer: {
    text: '© 2026 Masud Hashemi. Built by hand with HTML, CSS and JavaScript.'
  }
};

/* =====================================================
   STORE — read / write / reset the active content
===================================================== */
const PortfolioStore = {
  /** Deep clone helper so defaults are never mutated. */
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /** Merge saved data over defaults so new fields keep working. */
  merge(base, override) {
    if (Array.isArray(base) || Array.isArray(override)) {
      return override === undefined ? base : this.clone(override);
    }
    if (typeof base !== 'object' || base === null) {
      return override === undefined ? base : override;
    }
    const out = this.clone(base);
    Object.keys(override || {}).forEach((key) => {
      out[key] = this.merge(base[key], override[key]);
    });
    return out;
  },

  load() {
    try {
      const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (!raw) return this.clone(DEFAULT_DATA);
      return this.merge(DEFAULT_DATA, JSON.parse(raw));
    } catch (err) {
      console.warn('Could not read saved portfolio data, using defaults.', err);
      return this.clone(DEFAULT_DATA);
    }
  },

  save(data) {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  },

  reset() {
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  },

  defaults() {
    return this.clone(DEFAULT_DATA);
  }
};

window.DEFAULT_DATA = DEFAULT_DATA;
window.PortfolioStore = PortfolioStore;
window.PORTFOLIO_STORAGE_KEY = PORTFOLIO_STORAGE_KEY;
