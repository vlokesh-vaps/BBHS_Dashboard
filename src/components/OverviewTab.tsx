'use strict';
'use client';

import React from 'react';
import {
  Users,
  Globe,
  Share2,
  UserCheck,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Shield,
  Award,
  BookOpen,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  School,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  bbhsSchoolProfile,
  bbhsAnalyticsData,
  bbhsSocialMediaData,
  bbhsLeadsData,
  bbhsChatbotData,
} from '../data/bbhsData';
import { formatNumber } from '../utils/format';

interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
}

export default function OverviewTab({ setActiveTab }: OverviewTabProps) {
  const kpis = [
    {
      title: 'Website Monthly Users',
      value: formatNumber(bbhsAnalyticsData.kpis.totalUsers),
      change: `+${bbhsAnalyticsData.kpis.totalUsersChange}%`,
      subtext: `${formatNumber(bbhsAnalyticsData.kpis.pageViews)} pageviews`,
      icon: Globe,
      color: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      tabTarget: 'analytics',
    },
    {
      title: 'Social Media Community',
      value: formatNumber(bbhsSocialMediaData.kpis.totalFollowers),
      change: `+${bbhsSocialMediaData.kpis.netGrowthMoM}% MoM`,
      subtext: `${(bbhsSocialMediaData.kpis.totalImpressions / 1000000).toFixed(2)}M impressions`,
      icon: Share2,
      color: 'from-rose-500 to-pink-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      tabTarget: 'social',
    },
    {
      title: 'Admissions Inquiries (2026-27)',
      value: formatNumber(bbhsLeadsData.funnelMetrics.totalInquiries),
      change: `${bbhsLeadsData.funnelMetrics.overallConversionRate}% Conv.`,
      subtext: `${bbhsLeadsData.funnelMetrics.enrolledStudents} confirmed enrolled`,
      icon: UserCheck,
      color: 'from-amber-500 to-amber-600',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      tabTarget: 'leads',
    },
    {
      title: 'AI Chatbot Resolution Rate',
      value: `${bbhsChatbotData.kpis.botResolutionRate}%`,
      change: `${bbhsChatbotData.kpis.csatScore} / 5.0 CSAT`,
      subtext: `${formatNumber(bbhsChatbotData.kpis.totalConversations)} chats handled`,
      icon: MessageSquare,
      color: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      tabTarget: 'chatbot',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome & Heritage Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B192C] via-[#0F2646] to-[#1E3E62] text-white p-6 sm:p-8 shadow-xl border border-slate-700/60">
        {/* Subtle Crest Watermark Background */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 opacity-15 pointer-events-none flex items-center justify-center">
          <img
            src="/baldwin_crest.png"
            alt="BBHS Crest Watermark"
            className="w-full h-full object-contain filter invert brightness-200"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-5xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold border border-amber-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founded: 1880 | Bangalore &bull; 146 Years of Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
              Baldwin Boys&apos; High School
            </h2>
            <p className="mt-1 text-base text-amber-300 font-medium">
              Legacy of Excellence, Forward in Vision
            </p>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Welcome to the centralized executive dashboard monitoring online admissions, website analytics from{' '}
              <span className="text-amber-300 font-semibold underline decoration-amber-400">
                {bbhsSchoolProfile.liveWebsiteUrl.replace('https://', '').replace('/', '')}
              </span>
              , cross-platform social media reach, prospective student lead pipelines, and automated AI parent inquiries.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Richmond Town, Bangalore</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <School className="w-3.5 h-3.5 text-amber-400" />
                <span>CISCE Affiliated (ICSE &amp; ISC)</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>3,200+ Students &bull; 165 Faculty</span>
              </div>
            </div>
          </div>

          {/* Prominent Circular Crest Showcase */}
          <div className="hidden md:flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shrink-0">
            <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg ring-4 ring-amber-400/60 flex items-center justify-center">
              <img
                src="/baldwin_crest.png"
                alt="Baldwin Boys' High School Crest"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="mt-2 text-center">
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                Integritas et Veritas
              </div>
              <div className="text-[10px] text-slate-300 font-mono">
                ESTD - 1880
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              onClick={() => setActiveTab(kpi.tabTarget)}
              className="group cursor-pointer bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all custom-card-hover"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {kpi.title}
                </span>
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${kpi.color} text-white shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${kpi.badgeBg}`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs text-slate-500 truncate max-w-[140px]">
                    {kpi.subtext}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium group-hover:text-amber-600 transition-colors">
                <span>View Full Dashboard</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Historic Houses & Real-time Live Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Four Historic Houses Standings */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>The Four Historic Houses &bull; Annual Championship 2026</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inter-house athletic, scholastic, and cultural merit points tally
              </p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300">
              146th Annual Meet
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bbhsSchoolProfile.houses.map((house) => {
              const maxPoints = 1600;
              const fillPct = Math.min(100, Math.round((house.points / maxPoints) * 100));

              return (
                <div
                  key={house.name}
                  className="relative p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: house.badgeHex }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{house.name}</h4>
                        <p className="text-xs text-slate-500 italic">&quot;{house.motto}&quot;</p>
                      </div>
                    </div>

                    {house.shieldWinner && (
                      <span className="flex items-center space-x-1 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                        <Award className="w-3 h-3" />
                        <span>SHIELD LEADER</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">{house.points} Points</span>
                      <span className="text-slate-400 text-[11px]">{fillPct}% of target</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${fillPct}%`,
                          backgroundColor: house.badgeHex,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick campus stats footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="text-lg font-bold text-slate-900">7.5 Acres</div>
              <div className="text-[11px] text-slate-500">Richmond Campus</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="text-lg font-bold text-slate-900">12 Arenas</div>
              <div className="text-[11px] text-slate-500">Olympic Sports &amp; Pool</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="text-lg font-bold text-slate-900">78 Rooms</div>
              <div className="text-[11px] text-slate-500">Smart AI Classrooms</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="text-lg font-bold text-slate-900">28.5K+</div>
              <div className="text-[11px] text-slate-500">Old Boys (Alumni)</div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Real-time Health & Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                <span>Live Pulse &amp; Traffic</span>
              </h3>
              <span className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Now</span>
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white shadow-inner">
              <div className="text-xs text-slate-400 font-medium">Live Website Visitors Right Now</div>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-white">
                  {bbhsAnalyticsData.liveActiveUsers}
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  +12.4% vs last hour
                </span>
              </div>
              <div className="mt-2 text-[11px] text-slate-400">
                Current top page:{' '}
                <span className="text-amber-300 font-mono">/admissions/2026-2027</span>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Admissions 2026 Fill Rate</span>
                <span className="font-bold text-slate-900">76.4% of total capacity</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Bot Response Latency</span>
                <span className="font-bold text-emerald-600">1.2 sec (Instant AI)</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Next Campus Tour</span>
                <span className="font-bold text-slate-900">Tomorrow, 10:00 AM</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('leads')}
              className="w-full bg-[#0B192C] hover:bg-[#1E3E62] text-amber-300 hover:text-white py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Manage Admissions CRM Leads</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

