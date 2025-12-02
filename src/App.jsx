import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Menu,
  X,
  Brain,
  Terminal,
  Layout,
  Server,
  Edit,
  Eye,
  Send,
  Plus,
  Trash2,
  ChevronDown,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';


// --- CUSTOM ICONS ---

// Custom SVG for Hugging Face since it's not in Lucide
const HuggingFaceIcon = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
    {/* Stylized Hands */}
    <path d="M19 16c0 1.5-1 2.5-3 2.5" />
    <path d="M5 16c0 1.5 1 2.5 3 2.5" />
  </svg>
);

// --- ICON MAPPER ---
const IconMap = {
  Brain: Brain,
  Terminal: Terminal,
  Layout: Layout,
  Server: Server
};

// --- EDITOR HELPERS ---
const EditorField = ({ label, value, onChange, type = "text", rows = 3 }) => (
  <div className="mb-4">
    <label className="block text-slate-400 text-sm font-bold mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea
        className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type={type}
        className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

// --- MAIN EDITOR COMPONENT ---
const Editor = ({ data, setData, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    // Note: When using single file, this export is less critical but still useful for backup
    const codeString = `const portfolioData = ${JSON.stringify(data, null, 2)};`;
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // -- UPDATE FUNCTIONS --

  const updatePersonalInfo = (key, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const updateAbout = (key, value) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, [key]: value }
    }));
  };

  // Skills
  const updateSkillItem = (groupIndex, itemIndex, value) => {
    const newSkills = [...data.skills];
    newSkills[groupIndex].items[itemIndex] = value;
    setData({ ...data, skills: newSkills });
  };

  const addSkillItem = (groupIndex) => {
    const newSkills = [...data.skills];
    newSkills[groupIndex].items.push("New Skill");
    setData({ ...data, skills: newSkills });
  };

  const removeSkillItem = (groupIndex, itemIndex) => {
    const newSkills = [...data.skills];
    newSkills[groupIndex].items.splice(itemIndex, 1);
    setData({ ...data, skills: newSkills });
  };

  // Experience
  const updateExperience = (index, key, value) => {
    const newExp = [...data.experience];
    newExp[index][key] = value;
    setData({ ...data, experience: newExp });
  };

  const updateExperienceDesc = (expIndex, descIndex, value) => {
    const newExp = [...data.experience];
    newExp[expIndex].description[descIndex] = value;
    setData({ ...data, experience: newExp });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        {
          id: Date.now(),
          role: "New Role",
          company: "New Company",
          location: "Location",
          period: "Present",
          description: ["Did cool things."]
        },
        ...data.experience
      ]
    });
  };

  const deleteExperience = (index) => {
    const newExp = [...data.experience];
    newExp.splice(index, 1);
    setData({ ...data, experience: newExp });
  };

  // Projects
  const updateProject = (index, key, value) => {
    const newProj = [...data.projects];
    newProj[index][key] = value;
    setData({ ...data, projects: newProj });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        {
          id: Date.now(),
          title: "New Project",
          category: "Development",
          description: "Description of the project.",
          techStack: ["React", "Node"],
          links: { demo: "#", repo: "#" }
        },
        ...data.projects
      ]
    });
  };

  const deleteProject = (index) => {
    const newProj = [...data.projects];
    newProj.splice(index, 1);
    setData({ ...data, projects: newProj });
  };

  // -- RENDERERS --

  const renderProfileTab = () => (
    <div className="space-y-8">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">Personal Info</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <EditorField label="Full Name" value={data.personalInfo.name} onChange={(v) => updatePersonalInfo('name', v)} />
          <EditorField label="Role Title" value={data.personalInfo.role} onChange={(v) => updatePersonalInfo('role', v)} />
          <EditorField label="Location" value={data.personalInfo.location} onChange={(v) => updatePersonalInfo('location', v)} />
          <EditorField label="Email" value={data.personalInfo.email} onChange={(v) => updatePersonalInfo('email', v)} />
          <EditorField label="Image URL" value={data.personalInfo.image || ''} onChange={(v) => updatePersonalInfo('image', v)} />
          <div className="md:col-span-2">
            <EditorField label="Hero Background URL" value={data.personalInfo.heroImage || ''} onChange={(v) => updatePersonalInfo('heroImage', v)} />
          </div>
        </div>
      </div>
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">About Section</h3>
        <EditorField label="Description" type="textarea" rows={6} value={data.about.description} onChange={(v) => updateAbout('description', v)} />
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      {data.skills.map((group, groupIdx) => (
        <div key={groupIdx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
          <h3 className="text-teal-400 font-bold mb-4">{group.category}</h3>
          <div className="flex flex-wrap gap-3">
            {group.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-center bg-slate-950 border border-slate-700 rounded-lg overflow-hidden">
                <input
                  value={item}
                  onChange={(e) => updateSkillItem(groupIdx, itemIdx, e.target.value)}
                  className="bg-transparent text-slate-300 text-sm px-3 py-2 w-32 focus:outline-none focus:bg-slate-800"
                />
                <button
                  onClick={() => removeSkillItem(groupIdx, itemIdx)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addSkillItem(groupIdx)}
              className="flex items-center gap-1 px-3 py-2 bg-teal-500/10 text-teal-400 rounded-lg hover:bg-teal-500/20 text-sm font-medium"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExperienceTab = () => (
    <div className="space-y-6">
      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-slate-700 text-slate-400 hover:border-teal-500 hover:text-teal-400 rounded-xl flex justify-center items-center gap-2 font-medium transition-colors"
      >
        <Plus size={20} /> Add New Job Position
      </button>

      {data.experience.map((job, index) => (
        <div key={job.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative group">
          <button
            onClick={() => deleteExperience(index)}
            className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 hover:bg-slate-950 rounded transition-colors"
            title="Delete Job"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid md:grid-cols-2 gap-4 mb-4 pr-12">
            <EditorField label="Role" value={job.role} onChange={(v) => updateExperience(index, 'role', v)} />
            <EditorField label="Company" value={job.company} onChange={(v) => updateExperience(index, 'company', v)} />
            <EditorField label="Period" value={job.period} onChange={(v) => updateExperience(index, 'period', v)} />
            <EditorField label="Location" value={job.location} onChange={(v) => updateExperience(index, 'location', v)} />
          </div>

          <div className="mt-4">
            <label className="block text-slate-400 text-sm font-bold mb-2">Bullet Points</label>
            <div className="space-y-2">
              {job.description.map((desc, descIdx) => (
                <div key={descIdx} className="flex gap-2">
                  <textarea
                    rows={2}
                    value={desc}
                    onChange={(e) => updateExperienceDesc(index, descIdx, e.target.value)}
                    className="flex-grow bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:border-teal-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const newExp = [...data.experience];
                      newExp[index].description.splice(descIdx, 1);
                      setData({ ...data, experience: newExp });
                    }}
                    className="p-2 text-slate-600 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newExp = [...data.experience];
                  newExp[index].description.push("New bullet point");
                  setData({ ...data, experience: newExp });
                }}
                className="text-xs text-teal-400 hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Bullet Point
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <button
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-slate-700 text-slate-400 hover:border-teal-500 hover:text-teal-400 rounded-xl flex justify-center items-center gap-2 font-medium transition-colors"
      >
        <Plus size={20} /> Add New Project
      </button>

      {data.projects.map((proj, index) => (
        <div key={proj.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative">
          <button
            onClick={() => deleteProject(index)}
            className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 hover:bg-slate-950 rounded transition-colors"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid md:grid-cols-2 gap-4 mb-4 pr-12">
            <EditorField label="Project Title" value={proj.title} onChange={(v) => updateProject(index, 'title', v)} />
            <EditorField label="Category" value={proj.category} onChange={(v) => updateProject(index, 'category', v)} />
          </div>

          <EditorField label="Description" type="textarea" value={proj.description} onChange={(v) => updateProject(index, 'description', v)} />

          <div className="mt-4">
            <label className="block text-slate-400 text-sm font-bold mb-2">Tech Stack (Comma separated)</label>
            <input
              className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-teal-500 focus:outline-none"
              value={proj.techStack.join(", ")}
              onChange={(e) => {
                const stack = e.target.value.split(",").map(s => s.trim());
                updateProject(index, 'techStack', stack);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
        <h2 className="text-xl font-bold text-teal-400 flex items-center gap-2">
          <Edit size={20} /> CMS Editor
        </h2>

        {/* Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
          {['profile', 'skills', 'experience', 'projects'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-teal-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors text-sm ${copied ? 'bg-green-500/20 text-green-400' : 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'}`}
          >
            {copied ? 'Copied!' : <><Code2 size={16} /> Export JSON</>}
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded font-medium transition-colors text-sm"
          >
            <Eye size={16} /> Preview
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-5xl mx-auto w-full">
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'skills' && renderSkillsTab()}
        {activeTab === 'experience' && renderExperienceTab()}
        {activeTab === 'projects' && renderProjectsTab()}

        <div className="mt-12 bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 text-center">
          <h3 className="text-blue-300 font-bold mb-2">Save Your Changes</h3>
          <p className="text-slate-400 mb-4 text-sm max-w-lg mx-auto">
            Because this is a static site, changes made here are temporary. To save them permanently:
          </p>
          <ol className="text-left text-sm text-slate-400 list-decimal list-inside space-y-2 mb-4 inline-block mx-auto">
            <li>Click <b>"Export JSON"</b> in the top right.</li>
            <li>Open your local <code>src/portfolioData.js</code>.</li>
            <li>Paste the new code to replace the old data.</li>
            <li>Push to GitHub.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENTS ---

const Navbar = ({ toggleEditor }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pt-6`}>
      <div className={`
        flex items-center gap-8 px-8 py-4 rounded-full border transition-all duration-300
        ${scrolled
          ? 'bg-cyber-slate/80 backdrop-blur-xl border-slate-700/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
          : 'bg-transparent border-transparent'}
      `}>
        <a href="#" className="text-2xl font-bold tracking-tighter group">
          <span className="text-neon-cyan group-hover:text-neon-purple transition-colors">VB</span>
          <span className="text-slate-100">.Data</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-neon-cyan transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={toggleEditor}
          className="p-2 text-slate-400 hover:text-neon-purple hover:bg-white/5 rounded-full transition-all"
          title="Edit Content"
        >
          <Edit size={18} />
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ data }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-black pt-20">

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-neon-cyan/10 via-neon-purple/5 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan font-mono text-sm mb-4">
            Hello, I'm
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-2">
            {data.personalInfo.name}
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple pb-2">
            {data.personalInfo.role}
          </h2>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed font-light">
            {data.personalInfo.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-neon-cyan text-cyber-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Get in Touch</span>
            </a>
            <a
              href={data.personalInfo.social.github}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-slate-700 text-slate-300 hover:border-neon-purple hover:text-neon-purple font-semibold rounded-lg transition-all hover:bg-neon-purple/5"
            >
              View GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#about"
          className="text-slate-500 hover:text-neon-cyan transition-colors cursor-pointer block p-2"
          aria-label="Scroll to About section"
        >
          <ChevronDown size={24} />
        </a>
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ children, number }) => (
  <div className="flex items-center gap-4 mb-12 group">
    <span className="text-neon-cyan font-mono text-xl font-bold opacity-70 group-hover:opacity-100 transition-opacity">
      {number}.
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 relative">
      {children}
      <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-neon-cyan to-transparent rounded-full" />
    </h2>
    <div className="h-px bg-slate-800 flex-grow max-w-xs ml-4 group-hover:bg-slate-700 transition-colors" />
  </div>
);

const About = ({ data }) => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading number="01">About Me</SectionHeading>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-6 text-slate-400 leading-relaxed text-lg">
            <div className="bg-cyber-slate/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm hover:border-neon-cyan/30 transition-colors">
              <p className="mb-4">{data.about.description}</p>
              <p>
                Currently based in <span className="text-neon-cyan font-semibold">{data.personalInfo.location}</span>.
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              <SocialLink href={data.personalInfo.social.github} icon={<Github size={20} />} />
              <SocialLink href={data.personalInfo.social.linkedin} icon={<Linkedin size={20} />} />
              {data.personalInfo.social.huggingface && (
                <SocialLink href={data.personalInfo.social.huggingface} icon={<HuggingFaceIcon size={20} />} />
              )}
              <SocialLink href={data.personalInfo.social.email} icon={<Mail size={20} />} />
            </div>
          </div>

          <div className="md:col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan to-neon-purple rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-cyber-slate rounded-2xl p-2 border border-slate-700 overflow-hidden transform transition-transform duration-500 group-hover:-translate-y-2">
              {data.personalInfo.image ? (
                <img
                  src={data.personalInfo.image}
                  alt={data.personalInfo.name}
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="h-64 flex items-center justify-center bg-slate-900 rounded-xl">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-xl transition-all duration-300"
  >
    {icon}
  </a>
);

const Skills = ({ data }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="02">Technical Skills</SectionHeading>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.skills.map((skillGroup, idx) => {
            const Icon = IconMap[skillGroup.icon] || Terminal;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="bg-cyber-slate/40 p-6 rounded-2xl border border-slate-800 hover:border-neon-cyan/50 hover:bg-cyber-slate/60 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-slate-900 text-neon-cyan group-hover:text-neon-purple group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-100 text-lg">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-900/50 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Experience = ({ data }) => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading number="03">Where I've Worked</SectionHeading>

        <div className="space-y-12 border-l border-slate-800 ml-3 md:ml-6 pl-8 md:pl-12 relative">
          {data.experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[41px] md:-left-[59px] top-1 w-5 h-5 rounded-full border-4 border-cyber-black bg-slate-600 group-hover:bg-neon-cyan group-hover:scale-125 transition-all duration-300 shadow-[0_0_0_4px_rgba(15,23,42,1)]" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors">
                  {job.role}
                </h3>
                <span className="text-sm font-mono text-neon-purple/80 bg-neon-purple/10 px-2 py-1 rounded">{job.period}</span>
              </div>

              <h4 className="text-neon-teal font-medium mb-4 text-lg flex items-center gap-2">
                {job.company}
              </h4>

              <div className="bg-cyber-slate/30 p-6 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                <ul className="space-y-3">
                  {job.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                      <span className="text-neon-cyan mt-1.5">▹</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ data }) => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="04">Featured Projects</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {data.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-cyber-slate rounded-2xl overflow-hidden border border-slate-800 hover:border-neon-purple/50 transition-all duration-300"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 h-full flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-900 rounded-xl text-neon-cyan border border-slate-800 group-hover:border-neon-cyan/30 transition-colors">
                    <Code2 size={24} />
                  </div>
                  <div className="flex gap-4">
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-neon-cyan transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-neon-purple transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-neon-cyan/80 bg-neon-cyan/5 px-2 py-1 rounded border border-neon-cyan/10"
                    >
                      {tech}
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

// --- DYNAMIC CONTACT FORM (UPDATED) ---
const Contact = ({ data }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const SERVICE_ID = "service_q65qxgo";
  const TEMPLATE_ID = "template_rk2ndsl";
  const PUBLIC_KEY = "4g8au6eVMOKc9YXSs";

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Debug: Log the data being sent
    const formData = new FormData(form.current);
    const templateParams = Object.fromEntries(formData);

    console.log("Sending EmailJS Data:", templateParams);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error("EmailJS Error:", error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-neon-cyan font-mono mb-4">05. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          I'm currently looking for new opportunities in <span className="text-neon-cyan">Data Analytics and Machine Learning</span>.
          Whether you have a question or just want to say hi, fill out the form below!
        </p>

        <div className="relative group max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <form ref={form} onSubmit={sendEmail} className="relative bg-cyber-slate p-8 rounded-2xl border border-slate-800 shadow-2xl text-left">
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2">Name</label>
                <input
                  required
                  type="text"
                  name="from_name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2">Email</label>
                <input
                  required
                  type="email"
                  name="from_email"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2">Message</label>
                <textarea
                  required
                  rows="4"
                  name="message"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all"
                  placeholder="Hello! I'd like to connect..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-3 font-bold rounded-lg transition-all flex justify-center items-center gap-2
                  ${status === 'sending' ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : ''}
                  ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/50 cursor-default' : ''}
                  ${status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/50' : ''}
                  ${status === 'idle' ? 'bg-neon-cyan hover:bg-neon-teal text-cyber-black hover:scale-[1.02]' : ''}
                `}
              >
                {status === 'idle' && <><Send size={18} /> Send Message</>}
                {status === 'sending' && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
                {status === 'success' && <><CheckCircle size={18} /> Message Sent!</>}
                {status === 'error' && <><AlertCircle size={18} /> Failed. Check Console.</>}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-xs text-center mt-2">
                  Check the console (F12) for the exact error. Likely an EmailJS service issue.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 bg-cyber-black text-center text-slate-500 text-sm font-mono border-t border-slate-900">
    <p className="hover:text-neon-cyan transition-colors cursor-default">Designed & Built by Vrajeshkumar Bhatt</p>
  </footer>
);

export default function App() {
  const [data, setData] = useState(portfolioData);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="bg-cyber-black min-h-screen text-slate-300 selection:bg-neon-cyan/30 selection:text-white font-sans overflow-x-hidden">

      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px]" />
      </div>

      {isEditorOpen ? (
        <Editor
          data={data}
          setData={setData}
          onClose={() => setIsEditorOpen(false)}
        />
      ) : (
        <div className="relative z-10">
          <Navbar toggleEditor={() => setIsEditorOpen(true)} />
          <main>
            <Hero data={data} />
            <About data={data} />
            <Skills data={data} />
            <Experience data={data} />
            <Projects data={data} />
            <Contact data={data} />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}