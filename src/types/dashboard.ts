export interface SchoolProfile {
  name: string;
  shortName: string;
  tagline: string;
  mottoLatin: string;
  mottoEnglish: string;
  secondaryMottoLatin: string;
  secondaryMottoEnglish: string;
  established: number;
  yearsOfExcellence: number;
  location: string;
  address: string;
  affiliation: string;
  board: string;
  management: string;
  liveWebsiteUrl: string;
  logoUrl: string;
  houses: {
    name: string;
    color: string;
    badgeHex: string;
    motto: string;
    points: number;
    shieldWinner: boolean;
  }[];
  quickStats: {
    totalStudents: number;
    facultyMembers: number;
    campusAreaAcres: number;
    sportsFacilities: number;
    smartClassrooms: number;
    alumniWorldwide: number;
  };
}

export interface GoogleAnalyticsData {
  timeframe: string;
  liveActiveUsers: number;
  kpis: {
    totalUsers: number;
    totalUsersChange: number;
    newUsers: number;
    newUsersChange: number;
    sessions: number;
    sessionsChange: number;
    avgSessionDuration: string;
    avgSessionDurationSec: number;
    bounceRate: number;
    bounceRateChange: number;
    pageViews: number;
    pageViewsChange: number;
    inquiryConversionRate: number;
    inquiryConversionRateChange: number;
  };
  dailyTraffic: {
    date: string;
    day: string;
    pageViews: number;
    sessions: number;
    uniqueUsers: number;
    inquiries: number;
  }[];
  topLandingPages: {
    path: string;
    title: string;
    views: number;
    avgDuration: string;
    bounceRate: number;
    conversions: number;
  }[];
  trafficChannels: {
    channel: string;
    percentage: number;
    sessions: number;
    growth: number;
    color: string;
  }[];
  topSearchKeywords: {
    keyword: string;
    clicks: number;
    impressions: number;
    ctr: string;
    position: number;
  }[];
  geoLocations: {
    city: string;
    region: string;
    country: string;
    users: number;
    percentage: number;
  }[];
  deviceBreakdown: {
    device: string;
    percentage: number;
    users: number;
    icon: string;
  }[];
  browserBreakdown: {
    browser: string;
    share: number;
  }[];
}

export interface SocialMediaPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'twitter';
  title: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagementRate: number;
  type: 'reel' | 'carousel' | 'video' | 'post';
  thumbnailUrl?: string;
  status: 'published' | 'scheduled';
}

export interface SocialMediaData {
  kpis: {
    totalFollowers: number;
    netGrowthMoM: number;
    totalImpressions: number;
    avgEngagementRate: number;
    totalVideoViews: number;
    socialAdmissionsInquiries: number;
  };
  platforms: {
    id: string;
    name: string;
    handle: string;
    followers: number;
    followersChange: number;
    postsCount: number;
    impressions: number;
    engagementRate: number;
    color: string;
    url: string;
  }[];
  weeklyEngagementTrends: {
    day: string;
    instagram: number;
    facebook: number;
    youtube: number;
    linkedin: number;
  }[];
  recentPosts: SocialMediaPost[];
  audienceDemographics: {
    category: string;
    percentage: number;
  }[];
}

export type LeadStatus =
  | 'New Inquiry'
  | 'Brochure Downloaded'
  | 'Campus Tour Booked'
  | 'Application Submitted'
  | 'Assessment Scheduled'
  | 'Principal Interaction'
  | 'Admitted / Enrolled'
  | 'Follow Up Needed'
  | 'Withdrawn';

export type LeadPriority = 'High' | 'Medium' | 'Low' | 'Warm';

export interface AdmissionLead {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplied: string;
  academicYear: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: 'Google Search' | 'Instagram Ad' | 'Website Form' | 'Campus Walk-in' | 'Alumni Referral' | 'Education Fair';
  leadScore: number;
  counselor: string;
  dateCreated: string;
  lastFollowUp: string;
  notes: string;
  boardPreference: 'ICSE' | 'ISC Science' | 'ISC Commerce' | 'ISC Humanities' | 'Kindergarten';
  hostelRequired: boolean;
}

export interface LeadsDashboardData {
  funnelMetrics: {
    totalInquiries: number;
    brochuresDownloaded: number;
    campusToursCompleted: number;
    applicationsReceived: number;
    entranceAssessmentsCompleted: number;
    offersExtended: number;
    enrolledStudents: number;
    overallConversionRate: number;
  };
  gradeDemand: {
    grade: string;
    seatsAvailable: number;
    applicationsCount: number;
    enrolledCount: number;
    fillPercentage: number;
  }[];
  sourceAttribution: {
    source: string;
    leads: number;
    conversionRate: number;
    color: string;
  }[];
  leads: AdmissionLead[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionLink?: {
    label: string;
    url: string;
  };
}

export interface ChatbotConversationLog {
  id: string;
  sessionId: string;
  userName: string;
  userType: 'Prospective Parent' | 'Alumnus' | 'Current Student' | 'Visitor';
  question: string;
  botReply: string;
  intent: string;
  confidenceScore: number;
  sentiment: 'Positive' | 'Neutral' | 'Inquiry' | 'Urgent';
  resolutionStatus: 'Resolved by Bot' | 'Escalated to Admissions Counselor' | 'Contact Form Submitted';
  time: string;
  rating?: number;
}

export interface ChatbotDashboardData {
  kpis: {
    totalConversations: number;
    botResolutionRate: number;
    avgResponseTimeSec: number;
    escalationRate: number;
    csatScore: number;
    totalRatings: number;
  };
  intentBreakdown: {
    intent: string;
    percentage: number;
    count: number;
    color: string;
  }[];
  hourlyActivity: {
    hour: string;
    chats: number;
  }[];
  unresolvedQueries: {
    query: string;
    frequency: number;
    suggestedAction: string;
  }[];
  recentLogs: ChatbotConversationLog[];
  knowledgeBaseSnippets: {
    category: string;
    title: string;
    keywords: string[];
    answer: string;
    quickReplies?: string[];
  }[];
}

