'use strict';
'use client';

import React, { useState } from 'react';
import {
  Share2,
  TrendingUp,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  ExternalLink,
  Sparkles,
  Calendar,
  Film,
  FileText,
  Users,
} from 'lucide-react';
import { bbhsSocialMediaData } from '../data/bbhsData';

export default function SocialMediaTab() {
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filteredPosts =
    platformFilter === 'all'
      ? bbhsSocialMediaData.recentPosts
      : bbhsSocialMediaData.recentPosts.filter((p) => p.platform === platformFilter);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#E1306C]" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#1877F2]" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-[#FF0000]" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
      default:
        return <Share2 className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Social Community KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Followers</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {bbhsSocialMediaData.kpis.totalFollowers.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            +{bbhsSocialMediaData.kpis.netGrowthMoM}% MoM
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Impressions</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {(bbhsSocialMediaData.kpis.totalImpressions / 1000000).toFixed(2)}M
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">
            Across 4 platforms
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Avg. Engagement</div>
          <div className="mt-1 text-xl font-bold text-pink-600">
            {bbhsSocialMediaData.kpis.avgEngagementRate}%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Industry avg: 2.8%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Video / Reel Views</div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {bbhsSocialMediaData.kpis.totalVideoViews.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">
            +32% video consumption
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Admissions Inquiries</div>
          <div className="mt-1 text-xl font-bold text-amber-600">
            {bbhsSocialMediaData.kpis.socialAdmissionsInquiries}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Direct DM &amp; Link Clicks
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Audience Sentiment</div>
          <div className="mt-1 text-xl font-bold text-emerald-600">
            94.6%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Positive Alumni/Parents
          </div>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {bbhsSocialMediaData.platforms.map((plat) => {
          return (
            <div
              key={plat.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm custom-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      {getPlatformIcon(plat.id)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{plat.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate max-w-[130px]">
                        {plat.handle}
                      </p>
                    </div>
                  </div>

                  <a
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">
                    {plat.followers.toLocaleString()}
                  </div>
                  <div className="mt-1 flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{plat.followersChange}% this month</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[11px]">Impressions</span>
                    <div className="font-bold text-slate-800">
                      {(plat.impressions / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Engagement</span>
                    <div className="font-bold text-slate-800">{plat.engagementRate}%</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{plat.postsCount} total publications</span>
                <span className="font-semibold text-blue-600">Active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Engagement Chart & Audience Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Weekly Engagement Volume by Platform
              </h3>
              <p className="text-xs text-slate-500">
                Interactions (Likes, Comments, Shares, Saves) across days of the week
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              Peak: Weekends (Sports &amp; Events)
            </span>
          </div>

          <div className="mt-6 h-60 flex items-end space-x-3 sm:space-x-6 pb-2">
            {bbhsSocialMediaData.weeklyEngagementTrends.map((trend, i) => {
              const maxDayVal = 10000;
              const instaHeight = Math.round((trend.instagram / maxDayVal) * 100);
              const fbHeight = Math.round((trend.facebook / maxDayVal) * 100);
              const ytHeight = Math.round((trend.youtube / maxDayVal) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[11px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-10">
                    <span className="font-bold">{trend.day}: </span>
                    IG: {trend.instagram} | FB: {trend.facebook} | YT: {trend.youtube}
                  </div>

                  <div className="w-full flex items-end justify-center space-x-1 h-full">
                    <div
                      className="w-1/3 bg-[#E1306C] rounded-t transition-all group-hover:opacity-90"
                      style={{ height: `${instaHeight}%` }}
                      title={`Instagram: ${trend.instagram}`}
                    />
                    <div
                      className="w-1/3 bg-[#FF0000] rounded-t transition-all group-hover:opacity-90"
                      style={{ height: `${ytHeight}%` }}
                      title={`YouTube: ${trend.youtube}`}
                    />
                    <div
                      className="w-1/3 bg-[#1877F2] rounded-t transition-all group-hover:opacity-90"
                      style={{ height: `${fbHeight}%` }}
                      title={`Facebook: ${trend.facebook}`}
                    />
                  </div>

                  <span className="mt-2 text-xs font-semibold text-slate-600">
                    {trend.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E1306C]"></span>
                <span>Instagram</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]"></span>
                <span>YouTube</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]"></span>
                <span>Facebook</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Weekend engagement peaks due to sports tournaments &amp; chapel choir broadcasts
            </span>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>Audience Demographics</span>
            </h3>

            <div className="mt-5 space-y-4">
              {bbhsSocialMediaData.audienceDemographics.map((aud, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{aud.category}</span>
                    <span className="font-bold text-slate-900">{aud.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${aud.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-900">
            <span className="font-bold">High Parent Intent:</span> 48% of total followers are active parents of school-age boys in Bengaluru, driving direct admission inquiries.
          </div>
        </div>
      </div>

      {/* Top Posts / Content Feed */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent High-Performing Posts &amp; Campaigns
            </h3>
            <p className="text-xs text-slate-500">
              Top viral campaigns showcasing Baldwinian sports, academics, and heritage
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
            {['all', 'instagram', 'youtube', 'facebook', 'linkedin'].map((plat) => (
              <button
                key={plat}
                onClick={() => setPlatformFilter(plat)}
                className={`px-2.5 py-1 rounded font-medium capitalize transition-all ${
                  platformFilter === plat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-400/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center space-x-1.5 font-semibold text-slate-700">
                    {getPlatformIcon(post.platform)}
                    <span className="capitalize">{post.platform}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      {post.type}
                    </span>
                  </span>
                  <span className="text-[11px] text-slate-400">{post.date}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {post.title}
                </h4>

                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1" title="Likes">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      <span className="font-semibold">{post.likes.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1" title="Comments">
                      <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                      <span className="font-semibold">{post.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1" title="Shares">
                      <Repeat2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-semibold">{post.shares}</span>
                    </span>
                  </div>

                  <span className="bg-pink-50 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-200">
                    {post.engagementRate}% ER
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Reach: {post.reach.toLocaleString()} views</span>
                  <span className="text-emerald-600 font-semibold uppercase text-[10px]">
                    {post.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

