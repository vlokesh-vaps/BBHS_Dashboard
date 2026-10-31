'use strict';
'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Home,
  BookOpen,
  Calendar,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { bbhsLeadsData } from '../data/bbhsData';
import { AdmissionLead, LeadStatus } from '../types/dashboard';
import NewLeadModal from './NewLeadModal';

export default function LeadsTab() {
  const [leadsList, setLeadsList] = useState<AdmissionLead[]>(bbhsLeadsData.leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<AdmissionLead | null>(null);

  // Status options
  const statusOptions: LeadStatus[] = [
    'New Inquiry',
    'Brochure Downloaded',
    'Campus Tour Booked',
    'Application Submitted',
    'Assessment Scheduled',
    'Principal Interaction',
    'Admitted / Enrolled',
    'Follow Up Needed',
    'Withdrawn',
  ];

  // Filtering
  const filteredLeads = leadsList.filter((lead) => {
    const matchesSearch =
      lead.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.counselor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesGrade = gradeFilter === 'all' || lead.gradeApplied === gradeFilter;
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesGrade && matchesPriority;
  });

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    setLeadsList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const handleAddNewLead = (newLead: AdmissionLead) => {
    setLeadsList([newLead, ...leadsList]);
  };

  const exportToCSV = () => {
    const headers = [
      'Lead ID',
      'Student Name',
      'Parent Name',
      'Email',
      'Phone',
      'Grade Applied',
      'Status',
      'Priority',
      'Source',
      'Score',
      'Counselor',
      'Board Preference',
      'Hostel Required',
      'Created Date',
      'Notes',
    ];

    const rows = leadsList.map((l) => [
      l.id,
      `"${l.studentName}"`,
      `"${l.parentName}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.gradeApplied}"`,
      l.status,
      l.priority,
      l.source,
      l.leadScore,
      `"${l.counselor}"`,
      l.boardPreference,
      l.hostelRequired ? 'Yes' : 'No',
      l.dateCreated,
      `"${l.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BBHS_Admissions_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'Admitted / Enrolled':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Principal Interaction':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Assessment Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Application Submitted':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Campus Tour Booked':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Follow Up Needed':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Warm':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Funnel Pipeline Overview */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              <span>Admissions Conversion Funnel &bull; Academic Year 2026-27</span>
            </h2>
            <p className="text-xs text-slate-500">
              Progression from initial inquiry on website to confirmed student registration
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0B192C] hover:bg-[#1E3E62] text-amber-300 hover:text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Prospective Lead</span>
            </button>

            <button
              onClick={exportToCSV}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 border border-slate-200"
              title="Download CSV Spreadsheet"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Funnel Stages */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Total Inquiries', count: bbhsLeadsData.funnelMetrics.totalInquiries, pct: '100%' },
            { label: 'Brochure Views', count: bbhsLeadsData.funnelMetrics.brochuresDownloaded, pct: '69.8%' },
            { label: 'Campus Tours', count: bbhsLeadsData.funnelMetrics.campusToursCompleted, pct: '33.6%' },
            { label: 'Applications', count: bbhsLeadsData.funnelMetrics.applicationsReceived, pct: '27.1%' },
            { label: 'Assessments', count: bbhsLeadsData.funnelMetrics.entranceAssessmentsCompleted, pct: '18.4%' },
            { label: 'Principal Offers', count: bbhsLeadsData.funnelMetrics.offersExtended, pct: '14.2%' },
            { label: 'Enrolled Boys', count: bbhsLeadsData.funnelMetrics.enrolledStudents, pct: '12.0%', highlight: true },
          ].map((stage, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all ${
                stage.highlight
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="text-[11px] font-medium opacity-80 uppercase tracking-wider truncate">
                {stage.label}
              </div>
              <div className="text-xl font-black mt-1">{stage.count.toLocaleString()}</div>
              <div className="text-[10px] mt-0.5 opacity-90">{stage.pct} conversion</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Demand & Seat Availability Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Grade-wise Capacity &amp; Admissions Demand
              </h3>
              <p className="text-xs text-slate-500">
                Seat quotas vs applications received for 2026-27 session
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
              Avg. 76.4% Booked
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {bbhsLeadsData.gradeDemand.map((grade) => (
              <div key={grade.grade} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{grade.grade}</span>
                  <div className="flex items-center space-x-3 text-[11px]">
                    <span className="text-slate-500">
                      Capacity: <span className="font-bold text-slate-700">{grade.seatsAvailable}</span>
                    </span>
                    <span className="text-slate-500">
                      Applications: <span className="font-bold text-blue-600">{grade.applicationsCount}</span>
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {grade.enrolledCount} Enrolled ({grade.fillPercentage}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      grade.fillPercentage >= 80 ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${grade.fillPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Attribution */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Lead Source Attribution
            </h3>

            <div className="mt-4 space-y-3.5">
              {bbhsLeadsData.sourceAttribution.map((src) => (
                <div key={src.source} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: src.color }}
                      />
                      <span>{src.source}</span>
                    </span>
                    <span className="font-bold text-slate-900">{src.leads} inquiries</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Conversion Rate:</span>
                    <span className="font-semibold text-emerald-600">{src.conversionRate}%</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (src.leads / 500) * 100)}%`,
                        backgroundColor: src.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <span className="font-bold">Alumni &amp; Word of Mouth</span> generates our highest conversion at 24.8%, reaffirming the 146-year community trust in Baldwin Boys.
          </div>
        </div>
      </div>

      {/* Interactive Leads Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Prospective Student Leads Database
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredLeads.length} of {leadsList.length} applicant records
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search student, parent, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-48 sm:w-60"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Statuses</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Warm">Warm</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="pb-3 pr-2">Student &amp; Parent</th>
                <th className="pb-3 pr-2">Class / Stream</th>
                <th className="pb-3 pr-2">Board &amp; Hostel</th>
                <th className="pb-3 pr-2">Lead Stage / Status</th>
                <th className="pb-3 pr-2">Priority</th>
                <th className="pb-3 pr-2">Counselor</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  {/* Student & Parent */}
                  <td className="py-3 pr-2">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      {lead.studentName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Parent: {lead.parentName}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center space-x-2 mt-0.5">
                      <span>{lead.phone}</span>
                      <span>&bull;</span>
                      <span className="font-mono">{lead.id}</span>
                    </div>
                  </td>

                  {/* Class / Stream */}
                  <td className="py-3 pr-2">
                    <div className="font-semibold text-slate-800">{lead.gradeApplied}</div>
                    <div className="text-[10px] text-slate-400">AY {lead.academicYear}</div>
                  </td>

                  {/* Board & Hostel */}
                  <td className="py-3 pr-2">
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                      {lead.boardPreference}
                    </span>
                    {lead.hostelRequired && (
                      <span className="ml-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300">
                        Boarder
                      </span>
                    )}
                  </td>

                  {/* Inline Status Dropdown */}
                  <td className="py-3 pr-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className={`text-[11px] font-semibold rounded-lg px-2 py-1 border transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-800">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="py-3 pr-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityBadge(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>

                  {/* Counselor */}
                  <td className="py-3 pr-2">
                    <div className="text-slate-800 font-medium">{lead.counselor}</div>
                    <div className="text-[10px] text-slate-400">Score: {lead.leadScore}/100</div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded font-medium text-[11px] transition-colors"
                    >
                      View Notes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedLead.studentName}</h3>
                <p className="text-xs text-slate-500">{selectedLead.id} &bull; {selectedLead.gradeApplied}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500">Parent:</span>{' '}
                <span className="font-semibold text-slate-800">{selectedLead.parentName}</span>
              </div>
              <div>
                <span className="text-slate-500">Contact:</span>{' '}
                <span className="font-semibold text-slate-800">{selectedLead.phone} ({selectedLead.email})</span>
              </div>
              <div>
                <span className="text-slate-500">Source:</span>{' '}
                <span className="font-semibold text-slate-800">{selectedLead.source}</span>
              </div>
              <div>
                <span className="text-slate-500">Counselor Assigned:</span>{' '}
                <span className="font-semibold text-slate-800">{selectedLead.counselor}</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-slate-800 mt-2">
                <span className="font-bold block text-amber-900 mb-1">Counselor Log Notes:</span>
                {selectedLead.notes}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      <NewLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLead={handleAddNewLead}
      />
    </div>
  );
}

