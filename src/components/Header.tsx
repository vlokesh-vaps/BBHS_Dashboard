'use strict';
'use client';

import React from 'react';
import {
  Calendar,
  RefreshCw,
  LayoutDashboard,
  Globe,
  Share2,
  UserCheck,
  MessageSquare,
} from 'lucide-react';
import { bbhsSchoolProfile } from '../data/bbhsData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  timeRange,
  setTimeRange,
  onRefresh,
  isRefreshing,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#0B192C] text-white shadow-lg border-b border-slate-800">
      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & School Title */}
          <div
            onClick={() => setActiveTab('hub')}
            className="flex items-center space-x-3.5 cursor-pointer group select-none"
            title="Return to Command Hub"
          >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white p-0.5 shadow-md ring-2 ring-amber-400/80 shrink-0 group-hover:ring-amber-300 transition-all">
              {/* Official BBHS School Logo */}
              <img
                src={bbhsSchoolProfile.logoUrl}
                alt="Baldwin Boys' High School Crest"
                className="w-full h-full object-contain rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full text-white border border-white shadow-sm">
                1880
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif group-hover:text-amber-200 transition-colors">
                  Baldwin Boys&apos; High School
                </h1>
                <span className="bg-blue-900/80 text-blue-200 text-xs font-semibold px-2 py-0.5 rounded border border-blue-700/50">
                  Bangalore
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 mt-0.5">
                <span className="text-amber-400 font-semibold">Founded: 1880</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-slate-200 font-medium">Legacy of Excellence, Forward in Vision</span>
                <span className="text-slate-600 hidden sm:inline">&bull;</span>
                <span className="text-amber-300/80 italic hidden sm:inline text-xs font-serif">&quot;{bbhsSchoolProfile.secondaryMottoLatin}&quot;</span>
              </p>
            </div>
          </div>

          {/* Right Tools: Time Range, Refresh, Presentation View */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex items-center bg-slate-900/90 rounded-lg p-1 border border-slate-700 text-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              {(['Last 7 Days', 'Last 30 Days', 'Academic Year 2026-27'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    timeRange === range
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors disabled:opacity-50"
              title="Refresh Data Feeds"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Non-IT Friendly Primary Navigation Bar (One-Click Direct Access) */}
      <div className="bg-[#0f243e] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 text-xs scrollbar-none" aria-label="Tabs">
            {[
              { id: 'hub', label: 'School Overview', icon: LayoutDashboard },
              { id: 'analytics', label: 'Website Visitors', icon: Globe },
              { id: 'social', label: 'Social Media', icon: Share2 },
              { id: 'leads', label: 'Admissions & Inquiries', icon: UserCheck, badge: '154 Enrolled' },
              { id: 'chatbot', label: 'AI Parent Helpdesk', icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                        isActive
                          ? 'bg-slate-950 text-amber-300'
                          : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

