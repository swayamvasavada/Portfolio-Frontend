import React from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { Metadata } from 'next';
import DynamicIcon from '../../components/DynamicIcon';

// 1. Interfaces matching your API
interface Skill {
  skillID: number;
  skillName: string;
  skillIcon: string;
  skillIconColor: string;
  categoryID: number;
}

interface Project {
  projectID: number;
  projectName: string;
  projectDescription: string;
  slug: string;
  githubURL: string;
  liveDemoURL: string;
  isFeatured: boolean;
  Skills: Skill[];
}

interface ApiResponse {
  hasError: boolean;
  message: string;
  result: Project | null;
}

// 2. Server-side fetch function
async function getProjectDetails(slug: string): Promise<ApiResponse> {
  try {
    // Note: If your API strictly requires the ID (e.g., /api/project/11), 
    // you will need to ensure your backend supports querying by the slug string, 
    // OR change this URL to match your backend logic.
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project/${slug}`, {
      cache: 'no-store',
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    return {
      hasError: true,
      message: "Unable to connect to the server.",
      result: null
    };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Reuse your existing fetch function here!
  const apiResponse = await getProjectDetails(slug); 
  const project = apiResponse.result;

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.projectName,
    description: project.projectDescription.substring(0, 150) + "...", // Truncate for SEO
  };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const apiResponse = await getProjectDetails(slug);

  if (apiResponse.hasError || !apiResponse.result) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <MdErrorOutline className="w-16 h-16 text-red-400 mb-6 opacity-80" />
        <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-slate-400 mb-8">{apiResponse.message || "The project you are looking for does not exist or could not be loaded."}</p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500 transition-all"
        >
          <FaArrowLeft /> Back to Projects
        </Link>
      </main>
    );
  }

  const project = apiResponse.result;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">

      {/* Back Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-400 mb-12 transition-colors group"
      >
        <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
        Back to all projects
      </Link>

      {/* Project Header */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            {project.isFeatured && (
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Featured Project
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {project.projectName}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 shrink-0">
            {project.githubURL && (
              <a
                href={project.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all font-medium text-sm"
              >
                <FaGithub className="w-4 h-4" />
                Source Code
              </a>
            )}
            {project.liveDemoURL && (
              <a
                href={project.liveDemoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all font-bold text-sm transform hover:-translate-y-0.5"
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Project Description (Glassmorphic Card) */}
        <div className="p-8 md:p-10 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl">
          <h2 className="text-xl font-bold text-slate-100 mb-6">About this project</h2>
          <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
            {project.projectDescription}
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      {project.Skills && project.Skills.length > 0 && (
        <div className="border-t border-slate-800/50 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Technologies Used</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {project.Skills.map((skill) => (
              <div
                key={skill.skillID}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-all group"
              >
                <DynamicIcon
                  name={skill.skillIcon}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  style={{ color: skill.skillIconColor }}
                />
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {skill.skillName}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}