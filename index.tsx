import React, { useState, useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
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

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Quantum Cloud Dashboard",
    description: "Enterprise-grade monitoring suite for multi-cloud environments with real-time telemetry.",
    tags: ["React", "TypeScript", "AWS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Neural Architect",
    description: "Educational tool rendering deep learning architectures in 3D using WebGPU.",
    tags: ["Three.js", "Python"],
    link: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "EcoSphere IoT",
    description: "Secure gateway for smart city sensors built on a lightweight Rust microkernel.",
    tags: ["Rust", "IoT"],
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Aura Ledger",
    description: "Mobile-first banking experience focused on cross-chain digital asset management.",
    tags: ["React Native", "Firebase"],
    link: "#",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Semantic Indexer",
    description: "LLM-powered document retrieval system for large corporate knowledge bases.",
    tags: ["Gemini API", "Python"],
    link: "#",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Helix IDE",
    description: "Browser-based collaborative development environment optimized for low-latency.",
    tags: ["Node.js", "WASM"],
    link: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
  }
];

const SKILLS = [
  "React / Next.js", "TypeScript", "Node.js", "Go / Rust", 
  "AWS / GCP", "Docker / K8s", "PostgreSQL", "Tailwind CSS",
  "GraphQL", "Python / AI", "CI/CD"
];

const EXPERIENCE = [
  {
    company: "TechNexus Systems",
    role: "Senior Full Stack Engineer",
    period: "2021 — Present",
    description: "Orchestrated transition to micro-frontend architecture, increasing deployment frequency by 250%."
  },
  {
    company: "DataVibe Analytics",
    role: "Software Engineer",
    period: "2018 — 2021",
    description: "Developed high-throughput data visualization engines processing millions of events per second."
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
        systemInstruction: "You are the AI representative of Alex, a Senior Software Engineer. Be professional, minimalist, and helpful. Focus on Alex's expertise in React, Rust, and Cloud Architecture.",
      },
    });
    return response.text || "I'm processing that. Can you rephrase?";
  } catch (err) {
    return "Alex is currently focused on shipping code. I'm briefly offline.";
  }
};

// --- Components ---

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800' : 'py-8 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tighter text-white">NOVA<span className="text-neutral-500">.</span></a>
        <div className="hidden md:flex gap-8">
          {['Work', 'About', 'Experience', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-white transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hi, I'm Alex's AI Twin. How can I help you today?" }]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const reply = await chatWithAssistant(input);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[450px] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          <div className="p-4 bg-neutral-950 flex justify-between items-center border-b border-neutral-800">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Career Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-neutral-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-white text-black font-medium' : 'bg-neutral-800 text-neutral-300'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Typing...</div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-neutral-800 bg-neutral-950 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600" />
            <button type="submit" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-white text-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

// --- App ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 3;
  const totalPages = Math.ceil(PROJECTS.length / PER_PAGE);
  const displayProjects = useMemo(() => PROJECTS.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE), [currentPage]);

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const onContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => { setFormStatus('sent'); setTimeout(() => setFormStatus('idle'), 3000); }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-400">
      <Navbar />
      
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-20">
        <div className="max-w-3xl animate-fade-in">
          <h2 className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">Software Engineer & Systems Architect</h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight mb-8">
            Building the next <br />generation of <span className="text-neutral-600">infrastructure.</span>
          </h1>
          <div className="flex gap-6 mt-12">
            <a href="#work" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-neutral-200 transition-all hover:-translate-y-1">View Projects</a>
            <a href="#contact" className="border border-neutral-800 text-white px-10 py-4 rounded-full font-bold hover:bg-neutral-900 transition-all hover:-translate-y-1">Contact Me</a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-32 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Selected Works</h2>
            <p className="text-neutral-500 max-w-md">A showcase of systems that prioritize performance, security, and elegant architecture.</p>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
             {[...Array(totalPages)].map((_, i) => (
               <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${currentPage === i+1 ? 'bg-white text-black' : 'bg-neutral-900 hover:bg-neutral-800'}`}>
                 0{i + 1}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map(p => (
            <div key={p.id} className="group bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all duration-500">
              <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.title} />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  {p.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">{t}</span>)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed mb-6">{p.description}</p>
                <a href={p.link} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                  Case Study <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 px-6 max-w-6xl mx-auto border-t border-neutral-900 scroll-mt-24">
        <h2 className="text-center text-neutral-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-20">Professional Experience</h2>
        <div className="max-w-4xl mx-auto space-y-16">
           {EXPERIENCE.map((exp, i) => (
             <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-8 group">
               <div className="text-neutral-600 text-sm font-bold md:text-right">{exp.period}</div>
               <div className="md:col-span-3 pb-8 border-l border-neutral-900 pl-8 md:pl-12 relative group-hover:border-neutral-700 transition-colors">
                 <div className="absolute top-0 -left-[4px] w-2 h-2 rounded-full bg-neutral-800 group-hover:bg-white transition-colors"></div>
                 <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                 <p className="text-neutral-400 font-semibold mb-6">{exp.company}</p>
                 <p className="text-neutral-500 leading-relaxed max-w-2xl">{exp.description}</p>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="bg-white text-black rounded-[3rem] grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl">
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">Let's talk <br />systems.</h2>
            <p className="text-neutral-600 mb-12 text-lg font-medium">I'm currently accepting new projects and consulting opportunities.</p>
            <a href="mailto:hello@nova.dev" className="text-2xl font-bold underline underline-offset-8 decoration-neutral-300 hover:decoration-black transition-all">hello@nova.dev</a>
          </div>
          <div className="bg-neutral-50 p-12 md:p-20">
            <form onSubmit={onContact} className="space-y-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                 <input required className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors" placeholder="Type here..." />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                 <input required type="email" className="w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors" placeholder="your@email.com" />
               </div>
               <button type="submit" disabled={formStatus !== 'idle'} className="w-full bg-black text-white py-5 rounded-full font-bold tracking-widest text-xs uppercase hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                 {formStatus === 'idle' ? 'Send Message' : formStatus === 'sending' ? 'Sending...' : 'Message Sent!'}
               </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-neutral-900">
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">© {new Date().getFullYear()} NOVA PORTFOLIO. BUILT BY ALEX.</p>
        <div className="flex gap-12">
          {['GitHub', 'LinkedIn', 'Twitter'].map(link => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);