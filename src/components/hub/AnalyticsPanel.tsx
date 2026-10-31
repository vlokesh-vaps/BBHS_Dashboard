'use strict';
'use client';

import React from 'react';
import { Globe, BarChart3, PieChart as PieChartIcon, ChevronRight, ArrowRight } from 'lucide-react';
import { bbhsAnalyticsData } from '../../data/bbhsData';
import DonutChart from '../charts/DonutChart';
import TrafficAreaChart from '../charts/TrafficAreaChart';

interface AnalyticsPanelProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Visual Google Analytics Cockpit card featuring:
 * 1. 30-day SVG Traffic Area Curve
 * 2. SVG Donut/Pie Chart for Acquisition Channels
 */
export default function AnalyticsPanel({ onNavigate }: AnalyticsPanelProps) {
  const trafficChannelPie = bbhsAnalyticsData.trafficChannels.map((c) => ({
    label: c.channel.split(' ')[0],
    percentage: c.percentage,
    color: c.color,
    value: `${(c.sessions / 1000).toFixed(0)}k`,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-400/80 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header with Navigate Trigger */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                School Website &bull; Visitors &amp; Traffic
              </h3>
              <p className="text-xs text-slate-500">
                Official portal: <span className="font-mono text-blue-600">baldwin-high-school.vercel.app</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('analytics')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors flex items-center space-x-1"
          >
            <span>View Traffic</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Graph 1: 30-Day Daily Traffic Curve */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Daily Website Visits (Last 30 Days)</span>
            </span>
            <span className="text-emerald-600 font-bold">Peak: 38.9K pageviews/day</span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <TrafficAreaChart data={bbhsAnalyticsData.dailyTraffic} height={110} />
          </div>
        </div>

        {/* Visual Graph 2: Acquisition Channels Donut/Pie Chart */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center space-x-1.5">
              <PieChartIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Where Families Find Our School</span>
            </span>
            <span className="text-xs text-slate-400">Total: 245.8K Visits</span>
          </div>

          <DonutChart
            data={trafficChannelPie}
            size={120}
            strokeWidth={22}
            centerValue="245K"
            centerLabel="Visits"
          />
        </div>
      </div>

      {/* Card Footer with Call to Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Google Search brings in 48.6% of parents looking for admissions
        </span>
        <button
          onClick={() => onNavigate('analytics')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
        >
          <span>View Detailed Website Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

