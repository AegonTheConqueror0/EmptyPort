
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
