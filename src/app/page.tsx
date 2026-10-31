'use strict';
'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import HubView from '../components/HubView';
import AnalyticsTab from '../components/AnalyticsTab';
import SocialMediaTab from '../components/SocialMediaTab';
import LeadsTab from '../components/LeadsTab';
import ChatbotTab from '../components/ChatbotTab';
import { bbhsSchoolProfile } from '../data/bbhsData';
import {
  ExternalLink,
  Shield,
  ArrowLeft,
  LayoutGrid,
  Globe,
  Share2,
  UserCheck,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [timeRange, setTimeRange] = useState<string>('Last 30 Days');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setToastMessage('Refreshing live telemetry from Google Analytics, Meta API, and Admissions CRM...');
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Data feeds synchronized successfully.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 900);
  };

  const getDashboardMeta = () => {
    switch (activeTab) {
      case 'analytics':
        return {
          title: 'Google Analytics 4 Intelligence',
          desc: 'Real-time & 30-day website traffic, acquisition channels, and search keywords',
          icon: Globe,
          color: 'text-blue-600',
        };
      case 'social':
        return {
          title: 'Social Media Command Center',
          desc: 'Multi-platform engagement, impressions, viral reels, and community growth',
          icon: Share2,
          color: 'text-rose-600',
        };
      case 'leads':
        return {
          title: 'Admissions CRM & Student Leads Pipeline',
          desc: 'Prospective applicant tracking, conversion funnel, and grade capacity',
          icon: UserCheck,
          color: 'text-amber-600',
        };
      case 'chatbot':
        return {
          title: 'AI Admissions Chatbot Telemetry',
          desc: 'Automated parent inquiries, topic intent classification, and resolution audit',
          icon: MessageSquare,
          color: 'text-emerald-600',
        };
      default:
        return null;
    }
  };

  const currentMeta = getDashboardMeta();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0B192C] text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl border border-amber-500/30 flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Command Center Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Breadcrumb & Back Bar (When inside any specific dashboard) */}
        {activeTab !== 'hub' && currentMeta && (
          <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('hub')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0B192C] hover:text-white text-slate-700 text-xs font-bold transition-all border border-slate-200 shadow-2xs group"
                title="Return to the Main Directory"
              >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
                <span>Command Hub</span>
              </button>

              <div className="h-4 w-px bg-slate-200 hidden sm:block" />

              <div>
                <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                  <span className="cursor-pointer hover:underline" onClick={() => setActiveTab('hub')}>
                    Command Hub
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="font-semibold text-slate-700">{currentMeta.title}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {currentMeta.title}
                </h2>
              </div>
            </div>

            {/* Quick Switcher Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
              {[
                { id: 'analytics', label: 'Analytics' },
                { id: 'social', label: 'Social' },
                { id: 'leads', label: 'Leads CRM' },
                { id: 'chatbot', label: 'Chatbot' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-[#0B192C] text-amber-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'hub' && <HubView onNavigate={setActiveTab} />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'social' && <SocialMediaTab />}
        {activeTab === 'leads' && <LeadsTab />}
        {activeTab === 'chatbot' && <ChatbotTab />}
      </main>

      {/* School Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 text-slate-600 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm ring-1 ring-slate-300 flex items-center justify-center shrink-0">
              <img
                src="/baldwin_crest.png"
                alt="Baldwin Boys' High School Crest"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="font-bold text-slate-800">
                Baldwin Boys&apos; High School &bull; Founded: 1880 | Bangalore
              </div>
              <div className="text-[11px] text-slate-500">
                Legacy of Excellence, Forward in Vision &bull; Affiliated with CISCE (ICSE &amp; ISC)
              </div>
            </div>
          </div>

          <div className="text-slate-400 text-[11px]">
            &copy; {new Date().getFullYear()} Baldwin Boys&apos; High School, Richmond Town, Bengaluru. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

