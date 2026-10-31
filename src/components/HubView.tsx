'use strict';
'use client';

import React, { useState } from 'react';
import { UserCheck, Info, ChevronDown, ChevronUp, Globe, Share2, MessageSquare, CheckCircle2 } from 'lucide-react';
import KpiSummaryRow from './hub/KpiSummaryRow';
import AnalyticsPanel from './hub/AnalyticsPanel';
import SocialPanel from './hub/SocialPanel';
import LeadsPanel from './hub/LeadsPanel';
import ChatbotPanel from './hub/ChatbotPanel';

interface HubViewProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Main School Leadership Overview.
 * Designed specifically for Non-IT School Administrators & Principal:
 * - Plain language explanations
 * - Clear action links
 * - 4 Visual Cards for Website, Social, Admissions, and AI Helpdesk
 */
export default function HubView({ onNavigate }: HubViewProps) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Leadership Executive Briefing Banner */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#132B45] to-[#1E3E62] text-white p-5 rounded-2xl shadow-sm border border-slate-700/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                School Leadership Briefing
              </span>
              <span className="text-xs text-slate-300">Academic Year 2026-27</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mt-1 text-white font-serif tracking-tight">
              Baldwin Boys&apos; High School &bull; Executive Performance Overview
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              A plain-language dashboard for School Leadership, Admissions, and Administrative Staff. Track website visits, social community growth, admissions inquiries, and 24/7 AI parent assistance without any technical jargon.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-600 transition-colors flex items-center space-x-1.5"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{showGuide ? 'Hide Plain-English Guide' : 'How to Read This Dashboard'}</span>
              {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onNavigate('leads')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>View Admissions (154 Enrolled)</span>
            </button>
          </div>
        </div>

        {/* Collapsible Plain-English Guide for Non-IT Leaders */}
        {showGuide && (
          <div className="mt-4 pt-4 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs animate-fade-in">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center space-x-2 font-bold text-blue-300 mb-1">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>1. Website Visitors</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Shows how many families visit the BBHS school website, which pages they read (admissions, facilities, fees), and whether they found us via Google Search.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center space-x-2 font-bold text-rose-300 mb-1">
                <Share2 className="w-4 h-4 text-rose-400" />
                <span>2. Social Community</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tracks 49,540+ followers across Instagram, Facebook, YouTube, and LinkedIn. Shows parent interaction, viral sports reels, and alumni celebrations.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center space-x-2 font-bold text-amber-300 mb-1">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>3. Admissions Pipeline</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Records prospective students arriving via Website, WhatsApp, and AI Chat through to campus visits, assessments, and final seat enrollments (154 boys enrolled).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center space-x-2 font-bold text-emerald-300 mb-1">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>4. 24/7 AI Parent Helpdesk</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Answers parent questions on fees, bus routes, and ICSE/ISC subjects day or night. Resolves 91.4% of queries automatically with a 4.86/5 parent satisfaction score.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 1. Top-Line KPI Pulse Summary Bar */}
      <KpiSummaryRow onNavigate={onNavigate} />

      {/* 2. The 4 Visual Dashboard Panels (With Graphs & Pie Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsPanel onNavigate={onNavigate} />
        <SocialPanel onNavigate={onNavigate} />
        <LeadsPanel onNavigate={onNavigate} />
        <ChatbotPanel onNavigate={onNavigate} />
      </div>
    </div>
  );
}
