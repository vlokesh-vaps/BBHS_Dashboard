'use strict';
'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';
import { AdmissionLead, LeadStatus, LeadPriority } from '../types/dashboard';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: AdmissionLead) => void;
}

export default function NewLeadModal({ isOpen, onClose, onAddLead }: NewLeadModalProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplied: 'Grade 1 (Primary)',
    priority: 'High' as LeadPriority,
    status: 'New Inquiry' as LeadStatus,
    source: 'Website Form' as AdmissionLead['source'],
    counselor: 'Mrs. Sharon D’Souza',
    boardPreference: 'ICSE' as AdmissionLead['boardPreference'],
    hostelRequired: false,
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.phone) {
      alert('Please fill in Student Name, Parent Name, and Phone Number.');
      return;
    }

    const newLead: AdmissionLead = {
      id: `BBHS-LD-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentName: formData.studentName,
      parentName: formData.parentName,
      email: formData.email || 'inquiry@parent.com',
      phone: formData.phone,
      gradeApplied: formData.gradeApplied,
      academicYear: '2026 - 2027',
      status: formData.status,
      priority: formData.priority,
      source: formData.source,
      leadScore: 85,
      counselor: formData.counselor,
      dateCreated: new Date().toISOString().split('T')[0],
      lastFollowUp: new Date().toISOString().split('T')[0],
      notes: formData.notes || 'Direct inquiry recorded via BBHS Dashboard.',
      boardPreference: formData.boardPreference,
      hostelRequired: formData.hostelRequired,
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-amber-500 rounded-lg text-slate-950">
              <UserPlus className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold">New Prospective Student Inquiry</h3>
              <p className="text-xs text-slate-400">Baldwin Boys&apos; High School &bull; Admissions 2026-27</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Liam Daniel Smith"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Arthur Smith"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98450 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="parent@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Grade / Class Applied
              </label>
              <select
                value={formData.gradeApplied}
                onChange={(e) => setFormData({ ...formData, gradeApplied: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs bg-white"
              >
                <option value="Nursery / Pre-KG">Nursery / Pre-KG</option>
                <option value="Prep / UKG">Prep / UKG</option>
                <option value="Grade 1 (Primary)">Grade 1 (Primary)</option>
                <option value="Grade 4 (Primary)">Grade 4 (Primary)</option>
                <option value="Grade 6 (Middle)">Grade 6 (Middle)</option>
                <option value="Grade 9 (ICSE Prep)">Grade 9 (ICSE Prep)</option>
                <option value="Grade 11 ISC (PCMB/PCMC)">Grade 11 ISC (PCMB/PCMC Science)</option>
                <option value="Grade 11 ISC (Commerce)">Grade 11 ISC (Commerce)</option>
                <option value="Grade 11 ISC (Humanities)">Grade 11 ISC (Humanities)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Board Preference
              </label>
              <select
                value={formData.boardPreference}
                onChange={(e) => setFormData({ ...formData, boardPreference: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs bg-white"
              >
                <option value="ICSE">ICSE Board</option>
                <option value="ISC Science">ISC Science (11th/12th)</option>
                <option value="ISC Commerce">ISC Commerce (11th/12th)</option>
                <option value="ISC Humanities">ISC Humanities (11th/12th)</option>
                <option value="Kindergarten">Kindergarten / Pre-Primary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Lead Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs bg-white"
              >
                <option value="Google Search">Google Search</option>
                <option value="Alumni Referral">Alumni Referral</option>
                <option value="Website Form">Website Form</option>
                <option value="Instagram Ad">Instagram Ad</option>
                <option value="Campus Walk-in">Campus Walk-in</option>
                <option value="Education Fair">Education Fair</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs bg-white"
              >
                <option value="New Inquiry">New Inquiry</option>
                <option value="Brochure Downloaded">Brochure Downloaded</option>
                <option value="Campus Tour Booked">Campus Tour Booked</option>
                <option value="Application Submitted">Application Submitted</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs bg-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Warm">Warm</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="hostelCheck"
              checked={formData.hostelRequired}
              onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.checked })}
              className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="hostelCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Student requires on-campus Boarding / Hostel facility
            </label>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Counselor Notes / Inquiries
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Interested in ICSE syllabus, keen on swimming facilities and school bus..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-amber-300 hover:text-white rounded-lg font-bold transition-colors shadow-sm"
            >
              Save &amp; Enroll Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

