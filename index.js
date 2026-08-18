/* =====================================================
   PORTFOLIO RENDERER
   Everything on the page is drawn from PortfolioStore.load(),
   so editing content in admin.html is enough — no code edits.
===================================================== */

const DATA = PortfolioStore.load();

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escape user-entered text before it goes into innerHTML. */
function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

/* =====================================================
    META + THEME
===================================================== */
function renderMeta() {
    const { meta, profile } = DATA;
    document.title = meta.siteTitle || `${profile.name} — Portfolio`;

    if (meta.accent) document.documentElement.style.setProperty('--accent', meta.accent);
    if (meta.accentSoft) document.documentElement.style.setProperty('--accent-2', meta.accentSoft);

    if (meta.favicon) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${meta.favicon}</text></svg>`;
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
        document.head.appendChild(link);
    }
}

/* =====================================================
    NAV + HERO
===================================================== */
function renderNav() {
    $('#navLinks').innerHTML = (DATA.nav || [])
        .map((item) => `<a href="#${esc(item.target)}">${esc(item.label)}</a>`)
        .join('');

    const initials = (DATA.profile.name || '')
        .split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    $('#brandMark').textContent = initials || 'MH';
    $('#brandName').textContent = DATA.profile.name || '';

    const resume = $('#navResume');
    if (DATA.profile.resumeUrl) {
        resume.href = DATA.profile.resumeUrl;
        resume.hidden = false;
    }
}

function renderHero() {
    const p = DATA.profile;
    $('#heroName').textContent = p.name || '';
    $('#heroTagline').textContent = p.tagline || '';
    $('#heroPhoto').src = p.photo || 'pictures/profile.jpg';
    $('#heroPhoto').alt = p.name ? `${p.name} portrait` : 'Profile';

    const status = $('#heroStatus');
    if (p.availability) {
        status.textContent = p.location ? `${p.availability} · ${p.location}` : p.availability;
    } else {
        status.hidden = true;
    }

    $('#heroSocials').innerHTML = (DATA.socials || [])
        .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.label)}">
            <img src="${esc(s.icon)}" alt="${esc(s.label)}" /></a>`)
        .join('');
}

/** Typewriter cycle through the role list. */
function startRoleTyper() {
    const roles = (DATA.profile.roles || []).filter(Boolean);
    const out = $('#heroRole');
    if (!roles.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || roles.length === 1) {
        out.textContent = roles[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    (function tick() {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        out.textContent = word.slice(0, charIndex);

        let delay = deleting ? 45 : 85;
        if (!deleting && charIndex === word.length) {
            deleting = true;
            delay = 1600;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }
        setTimeout(tick, delay);
    })();
}

/* =====================================================
    STATS · ABOUT · SERVICES · JOURNEY
===================================================== */
function renderStats() {
    const strip = $('#statsStrip');
    const stats = DATA.stats || [];
    if (!stats.length) return strip.remove();

    strip.innerHTML = stats.map((s) => `
        <div class="stat">
            <div class="stat-value" data-target="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || '')}">0</div>
            <div class="stat-label">${esc(s.label)}</div>
        </div>`).join('');
}

function animateCounters(root) {
    $$('.stat-value', root).forEach((el) => {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        const target = Number(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1100;
        const start = performance.now();

        (function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        })(start);
    });
}

function renderAbout() {
    const a = DATA.about || {};
    $('#aboutHeading').textContent = a.heading || 'About Me';
    $('#aboutBody').textContent = a.body || '';
    $('#aboutHighlights').innerHTML = (a.highlights || [])
        .filter(Boolean)
        .map((h) => `<li>${esc(h)}</li>`).join('');

    const bits = [];
    if (DATA.profile.location) bits.push(`📍 ${DATA.profile.location}`);
    if (DATA.profile.email) bits.push(`✉️ ${DATA.profile.email}`);
    if (DATA.profile.phone) bits.push(`📞 ${DATA.profile.phone}`);
    $('#aboutMeta').textContent = bits.join('   ·   ');
}

function renderServices() {
    const list = DATA.services || [];
    if (!list.length) return $('#services').remove();

    $('#servicesGrid').innerHTML = list.map((s) => `
        <article class="service-card">
            <div class="service-icon">${esc(s.icon || '✦')}</div>
            <h4>${esc(s.title)}</h4>
            <p>${esc(s.description)}</p>
        </article>`).join('');
}

function renderJourney() {
    const list = DATA.journey || [];
    if (!list.length) return $('#journey').remove();

    $('#timeline').innerHTML = list.map((j) => `
        <li>
            <span class="tl-type">${esc(j.type || 'Milestone')}</span>
            <div class="tl-title">${esc(j.title)}</div>
            <div class="tl-org">${esc(j.org)}</div>
            <div class="tl-period">${esc(j.period)}</div>
            <p class="tl-desc">${esc(j.description)}</p>
        </li>`).join('');
}

/* =====================================================
    SKILLS
===================================================== */
function renderSkills() {
    const skills = DATA.skills || [];
    if (!skills.length) return $('#skills').remove();

    $('#skillsGrid').innerHTML = skills.map((s, i) => `
        <div class="skillCard" data-skill="${i}" role="button" tabindex="0"
             aria-label="Open ${esc(s.name)} certificate">
            <div class="skillcard_front"><img src="${esc(s.image)}" alt="${esc(s.name)}" /></div>
            <div class="skillcard_back"><span class="skill-name">${esc(s.name)}</span></div>
            <span class="skill-caption">${esc(s.name)}</span>
        </div>`).join('');

    $('#skillBars').innerHTML = skills.map((s) => `
        <div class="skill-bar-row">
            <div class="skill-bar-top">
                <strong>${esc(s.name)}</strong>
                <span>${Number(s.level) || 0}%</span>
            </div>
            <div class="skill-bar-track">
                <div class="skill-bar-fill" data-level="${Number(s.level) || 0}"></div>
            </div>
        </div>`).join('');

    const open = (i) => openSkillModal(skills[i]);
    $$('.skillCard').forEach((card) => {
        card.addEventListener('click', () => open(card.dataset.skill));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(card.dataset.skill);
            }
        });
    });
}

function animateSkillBars(root) {
    $$('.skill-bar-fill', root).forEach((bar) => {
        if (bar.dataset.done) return;
        bar.dataset.done = '1';
        requestAnimationFrame(() => { bar.style.width = `${bar.dataset.level}%`; });
    });
}

/* =====================================================
    PROJECTS
===================================================== */
function renderProjects() {
    const projects = DATA.projects || [];
    if (!projects.length) return $('#projects').remove();

    const tags = ['All', ...new Set(projects.map((p) => p.tag).filter(Boolean))];
    $('#projectFilters').innerHTML = tags.map((t, i) =>
        `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${esc(t)}">${esc(t)}</button>`
    ).join('');

    $('#projectsGrid').innerHTML = projects.map((p, i) => `
        <article class="project_card" data-project="${i}" data-tag="${esc(p.tag || '')}"
                 role="button" tabindex="0" aria-label="Open ${esc(p.title)} details">
            ${p.thumb ? `<img class="project-thumb" src="${esc(p.thumb)}" alt="" />` : ''}
            ${p.tag ? `<span class="project-tag">${esc(p.tag)}</span>` : ''}
            <h2>${esc(p.title)}</h2>
            <span class="linkToProject">
                View details <img src="icons/right-arrow.png" alt="" />
            </span>
        </article>`).join('');

    $$('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            $$('.filter-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            $$('.project_card').forEach((card) => {
                card.classList.toggle('hide', filter !== 'All' && card.dataset.tag !== filter);
            });
        });
    });

    const open = (i) => openProjectModal(projects[i]);
    $$('.project_card').forEach((card) => {
        card.addEventListener('click', () => open(card.dataset.project));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(card.dataset.project);
            }
        });
    });
}

/* =====================================================
    CERTIFICATES · TESTIMONIALS
===================================================== */
function renderCertificates() {
    const certs = (DATA.skills || [])
        .map((s) => s.certificate)
        .filter((c) => c && c.title);

    if (!certs.length) return $('#certificates').remove();

    // One card per unique certificate ID (skills often share one).
    const unique = [];
    const seen = new Set();
    certs.forEach((c) => {
        const key = c.id || c.title;
        if (seen.has(key)) return;
        seen.add(key);
        unique.push(c);
    });

    $('#certGrid').innerHTML = unique.map((c, i) => `
        <article class="cert-card" data-cert="${i}" role="button" tabindex="0"
                 aria-label="Open ${esc(c.title)}">
            <img class="cert-thumb" src="${esc(c.image)}" alt="${esc(c.title)}" />
            <h4>${esc(c.title)}</h4>
            <span>${esc(c.issuedBy || '')}${c.issueDate ? ' · ' + esc(c.issueDate) : ''}</span>
        </article>`).join('');

    $$('.cert-card').forEach((card) => {
        const show = () => openSkillModal({ certificate: unique[card.dataset.cert] });
        card.addEventListener('click', show);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                show();
            }
        });
    });
}

function renderTestimonials() {
    const list = DATA.testimonials || [];
    if (!list.length) return $('#testimonials').remove();

    $('#testimonialTrack').innerHTML = list.map((t) => `
        <blockquote class="testimonial">
            <p>${esc(t.quote)}</p>
            <footer>${esc(t.author)}<span>${esc(t.role || '')}</span></footer>
        </blockquote>`).join('');
}

/* =====================================================
    CONTACT · FOOTER
===================================================== */
function renderContact() {
    const c = DATA.contact || {};
    $('#contactHeading').textContent = c.heading || 'Get In Touch';
    $('#contactBlurb').textContent = c.blurb || '';

    const rows = [];
    if (c.email) rows.push(['Email', `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`]);
    if (c.phone) rows.push(['Phone', `<a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>`]);
    if (c.location) rows.push(['Location', esc(c.location)]);
    $('#contactDetails').innerHTML = rows
        .map(([label, value]) => `<li><strong>${label}</strong>${value}</li>`).join('');

    const form = $('#contactForm');
    if (c.formEnabled === false) {
        form.remove();
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = $('#formNote');
        // form.elements — form.name would return the form's own name attribute.
        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const message = form.elements.message.value.trim();

        if (!name || !email || !message) {
            note.textContent = 'Please fill in every field before sending.';
            note.classList.add('error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            note.textContent = 'That email address does not look right.';
            note.classList.add('error');
            return;
        }

        // No backend here — hand the message to the visitor's mail client.
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;

        note.classList.remove('error');
        note.textContent = 'Opening your mail app…';
        form.reset();
    });
}

function renderFooter() {
    $('#footerText').textContent = (DATA.footer && DATA.footer.text) || '';
    $('#footerSocials').innerHTML = (DATA.socials || [])
        .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.label)}">
            <img src="${esc(s.icon)}" alt="${esc(s.label)}" /></a>`)
        .join('');
}

/* =====================================================
    MODALS
===================================================== */
const blurBack = $('#blurBack');
let openModal = null;

function showModal(modal) {
    if (openModal) hideModal();
    openModal = modal;
    modal.classList.add('show');
    blurBack.classList.add('blur');
    document.body.classList.add('modal-open');
}

function hideModal() {
    if (!openModal) return;
    openModal.classList.remove('show');
    openModal = null;
    blurBack.classList.remove('blur');
    document.body.classList.remove('modal-open');
}

function openSkillModal(skill) {
    const c = (skill && skill.certificate) || {};
    $('#certImage').src = c.image || '';
    $('#certImage').alt = c.title || 'Certificate';
    $('#certTitle').textContent = c.title || 'Certificate';

    const rows = [
        ['Issued To', c.issuedTo],
        ['Issued By', c.issuedBy],
        ['Issue Date', c.issueDate],
        ['Course Level', c.level],
        ['Certificate ID', c.id],
        ['Skills Covered', c.covered]
    ].filter(([, v]) => v);

    $('#certInfo').innerHTML = rows
        .map(([k, v]) => `<li><strong>${k}:</strong> ${esc(v)}</li>`).join('');

    $('#certImageWrap').onclick = () => { if (c.image) window.open(c.image, '_blank'); };
    showModal($('#skillModal'));
}

function openProjectModal(project) {
    $('#projTitle').textContent = (project.title || '').toUpperCase();
    $('#projDesc').textContent = project.overview || '';

    const rows = [
        ['Languages', project.languages],
        ['Tools', project.tools],
        ['Frontend', project.frontend],
        ['Database', project.database]
    ].filter(([, v]) => v);

    $('#projTech').innerHTML = rows
        .map(([k, v]) => `<li><strong>${k}:</strong> ${esc(v)}</li>`).join('');

    const repo = $('#projRepo');
    repo.hidden = !project.repo;
    if (project.repo) repo.href = project.repo;

    const demo = $('#projDemo');
    demo.hidden = !project.demo;
    if (project.demo) demo.href = project.demo;

    showModal($('#projectModal'));
}

$$('[data-close]').forEach((btn) => btn.addEventListener('click', hideModal));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });
blurBack.addEventListener('click', (e) => { if (openModal && e.target === blurBack) hideModal(); });

/* =====================================================
    SCROLL BEHAVIOUR
===================================================== */
function initScrollUX() {
    const topbar = $('#topbar');
    const progress = $('#scrollProgress');
    const toTop = $('#toTop');
    const navAnchors = $$('#navLinks a');
    const sections = navAnchors
        .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);

    const onScroll = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
        topbar.classList.toggle('scrolled', y > 12);
        toTop.classList.toggle('show', y > 400);

        let current = '';
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= 140) current = section.id;
        });
        navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Mobile menu
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
    });
    navAnchors.forEach((a) => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }));
}

function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('visible'));
        animateCounters(document);
        animateSkillBars(document);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            if (entry.target.id === 'statsStrip') animateCounters(entry.target);
            if (entry.target.id === 'skills') animateSkillBars(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => observer.observe(el));
}

/* =====================================================
    BOOT
===================================================== */
renderMeta();
renderNav();
renderHero();
renderStats();
renderAbout();
renderSkills();
renderJourney();
renderServices();
renderProjects();
renderCertificates();
renderTestimonials();
renderContact();
renderFooter();
startRoleTyper();
initScrollUX();
initReveal();
