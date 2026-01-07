import { google } from 'googleapis';
import { Vendor, VendorStatus, Category } from '@/types';

// These should be environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

export async function getGoogleSheetData(): Promise<Vendor[]> {
    if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.warn('Google Sheets credentials missing. Using mock data fallback.');
        return [];
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: GOOGLE_CLIENT_EMAIL,
                private_key: GOOGLE_PRIVATE_KEY,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            // Assuming data is in 'Form Responses 1' and columns A-Z
            range: 'Form Responses 1!A2:Z',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return [];
        }

        // Map rows to Vendor object
        // NOTE: This mapping depends heavily on the column order of your Google Form
        // We will assume a specific order for now or map by header name if we fetched headers
        return rows.map((row, index) => {
            // Setup safer defaults
            const timestamp = row[0];
            const name = row[1];
            const description = row[2];
            const category = row[3] as Category || 'Other';

            return {
                id: `gs_${index + 1}`, // Generate ID based on row index
                name: name || 'Unknown Vendor',
                description: description || '',
                category: category,
                // Default values for fields not in form yet
                status: 'Discovered',
                ratings: {
                    problemFit: 0,
                    solutionMaturity: 0,
                    evidence: 0,
                    differentiation: 0,
                    strategicFit: 0,
                    overall: 0
                },
                keyResultIds: [], // Need to implement mapping logic for OKRs later
                okrImpact: 'General Innovation', // Deprecated but safe default
                keyDifferentiators: [],
                tags: [],
                artifacts: [],
                timeline: [],
                similarVendorIds: [],
                lastUpdated: timestamp || new Date().toISOString(),
                isAiSuggested: false
            };
        });

    } catch (error) {
        console.error('Error fetching from Google Sheets:', error);
        return [];
    }
}
