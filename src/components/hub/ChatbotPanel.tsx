'use strict';
'use client';

import React from 'react';
import { MessageSquare, BarChart3, PieChart as PieChartIcon, ChevronRight, ArrowRight } from 'lucide-react';
import { bbhsChatbotData } from '../../data/bbhsData';
import DonutChart from '../charts/DonutChart';

interface ChatbotPanelProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Visual AI Chatbot Cockpit card featuring:
 * 1. SVG Donut/Pie Chart for Question Intents
 * 2. 24-Hour Inquiry Load Curve
 */
export default function ChatbotPanel({ onNavigate }: ChatbotPanelProps) {
  const chatbotIntentPie = bbhsChatbotData.intentBreakdown.map((i) => ({
    label: i.intent.split(' ')[0],
    percentage: i.percentage,
    color: i.color,
    value: i.count,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-400/80 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header with Navigate Trigger */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                AI Chatbot &bull; Admissions Telemetry
              </h3>
              <p className="text-xs text-slate-500">
                18,420 automated parent &amp; student conversations
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('chatbot')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors flex items-center space-x-1"
          >
            <span>Navigate</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Graph 1: Intent Breakdown Pie/Donut Chart */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <PieChartIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Parent Question Intents (Pie / Donut)</span>
            </span>
            <span className="text-xs font-bold text-emerald-700">91.4% Bot Resolved</span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <DonutChart
              data={chatbotIntentPie}
              size={120}
              strokeWidth={22}
              centerValue="91.4%"
              centerLabel="Resolved"
            />
          </div>
        </div>

        {/* Visual Graph 2: Hourly Activity Curve */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>24-Hour Inquiry Load (Peak Evening 7-10 PM)</span>
            </span>
            <span className="text-xs text-slate-400">1.2s avg response</span>
          </div>

          <div className="h-16 flex items-end space-x-2 pt-1 pb-1">
            {bbhsChatbotData.hourlyActivity.map((h, idx) => {
              const maxH = 2100;
              const pct = Math.round((h.chats / maxH) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div
                    className="w-full bg-emerald-400 group-hover:bg-emerald-600 rounded-t transition-all"
                    style={{ height: `${pct}%` }}
                    title={`${h.hour}: ${h.chats} chats`}
                  />
                  <span className="text-[9px] text-slate-400 mt-1 font-mono truncate">
                    {h.hour.split(':')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Footer with Call to Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          91.4% automated resolution rate &bull; CSAT 4.86 / 5.0
        </span>
        <button
          onClick={() => onNavigate('chatbot')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
        >
          <span>Explore Chatbot Telemetry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

