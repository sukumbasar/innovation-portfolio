import { PrismaClient } from '@prisma/client';
import { MOCK_VENDORS } from '../src/lib/data';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    for (const vendor of MOCK_VENDORS) {
        const createdVendor = await prisma.vendor.create({
            data: {
                id: vendor.id,
                name: vendor.name,
                description: vendor.description,
                category: vendor.category,
                status: vendor.status,
                contactPerson: vendor.contactPerson || null,
                email: vendor.email || null,
                website: vendor.websiteUrl || null,
                lastUpdated: new Date(vendor.lastUpdated),

                timeline: {
                    create: vendor.timeline?.map(t => ({
                        date: t.date,
                        title: t.title,
                        type: t.type
                    }))
                },

                tasks: {
                    create: vendor.tasks?.map(t => ({
                        title: t.title,
                        status: t.status,
                        assignee: t.assignee,
                        dueDate: t.dueDate
                    }))
                }
            }
        });
        console.log(`Created vendor with id: ${createdVendor.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
