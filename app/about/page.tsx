import React from 'react';
import Link from 'next/link';
import { MdDownload, MdErrorOutline } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';
import Image from 'next/image';

// 1. Interfaces matching your API
interface Journey {
  journeyID: number;
  journeyTitle: string;
  journeyDescription: string;
  iconName: string;
  iconColor: string;
  startDate: string;
  endDate: string | null;
}

interface ApiResponse {
  hasError: boolean;
  message: string;
  result: Journey[];
}

// 2. Server-side fetch with graceful error handling
async function getJourneyData(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/journey/`, {
      cache: 'no-store',
    });

    const data = await res.json();

    // If the server explicitly sent an error response
    if (!res.ok || data.hasError) {
      return {
        hasError: true,
        message: data.message || "Failed to fetch journey data.",
        result: []
      };
    }

    return data;
  } catch (error) {
    // Catching network errors (e.g., backend is down)
    console.error("Journey fetch error:", error);
    return {
      hasError: true,
      message: "Unable to connect to the server. Please try again later.",
      result: []
    };
  }
}

// Helper to format ISO dates to "MMM YYYY"
function formatDate(dateString: string | null) {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default async function AboutPage() {
  const apiResponse = await getJourneyData();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">

      {/* Intro Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">

        {/* Left: Image */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>

          {/* Main Card Container */}
          <div className="relative aspect-[4/5] rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 overflow-hidden shadow-2xl group">
            
            {/* The Image is now a direct child of the card.
              It will fill the entire card beautifully and zoom in slightly on hover!
            */}
            <Image
              src="/Swayam Photo.jpg"
              alt="Swayam Vasavada"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Status Badge (Ensure z-10 is here so it stays on top of the image) */}
            <div className="absolute top-4 right-4 w-20 h-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full flex items-center px-2 gap-2 z-10 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] text-slate-300 font-mono">Available</span>
            </div>
            
          </div>
        </div>

        {/* Right: Bio */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Experiences</span>
          </h1>

          <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
            <p>
              Hi, I'm Swayam. I am a B.Tech Computer Science and Engineering student based in Vadodara, India, with a deep passion for building robust, full-stack software solutions.
            </p>
            <p>
              My journey started with a fascination for how data moves behind the scenes. Today, I specialize in bridging the gap between complex backend architectures—like Spring Boot microservices and secure relational databases—and lightning-fast, intuitive frontend interfaces using Next.js.
            </p>
            <p>
              Whether I am developing a comprehensive campus productivity platform or optimizing algorithms, my goal is always the same: write clean, scalable code that solves real-world problems.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <a
              href="/Swayam Vasavada Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-950 font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
            >
              <MdDownload className="text-xl" />
              Download Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transform hover:-translate-y-1"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </section>

      {/* The Journey / Timeline Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">My Journey</h2>

        {/* Graceful Error UI */}
        {apiResponse.hasError ? (
          <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <MdErrorOutline className="w-12 h-12 text-red-400 mb-4 opacity-80" />
            <h3 className="text-lg font-bold text-slate-200 mb-2">Timeline Currently Unavailable</h3>
            <p className="text-red-300/80">{apiResponse.message}</p>
          </div>
        ) : (
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-transparent">

            {/* Map over successful API results */}
            {apiResponse.result.map((item) => (
              <div key={item.journeyID} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-all duration-300">
                  <DynamicIcon
                    name={item.iconName}
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: item.iconColor }}
                  />
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-100 text-lg">{item.journeyTitle}</h3>
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full whitespace-nowrap ml-3">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.journeyDescription}
                  </p>
                </div>

              </div>
            ))}

            {/* Fallback if database is empty but returns no error */}
            {!apiResponse.hasError && apiResponse.result.length === 0 && (
              <p className="text-slate-500 text-center italic">Journey details are currently being updated.</p>
            )}

          </div>
        )}
      </section>

    </main>
  );
}