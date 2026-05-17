"use client";

import React, { useState } from 'react';
import { MdEmail, MdLocationOn, MdCheckCircle } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  
  // State to hold the form data matching your exact API payload
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    projectDetails: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // The actual API integration function hitting /api/lead
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sending the exact payload structure you defined
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && !data.hasError) {
        setSubmitStatus('success');
        // Capture the dynamic message from your Node.js response
        setResponseMessage(data.message);
        // Clear the form on success
        setFormData({ name: '', email: '', projectType: '', projectDetails: '' });
      } else {
        setSubmitStatus('error');
        setResponseMessage(data.message || 'Failed to submit request.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setResponseMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      if (submitStatus !== 'error') {
         setTimeout(() => {
           setSubmitStatus('idle');
           setResponseMessage('');
         }, 5000);
      }
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Collaborate</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Have a project in mind? I am currently available for freelance work and custom software development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Contact Information */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Build With Me</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              I specialize in building scalable web applications, robust APIs, and complete full-stack systems. Whether you need a platform built from scratch or an existing backend optimized, drop me a message to discuss your project requirements.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                <MdEmail className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Email</p>
                <a href="mailto:swayam.vasavada1505@gmail.com" className="text-lg font-medium text-slate-200 hover:text-cyan-400 transition-colors">
                  swayam.vasavada1505@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                <MdLocationOn className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Location</p>
                <p className="text-lg font-medium text-slate-200">
                  Vadodara, Gujarat, India
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Social Profiles</p>
            <div className="flex gap-4">
              <a href="https://github.com/swayamvasavada" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group shadow-lg">
                <FaGithub className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
              </a>
              <a href="https://linkedin.com/in/swayamvasavada" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-blue-500/50 hover:text-blue-400 transition-all group shadow-lg">
                <FaLinkedin className="w-6 h-6 text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur-xl opacity-20 pointer-events-none"></div>
          
          <form 
            onSubmit={handleSubmit}
            className="relative p-8 md:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 flex flex-col gap-6 shadow-2xl"
          >
            {/* Dynamic Success Message UI */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/50 flex items-start gap-3">
                <MdCheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-400">Success!</h3>
                  <p className="text-xs text-emerald-200/70 mt-1">{responseMessage}</p>
                </div>
              </div>
            )}

            {/* Dynamic Error Message UI */}
            {submitStatus === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50">
                <h3 className="text-sm font-bold text-red-400">Something went wrong.</h3>
                <p className="text-xs text-red-200/70 mt-1">{responseMessage}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-400">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="projectType" className="text-sm font-medium text-slate-400">Project Type</label>
              <input 
                type="text" 
                id="projectType" 
                value={formData.projectType}
                onChange={handleChange}
                required
                placeholder="e.g., E-Commerce Platform / API Integration"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="projectDetails" className="text-sm font-medium text-slate-400">Project Details</label>
              <textarea 
                id="projectDetails" 
                value={formData.projectDetails}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Hello Swayam, I have a project idea and would like to discuss the timeline and scope..."
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all shadow-lg flex justify-center items-center gap-2 ${
                isSubmitting 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transform hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? 'Sending Proposal...' : 'Send Message'}
              {!isSubmitting && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}