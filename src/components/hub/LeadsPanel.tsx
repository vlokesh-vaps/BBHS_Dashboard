'use strict';
'use client';

import React from 'react';
import { UserCheck, PieChart as PieChartIcon, ChevronRight, ArrowRight, Globe, MessageCircle, Bot } from 'lucide-react';
import { bbhsLeadsData } from '../../data/bbhsData';
import DonutChart from '../charts/DonutChart';

interface LeadsPanelProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Visual Admissions Leads Cockpit card featuring:
 * 1. Step-by-step conversion funnel bars
 * 2. SVG Donut/Pie Chart for Lead Source Attribution
 */
export default function LeadsPanel({ onNavigate }: LeadsPanelProps) {
  const leadsSourcePie = bbhsLeadsData.sourceAttribution.map((s) => ({
    label: s.source.replace(' Leads', '').replace(' Organic', ''),
    percentage: Math.round((s.leads / bbhsLeadsData.funnelMetrics.totalInquiries) * 100),
    color: s.color,
    value: s.leads,
  }));

  const funnelStages = [
    { stage: 'Inquiries', count: 1284, pct: 100, color: 'bg-blue-600' },
    { stage: 'Brochure Downloads', count: 896, pct: 70, color: 'bg-indigo-600' },
    { stage: 'Campus Tours', count: 432, pct: 34, color: 'bg-amber-500' },
    { stage: 'Applications', count: 348, pct: 27, color: 'bg-amber-600' },
    { stage: 'Enrolled Students', count: 154, pct: 12, color: 'bg-emerald-600' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-400/80 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header with Navigate Trigger */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Admissions Inquiries &amp; Enrollment
              </h3>
              <p className="text-xs text-slate-500">
                Academic Year 2026-27 (Nursery &rarr; Class 11 ISC)
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('leads')}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300 transition-colors flex items-center space-x-1"
          >
            <span>View Admissions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Digital Intake Channels: Website, WhatsApp & AI Chat */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs">
          <div
            onClick={() => onNavigate('leads')}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 cursor-pointer transition-all"
            title="View Website Leads"
          >
            <div className="p-1 rounded-md bg-blue-50 text-blue-600">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500 font-medium leading-none truncate">Website</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">342 leads</div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('leads')}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-400 cursor-pointer transition-all"
            title="View WhatsApp Leads"
          >
            <div className="p-1 rounded-md bg-emerald-50 text-emerald-600">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500 font-medium leading-none truncate">WhatsApp</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">288 leads</div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('leads')}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-purple-400 cursor-pointer transition-all"
            title="View AI Chat Leads"
          >
            <div className="p-1 rounded-md bg-purple-50 text-purple-600">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500 font-medium leading-none truncate">AI Chat</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">246 leads</div>
            </div>
          </div>
        </div>

        {/* Visual Graph 1: Conversion Funnel Progress Bars */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Admissions Steps (Inquiry &rarr; Enrolled)</span>
            <span className="text-amber-700 font-bold">12.0% Overall Conv.</span>
          </div>

          {funnelStages.map((s) => (
            <div key={s.stage} className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-600">{s.stage}</span>
                <span className="font-bold text-slate-900">{s.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${s.color} rounded-full transition-all`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Visual Graph 2: Lead Sources Pie / Donut */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <PieChartIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Where Inquiries Arrive From (Pie / Donut)</span>
            </span>
            <span className="text-xs text-slate-400">1,284 Leads</span>
          </div>

          <DonutChart
            data={leadsSourcePie}
            size={120}
            strokeWidth={22}
            centerValue="1.28K"
            centerLabel="Inquiries"
          />
        </div>
      </div>

      {/* Card Footer with Call to Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          154 Enrolled &bull; Website, WhatsApp &amp; AI Chat power 68.2% of inquiries
        </span>
        <button
          onClick={() => onNavigate('leads')}
          className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center space-x-1"
        >
          <span>Open Admissions CRM</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

