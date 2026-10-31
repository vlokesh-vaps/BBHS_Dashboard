'use strict';
'use client';

import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  Search,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  ShieldCheck,
  Compass,
  Zap,
} from 'lucide-react';
import { bbhsAnalyticsData, bbhsSchoolProfile } from '../data/bbhsData';
import { formatNumber } from '../utils/format';

export default function AnalyticsTab() {
  const [selectedMetric, setSelectedMetric] = useState<'pageViews' | 'sessions' | 'uniqueUsers'>('pageViews');
  const [keywordSearch, setKeywordSearch] = useState('');

  const filteredKeywords = bbhsAnalyticsData.topSearchKeywords.filter((k) =>
    k.keyword.toLowerCase().includes(keywordSearch.toLowerCase())
  );

  const maxTrafficVal = Math.max(
    ...bbhsAnalyticsData.dailyTraffic.map((d) => d[selectedMetric])
  );

  return (
    <div className="space-y-6">
      {/* Top GA4 Header Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <Globe className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>School Website Traffic &bull; Parent Visitors</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Live Official Website
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Official School Portal:{' '}
                <a
                  href={bbhsSchoolProfile.liveWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-mono font-medium inline-flex items-center"
                >
                  {bbhsSchoolProfile.liveWebsiteUrl}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Live Visitor Box */}
        <div className="flex items-center space-x-3 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-inner">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Currently On School Site</div>
            <div className="text-xl font-extrabold text-white leading-tight">
              {bbhsAnalyticsData.liveActiveUsers}{' '}
              <span className="text-xs font-normal text-slate-400">active parents now</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (Plain English) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Visitors</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {formatNumber(bbhsAnalyticsData.kpis.totalUsers)}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsAnalyticsData.kpis.totalUsersChange}% vs last month
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">New Prospective Parents</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {formatNumber(bbhsAnalyticsData.kpis.newUsers)}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsAnalyticsData.kpis.newUsersChange}% first-time
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Site Visits</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {formatNumber(bbhsAnalyticsData.kpis.sessions)}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsAnalyticsData.kpis.sessionsChange}% growth
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">School Pages Read</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {formatNumber(bbhsAnalyticsData.kpis.pageViews)}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsAnalyticsData.kpis.pageViewsChange}% pageviews
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Avg. Reading Time</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {bbhsAnalyticsData.kpis.avgSessionDuration}
          </div>
          <div className="mt-1 text-xs text-slate-400 font-medium">
            High interest engagement
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Admission Form Rate</div>
          <div className="mt-1 text-xl font-bold text-amber-600">
            {bbhsAnalyticsData.kpis.inquiryConversionRate}%
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsAnalyticsData.kpis.inquiryConversionRateChange}% vs target
          </div>
        </div>
      </div>

      {/* Main Interactive Chart: Traffic & Inquiries Timeline */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Daily Traffic &amp; Prospective Admissions Activity
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated daily trends across 30 days for Baldwin Boys&apos; High School portal
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setSelectedMetric('pageViews')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedMetric === 'pageViews'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pages Read
            </button>
            <button
              onClick={() => setSelectedMetric('sessions')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedMetric === 'sessions'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Total Visits
            </button>
            <button
              onClick={() => setSelectedMetric('uniqueUsers')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedMetric === 'uniqueUsers'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Individual Families
            </button>
          </div>
        </div>

        {/* Custom High-Quality SVG Bar & Area Visualization */}
        <div className="mt-6">
          <div className="h-64 flex items-end space-x-2 sm:space-x-4 pt-6 pb-2">
            {bbhsAnalyticsData.dailyTraffic.map((item, idx) => {
              const currentVal = item[selectedMetric];
              const heightPct = Math.round((currentVal / maxTrafficVal) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap">
                    <div className="font-bold">{item.date} ({item.day})</div>
                    <div>{selectedMetric}: {formatNumber(currentVal)}</div>
                    <div className="text-amber-300">Inquiries: {item.inquiries}</div>
                  </div>

                  {/* Bar */}
                  <div
                    className="w-full bg-blue-100 group-hover:bg-blue-500 rounded-t transition-all duration-300 relative overflow-hidden"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-blue-600 opacity-80"
                      style={{ height: `${Math.round((item.inquiries / 150) * 100)}%` }}
                    />
                  </div>

                  {/* X-axis date label */}
                  <span className="mt-2 text-[10px] text-slate-400 font-mono truncate">
                    {item.date.split(' ')[1]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                <span className="font-medium text-slate-700 capitalize">{selectedMetric}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-800"></span>
                <span className="font-medium text-slate-700">Admission Inquiries Correlation</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Peak day: Oct 31 (38,900 Pageviews)</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Traffic Channels & Top Landing Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Acquisition Channels */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Traffic Acquisition Channels
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Where prospective parents and students discover BBHS
          </p>

          <div className="space-y-4">
            {bbhsAnalyticsData.trafficChannels.map((channel) => (
              <div key={channel.channel} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span>{channel.channel}</span>
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{channel.percentage}%</span>
                    <span className="text-slate-400 text-[11px] ml-1.5">
                      ({formatNumber(channel.sessions)} sessions)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${channel.percentage}%`,
                      backgroundColor: channel.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="bg-blue-50/80 p-3 rounded-lg border border-blue-100 text-xs text-blue-900">
              <span className="font-bold">Organic Search Dominance:</span> Over 48.6% of traffic comes from parents actively searching for top CISCE boys&apos; schools in Bangalore.
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Top Landing Pages */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Top Visited School Pages
              </h3>
              <p className="text-xs text-slate-500">
                High-intent landing pages on <span className="font-mono">baldwin-high-school.vercel.app</span>
              </p>
            </div>
            <span className="text-xs text-slate-500">Last 30 Days</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="pb-2.5">Page Title &amp; URL</th>
                  <th className="pb-2.5 text-right">Views</th>
                  <th className="pb-2.5 text-right">Avg Time</th>
                  <th className="pb-2.5 text-right">Bounce Rate</th>
                  <th className="pb-2.5 text-right">Admissions Inquiries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bbhsAnalyticsData.topLandingPages.map((page, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
                        {page.title}
                      </div>
                      <div className="text-[11px] text-blue-600 font-mono">
                        {page.path}
                      </div>
                    </td>
                    <td className="py-3 text-right font-bold text-slate-800">
                      {formatNumber(page.views)}
                    </td>
                    <td className="py-3 text-right text-slate-600">
                      {page.avgDuration}
                    </td>
                    <td className="py-3 text-right text-slate-600">
                      {page.bounceRate}%
                    </td>
                    <td className="py-3 text-right">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                        {page.conversions}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Search Keywords, Geographic Audience, Devices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Google Search Keywords */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Top Google Search Queries</span>
            </h3>
          </div>

          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search query keywords..."
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {filteredKeywords.map((kw, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 truncate max-w-[190px]">
                    &quot;{kw.keyword}&quot;
                  </span>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                    Rank #{kw.position}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{formatNumber(kw.clicks)} clicks</span>
                  <span>{formatNumber(kw.impressions)} imp.</span>
                  <span className="text-emerald-600 font-semibold">{kw.ctr} CTR</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5 pb-3 border-b border-slate-100">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Geographic Distribution</span>
          </h3>

          <div className="mt-4 space-y-3">
            {bbhsAnalyticsData.geoLocations.map((geo, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">
                    {geo.city} <span className="text-slate-400 text-[11px]">({geo.country})</span>
                  </span>
                  <span className="font-bold text-slate-900">{geo.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${geo.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Browser Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5 pb-3 border-b border-slate-100">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Devices &amp; Browsers</span>
            </h3>

            <div className="mt-4 space-y-3">
              {bbhsAnalyticsData.deviceBreakdown.map((dev, i) => {
                const Icon = dev.device.includes('Mobile')
                  ? Smartphone
                  : dev.device.includes('Desktop')
                  ? Monitor
                  : Tablet;

                return (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-slate-600" />
                      <span className="font-semibold text-slate-800">{dev.device}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{dev.percentage}%</span>
                      <div className="text-[10px] text-slate-400">{formatNumber(dev.users)} users</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-700 mb-2">Browser Distribution</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {bbhsAnalyticsData.browserBreakdown.map((b, i) => (
                <div key={i} className="bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100 flex justify-between">
                  <span className="text-slate-600 truncate">{b.browser}</span>
                  <span className="font-bold text-slate-900">{b.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

