
import { Project, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Quantum Cloud Dashboard",
    description: "An enterprise-grade monitoring suite for multi-cloud environments. Features real-time telemetry using WebSockets and predictive anomaly detection.",
    tags: ["React", "TypeScript", "D3.js", "AWS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description: "An educational tool that renders deep learning architectures in 3D. Allows users to inspect weight distributions and gradient flow in real-time.",
    tags: ["Three.js", "Python", "WebGPU"],
    link: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "EcoSphere IoT Hub",
    description: "A secure gateway for smart city sensors. Utilizes a lightweight Rust-based microkernel for extreme reliability in edge computing scenarios.",
    tags: ["Rust", "Solidity", "IoT"],
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Aura Fintech App",
    description: "Mobile-first banking experience focused on digital assets. Integrated with institutional-grade security protocols and real-time market data.",
    tags: ["React Native", "Firebase", "Stripe"],
    link: "#",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "OmniSearch Engine",
    description: "A semantic document retrieval system. Uses LLMs to index and query large-scale corporate knowledge bases with natural language.",
    tags: ["Gemini API", "Python", "ElasticSearch"],
    link: "#",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Helix Code Editor",
    description: "A browser-based IDE optimized for low-latency collaboration. Built on a custom virtual DOM implementation for handling million-line files.",
    tags: ["Node.js", "Socket.io", "WASM"],
    link: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
  }
];

export const SKILLS = [
  "React / Next.js", "TypeScript", "Node.js", "Go / Rust", 
  "AWS / GCP", "Docker / K8s", "PostgreSQL", "Tailwind CSS",
  "GraphQL", "Web3 / Solidity", "Python / ML", "CI/CD Pipelines"
];

export const EXPERIENCE = [
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
