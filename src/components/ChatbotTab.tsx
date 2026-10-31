'use strict';
'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  Zap,
  TrendingUp,
  Clock,
  ThumbsUp,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  HelpCircle,
  Search,
  Filter,
} from 'lucide-react';
import { bbhsChatbotData } from '../data/bbhsData';
import DonutChart from './charts/DonutChart';

export default function ChatbotTab() {
  const [logSearch, setLogSearch] = useState('');
  const [intentFilter, setIntentFilter] = useState('all');

  const intentPieData = bbhsChatbotData.intentBreakdown.map((i) => ({
    label: i.intent.split(' ')[0],
    percentage: i.percentage,
    color: i.color,
    value: `${i.count.toLocaleString()} queries`,
  }));

  const filteredLogs = bbhsChatbotData.recentLogs.filter((log) => {
    const matchesSearch =
      log.question.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.userName.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.botReply.toLowerCase().includes(logSearch.toLowerCase());

    const matchesIntent = intentFilter === 'all' || log.intent === intentFilter;

    return matchesSearch && matchesIntent;
  });

  return (
    <div className="space-y-6">
      {/* Top Chatbot KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Conversations</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {bbhsChatbotData.kpis.totalConversations.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +28.4% MoM
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Bot Resolution Rate</div>
          <div className="mt-1 text-xl font-bold text-emerald-600">
            {bbhsChatbotData.kpis.botResolutionRate}%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Resolved without human
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Avg. Response Time</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {bbhsChatbotData.kpis.avgResponseTimeSec}s
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">
            Sub-second latency
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Escalation to Desk</div>
          <div className="mt-1 text-xl font-bold text-amber-600">
            {bbhsChatbotData.kpis.escalationRate}%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Sent to Admissions Office
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Parent CSAT Rating</div>
          <div className="mt-1 text-xl font-bold text-slate-900 flex items-center">
            <span>{bbhsChatbotData.kpis.csatScore}</span>
            <span className="text-xs text-amber-500 ml-1">★</span>
            <span className="text-xs text-slate-400 font-normal ml-0.5">/ 5.0</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {bbhsChatbotData.kpis.totalRatings.toLocaleString()} feedback reviews
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">AI Model Health</div>
          <div className="mt-1 text-xl font-bold text-emerald-600">
            99.9%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            BBHS Knowledge Base
          </div>
        </div>
      </div>

      {/* Two Column Analytics Grid: Intent Breakdown & Hourly Inquiry Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intent Distribution with Donut Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Parent Inquiries by Intent Category
                </h3>
                <p className="text-xs text-slate-500">
                  Topic classification across {bbhsChatbotData.kpis.totalConversations.toLocaleString()} total conversations
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Intent Breakdown
              </span>
            </div>

            <div className="mt-5">
              <DonutChart
                data={intentPieData}
                size={130}
                strokeWidth={22}
                centerValue="91.4%"
                centerLabel="Resolved"
              />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Admissions &amp; Tuition Fee queries constitute <span className="font-bold text-slate-800">62.7%</span> of all inquiries.
          </div>
        </div>

        {/* Hourly Inquiry Traffic Volume */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hourly Inquiry Traffic Pattern
                </h3>
                <p className="text-xs text-slate-500">
                  24-hour parent traffic load (Peak evening surge between 7 PM - 10 PM)
                </p>
              </div>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                24/7 Availability
              </span>
            </div>

            <div className="mt-6 h-40 flex items-end space-x-2 sm:space-x-4 pb-2">
              {bbhsChatbotData.hourlyActivity.map((h, i) => {
                const maxHour = 2200;
                const heightPct = Math.round((h.chats / maxHour) * 100);

                return (
                  <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                      {h.hour}: {h.chats} chats
                    </div>
                    <div
                      className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="mt-2 text-[10px] text-slate-400 font-mono truncate">
                      {h.hour.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average response latency: <span className="font-bold text-emerald-600">1.2 seconds</span></span>
            <span className="text-slate-400">Peak hour: 9:00 PM (2,100 inquiries)</span>
          </div>
        </div>
      </div>

      {/* Unresolved Questions & AI Training Opportunities */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Unresolved Queries &amp; Knowledge Base Training Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              Queries requiring manual admissions intervention or FAQ updates
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {bbhsChatbotData.unresolvedQueries.map((uq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/50 flex flex-col justify-between text-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-amber-800 font-bold mb-1">
                  <span>Frequency: {uq.frequency} occurrences</span>
                  <span className="bg-amber-200/60 px-1.5 py-0.2 rounded text-[10px]">
                    Action Required
                  </span>
                </div>
                <p className="font-semibold text-slate-900 leading-snug">
                  &quot;{uq.query}&quot;
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-amber-200/60 text-[11px] text-slate-600">
                <span className="font-bold text-slate-800">Recommendation:</span>{' '}
                {uq.suggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Conversation Logs Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Audit &amp; Conversation Logs Feed
            </h3>
            <p className="text-xs text-slate-500">
              Showing real-time automated transcripts and escalation tickets
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search conversation text..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-48 sm:w-60"
              />
            </div>

            <select
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Intents</option>
              {bbhsChatbotData.intentBreakdown.map((i) => (
                <option key={i.intent} value={i.intent}>
                  {i.intent}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="pb-3 pr-2">User &amp; Session</th>
                <th className="pb-3 pr-2">Parent Question &amp; Bot Reply</th>
                <th className="pb-3 pr-2">Intent</th>
                <th className="pb-3 pr-2">Confidence</th>
                <th className="pb-3 pr-2">Resolution Status</th>
                <th className="pb-3 text-right">CSAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-2 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <div className="text-[11px] text-slate-500">{log.userType}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {log.sessionId} &bull; {log.time}
                    </div>
                  </td>

                  <td className="py-3 pr-2 max-w-md">
                    <div className="font-medium text-slate-900 leading-snug">
                      &quot;{log.question}&quot;
                    </div>
                    <div className="mt-1 text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 leading-relaxed">
                      <span className="font-bold text-amber-700">Baldwin AI: </span>
                      {log.botReply}
                    </div>
                  </td>

                  <td className="py-3 pr-2 whitespace-nowrap">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                      {log.intent}
                    </span>
                  </td>

                  <td className="py-3 pr-2 whitespace-nowrap">
                    <span className="font-mono text-slate-700 font-bold">
                      {Math.round(log.confidenceScore * 100)}%
                    </span>
                  </td>

                  <td className="py-3 pr-2 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        log.resolutionStatus.includes('Resolved')
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {log.resolutionStatus}
                    </span>
                  </td>

                  <td className="py-3 text-right whitespace-nowrap">
                    {log.rating ? (
                      <span className="text-amber-500 font-bold">
                        {'★'.repeat(log.rating)}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

