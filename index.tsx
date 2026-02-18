
import React, { useState, useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Types & Constants ---
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Quantum Cloud Dashboard",
    description: "An enterprise-grade monitoring suite for multi-cloud environments. Features real-time telemetry and predictive anomaly detection.",
    tags: ["React", "TypeScript", "D3.js", "AWS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description: "An educational tool that renders deep learning architectures in 3D. Allows users to inspect weight distributions in real-time.",
    tags: ["Three.js", "Python", "WebGPU"],
    link: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "EcoSphere IoT Hub",
    description: "A secure gateway for smart city sensors. Utilizes a lightweight Rust-based microkernel for extreme reliability in edge computing.",
    tags: ["Rust", "Solidity", "IoT"],
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Aura Fintech App",
    description: "Mobile-first banking experience focused on digital assets. Integrated with institutional-grade security protocols.",
    tags: ["React Native", "Firebase", "Stripe"],
    link: "#",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "OmniSearch Engine",
    description: "A semantic document retrieval system. Uses LLMs to index and query large-scale corporate knowledge bases.",
    tags: ["Gemini API", "Python", "ElasticSearch"],
    link: "#",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Helix Code Editor",
    description: "A browser-based IDE optimized for low-latency collaboration. Built on a custom virtual DOM implementation.",
    tags: ["Node.js", "Socket.io", "WASM"],
    link: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
  }
];

const SKILLS = [
  "React / Next.js", "TypeScript", "Node.js", "Go / Rust", 
  "AWS / GCP", "Docker / K8s", "PostgreSQL", "Tailwind CSS",
  "GraphQL", "Web3 / Solidity", "Python / ML", "CI/CD Pipelines"
];

const EXPERIENCE = [
  {
    company: "TechNexus Systems",
    role: "Senior Full Stack Engineer",
    period: "2021 — Present",
    description: "Leading the transition to a micro-frontend architecture, improving deployment speeds by 40%."
  },
  {
    company: "DataVibe Analytics",
    role: "Software Engineer",
    period: "2018 — 2021",
    description: "Developed real-time data visualization tools used by Fortune 500 companies for supply chain tracking."
  },
  {
    company: "CloudScale Inc",
    role: "Frontend Developer",
    period: "2016 — 2018",
    description: "Built and maintained complex React-based dashboards for cloud infrastructure management."
  }
];

// --- AI Service ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const chatWithAssistant = async (userInput: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: `You are an AI representative of Alex, a Senior Software Engineer. 
        Keep answers short, professional, and slightly witty. Alex is expert in React, Node, and Cloud.
        If asked about projects, mention the ones in the portfolio. Alex is open for hire.`,
        temperature: 0.7,
      },
    });
    return response.text || "I'm having a bit of a brain fog. Try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The server is taking a nap. Could you ask me later?";
  }
};

// --- Sub-components ---

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800' : 'py-8 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xl font-bold tracking-tighter text-white hover:opacity-70 transition-opacity">
          NOVA<span className="text-neutral-500">.</span>
        </a>
        <div className="flex gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => scrollToSection(e, item.href)} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-500">
    <div className="aspect-[16/10] overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
    </div>
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        {project.tags.slice(0, 2).map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 bg-neutral-950 px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neutral-300 transition-colors">{project.title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed mb-6">{project.description}</p>
      <a href={project.link} className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
        View Project
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </a>
    </div>
  </div>
);

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hi! I'm Alex's AI twin. Want to know more about my skills?" }]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const response = await chatWithAssistant(input);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
            <span className="text-sm font-semibold text-white tracking-tight">AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-200'}`}>{msg.content}</div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-neutral-500 animate-pulse">Alex is thinking...</div>}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 bg-neutral-950 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors" />
            <button type="submit" className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50" disabled={isTyping}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="group w-14 h-14 bg-white text-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

// --- Main App ---

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
    const target = document.getElementById('work');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => { setFormStatus('sent'); setTimeout(() => setFormStatus('idle'), 3000); }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 selection:bg-white selection:text-black">
      <Navbar />
      
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-20">
        <div className="max-w-3xl animate-fade-in">
          <h2 className="text-neutral-500 font-medium mb-6">Senior Software Engineer & Architect</h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight mb-8">
            Digital craftsmanship <br /><span className="text-neutral-600">at the speed of thought.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl">
            I build robust systems that bridge the gap between complex backend infrastructure and elegant, minimalist user interfaces.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#work" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-neutral-200 transition-all hover:-translate-y-1">Explore Work</a>
            <a href="#contact" className="border border-neutral-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-900 transition-all hover:-translate-y-1">Let's Talk</a>
          </div>
        </div>
      </section>

      <section id="work" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 mb-4 block">Selected Works</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Technical Portfolio</h2>
          </div>
          <p className="text-neutral-400 max-w-sm">Focusing on scalability, performance, and emerging tech experiments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paginatedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
        <div className="flex justify-center items-center gap-4">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${currentPage === i + 1 ? 'bg-white text-black scale-110' : 'bg-neutral-900 text-neutral-500 hover:bg-neutral-800'}`}>{i + 1}</button>
            ))}
          </div>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight">Simplicity is the ultimate sophistication.</h2>
            <p className="text-neutral-400 leading-relaxed">I approach software engineering like an architect. Every component should serve a clear purpose. My goal is to reduce complexity until only the essentials remain.</p>
            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-white font-semibold mb-6 tracking-tight text-sm uppercase">Quick Bio</h3>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex justify-between"><span className="text-neutral-500">Based in</span><span>San Francisco, CA</span></li>
                <li className="flex justify-between"><span className="text-neutral-500">Education</span><span>BS Computer Science</span></li>
              </ul>
            </div>
          </div>
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
      </section>

      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900 scroll-mt-24">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 mb-12 block text-center">Journey</span>
        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 gap-8">
                <div className="text-neutral-500 text-sm font-medium mb-2 md:text-right">{exp.period}</div>
                <div className="md:col-span-3 pb-12 border-l border-neutral-800 md:pl-12 relative">
                  <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="text-neutral-400 mb-4">{exp.company}</div>
                  <p className="text-neutral-500 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="bg-white text-black rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Ready to start?</h2>
            <p className="text-neutral-600 mb-12 text-lg">I'm looking for ambitious projects. Drop me a line.</p>
            <div className="space-y-4">
              <a href="mailto:hello@nova.dev" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="font-semibold underline">hello@nova.dev</span>
              </a>
            </div>
          </div>
          <div className="bg-neutral-100 p-12 md:p-20">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500">Name</label>
                <input required type="text" className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500">Email</label>
                <input required type="email" className="w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>
              <button type="submit" disabled={formStatus !== 'idle'} className="w-full bg-black text-white py-4 rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                {formStatus === 'idle' ? 'Send Message' : formStatus === 'sending' ? 'Sending...' : 'Message Sent!'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-600">
        <p>© {new Date().getFullYear()} NOVA PORTFOLIO.</p>
        <div className="flex gap-8">
           <a href="#" className="hover:text-white transition-colors">GitHub</a>
           <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
