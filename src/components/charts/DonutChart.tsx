'use strict';
'use client';

import React, { useState } from 'react';

export interface DonutSlice {
  label: string;
  percentage: number;
  color: string;
  value?: string | number;
}

interface DonutChartProps {
  data: DonutSlice[];
  size?: number;
  strokeWidth?: number;
  centerValue?: string;
  centerLabel?: string;
}

/**
 * Clean, accessible SVG Donut / Pie Chart component.
 * Calculates SVG stroke arcs with hover interactions and readable legend items.
 */
export default function DonutChart({
  data,
  size = 130,
  strokeWidth = 22,
  centerValue,
  centerLabel = 'Total',
}: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* SVG Donut Circle */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform -rotate-90 filter drop-shadow-xs"
          role="img"
          aria-label="Distribution Donut Chart"
        >
          {/* Subtle Background Ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Individual Colored Slices */}
          {data.map((slice, index) => {
            const strokeDasharray = `${(slice.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((cumulativePercent / 100) * circumference);
            cumulativePercent += slice.percentage;

            const isHovered = hoveredIndex === index;

            return (
              <circle
                key={slice.label}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {/* Center Text Indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {hoveredIndex !== null ? (
            <>
              <span className="text-sm font-extrabold text-slate-900 leading-none">
                {data[hoveredIndex].percentage}%
              </span>
              <span className="text-[9px] text-slate-500 font-medium truncate max-w-[80px] mt-0.5">
                {data[hoveredIndex].label}
              </span>
            </>
          ) : (
            <>
              <span className="text-sm font-extrabold text-slate-900 leading-none">
                {centerValue || '100%'}
              </span>
              <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                {centerLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Clean Legend List */}
      <div className="space-y-1.5 flex-1 w-full text-xs">
        {data.map((item, index) => (
          <div
            key={item.label}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
              hoveredIndex === index ? 'bg-slate-100 font-semibold' : 'text-slate-600'
            }`}
          >
            <div className="flex items-center space-x-2 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-slate-700">{item.label}</span>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              <span className="font-bold text-slate-900">{item.percentage}%</span>
              {item.value && (
                <span className="text-[10px] text-slate-400 font-mono">({item.value})</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

