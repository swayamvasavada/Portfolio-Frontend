import Link from 'next/link';
import DynamicIcon from '../components/DynamicIcon';

// 1. Define your TypeScript interfaces based on the new API response
interface Skill {
  skillID: number;
  skillName: string;
  skillIcon: string;
  skillIconColor: string;
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

// 2. Server-side fetch function
async function getProjectsData(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project/list`, {
      cache: 'no-store', // Ensures fresh data is fetched on every request
    });
    
    if (!res.ok) throw new Error('Failed to fetch projects');
    
    const data = await res.json();
    return data.result || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  // 3. Await the dynamic project data
  const projects = await getProjectsData();

  // A vibrant set of gradients to give each project card a unique glowing accent
  const accentGradients = [
    "from-cyan-400 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-red-500"
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-16 md:mb-24 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A collection of my technical builds, ranging from full-stack university platforms to complex backend architectures. Click on any project to read the detailed case study.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project, index) => {
            const currentGradient = accentGradients[index % accentGradients.length];
            const mainSkill = project.Skills && project.Skills.length > 0 ? project.Skills[0] : null;

            return (
              <div 
                key={project.projectID} 
                className="group relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-full hover:-translate-y-2"
              >
                {/* Top Section: Icon & Text */}
                <div className="flex-grow">
                  {/* Dynamic 3D Icon Container */}
                  <div className="w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg relative overflow-hidden">
                    {/* Ambient glow behind the main icon */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    
                    {/* Display the icon of the project's primary skill, fallback to a gradient cube if no skills exist */}
                    {mainSkill ? (
                      <DynamicIcon 
                        name={mainSkill.skillIcon} 
                        className="w-6 h-6 relative z-10 drop-shadow-[0_0_8px_currentColor] group-hover:rotate-12 transition-transform duration-500" 
                        style={{ color: mainSkill.skillIconColor }}
                      />
                    ) : (
                      <div className={`w-6 h-6 bg-gradient-to-br ${currentGradient} rounded-md transform rotate-45 group-hover:rotate-180 transition-transform duration-700`}></div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.projectName}
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-sm mb-6 line-clamp-3">
                    {project.projectDescription}
                  </p>
                </div>
                
                {/* Bottom Section: Skills Tags & Links */}
                <div className="mt-auto pt-6 border-t border-slate-800/50">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.Skills && project.Skills.map((skill) => (
                      <span 
                        key={skill.skillID} 
                        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
                      >
                        {/* Dynamic mini-icon for each tech stack item */}
                        <DynamicIcon 
                          name={skill.skillIcon} 
                          className="w-3.5 h-3.5" 
                          style={{ color: skill.skillIconColor }}
                        />
                        {skill.skillName}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="inline-flex items-center text-cyan-400 text-sm font-bold group-hover:text-cyan-300 transition-colors"
                  >
                    View Case Study 
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-slate-500 italic col-span-full">No projects found. Check back later!</p>
        )}
      </div>

    </main>
  );
}