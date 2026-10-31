'use strict';
'use client';

import React from 'react';
import KpiSummaryRow from './hub/KpiSummaryRow';
import AnalyticsPanel from './hub/AnalyticsPanel';
import SocialPanel from './hub/SocialPanel';
import LeadsPanel from './hub/LeadsPanel';
import ChatbotPanel from './hub/ChatbotPanel';
import HousesSection from './hub/HousesSection';

interface HubViewProps {
  onNavigate: (tabId: string) => void;
}

/**
 * Main Command Hub Landing Page.
 * Composed of clean, modular subcomponents:
 * - KpiSummaryRow: Top-line metrics for quick assessment
 * - Visual Panels: Interactive cards with SVG graphs & pie charts
 * - HousesSection: Annual merit shield standings
 */
export default function HubView({ onNavigate }: HubViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Top-Line KPI Pulse Summary Bar */}
      <KpiSummaryRow onNavigate={onNavigate} />

      {/* 2. The 4 Visual Dashboard Panels (With Graphs & Pie Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsPanel onNavigate={onNavigate} />
        <SocialPanel onNavigate={onNavigate} />
        <LeadsPanel onNavigate={onNavigate} />
        <ChatbotPanel onNavigate={onNavigate} />
      </div>

      {/* 3. Bottom Row: Four Historic Houses Standings */}
      <HousesSection />
    </div>
  );
}
