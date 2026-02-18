
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import AIAssistant from './components/AIAssistant';
import { PROJECTS, SKILLS, EXPERIENCE } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 3;
  
  const totalPages = Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return PROJECTS.slice(start, start + PROJECTS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 selection:bg-white selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-20">
        <div className="max-w-3xl">
          <h2 className="text-neutral-500 font-medium mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            Senior Software Engineer & Product Architect
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Digital craftsmanship <br />
            <span className="text-neutral-600">at the speed of thought.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            I build robust systems that bridge the gap between complex backend infrastructure and elegant, minimalist user interfaces.
          </p>
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <a href="#work" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-neutral-200 transition-all hover:-translate-y-1">
              Explore Projects
            </a>
            <a href="#contact" className="border border-neutral-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-900 transition-all hover:-translate-y-1">
              Let's Talk
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section (Work) */}
      <section id="work" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 mb-4 block">Selected Works</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Technical Portfolio</h2>
          </div>
          <p className="text-neutral-400 max-w-sm">
            Focusing on scalability, performance, and the occasional experiment in emerging tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentPage === i + 1 
                    ? 'bg-white text-black scale-110' 
                    : 'bg-neutral-900 text-neutral-500 hover:bg-neutral-800'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 mb-4 block">Design Philosophy</span>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-6">Simplicity is the ultimate sophistication.</h2>
              <div className="space-y-6 text-neutral-400 leading-relaxed">
                <p>
                  I approach software engineering like an architect. Every component, every line of code, and every data model should serve a clear, defined purpose. My goal is to reduce complexity until only the essentials remain.
                </p>
                <p>
                  With nearly a decade of experience, I've seen frameworks come and go, but the principles of clean code, efficient algorithms, and user-centric design remain constant.
                </p>
              </div>
            </div>
            
            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-white font-semibold mb-6 tracking-tight text-sm uppercase">Quick Bio</h3>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex justify-between">
                  <span className="text-neutral-500">Based in</span>
                  <span>San Francisco, CA</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Education</span>
                  <span>BS Computer Science</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Current Focus</span>
                  <span>AI & Edge Computing</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Open to</span>
                  <span>Senior/Lead Roles</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-800">
              <h3 className="text-white font-semibold mb-8 tracking-tight uppercase text-xs">Technical Proficiency</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {SKILLS.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white transition-colors"></div>
                    <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900 scroll-mt-24">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 mb-12 block text-center">Professional Journey</span>
        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 gap-8">
                <div className="text-neutral-500 text-sm font-medium mb-2 md:mb-0 md:text-right">
                  {exp.period}
                </div>
                <div className="md:col-span-3 pb-12 border-l border-neutral-800 md:pl-12 relative">
                  <div className="absolute top-0 -left-[5px] md:-left-[5px] w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="text-neutral-400 font-medium mb-4">{exp.company}</div>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="bg-white text-black rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Ready to start your next project?</h2>
            <p className="text-neutral-600 mb-12 text-lg">I'm always looking for ambitious projects and interesting people to work with. Drop me a line and let's discuss how I can help you.</p>
            <div className="space-y-4">
              <a href="mailto:hello@nova.dev" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="font-semibold underline decoration-neutral-300 underline-offset-4">hello@nova.dev</span>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="font-semibold">Remote / San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-100 p-12 md:p-20">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
                <input required type="text" className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                <input required type="email" className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                <textarea required rows={4} className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {formStatus === 'idle' && 'Send Message'}
                {formStatus === 'sending' && 'Sending...'}
                {formStatus === 'sent' && 'Message Sent!'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-600">
        <p>© {new Date().getFullYear()} NOVA PORTFOLIO. BUILT WITH INTENTION.</p>
        <div className="flex gap-8">
           <a href="#" className="hover:text-white transition-colors">GitHub</a>
           <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
           <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
