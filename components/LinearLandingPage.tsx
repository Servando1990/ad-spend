"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BarChart3, Zap, Star, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Head from 'next/head';

const LinearLandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const calInitialized = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Load Cal.com script
  useEffect(() => {
    if (typeof window !== 'undefined' && !calInitialized.current) {
      calInitialized.current = true;
      
      // Cal.com initialization
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      // Initialize Cal
      (window as any).Cal("init", "30min", {origin:"https://cal.com"});
    }
  }, []);

  // Initialize Cal.com inline widget after component mounts
  useEffect(() => {
    // Wait for Cal.com to be fully loaded
    const initializeCalInline = () => {
      if (typeof window !== 'undefined' && window.Cal && window.Cal.ns && window.Cal.ns["30min"]) {
        window.Cal.ns["30min"]("inline", {
          elementOrSelector: "#my-cal-inline",
          config: {"layout":"month_view","theme":"dark"},
          calLink: "servando-torres-garcia-qco7rh/30min",
        });
        window.Cal.ns["30min"]("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"});
        return true;
      }
      return false;
    };

    // Try immediately
    if (!initializeCalInline()) {
      // If not loaded yet, try again after a delay
      const timer = setInterval(() => {
        if (initializeCalInline()) {
          clearInterval(timer);
        }
      }, 1000);
      
      // Clean up
      return () => clearInterval(timer);
    }
  }, []);

  // Function to scroll to Cal.com section
  const scrollToCalendar = () => {
    const calendarSection = document.getElementById('calendar');
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>LeadValueAI - Optimize Ad Spend with AI-Driven Lead Value</title>
        <meta name="description" content="Stop wasting budget on low-value leads. Our machine learning solution analyzes your data to predict lead value and optimize your Google Ads campaigns in real-time." />
      </Head>
      <div className="bg-zinc-950 text-zinc-200 min-h-screen font-sans antialiased">
        {/* Header */}
        <header className={`fixed top-0 w-full ${scrolled ? 'bg-zinc-950/80 backdrop-blur-lg' : 'bg-transparent'} transition-all duration-200 z-50`}>
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4 lg:px-0">
            <div className="text-white font-medium text-lg">LeadValueAI</div>
            <div className="flex items-center gap-6">
              <a href="#how-it-works" className="text-zinc-400 hover:text-white text-sm transition-colors">How it works</a>
              <a href="#pricing" className="text-zinc-400 hover:text-white text-sm transition-colors">Pricing</a>
              <button 
                onClick={scrollToCalendar}
                className="text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Get started
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 py-1 px-3 rounded-full mb-6 border border-zinc-800">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium">Now available for all Google Ads campaigns</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                AI-Driven Lead Value.<br />
                Optimize Ad Spend.<br />
                Focus On ROAS.
              </h1>
              <p className="text-zinc-400 text-xl mb-8 leading-relaxed">
                Stop wasting budget on low-value leads. Our machine learning solution analyzes your data to predict lead value and optimize your Google Ads campaigns in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToCalendar}
                  className="inline-flex items-center justify-center bg-white hover:bg-zinc-200 text-black font-medium rounded-lg px-6 py-3 transition-colors"
                >
                  Book a demo
                  <ArrowRight size={16} className="ml-2" />
                </button>
                <a href="#learn-more" className="inline-flex items-center justify-center border border-zinc-800 hover:border-zinc-700 rounded-lg px-6 py-3 transition-colors">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="text-white text-4xl font-bold mb-2 flex items-baseline gap-1">
                  +19%
                  <span className="text-green-500 text-base">↑</span>
                </div>
                <p className="text-zinc-500 text-sm">More conversions from the same ad spend</p>
              </div>
              <div className="group">
                <div className="text-white text-4xl font-bold mb-2 flex items-baseline gap-1">
                  -17.5%
                  <span className="text-green-500 text-base">↓</span>
                </div>
                <p className="text-zinc-500 text-sm">Lower cost per acquisition</p>
              </div>
              <div className="group">
                <div className="text-white text-4xl font-bold mb-2 flex items-baseline gap-1">
                  27%
                  <span className="text-green-500 text-base">↑</span>
                </div>
                <p className="text-zinc-500 text-sm">Higher conversion rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="mb-12">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">How it works</span>
              <h2 className="text-3xl font-bold text-white mt-2">Four steps to optimize your ad spend</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 text-white group-hover:border-zinc-600 transition-colors">1</div>
                  <h3 className="text-white text-xl font-medium">Data Integration</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed ml-14">We connect to your CRM, Google Ads, and sales systems to build a unified view of your customer journey.</p>
              </div>
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 text-white group-hover:border-zinc-600 transition-colors">2</div>
                  <h3 className="text-white text-xl font-medium">Value Prediction</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed ml-14">Our machine learning models analyze your historical data to predict the future value of each new lead.</p>
              </div>
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 text-white group-hover:border-zinc-600 transition-colors">3</div>
                  <h3 className="text-white text-xl font-medium">Google Ads Integration</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed ml-14">We feed these predictions back to Google through its target ROAS bidding system for immediate optimization.</p>
              </div>
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 text-white group-hover:border-zinc-600 transition-colors">4</div>
                  <h3 className="text-white text-xl font-medium">Continuous Improvement</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed ml-14">Our models automatically retrain on new data, continuously improving your marketing ROI.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="learn-more" className="py-20 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="mb-12">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">The problem</span>
              <h2 className="text-3xl font-bold text-white mt-2">Not all leads are created equal</h2>
              <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
                Standard Google Ads campaigns optimize for lead generation without considering the actual value those leads bring to your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <BarChart3 className="text-zinc-500 mb-4" size={24} />
                <h3 className="text-white text-lg font-medium mb-2">The Google Ads Problem</h3>
                <p className="text-zinc-400 text-sm">Google treats all leads equally, optimizing for quantity rather than quality and value.</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <Zap className="text-zinc-500 mb-4" size={24} />
                <h3 className="text-white text-lg font-medium mb-2">The Sales Pipeline Gap</h3>
                <p className="text-zinc-400 text-sm">Valuable conversion data comes too late in the sales cycle to inform your bidding strategy.</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <Star className="text-zinc-500 mb-4" size={24} />
                <h3 className="text-white text-lg font-medium mb-2">The Revenue Impact</h3>
                <p className="text-zinc-400 text-sm">Companies leave 15-30% of their marketing ROI on the table by not targeting high-value prospects.</p>
              </div>
            </div>
            
            <div className="mb-12">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">The solution</span>
              <h2 className="text-3xl font-bold text-white mt-2">Lead Value Prediction</h2>
              <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
                We connect advanced machine learning with Google's bidding system to automatically optimize for lead value, not just lead volume.
              </p>
            </div>
            
            {/* Flowchart */}
            <div className="mb-16 overflow-x-auto">
              <svg width="100%" height="220" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                {/* Google Ads Node */}
                <rect x="50" y="80" width="120" height="60" rx="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5"/>
                <text x="110" y="115" textAnchor="middle" fill="white" fontWeight="400" fontSize="13">Google Ads</text>
                
                {/* Current Approach Node */}
                <rect x="270" y="30" width="180" height="60" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
                <text x="360" y="55" textAnchor="middle" fill="#e4e4e7" fontWeight="400" fontSize="12">Current Approach</text>
                <text x="360" y="75" textAnchor="middle" fill="#a1a1aa" fontWeight="400" fontSize="12">Same Budget for All Leads</text>
                
                {/* Our Approach Node */}
                <rect x="270" y="130" width="180" height="60" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
                <text x="360" y="155" textAnchor="middle" fill="#e4e4e7" fontWeight="400" fontSize="12">Our Approach</text>
                <text x="360" y="175" textAnchor="middle" fill="#a1a1aa" fontWeight="400" fontSize="12">Budget Flows to High-Value</text>
                
                {/* Result Bad Node */}
                <rect x="550" y="30" width="140" height="60" rx="8" fill="#7f1d1d" stroke="#881337" strokeWidth="1.5"/>
                <text x="620" y="55" textAnchor="middle" fill="#e4e4e7" fontWeight="400" fontSize="12">Result</text>
                <text x="620" y="75" textAnchor="middle" fill="#a1a1aa" fontWeight="400" fontSize="12">Wasted Spend</text>
                
                {/* Result Good Node */}
                <rect x="550" y="130" width="140" height="60" rx="8" fill="#064e3b" stroke="#065f46" strokeWidth="1.5"/>
                <text x="620" y="155" textAnchor="middle" fill="#e4e4e7" fontWeight="400" fontSize="12">Result</text>
                <text x="620" y="175" textAnchor="middle" fill="#a1a1aa" fontWeight="400" fontSize="12">Higher ROAS</text>
                
                {/* Arrows */}
                {/* Google Ads to Current Approach */}
                <path d="M170 100 L230 60 L270 60" stroke="#3f3f46" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
                
                {/* Google Ads to Our Approach */}
                <path d="M170 110 L230 150 L270 150" stroke="#3f3f46" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
                
                {/* Current Approach to Result Bad */}
                <path d="M450 60 L550 60" stroke="#3f3f46" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
                <text x="500" y="45" textAnchor="middle" fill="#71717a" fontSize="11">Result</text>
                
                {/* Our Approach to Result Good */}
                <path d="M450 160 L550 160" stroke="#3f3f46" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
                <text x="500" y="145" textAnchor="middle" fill="#71717a" fontSize="11">Result</text>
                
                {/* Arrow Definitions */}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#3f3f46" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-20 bg-zinc-900/30 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="text-center">
              <div className="mb-8">
                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <path d="M13.5938 0C10.3125 3.71875 7.5 9.65625 7.5 15.5625C7.5 19.6875 9.75 24 14.8125 24C18.375 24 21.5625 21.375 21.5625 17.25C21.5625 13.6875 18.75 10.5 14.8125 10.5C14.4375 10.5 13.125 10.5 13.125 10.5C13.125 10.5 14.0625 5.34375 19.5 1.125L13.5938 0ZM28.5938 0C25.3125 3.71875 22.5 9.65625 22.5 15.5625C22.5 19.6875 24.75 24 29.8125 24C33.375 24 36.5625 21.375 36.5625 17.25C36.5625 13.6875 33.75 10.5 29.8125 10.5C29.4375 10.5 28.125 10.5 28.125 10.5C28.125 10.5 29.0625 5.34375 34.5 1.125L28.5938 0Z" fill="#3b82f6" fillOpacity="0.3"/>
                </svg>
              </div>
              <blockquote className="text-2xl text-white font-medium leading-relaxed max-w-3xl mx-auto mb-8">
                The lead value prediction system we implemented was the single most impactful marketing technology investment of the year, delivering a 3.2x return within the first quarter alone.
              </blockquote>
              <div className="text-zinc-400">Marketing Director, Leading SaaS Company</div>
            </div>
          </div>
        </section>

        {/* Pricing - now Book a call */}
        <section id="pricing" className="py-20 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="mb-12">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Book a call</span>
              <h2 className="text-3xl font-bold text-white mt-2">Find out more</h2>
              <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
                A phased approach to ensure your success at every step of implementation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors max-w-xl mx-auto">
                <div className="text-white text-lg font-medium mb-1">Audit & Assessment</div>
                <p className="text-zinc-400 text-sm mb-6">Understand your optimization potential</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-zinc-400">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>Data readiness evaluation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-400">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>Campaign structure analysis</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-400">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>ROI potential calculation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-400">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>Implementation roadmap</span>
                  </li>
                </ul>
                <button 
                  onClick={scrollToCalendar}
                  className="inline-flex items-center justify-center w-full bg-white hover:bg-zinc-200 text-black font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For */}
        <section className="py-20 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="mb-12">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">IDEAL FOR</span>
              <h2 className="text-3xl font-bold text-white mt-2">Who benefits most</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group flex flex-col">
                <div className="text-white text-lg font-medium mb-2">SaaS & Subscription</div>
                <p className="text-zinc-400 text-sm mb-3">
                  Companies with free trials, freemium models, or multi-stage conversion funnels.
                </p>
                <button 
                  onClick={scrollToCalendar}
                  className="inline-flex items-center mt-auto text-sm text-blue-500 hover:text-blue-400"
                >
                  Learn more <ArrowUpRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="group flex flex-col">
                <div className="text-white text-lg font-medium mb-2">Lead Generation</div>
                <p className="text-zinc-400 text-sm mb-3">
                  Businesses with sales cycles longer than one week from lead to purchase.
                </p>
                <button 
                  onClick={scrollToCalendar}
                  className="inline-flex items-center mt-auto text-sm text-blue-500 hover:text-blue-400"
                >
                  Learn more <ArrowUpRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="group flex flex-col">
                <div className="text-white text-lg font-medium mb-2">Google Ads Spenders</div>
                <p className="text-zinc-400 text-sm mb-3">
                  Organizations spending $50K+ monthly on Google Ads campaigns.
                </p>
                <button 
                  onClick={scrollToCalendar}
                  className="inline-flex items-center mt-auto text-sm text-blue-500 hover:text-blue-400"
                >
                  Learn more <ArrowUpRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="mb-12">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Our team</span>
              <h2 className="text-3xl font-bold text-white mt-2">Expert implementation partners</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="h-64 bg-zinc-900 rounded-lg mb-4 overflow-hidden">
                  <img src="/api/placeholder/320/256" alt="Servando Torres García" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-lg font-medium">Servando Torres García</h3>
                <p className="text-zinc-500 text-sm">Strategy & Implementation</p>
              </div>
              <div className="group">
                <div className="h-64 bg-zinc-900 rounded-lg mb-4 overflow-hidden">
                  <img src="/api/placeholder/320/256" alt="Ángel de Jaén" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-lg font-medium">Ángel de Jaén</h3>
                <p className="text-zinc-500 text-sm">Machine Learning Engineer</p>
              </div>
              <div className="group">
                <div className="h-64 bg-zinc-900 rounded-lg mb-4 overflow-hidden">
                  <img src="/api/placeholder/320/256" alt="David Loris" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-lg font-medium">David Loris</h3>
                <p className="text-zinc-500 text-sm">Marketing Analytics</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cal.com Section */}
        <section id="calendar" className="py-20 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="mb-12 text-center">
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Schedule a meeting</span>
              <h2 className="text-3xl font-bold text-white mt-2">Book your free consultation</h2>
              <p className="text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">
                Select a time that works for you and let's discuss how LeadValueAI can transform your marketing ROI.
              </p>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              {/* Cal.com inline embed */}
              <div 
                id="my-cal-inline" 
                style={{ width: '100%', height: '700px', overflow: 'scroll' }}
              ></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white font-medium mb-6 md:mb-0">LeadValueAI</div>
              <div className="flex gap-6">
                <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</a>
                <a href="mailto:contact@leadvalueai.com" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  contact@leadvalueai.com
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-900 text-zinc-500 text-sm text-center">
              © 2025 LeadValueAI. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LinearLandingPage; 