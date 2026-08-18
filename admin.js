/* =====================================================
   PORTFOLIO ADMIN
   -----------------------------------------------------
   Edits a working copy of the content, then writes it to
   localStorage. index.html reads the same store, so any
   change here shows up on the site after a refresh.
===================================================== */

let data = PortfolioStore.load();
let dirty = false;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

/* ---------- dotted-path get/set: "profile.name" ---------- */
function getPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function setPath(obj, path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((acc, key) => {
        if (acc[key] == null || typeof acc[key] !== 'object') acc[key] = {};
        return acc[key];
    }, obj);
    target[last] = value;
}

/* ---------- toast + dirty state ---------- */
let toastTimer;
function toast(message, isError = false) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.toggle('error', isError);
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function markDirty() {
    dirty = true;
    document.body.classList.add('dirty');
    $('#savedInfo').textContent = 'Unsaved changes — press Save.';
}

function markClean() {
    dirty = false;
    document.body.classList.remove('dirty');
    $('#savedInfo').textContent = 'All changes saved to this browser.';
}

window.addEventListener('beforeunload', (e) => {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = '';
});

/* =====================================================
    SIMPLE FIELDS  (data-bind="path")
    data-type="lines" → textarea, one array item per line
    data-type="bool"  → checkbox
===================================================== */
function bindSimpleFields() {
    $$('[data-bind]').forEach((input) => {
        const path = input.dataset.bind;
        const type = input.dataset.type;
        const value = getPath(data, path);

        if (type === 'bool') {
            input.checked = value !== false;
        } else if (type === 'lines') {
            input.value = Array.isArray(value) ? value.join('\n') : (value || '');
        } else {
            input.value = value ?? '';
        }

        const preview = input.dataset.preview && $('#' + input.dataset.preview);
        if (preview) preview.src = value || '';

        // Re-binding after a reset/import must not stack duplicate listeners.
        if (input.dataset.bound) return;
        input.dataset.bound = '1';

        input.addEventListener('input', () => {
            let next;
            if (type === 'bool') next = input.checked;
            else if (type === 'lines') next = input.value.split('\n').map((l) => l.trim()).filter(Boolean);
            else next = input.value;

            setPath(data, path, next);
            if (preview) preview.src = input.value;
            markDirty();
        });

        if (type === 'bool') {
            input.addEventListener('change', () => {
                setPath(data, path, input.checked);
                markDirty();
            });
        }
    });
}

/* =====================================================
    REPEATERS
    Each collection declares its fields once; the card
    markup, add/remove/move handlers are generated.
===================================================== */
const TEXT = 'text', AREA = 'textarea', NUM = 'number', IMG = 'image';

const COLLECTIONS = {
    stats: {
        title: (item) => item.label || 'Stat',
        blank: { value: 0, suffix: '', label: 'New stat' },
        fields: [
            { key: 'value', label: 'Number', type: NUM },
            { key: 'suffix', label: 'Suffix', type: TEXT, hint: 'e.g. + or %' },
            { key: 'label', label: 'Label', type: TEXT }
        ]
    },

    skills: {
        title: (item) => item.name || 'Skill',
        blank: {
            name: 'New Skill', image: 'pictures/html.png', level: 50, category: 'Frontend', blurb: '',
            certificate: {
                image: 'certificates/certificate-html-css-.jpg', title: '', issuedTo: '',
                issuedBy: '', issueDate: '', level: '', id: '', covered: ''
            }
        },
        fields: [
            { key: 'name', label: 'Skill name', type: TEXT },
            { key: 'category', label: 'Category', type: TEXT },
            { key: 'image', label: 'Badge image path', type: IMG },
            { key: 'level', label: 'Proficiency %', type: NUM },
            { key: 'blurb', label: 'Short description', type: AREA, full: true },

            { subhead: 'Certificate shown when the badge is clicked' },
            { key: 'certificate.image', label: 'Certificate image path', type: IMG },
            { key: 'certificate.title', label: 'Certificate title', type: TEXT },
            { key: 'certificate.issuedTo', label: 'Issued to', type: TEXT },
            { key: 'certificate.issuedBy', label: 'Issued by', type: TEXT },
            { key: 'certificate.issueDate', label: 'Issue date', type: TEXT },
            { key: 'certificate.level', label: 'Course level', type: TEXT },
            { key: 'certificate.id', label: 'Certificate ID', type: TEXT },
            { key: 'certificate.covered', label: 'Skills covered', type: AREA, full: true }
        ]
    },

    journey: {
        title: (item) => item.title || 'Entry',
        blank: { type: 'Experience', title: 'New role', org: '', period: '', description: '' },
        fields: [
            { key: 'type', label: 'Type', type: TEXT, hint: 'Experience / Education' },
            { key: 'title', label: 'Title', type: TEXT },
            { key: 'org', label: 'Organisation', type: TEXT },
            { key: 'period', label: 'Period', type: TEXT, hint: 'e.g. 2024 — Present' },
            { key: 'description', label: 'Description', type: AREA, full: true }
        ]
    },

    services: {
        title: (item) => item.title || 'Service',
        blank: { icon: '✦', title: 'New service', description: '' },
        fields: [
            { key: 'icon', label: 'Icon (emoji)', type: TEXT },
            { key: 'title', label: 'Title', type: TEXT },
            { key: 'description', label: 'Description', type: AREA, full: true }
        ]
    },

    projects: {
        title: (item) => item.title || 'Project',
        blank: {
            title: 'New project', tag: 'Web', thumb: 'pictures/html.png', overview: '',
            languages: '', tools: '', frontend: '', database: '', repo: '', demo: ''
        },
        fields: [
            { key: 'title', label: 'Project title', type: TEXT },
            { key: 'tag', label: 'Tag (filter group)', type: TEXT, hint: 'e.g. Web, Desktop' },
            { key: 'thumb', label: 'Thumbnail path', type: IMG },
            { key: 'overview', label: 'Overview', type: AREA, full: true },
            { key: 'languages', label: 'Languages', type: TEXT },
            { key: 'tools', label: 'Tools', type: TEXT },
            { key: 'frontend', label: 'Frontend', type: TEXT },
            { key: 'database', label: 'Database', type: TEXT },
            { key: 'repo', label: 'Repository URL', type: TEXT },
            { key: 'demo', label: 'Live demo URL', type: TEXT }
        ]
    },

    testimonials: {
        title: (item) => item.author || 'Testimonial',
        blank: { quote: '', author: 'Name', role: '' },
        fields: [
            { key: 'author', label: 'Author', type: TEXT },
            { key: 'role', label: 'Role / company', type: TEXT },
            { key: 'quote', label: 'Quote', type: AREA, full: true }
        ]
    },

    socials: {
        title: (item) => item.label || 'Link',
        blank: { label: 'New link', url: '', icon: 'icons/github.png' },
        fields: [
            { key: 'label', label: 'Label', type: TEXT },
            { key: 'url', label: 'URL', type: TEXT },
            { key: 'icon', label: 'Icon path', type: IMG }
        ]
    },

    nav: {
        title: (item) => item.label || 'Menu item',
        blank: { label: 'New item', target: 'about' },
        fields: [
            { key: 'label', label: 'Menu label', type: TEXT },
            {
                key: 'target', label: 'Section id', type: TEXT,
                hint: 'about · skills · journey · services · projects · certificates · contact'
            }
        ]
    }
};

function fieldMarkup(field, collection, index) {
    if (field.subhead) return `<div class="subhead">${esc(field.subhead)}</div>`;

    const value = getPath(data[collection][index], field.key) ?? '';
    const id = `f-${collection}-${index}-${field.key.replace(/\./g, '-')}`;
    const hint = field.hint ? `<span class="hint">${esc(field.hint)}</span>` : '';
    const attrs = `id="${id}" data-collection="${collection}" data-index="${index}" data-key="${esc(field.key)}"`;

    if (field.type === AREA) {
        return `<div class="field full">
            <label for="${id}">${esc(field.label)} ${hint}</label>
            <textarea rows="3" ${attrs}>${esc(value)}</textarea>
        </div>`;
    }

    if (field.type === IMG) {
        return `<div class="field${field.full ? ' full' : ''}">
            <label for="${id}">${esc(field.label)} ${hint}</label>
            <div style="display:flex;gap:10px;align-items:center">
                <input type="text" ${attrs} value="${esc(value)}" data-img-preview="${id}-prev" style="flex:1" />
                <img class="thumb-preview" id="${id}-prev" src="${esc(value)}" alt="" />
            </div>
        </div>`;
    }

    const inputType = field.type === NUM ? 'number' : 'text';
    return `<div class="field${field.full ? ' full' : ''}">
        <label for="${id}">${esc(field.label)} ${hint}</label>
        <input type="${inputType}" ${attrs} value="${esc(value)}" />
    </div>`;
}

function renderCollection(collection) {
    const config = COLLECTIONS[collection];
    const list = $('#list-' + collection);
    if (!list) return;

    if (!Array.isArray(data[collection])) data[collection] = [];
    const items = data[collection];

    if (!items.length) {
        list.innerHTML = `<div class="empty">Nothing here yet — use the “Add” button above.</div>`;
        return;
    }

    list.innerHTML = items.map((item, index) => `
        <article class="item-card">
            <div class="item-head">
                <span class="item-index">${index + 1}</span>
                <span class="item-title">${esc(config.title(item))}</span>
                <div class="item-tools">
                    <button class="btn btn-sm btn-icon" data-move="up" data-collection="${collection}"
                            data-index="${index}" title="Move up" ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button class="btn btn-sm btn-icon" data-move="down" data-collection="${collection}"
                            data-index="${index}" title="Move down" ${index === items.length - 1 ? 'disabled' : ''}>↓</button>
                    <button class="btn btn-sm btn-icon" data-duplicate data-collection="${collection}"
                            data-index="${index}" title="Duplicate">⧉</button>
                    <button class="btn btn-sm btn-icon btn-danger" data-remove data-collection="${collection}"
                            data-index="${index}" title="Delete">✕</button>
                </div>
            </div>
            <div class="item-body">
                ${config.fields.map((field) => fieldMarkup(field, collection, index)).join('')}
            </div>
        </article>`).join('');
}

function renderAllCollections() {
    Object.keys(COLLECTIONS).forEach(renderCollection);
}

/* ---------- delegated events for every repeater ---------- */
document.addEventListener('input', (e) => {
    const el = e.target;
    const collection = el.dataset.collection;
    if (!collection || !el.dataset.key) return;

    const index = Number(el.dataset.index);
    const raw = el.type === 'number' ? Number(el.value) : el.value;
    setPath(data[collection][index], el.dataset.key, raw);

    const previewId = el.dataset.imgPreview;
    if (previewId) {
        const img = document.getElementById(previewId);
        if (img) img.src = el.value;
    }

    // Keep the card header label in step with the title field.
    const card = el.closest('.item-card');
    if (card) card.querySelector('.item-title').textContent = COLLECTIONS[collection].title(data[collection][index]);

    markDirty();
});

document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    // Add
    if (btn.dataset.add) {
        const collection = btn.dataset.add;
        data[collection] = data[collection] || [];
        data[collection].push(PortfolioStore.clone(COLLECTIONS[collection].blank));
        renderCollection(collection);
        markDirty();
        toast('Item added');
        return;
    }

    const collection = btn.dataset.collection;
    if (!collection) return;
    const index = Number(btn.dataset.index);

    if (btn.dataset.move) {
        const to = btn.dataset.move === 'up' ? index - 1 : index + 1;
        if (to < 0 || to >= data[collection].length) return;
        const [moved] = data[collection].splice(index, 1);
        data[collection].splice(to, 0, moved);
        renderCollection(collection);
        markDirty();
        return;
    }

    if (btn.hasAttribute('data-duplicate')) {
        const copy = PortfolioStore.clone(data[collection][index]);
        data[collection].splice(index + 1, 0, copy);
        renderCollection(collection);
        markDirty();
        toast('Item duplicated');
        return;
    }

    if (btn.hasAttribute('data-remove')) {
        const label = COLLECTIONS[collection].title(data[collection][index]);
        if (!confirm(`Delete “${label}”? This cannot be undone until you reload without saving.`)) return;
        data[collection].splice(index, 1);
        renderCollection(collection);
        markDirty();
        toast('Item deleted');
    }
});

/* =====================================================
    PANEL NAVIGATION
===================================================== */
$$('#adminNav button').forEach((btn) => {
    btn.addEventListener('click', () => {
        $$('#adminNav button').forEach((b) => b.classList.remove('active'));
        $$('.panel').forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        $('#panel-' + btn.dataset.panel).classList.add('active');
        if (btn.dataset.panel === 'data') refreshJsonView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

/* =====================================================
    SAVE · RESET
===================================================== */
$('#saveBtn').addEventListener('click', () => {
    PortfolioStore.save(data);
    markClean();
    refreshJsonView();
    toast('Saved — refresh the site to see it');
});

$('#resetBtn').addEventListener('click', () => {
    if (!confirm('Reset every section back to the built-in defaults? Your edits in this browser will be lost.')) return;
    PortfolioStore.reset();
    data = PortfolioStore.defaults();
    bindSimpleFields();
    renderAllCollections();
    markClean();
    toast('Reset to defaults');
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        $('#saveBtn').click();
    }
});

/* =====================================================
    BACKUP PANEL
===================================================== */
function download(filename, text, mime = 'text/plain') {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function refreshJsonView() {
    $('#jsonView').value = JSON.stringify(data, null, 2);
}

$('#exportBtn').addEventListener('click', () => {
    download('portfolio-content.json', JSON.stringify(data, null, 2), 'application/json');
    toast('JSON exported');
});

$('#importBtn').addEventListener('click', () => $('#importFile').click());

$('#importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const parsed = JSON.parse(reader.result);
            data = PortfolioStore.merge(PortfolioStore.defaults(), parsed);
            bindSimpleFields();
            renderAllCollections();
            refreshJsonView();
            markDirty();
            toast('Imported — press Save to keep it');
        } catch (err) {
            toast('That file is not valid JSON', true);
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});

$('#applyJsonBtn').addEventListener('click', () => {
    try {
        const parsed = JSON.parse($('#jsonView').value);
        data = PortfolioStore.merge(PortfolioStore.defaults(), parsed);
        bindSimpleFields();
        renderAllCollections();
        markDirty();
        toast('JSON applied — press Save to keep it');
    } catch (err) {
        toast('Invalid JSON: ' + err.message, true);
    }
});

$('#refreshJsonBtn').addEventListener('click', () => {
    refreshJsonView();
    toast('View refreshed');
});

/** Rebuild portfolio-data.js with the current content baked in as defaults. */
$('#downloadJsBtn').addEventListener('click', () => {
    const header = `/* =====================================================
   PORTFOLIO DATA — generated by admin.html
   Replace the portfolio-data.js in your project with this
   file to publish these changes for every visitor.
===================================================== */

const PORTFOLIO_STORAGE_KEY = 'portfolio_data_v1';

const DEFAULT_DATA = ${JSON.stringify(data, null, 2)};
`;

    const store = `
/* =====================================================
   STORE — read / write / reset the active content
===================================================== */
const PortfolioStore = {
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

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
`;

    download('portfolio-data.js', header + store, 'text/javascript');
    toast('Data file downloaded');
});

/* =====================================================
    BOOT
===================================================== */
bindSimpleFields();
renderAllCollections();
refreshJsonView();
markClean();
