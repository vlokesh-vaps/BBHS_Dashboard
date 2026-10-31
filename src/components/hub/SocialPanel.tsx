'use strict';
'use client';

import React from 'react';
import { Share2, BarChart3, PieChart as PieChartIcon, ChevronRight, ArrowRight } from 'lucide-react';
import { bbhsSocialMediaData } from '../../data/bbhsData';
import DonutChart from '../charts/DonutChart';

interface SocialPanelProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Visual Social Media Cockpit card featuring:
 * 1. SVG Donut/Pie Chart for Platform Follower Share
 * 2. Weekly Interaction Bar Chart
 */
export default function SocialPanel({ onNavigate }: SocialPanelProps) {
  const socialAudiencePie = bbhsSocialMediaData.platforms.map((p) => ({
    label: p.name.split(' ')[0],
    percentage: Math.round((p.followers / bbhsSocialMediaData.kpis.totalFollowers) * 100),
    color: p.color,
    value: `${(p.followers / 1000).toFixed(1)}k`,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-rose-400/80 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header with Navigate Trigger */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                School Social Media &bull; Community &amp; Outreach
              </h3>
              <p className="text-xs text-slate-500">
                Instagram, Facebook, YouTube, and LinkedIn
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('social')}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors flex items-center space-x-1"
          >
            <span>View Social</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Graph 1: Platform Follower Share Pie/Donut Chart */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <PieChartIcon className="w-3.5 h-3.5 text-pink-600" />
              <span>Followers by Channel (49,540 Total Families &amp; Alumni)</span>
            </span>
            <span className="text-xs font-bold text-slate-800">4 Platforms</span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <DonutChart
              data={socialAudiencePie}
              size={120}
              strokeWidth={22}
              centerValue="49.5K"
              centerLabel="Followers"
            />
          </div>
        </div>

        {/* Visual Graph 2: Weekly Engagement Volume Bar Chart */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-rose-600" />
              <span>Parent &amp; Student Activity by Day (Mon &rarr; Sun)</span>
            </span>
            <span className="text-xs text-rose-600 font-bold">Peak: Weekends</span>
          </div>

          <div className="h-20 flex items-end space-x-2 pt-2 pb-1">
            {bbhsSocialMediaData.weeklyEngagementTrends.map((trend, idx) => {
              const maxDay = 9600;
              const heightPct = Math.round((trend.instagram / maxDay) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div
                    className="w-full bg-rose-400 group-hover:bg-rose-600 rounded-t transition-all"
                    style={{ height: `${heightPct}%` }}
                    title={`${trend.day}: ${trend.instagram} IG interactions`}
                  />
                  <span className="text-[9px] text-slate-400 mt-1 font-semibold">{trend.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Footer with Call to Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          1.34M Post Views this month &bull; 6.1% Parent Interaction Rate
        </span>
        <button
          onClick={() => onNavigate('social')}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
        >
          <span>View Social Posts &amp; Content</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

