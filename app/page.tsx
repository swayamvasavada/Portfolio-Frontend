import Link from 'next/link';
import InteractiveCanvas from './components/InteractiveCanvas';
import DynamicIcon from './components/DynamicIcon';

// 1. Interfaces matching your Project API
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

// 2. Fetch projects and filter ONLY the featured ones
async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project/list`, {
      cache: 'no-store', 
    });
    
    if (!res.ok) throw new Error('Failed to fetch projects');
    
    const data = await res.json();
    if (data.result) {
      // Filter the array to only return projects where isFeatured is true
      return data.result.filter((project: Project) => project.isFeatured);
    }
    return [];
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function HomePage() {
  // 3. Await the data
  const featuredProjects = await getFeaturedProjects();

  // Vibrant gradients for the featured project cards
  const accentGradients = [
    "from-cyan-400 to-blue-500",
    "from-purple-500 to-pink-500",
  ];

  return (
    // Removed overflow-hidden from main so the page can scroll
    <main className="bg-slate-950 min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      {/* Kept overflow-hidden here so particles don't spill out of the hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        
        {/* The Background Canvas */}
        <InteractiveCanvas />

        {/* The Hero Content */}
        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full pointer-events-none">
          <div className="max-w-3xl pointer-events-auto mt-20">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm mb-8 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-300">Available for Freelance Projects</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Building scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">digital systems.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
              I'm a Full-Stack Engineer specializing in resilient backend architectures and high-performance React frontends. From database design to deployment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/projects" 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1"
              >
                View My Work
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700 text-white font-bold hover:border-cyan-500/50 hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Let's Talk
              </Link>
            </div>
            
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* ================= FEATURED PROJECTS SECTION ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-slate-400">Some of my most recent and impactful projects.</p>
          </div>
          <Link href="/projects" className="hidden md:inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold group">
            View all projects 
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Dynamic Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, index) => {
              const currentGradient = accentGradients[index % accentGradients.length];
              const mainSkill = project.Skills && project.Skills.length > 0 ? project.Skills[0] : null;

              return (
                <div 
                  key={project.projectID} 
                  className="group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-slate-600 transition-all duration-500 flex flex-col h-full overflow-hidden"
                >
                  {/* Subtle hover background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex-grow">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                      {mainSkill ? (
                        <DynamicIcon 
                          name={mainSkill.skillIcon} 
                          className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-500" 
                          style={{ color: mainSkill.skillIconColor }}
                        />
                      ) : (
                        <div className={`w-6 h-6 bg-gradient-to-br ${currentGradient} rounded-md transform rotate-45`}></div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-100 mb-3">{project.projectName}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm mb-6 line-clamp-3">
                      {project.projectDescription}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-auto pt-6 border-t border-slate-800/50 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.Skills && project.Skills.slice(0, 3).map((skill) => (
                        <div key={skill.skillID} className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center" title={skill.skillName}>
                          <DynamicIcon name={skill.skillIcon} className="w-3.5 h-3.5" style={{ color: skill.skillIconColor }} />
                        </div>
                      ))}
                      {project.Skills && project.Skills.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          +{project.Skills.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      href={`/projects/${project.slug}`} 
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 group-hover:bg-cyan-500 group-hover:text-white transition-colors"
                    >
                      ↗
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 italic col-span-full">Configure your database to feature projects here!</p>
          )}
        </div>
        
        {/* Mobile-only view all button */}
        <Link href="/projects" className="md:hidden mt-8 block text-center py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
          View all projects
        </Link>
      </section>

    </main>
  );
}