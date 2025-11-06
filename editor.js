// editor.js
// Dynamic visual editor for config.js (portfolio content)

let portfolioConfig = window.portfolioConfig || {};

function getConfig() {
    // Try to load from localStorage first (for live edits)
    let saved = localStorage.getItem('portfolioConfig');
    if (saved) return JSON.parse(saved);
    return window.portfolioConfig;
}

function setConfig(newConfig) {
    localStorage.setItem('portfolioConfig', JSON.stringify(newConfig));
    portfolioConfig = newConfig;
}

// Renderers for each section
function renderEditor() {
    const editor = document.getElementById('editorSections');
    if (!editor) return;
    let config = getConfig();

    editor.innerHTML = '';

    // --- Personal Information ---
    editor.appendChild(personalSection(config));
    editor.appendChild(aboutSection(config));
    editor.appendChild(skillsSection(config));
    editor.appendChild(experienceSection(config));
    editor.appendChild(projectsSection(config));
    editor.appendChild(educationSection(config));
}

// PERSONAL SECTION
function personalSection(config) {
    let wrap = document.createElement('div');
    wrap.className = 'section-card';
    wrap.innerHTML = `
        <div class="section-header"><h2>Personal Information</h2></div>
        <div class="section-content">
            ${['name','title','description','email','linkedin','github','location'].map(f => `
                <div class="form-group">
                    <label>${f.charAt(0).toUpperCase() + f.slice(1)}</label>
                    <input type="text" id="personal_${f}" value="${config.personal[f]}"/>
                </div>
            `).join('')}
        </div>`;
    wrap.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const key = e.target.id.replace('personal_','');
            config.personal[key] = e.target.value;
            setConfig(config);
        });
    });
    return wrap;
}

// ABOUT SECTION
function aboutSection(config) {
    let wrap = document.createElement('div');
    wrap.className = 'section-card';
    wrap.innerHTML = `
        <div class="section-header"><h2>About</h2></div>
        <div class="section-content">
            <div class="form-group">
                <label>Paragraphs (separate by double return)</label>
                <textarea id="about_paragraphs">${config.about.paragraphs.join('\n\n')}</textarea>
            </div>
            <label>Highlights</label>
            <div id="about_highlights">
                ${config.about.highlights.map((h, idx) => `
                    <div class="array-item">
                        <input type="text" placeholder="Number" value="${h.number}" data-hidx="${idx}" class="about-h-number"/>
                        <input type="text" placeholder="Label" value="${h.label}" data-hidx="${idx}" class="about-h-label"/>
                        <button class="remove-btn" onclick="removeHighlight(${idx})">Remove</button>
                    </div>
                `).join('')}
            </div>
            <button class="add-btn" id="addHighlight">Add Highlight</button>
        </div>`;
    setTimeout(() => {
        wrap.querySelector('#about_paragraphs').addEventListener('input', e => {
            config.about.paragraphs = e.target.value.split('\n\n');
            setConfig(config);
        });
        wrap.querySelectorAll('.about-h-number, .about-h-label').forEach(el => {
            el.addEventListener('input', e => {
                const idx = Number(el.dataset.hidx);
                if (el.classList.contains('about-h-number')) config.about.highlights[idx].number = el.value;
                else config.about.highlights[idx].label = el.value;
                setConfig(config);
            });
        });
        wrap.querySelector('#addHighlight').onclick = () => {
            config.about.highlights.push({number:'',label:''});
            setConfig(config); renderEditor();
        };
    }, 10);
    window.removeHighlight = (idx) => {
        config.about.highlights.splice(idx, 1);
        setConfig(config); renderEditor();
    };
    return wrap;
}

// SKILLS SECTION
function skillsSection(config) {
    let wrap = document.createElement('div');
    wrap.className = "section-card";
    wrap.innerHTML = `
        <div class="section-header"><h2>Skills</h2></div>
        <div class="section-content" id="skills_section">
            ${config.skills.map((cat, idx) => `
                <div class="array-item">
                    <div class="form-group">
                        <label>Icon</label>
                        <input type="text" value="${cat.icon}" data-sidx="${idx}" class="skill-icon"/>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" value="${cat.title}" data-sidx="${idx}" class="skill-title"/>
                    </div>
                    <div class="form-group">
                        <label>Items (comma separated)</label>
                        <input type="text" value="${cat.items.join(', ')}" data-sidx="${idx}" class="skill-items"/>
                    </div>
                    <button class="remove-btn" onclick="removeSkill(${idx})">Remove</button>
                </div>
            `).join('')}
            <button class="add-btn" id="addSkill">Add Skill Category</button>
        </div>
    `;
    setTimeout(() => {
        wrap.querySelectorAll('.skill-icon, .skill-title, .skill-items').forEach(el => {
            el.addEventListener('input', e => {
                const idx = Number(el.dataset.sidx);
                if (el.classList.contains('skill-icon')) config.skills[idx].icon = el.value;
                if (el.classList.contains('skill-title')) config.skills[idx].title = el.value;
                if (el.classList.contains('skill-items')) config.skills[idx].items = el.value.split(',').map(i=>i.trim());
                setConfig(config);
            });
        });
        wrap.querySelector('#addSkill').onclick = () => {
            config.skills.push({icon:'', title:'', items:[]});
            setConfig(config); renderEditor();
        };
    }, 10);
    window.removeSkill = idx => {
        config.skills.splice(idx, 1); setConfig(config); renderEditor();
    };
    return wrap;
}

// EXPERIENCE SECTION (similar for other arrays)
function experienceSection(config) {
    let wrap = document.createElement('div');
    wrap.className = 'section-card';
    wrap.innerHTML = `
        <div class="section-header"><h2>Experience</h2></div>
        <div class="section-content" id="exp_section">
            ${config.experience.map((exp, idx) => `
                <div class="array-item">
                    <div class="form-group">
                        <label>Date</label>
                        <input type="text" value="${exp.date}" data-eidx="${idx}" class="exp-date"/>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" value="${exp.title}" data-eidx="${idx}" class="exp-title"/>
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" value="${exp.company}" data-eidx="${idx}" class="exp-company"/>
                    </div>
                    <div class="form-group">
                        <label>Responsibilities (separate by | )</label>
                        <input type="text" value="${exp.responsibilities.join(' | ')}" data-eidx="${idx}" class="exp-resp"/>
                    </div>
                    <button class="remove-btn" onclick="removeExp(${idx})">Remove</button>
                </div>
            `).join('')}
            <button class="add-btn" id="addExp">Add Experience</button>
        </div>
    `;
    setTimeout(() => {
        wrap.querySelectorAll('.exp-date, .exp-title, .exp-company, .exp-resp').forEach(el => {
            el.addEventListener('input', (e) => {
                const idx = Number(el.dataset.eidx);
                if (el.classList.contains('exp-date')) config.experience[idx].date = el.value;
                if (el.classList.contains('exp-title')) config.experience[idx].title = el.value;
                if (el.classList.contains('exp-company')) config.experience[idx].company = el.value;
                if (el.classList.contains('exp-resp')) config.experience[idx].responsibilities = el.value.split('|').map(s=>s.trim());
                setConfig(config);
            });
        });
        wrap.querySelector('#addExp').onclick = () => {
            config.experience.unshift({date:'',title:'',company:'',responsibilities:[]});
            setConfig(config); renderEditor();
        };
    }, 10);
    window.removeExp = idx => {
        config.experience.splice(idx, 1); setConfig(config); renderEditor();
    };
    return wrap;
}

// PROJECTS SECTION
function projectsSection(config) {
    let wrap = document.createElement('div');
    wrap.className = 'section-card';
    wrap.innerHTML = `
        <div class="section-header"><h2>Projects</h2></div>
        <div class="section-content" id="projects_section">
            ${config.projects.map((prj, idx) => `
                <div class="array-item">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" value="${prj.title}" data-pidx="${idx}" class="prj-title"/>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" value="${prj.description}" data-pidx="${idx}" class="prj-desc"/>
                    </div>
                    <div class="form-group">
                        <label>Tags (comma separated)</label>
                        <input type="text" value="${prj.tags.join(', ')}" data-pidx="${idx}" class="prj-tags"/>
                    </div>
                    <div class="form-group">
                        <label>Link</label>
                        <input type="text" value="${prj.link}" data-pidx="${idx}" class="prj-link"/>
                    </div>
                    <button class="remove-btn" onclick="removePrj(${idx})">Remove</button>
                </div>
            `).join('')}
            <button class="add-btn" id="addPrj">Add Project</button>
        </div>
    `;
    setTimeout(() => {
        wrap.querySelectorAll('.prj-title,.prj-desc,.prj-tags,.prj-link').forEach(el => {
            el.addEventListener('input', e => {
                const idx = Number(el.dataset.pidx);
                if (el.classList.contains('prj-title')) config.projects[idx].title = el.value;
                if (el.classList.contains('prj-desc')) config.projects[idx].description = el.value;
                if (el.classList.contains('prj-tags')) config.projects[idx].tags = el.value.split(',').map(s=>s.trim());
                if (el.classList.contains('prj-link')) config.projects[idx].link = el.value;
                setConfig(config);
            });
        });
        wrap.querySelector('#addPrj').onclick = () => {
            config.projects.push({title:'',description:'',tags:[],link:''});
            setConfig(config); renderEditor();
        };
    }, 10);
    window.removePrj = idx => {
        config.projects.splice(idx, 1); setConfig(config); renderEditor();
    };
    return wrap;
}

// EDUCATION SECTION
function educationSection(config) {
    let wrap = document.createElement('div');
    wrap.className = 'section-card';
    wrap.innerHTML = `
        <div class="section-header"><h2>Education</h2></div>
        <div class="section-content" id="edu_section">
            ${config.education.map((edu, idx) => `
                <div class="array-item">
                    <div class="form-group"><label>Degree</label>
                        <input type="text" value="${edu.degree}" data-edx="${idx}" class="edu-degree"/>
                    </div>
                    <div class="form-group"><label>Institution</label>
                        <input type="text" value="${edu.institution}" data-edx="${idx}" class="edu-inst"/>
                    </div>
                    <div class="form-group"><label>Date</label>
                        <input type="text" value="${edu.date}" data-edx="${idx}" class="edu-date"/>
                    </div>
                    <div class="form-group"><label>Details</label>
                        <input type="text" value="${edu.details}" data-edx="${idx}" class="edu-details"/>
                    </div>
                    <button class="remove-btn" onclick="removeEdu(${idx})">Remove</button>
                </div>
            `).join('')}
            <button class="add-btn" id="addEdu">Add Education</button>
        </div>
    `;
    setTimeout(() => {
        wrap.querySelectorAll('.edu-degree,.edu-inst,.edu-date,.edu-details').forEach(el => {
            el.addEventListener('input', e => {
                const idx = Number(el.dataset.edx);
                if (el.classList.contains('edu-degree')) config.education[idx].degree = el.value;
                if (el.classList.contains('edu-inst')) config.education[idx].institution = el.value;
                if (el.classList.contains('edu-date')) config.education[idx].date = el.value;
                if (el.classList.contains('edu-details')) config.education[idx].details = el.value;
                setConfig(config);
            });
        });
        wrap.querySelector('#addEdu').onclick = () => {
            config.education.push({degree:'', institution:'', date:'', details:''});
            setConfig(config); renderEditor();
        };
    }, 10);
    window.removeEdu = idx => {
        config.education.splice(idx, 1); setConfig(config); renderEditor();
    };
    return wrap;
}

// --------------------------------------------
// ACTIONS: Save, Reset, Export, Import
// --------------------------------------------
window.saveChanges = function() {
    // Copy config to window (so script.js and index.html pick up)
    window.portfolioConfig = getConfig();
    localStorage.setItem('portfolioConfig', JSON.stringify(window.portfolioConfig));
    document.getElementById('successMessage').classList.add('show');
    setTimeout(() => {
        document.getElementById('successMessage').classList.remove('show');
    }, 2000);
};

window.loadConfig = function() {
    localStorage.removeItem('portfolioConfig');
    window.portfolioConfig = window.portfolioConfig; // reload from file
    renderEditor();
};

window.exportConfig = function() {
    let config = getConfig();
    let blob = new Blob([JSON.stringify(config, null, 2)], {type:'application/json'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'portfolioConfig-backup.json';
    a.click();
};

window.resetToDefault = function() {
    if (!confirm('Are you sure? This will reset all changes and reload the default config.js content.')) return;
    localStorage.removeItem('portfolioConfig');
    window.location.reload();
};

// On page load, render editor
window.addEventListener('DOMContentLoaded', renderEditor);