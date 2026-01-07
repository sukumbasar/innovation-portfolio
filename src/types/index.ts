export type VendorStatus =
    | 'Discovered'
    | 'Met'
    | 'POC'
    | 'Working'
    | 'Parked'
    | 'Killed';

export type Category =
    | 'AI / ML'
    | 'Computer Vision'
    | 'Supply Chain Tech'
    | 'Automation / RPA'
    | 'Data & Analytics'
    | 'Retail Experience'
    | 'Other';

export interface Rating {
    problemFit: number; // 0-20
    solutionMaturity: number; // 0-20
    evidence: number; // 0-20
    differentiation: number; // 0-20
    strategicFit: number; // 0-20
    overall: number; // 0-100 (Sum of above)
}

export interface Artifact {
    id: string;
    title: string;
    type: 'deck' | 'doc' | 'report' | 'video' | 'other';
    url: string;
    dateAdded: string;
}

export interface TimelineEvent {
    id: string;
    date: string;
    type: 'contact' | 'meeting' | 'poc_start' | 'poc_end' | 'status_change' | 'note';
    title: string;
    description: string;
    author: string; // "AI" or User Name
}


export type InvestmentStatus = 'Invest Ready' | 'Watch Closely' | 'Not Priority' | null;

export interface Signal {
    id: string;
    type: 'Internal' | 'External';
    category: 'Traction' | 'Strategic' | 'Market' | 'Team' | 'Funding' | 'Product';
    title: string;
    description: string;
    date: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    source?: string;
}

export interface InvestmentProfile {
    status: InvestmentStatus;
    justification: string;
    signals: Signal[];
    lastReviewed: string;
}

// OKR System
export interface KeyResult {
    id: string;
    description: string;
    targetValue?: number;
    currentValue?: number;
    unit?: string; // '%', '$', etc.
}

export interface Objective {
    id: string;
    title: string;
    description: string;
    keyResults: KeyResult[];
}

// Internal Needs / Demand Mapping
export interface InternalNeed {
    id: string;
    requester: string; // e.g. "John Doe - Supply Chain"
    department: string;
    problemDescription: string;
    relatedOkrId?: string; // Linked to Strategic Objective
    status: 'Open' | 'Evaluating' | 'Matched' | 'Solved';
    dateSubmitted: string;
    priority: 'High' | 'Medium' | 'Low';
}

export interface Vendor {
    id: string;
    name: string;
    logoUrl?: string; // S3 or placeholder
    category: Category;
    description: string; // What problem they solve

    // Strategic Info
    okrImpact?: string; // Deprecated, keep for backward compat for now
    keyResultIds: string[]; // Link to KeyResult IDs
    matchedNeedIds?: string[]; // New: Link to InternalNeed IDs
    keyDifferentiators: string[];
    tags: string[];

    // Status & Score
    status: VendorStatus;
    ratings: Rating;

    // Investment Intelligence
    investment?: InvestmentProfile;

    // Living History
    artifacts: Artifact[];
    timeline: TimelineEvent[];

    // Relationships
    similarVendorIds: string[];

    // Meta
    lastUpdated: string;
    websiteUrl?: string; // New field
    externalUpdates?: { // New field for "Last Updates"
        id: string;
        date: string;
        source: 'linkedin' | 'website' | 'news';
        content: string;
        url?: string;
    }[];
    contactPerson?: string;
    email?: string;
    linkedinUrl?: string; // New field
    isAiSuggested?: boolean; // Required for mock data

    // Project Management
    tasks?: VendorTask[];
}

export interface VendorTask {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'done';
    dueDate: string;
    assignee: string; // e.g. "John Doe"
}

export interface UpdateItem {
    id: string;
    date: string; // ISO string
    type: 'timeline' | 'external' | 'signal';
    subType: string; // e.g. 'meeting', 'funding', 'news'
    title: string;
    description: string;
    vendor: { id: string; name: string; logo?: string };
    metadata?: any; // link, original source, author
}
