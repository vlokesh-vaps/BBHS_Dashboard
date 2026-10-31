'use strict';
'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { bbhsSchoolProfile } from '../../data/bbhsData';

/**
 * Clean display of the 4 historic BBHS houses and their championship point standings.
 */
export default function HousesSection() {
  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              The Four Historic Houses &bull; 146th Annual Athletic Meet &amp; Merit Shield
            </h3>
            <p className="text-xs text-slate-500">
              Points standing across academics, sports, discipline, and cultural events
            </p>
          </div>
        </div>
        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300 self-start sm:self-auto">
          Western House Leading
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bbhsSchoolProfile.houses.map((house) => (
          <div
            key={house.name}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: house.badgeHex }}
                />
                <span className="font-bold text-xs text-slate-900">{house.name}</span>
              </div>
              {house.shieldWinner && (
                <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded">
                  SHIELD
                </span>
              )}
            </div>
            <div className="mt-2 text-xl font-black text-slate-900">
              {house.points}{' '}
              <span className="text-xs font-normal text-slate-400">pts</span>
            </div>
            <div className="text-[10px] text-slate-500 italic mt-0.5">&quot;{house.motto}&quot;</div>
          </div>
        ))}
      </div>
    </section>
  );
}

