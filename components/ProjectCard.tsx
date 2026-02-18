
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-500">
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 bg-neutral-950 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neutral-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
          {project.description}
        </p>
        <a 
          href={project.link} 
          className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:translate-x-1 transition-transform"
        >
          View Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
