import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "BBHS Executive Command Center | Baldwin Boys' High School Bangalore",
  description: "Executive Multi-Channel Dashboard for Baldwin Boys' High School: Google Analytics, Social Media Growth, Admissions Leads CRM, and AI Chatbot.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

