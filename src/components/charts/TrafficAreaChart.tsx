'use strict';
'use client';

import React, { useState } from 'react';

export interface TrafficDataPoint {
  date: string;
  pageViews: number;
  sessions: number;
}

interface TrafficAreaChartProps {
  data: TrafficDataPoint[];
  height?: number;
}

/**
 * Clean, lightweight SVG Area & Line Chart for daily website traffic.
 * Includes interactive hover tooltip and smooth gradient fill.
 */
export default function TrafficAreaChart({
  data,
  height = 120,
}: TrafficAreaChartProps) {
  const [activePoint, setActivePoint] = useState<TrafficDataPoint | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.pageViews)) * 1.1;
  const count = data.length;

  const getX = (index: number) => (index / (count - 1)) * 100;
  const getY = (value: number) => 100 - (value / maxVal) * 100;

  const points = data.map((d, i) => `${getX(i)},${getY(d.pageViews)}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="relative w-full">
      {/* Floating Tooltip */}
      {activePoint && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded shadow-md z-10 pointer-events-none flex items-center space-x-2 whitespace-nowrap">
          <span className="font-bold text-amber-300">{activePoint.date}</span>
          <span>{activePoint.pageViews.toLocaleString()} views</span>
          <span className="text-slate-400">({activePoint.sessions.toLocaleString()} sessions)</span>
        </div>
      )}

      {/* SVG Canvas */}
      <div style={{ height }} className="w-full relative">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="trafficGradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background Grid Guidelines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />

          {/* Shaded Area */}
          <polygon points={areaPoints} fill="url(#trafficGradientArea)" />

          {/* Stroke Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Nodes */}
          {data.map((item, index) => (
            <circle
              key={item.date}
              cx={getX(index)}
              cy={getY(item.pageViews)}
              r="2.5"
              fill="#ffffff"
              stroke="#2563EB"
              strokeWidth="1.5"
              className="cursor-pointer hover:r-4 transition-all"
              onMouseEnter={() => setActivePoint(item)}
              onMouseLeave={() => setActivePoint(null)}
            />
          ))}
        </svg>
      </div>

      {/* Date Markers on X-Axis */}
      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
        <span>{data[0]?.date}</span>
        <span>{data[Math.floor(data.length / 2)]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
}

