import { Vendor, Category, Objective } from '@/types';

// Helper to calculate overall score automatically
const calculateScore = (r: Omit<Vendor['ratings'], 'overall'>) => {
    return r.problemFit + r.solutionMaturity + r.evidence + r.differentiation + r.strategicFit;
};

export const MOCK_OKRS: Objective[] = [
    {
        id: 'o1',
        title: 'Operational Excellence',
        description: 'Reduce waste and improve efficiency across supply chain.',
        keyResults: [
            { id: 'kr1', description: 'Reduce inventory waste by 15%', unit: '%' },
            { id: 'kr2', description: 'Decrease fulfillment cost by 10%', unit: '%' }
        ]
    },
    {
        id: 'o2',
        title: 'Customer Experience',
        description: 'Deliver seamless and personalized shopping experiences.',
        keyResults: [
            { id: 'kr3', description: 'Improve checkout speed by 30%', unit: '%' },
            { id: 'kr4', description: 'Increase personalization conversion by 5%', unit: '%' }
        ]
    }
];

export const MOCK_VENDORS: Vendor[] = [
    {
        id: '1',
        name: 'NeuralFlow',
        category: 'AI / ML',
        description: 'Predictive analytics for seasonal inventory demand using deep learning.',
        keyResultIds: ['kr1'], // Links to 'Reduce inventory waste...'
        matchedNeedIds: ['n1'], // Linked to 'Sarah Connor' request
        keyDifferentiators: ['Proprietary transformer model', 'Self-hosted option'],
        tags: ['Inventory', 'Forecasting', 'GenAI'],
        status: 'POC',
        ratings: {
            problemFit: 18,
            solutionMaturity: 15,
            evidence: 12,
            differentiation: 19,
            strategicFit: 18,
            overall: 82
        },
        investment: {
            status: 'Watch Closely',
            justification: 'High strategic fit but need to see more commercial traction beyond POC.',
            lastReviewed: '2025-12-20',
            signals: [
                { id: 's1', type: 'Internal', category: 'Strategic', title: 'Strong OKR Alignment', description: 'Directly impacts Q1 efficiency goals.', date: '2025-11-15', impact: 'Positive' },
                { id: 's2', type: 'External', category: 'Funding', title: 'Raised Series A', description: '$15M round led by Sequoia.', date: '2025-10-01', impact: 'Positive', source: 'TechCrunch' }
            ]
        },
        websiteUrl: 'https://neuralflow.ai',
        linkedinUrl: 'https://linkedin.com/company/neuralflow',
        externalUpdates: [
            { id: 'u1', date: '2025-12-28', source: 'news', content: 'NeuralFlow named Top 50 AI Starkups by Forbes.', url: '#' },
            { id: 'u2', date: '2025-12-15', source: 'linkedin', content: 'We are hiring for our new London office! Check out the roles.', url: '#' },
            { id: 'u3', date: '2025-12-01', source: 'website', content: 'Launched v2.0 of our forecasting engine with 2x speed improvement.', url: '#' }
        ],
        artifacts: [
            { id: 'a1', title: 'Seed Pitch Deck', type: 'deck', url: '#', dateAdded: '2025-11-01' },
            { id: 'a2', title: 'POC Scoping Doc', type: 'doc', url: '#', dateAdded: '2025-12-10' }
        ],
        timeline: [
            { id: 't1', date: '2025-10-15', type: 'contact', title: 'Cold Email', description: 'Reached out via LinkedIn.', author: 'User' },
            { id: 't2', date: '2025-10-20', type: 'meeting', title: 'Intro Call', description: 'Impressed by the demo. Team seems solid.', author: 'User' },
            { id: 't3', date: '2025-12-01', type: 'poc_start', title: 'POC Kickoff', description: 'Testing on Q4 dataset.', author: 'User' }
        ],
        similarVendorIds: ['2'],
        lastUpdated: '2025-12-05',
        tasks: [
            { id: 'vt1', title: 'Sign NDA', status: 'done', dueDate: '2025-10-10', assignee: 'Enes Muhan' },
            { id: 'vt2', title: 'Data Security Review', status: 'done', dueDate: '2025-11-01', assignee: 'IT Security' },
            { id: 'vt3', title: 'Define POC Success Metrics', status: 'in_progress', dueDate: '2025-12-15', assignee: 'Sarah Connor' },
            { id: 'vt4', title: 'Pilot Deployment', status: 'todo', dueDate: '2026-02-01', assignee: 'Ops Team' }
        ]
    },
    {
        id: '2',
        name: 'VisionaryRetail',
        category: 'Computer Vision',
        description: 'Automated checkout and theft detection using overhead cameras.',
        keyResultIds: ['kr3'], // Links to 'Improve checkout speed...'
        keyDifferentiators: ['No gates required', 'High accuracy in low light'],
        tags: ['Checkout', 'Loss Prevention', 'CX'],
        status: 'Met',
        ratings: {
            problemFit: 15,
            solutionMaturity: 10,
            evidence: 5,
            differentiation: 15,
            strategicFit: 12,
            overall: 57
        },
        artifacts: [],
        timeline: [
            { id: 't1', date: '2026-01-02', type: 'meeting', title: 'Intro Demo', description: 'Tech is cool but expensive.', author: 'User' }
        ],
        similarVendorIds: ['1'],
        lastUpdated: '2026-01-02'
    },
    {
        id: '3',
        name: 'AutoBot Logistics',
        category: 'Automation / RPA',
        description: 'Warehouse robots for rapid picking and packing.',
        keyResultIds: ['kr2'], // Links to 'Decrease fulfillment cost...'
        matchedNeedIds: ['n2'], // Linked to 'Mike Ross' request
        keyDifferentiators: ['Plug and play', 'RaaS Model'],
        tags: ['Robotics', 'Warehouse'],
        status: 'Working',
        ratings: {
            problemFit: 20,
            solutionMaturity: 20,
            evidence: 20,
            differentiation: 15,
            strategicFit: 20,
            overall: 95
        },
        investment: {
            status: 'Watch Closely',
            justification: 'Proven reduction in fulfillment costs. Technology is mature and team is scaling.',
            lastReviewed: '2025-01-02',
            signals: [
                { id: 's4', type: 'External', category: 'Market', title: 'Market Leader', description: 'Cited as top contender in Gartner Magic Quadrant.', date: '2024-11-20', impact: 'Positive' }
            ]
        },
        websiteUrl: 'https://autobot.logistics',
        linkedinUrl: 'https://linkedin.com/company/autobot-logistics',
        externalUpdates: [
            { id: 'u4', date: '2025-01-03', source: 'linkedin', content: 'Celebrating 1 million picks with our new RaaS deployment in Ohio!', url: '#' }
        ],
        artifacts: [],
        timeline: [],
        similarVendorIds: [],
        lastUpdated: '2024-05-20',
        tasks: [
            { id: 'vt5', title: 'Site Inspection', status: 'done', dueDate: '2024-11-15', assignee: 'Facility Manager' },
            { id: 'vt6', title: 'Contract Negotiation', status: 'in_progress', dueDate: '2025-01-20', assignee: 'Legal' }
        ]
    },
    {
        id: '4',
        name: 'DataMinds',
        category: 'Data & Analytics',
        description: 'Customer segmentation platform.',
        keyResultIds: ['kr4'], // Links to 'Increase personalization...'
        keyDifferentiators: [],
        tags: ['CRM', 'Analytics'],
        status: 'Discovered',
        ratings: {
            problemFit: 10,
            solutionMaturity: 10,
            evidence: 0,
            differentiation: 5,
            strategicFit: 10,
            overall: 35
        },
        artifacts: [],
        timeline: [],
        similarVendorIds: [],
        lastUpdated: '2026-01-04',
        isAiSuggested: true
    }
];


export const MOCK_INTERNAL_NEEDS: import('@/types').InternalNeed[] = [
    {
        id: 'n1',
        requester: 'Sarah Connor - Supply Chain',
        department: 'Supply Chain',
        problemDescription: 'Need to reduce inventory waste by better forecasting seasonal demand.',
        relatedOkrId: 'o1',
        status: 'Evaluating',
        dateSubmitted: '2025-12-01',
        priority: 'High'
    },
    {
        id: 'n2',
        requester: 'Mike Ross - Logistics',
        department: 'Logistics',
        problemDescription: 'Fulfillment costs are too high due to manual picking processes.',
        relatedOkrId: 'o1',
        status: 'Matched',
        dateSubmitted: '2025-11-20',
        priority: 'Medium'
    }
];

import { getGoogleSheetData } from './google-sheets';
import { prisma } from './db/prisma';

export async function getVendors(): Promise<Vendor[]> {
    // 1. Fetch live data from Google Sheets (if configured)
    const liveVendors = await getGoogleSheetData();

    // 2. Fetch from Database
    const dbVendors = await prisma.vendor.findMany({
        include: {
            tasks: true,
            timeline: true,
            // artifacts: true, // Revert until server restart
            // externalUpdates: true // Not in schema yet, adding relations in schema would be better for updates too but for now we aggregate differently
        }
    });

    // ... (lines 211-218)

    const transformedDbVendors: Vendor[] = dbVendors.map(v => ({
        id: v.id,
        name: v.name,
        category: v.category as Category, // Cast assuming valid enum string
        description: v.description || '',
        status: v.status as any,
        contactPerson: v.contactPerson || undefined,
        email: v.email || undefined,
        websiteUrl: v.website || undefined,
        lastUpdated: v.lastUpdated.toISOString().split('T')[0],

        // ... (lines 230-238)
        ratings: {
            problemFit: 0, solutionMaturity: 0, evidence: 0, differentiation: 0, strategicFit: 0, overall: 0
        },
        tags: [],
        keyDifferentiators: [],
        artifacts: [], // Default to empty, will be merged from mock if exists
        timeline: v.timeline.map(t => ({
            id: t.id,
            date: t.date,
            title: t.title,
            type: t.type as any, // Cast
            description: '', // Missing in DB schema
            author: 'System'
        })),
        tasks: v.tasks.map(t => ({
            id: t.id,
            title: t.title,
            status: t.status as any,
            assignee: t.assignee,
            dueDate: t.dueDate
        })),
        similarVendorIds: [],
        keyResultIds: [],
        matchedNeedIds: [],

        // RE-INJECTION hack to keep the demo looking good:
        // Find original mock data and merge back the static complex fields (Ratings, Investment, etc)
        // Revert: Allow artifacts to come from mock for now
        // BUT exclude tasks, timeline so DB data persists/is authoritative.
        ...(() => {
            const mock = MOCK_VENDORS.find(m => m.id === v.id);
            if (!mock) return {};
            const { tasks, timeline, ...rest } = mock;
            return rest;
        })()
    } as Vendor));

    // If new vendors are added via DB, they won't have the mock updates.
    // We prioritize the DB timeline/tasks which are the focus.

    return [...liveVendors, ...transformedDbVendors];
}

export async function getVendor(id: string): Promise<Vendor | undefined> {
    const vendors = await getVendors();
    return vendors.find(v => v.id === id);
}

// Helper to get OKRs
export async function getOKRs(): Promise<Objective[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_OKRS), 200);
    });
}

export async function getInternalNeeds(): Promise<import('@/types').InternalNeed[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_INTERNAL_NEEDS), 200);
    });
}

import { UpdateItem } from '@/types';

export async function getAllUpdates(): Promise<UpdateItem[]> {
    const vendors = await getVendors();
    const updates: UpdateItem[] = [];

    vendors.forEach(vendor => {
        const vInfo = { id: vendor.id, name: vendor.name, logo: vendor.logoUrl };

        // 1. Timeline Events
        vendor.timeline?.forEach(t => {
            updates.push({
                id: `tl-${vendor.id}-${t.id}`,
                date: t.date,
                type: 'timeline',
                subType: t.type,
                title: t.title,
                description: t.description,
                vendor: vInfo,
                metadata: { author: t.author }
            });
        });

        // 2. External Updates
        vendor.externalUpdates?.forEach(u => {
            updates.push({
                id: `ext-${vendor.id}-${u.id}`,
                date: u.date,
                type: 'external',
                subType: u.source,
                title: u.source === 'news' ? 'News Mention' : 'External Update',
                description: u.content,
                vendor: vInfo,
                metadata: { url: u.url }
            });
        });

        // 3. Signals (Investment)
        vendor.investment?.signals?.forEach(s => {
            updates.push({
                id: `sig-${vendor.id}-${s.id}`,
                date: s.date,
                type: 'signal',
                subType: s.category.toLowerCase(),
                title: s.title,
                description: s.description,
                vendor: vInfo,
                metadata: { impact: s.impact, source: s.source }
            });
        });
    });

    // Sort by date descending (newest first)
    return updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
