import React from 'react';
import DynamicIcon from '../components/DynamicIcon'; // The component we built earlier

// 1. Define your TypeScript interfaces based on your backend schema
interface Skill {
  skillID: number;
  skillName: string;
  skillIcon: string;
  skillIconColor: string;
}

interface Category {
  categoryID: number;
  categoryName: string;
  categoryDescription: string;
  themeColor: string;
  displayOrder: number;
  Skills: Skill[];
}

// 2. Server-side fetch function
async function getSkillsData(): Promise<Category[]> {
  try {
    // 'no-store' ensures it fetches fresh data every time during development
    const res = await fetch('http://localhost:5000/api/category?includeSkills=true', {
      cache: 'no-store', 
    });
    
    if (!res.ok) throw new Error('Failed to fetch skills');
    
    const data = await res.json();
    
    // Sort categories by your displayOrder column before returning
    if (data && data.result) {
        return data.result.sort((a: Category, b: Category) => a.displayOrder - b.displayOrder);
    }
    return [];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return []; // Return empty array on failure so the page doesn't crash
  }
}

export default async function SkillsPage() {
  // 3. Await the data directly in the component
  const categories = await getSkillsData();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arsenal</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          A comprehensive overview of the tools, frameworks, and architectural concepts I use to engineer full-stack solutions.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div 
            key={category.categoryID} 
            // Using the themeColor straight from your DB!
            className={`group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 transition-all duration-500 overflow-hidden ${category.themeColor}`}
          >
            {/* Background Glow Effect */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-slate-500 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>

            {/* Category Header */}
            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">{category.categoryName}</h2>
              <p className="text-sm text-slate-400">{category.categoryDescription}</p>
            </div>

            {/* Individual Skills List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {category.Skills && category.Skills.length > 0 ? (
                category.Skills.map((skill) => (
                  <div 
                    key={skill.skillID} 
                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-colors group/item"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover/item:opacity-20 transition-opacity duration-300 bg-white"></div>
                      
                      {/* Dynamic Icon Integration */}
                      <DynamicIcon 
                        name={skill.skillIcon} 
                        // If your DB color is just "green", map it to a tailwind text class, or pass it via inline styles
                        className="w-5 h-5 relative z-10 group-hover/item:scale-110 group-hover/item:-rotate-12 transition-all duration-300 drop-shadow-[0_0_8px_currentColor]" 
                        style={{ color: skill.skillIconColor }}
                      />
                    </div>
                    
                    <span className="text-sm font-semibold text-slate-200 group-hover/item:text-white transition-colors">
                      {skill.skillName}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">No skills added yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}