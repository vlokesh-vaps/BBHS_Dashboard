'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Tv,
  Sparkles,
  Globe,
  Share2,
  UserCheck,
  MessageSquare,
  LayoutGrid,
  Award,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import {
  bbhsSchoolProfile,
  bbhsAnalyticsData,
  bbhsSocialMediaData,
  bbhsLeadsData,
  bbhsChatbotData,
} from '../../data/bbhsData';
import HubView from '../HubView';
import AnalyticsTab from '../AnalyticsTab';
import SocialMediaTab from '../SocialMediaTab';
import LeadsTab from '../LeadsTab';
import ChatbotTab from '../ChatbotTab';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    id: 'hub',
    title: 'Executive Master Cockpit',
    subtitle: 'Integrated Multi-Channel Telemetry & Overview',
    icon: LayoutGrid,
    takeaway: 'All 4 school systems operating at peak performance: 148K web visitors, 49.5K social community, 1,284 admissions leads, and 91.4% AI resolution.',
  },
  {
    id: 'analytics',
    title: 'Website Analytics & Acquisition',
    subtitle: 'Google Analytics 4 &bull; baldwin-high-school.vercel.app',
    icon: Globe,
    takeaway: 'Organic Search dominates at 48.6%, driven by queries for ICSE/ISC admissions 2026-27 and Richmond Town campus boarding.',
  },
  {
    id: 'social',
    title: 'Social Media Community & Reach',
    subtitle: 'Instagram, Facebook, YouTube & LinkedIn Growth',
    icon: Share2,
    takeaway: 'Audience grew +14.8% MoM to 49,540 followers with 1.34M impressions, led by Annual Athletic Meet viral reels and ICSE toppers.',
  },
  {
    id: 'leads',
    title: 'Admissions CRM & Enrollment Funnel',
    subtitle: 'Academic Year 2026-27 Enrollment Tracking',
    icon: UserCheck,
    takeaway: '1,284 total inquiries resulted in 154 confirmed enrollments (12.0% conversion). Alumni referrals yield the highest closing rate at 24.8%.',
  },
  {
    id: 'chatbot',
    title: 'AI Admissions Virtual Assistant',
    subtitle: '24/7 Automated Parent Inquiries & CSAT Telemetry',
    icon: MessageSquare,
    takeaway: '18,420 conversations handled with 91.4% resolution without human intervention; parents rated the bot 4.86 / 5.0 in CSAT.',
  },
];

const SLIDE_DURATION = 14; // seconds per slide during autoplay

export default function PresentationMode({ isOpen, onClose }: PresentationModeProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slides[currentSlideIndex];

  // Fullscreen helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // Keyboard navigation: Left/Right/Space/Esc
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const intervalMs = 100;
    const step = 100 / ((SLIDE_DURATION * 1000) / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentSlideIndex]);

  const nextSlide = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setProgress(0);
    setCurrentSlideIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md text-white flex flex-col overflow-hidden animate-fade-in">
      {/* 1. Top Presentation Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 relative">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Executive Presentation Header */}
      <header className="bg-[#0B192C] px-6 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 shadow-lg">
        {/* Left: School Crest & Meeting Header */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md ring-2 ring-amber-400 shrink-0 flex items-center justify-center">
            <img
              src="/baldwin_crest.png"
              alt="BBHS Crest"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-bold font-serif text-white">
                Baldwin Boys&apos; High School
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                BOARDROOM PRESENTATION
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center space-x-2">
              <span className="text-amber-400 font-semibold">Founded 1880 &bull; Bangalore</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 italic">Legacy of Excellence, Forward in Vision</span>
            </p>
          </div>
        </div>

        {/* Center: Slide Switcher Pills */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
          {slides.map((s, idx) => {
            const Icon = s.icon;
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Controller Tools */}
        <div className="flex items-center space-x-2">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 flex items-center space-x-1 text-xs"
            title={isPlaying ? 'Pause Auto-Advance (Space)' : 'Play Auto-Advance (Space)'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline text-[11px] font-medium">{isPlaying ? 'Auto-Cycle' : 'Paused'}</span>
          </button>

          {/* Prev/Next */}
          <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
            <button
              onClick={prevSlide}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-l-lg transition-colors"
              title="Previous Slide (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold px-2 text-slate-300">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-r-lg transition-colors"
              title="Next Slide (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit Presentation */}
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center space-x-1 shadow-sm"
            title="Exit Presentation View (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* 3. Executive Boardroom Takeaway Banner */}
      <div className="bg-[#061325] px-6 py-2.5 border-b border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded border border-amber-500/30 flex items-center space-x-1 shrink-0">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Slide {currentSlideIndex + 1}: {currentSlide.title}</span>
          </span>
          <span className="text-slate-300 font-medium truncate max-w-3xl">
            {currentSlide.takeaway}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-slate-400 shrink-0">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Data Sync</span>
          </span>
          <span>&bull;</span>
          <span>Press [Space] to pause</span>
        </div>
      </div>

      {/* 4. Main Slide Canvas Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 text-slate-900">
        <div className="max-w-7xl mx-auto">
          {currentSlide.id === 'hub' && <HubView onNavigate={(id) => goToSlide(slides.findIndex((s) => s.id === id))} />}
          {currentSlide.id === 'analytics' && <AnalyticsTab />}
          {currentSlide.id === 'social' && <SocialMediaTab />}
          {currentSlide.id === 'leads' && <LeadsTab />}
          {currentSlide.id === 'chatbot' && <ChatbotTab />}
        </div>
      </main>

      {/* 5. Floating Bottom Slide Controls */}
      <footer className="bg-[#0B192C]/90 backdrop-blur-md border-t border-slate-800 px-6 py-2.5 flex items-center justify-between shrink-0 text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="text-white font-serif font-bold text-xs">
            Baldwin Boys&apos; High School
          </span>
          <span>&bull;</span>
          <span className="text-slate-300">Methodist Church in India</span>
          <span>&bull;</span>
          <span className="text-amber-400/90 font-mono">CISCE Affiliated</span>
        </div>

        {/* Quick Slide Navigation Dots */}
        <div className="flex items-center space-x-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlideIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              title={`Go to ${s.title}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

