'use strict';
'use client';

import React from 'react';
import { Globe, Share2, UserCheck, MessageSquare, TrendingUp } from 'lucide-react';
import {
  bbhsAnalyticsData,
  bbhsSocialMediaData,
  bbhsLeadsData,
  bbhsChatbotData,
} from '../../data/bbhsData';
import { formatNumber } from '../../utils/format';

interface KpiSummaryRowProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Clean top row of 4 executive metric cards providing high-level performance numbers
 * and direct jump triggers to each dedicated dashboard.
 */
export default function KpiSummaryRow({ onNavigate }: KpiSummaryRowProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Website Visitors KPI */}
      <div
        onClick={() => onNavigate('analytics')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase">Website Visitors</span>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900">
          {formatNumber(bbhsAnalyticsData.kpis.totalUsers)}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsAnalyticsData.kpis.totalUsersChange}% vs last month
          </span>
          <span className="text-blue-600 font-bold group-hover:underline flex items-center text-[11px]">
            View Traffic &rarr;
          </span>
        </div>
      </div>

      {/* 2. Social Reach KPI */}
      <div
        onClick={() => onNavigate('social')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-rose-400 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase">Social Followers</span>
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900">
          {formatNumber(bbhsSocialMediaData.kpis.totalFollowers)}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsSocialMediaData.kpis.netGrowthMoM}% monthly growth
          </span>
          <span className="text-rose-600 font-bold group-hover:underline flex items-center text-[11px]">
            View Social &rarr;
          </span>
        </div>
      </div>

      {/* 3. Admissions Inquiries KPI */}
      <div
        onClick={() => onNavigate('leads')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase">Admissions Inquiries</span>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900">
          {formatNumber(bbhsLeadsData.funnelMetrics.totalInquiries)}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            {bbhsLeadsData.funnelMetrics.enrolledStudents} Boys Enrolled
          </span>
          <span className="text-amber-600 font-bold group-hover:underline flex items-center text-[11px]">
            View Admissions &rarr;
          </span>
        </div>
      </div>

      {/* 4. AI Bot Resolution KPI */}
      <div
        onClick={() => onNavigate('chatbot')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase">AI Parent Helpdesk</span>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-slate-900">
          {bbhsChatbotData.kpis.botResolutionRate}%
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-emerald-600 font-semibold">
            ★ {bbhsChatbotData.kpis.csatScore}/5.0 Parent Rating
          </span>
          <span className="text-emerald-600 font-bold group-hover:underline flex items-center text-[11px]">
            View Helpdesk &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

