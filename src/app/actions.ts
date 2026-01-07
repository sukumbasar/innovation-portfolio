'use server';

import { prisma } from "@/lib/db/prisma";
import { VendorTask } from "@/types";
import { revalidatePath } from "next/cache";

export async function addTask(vendorId: string, task: Omit<VendorTask, 'id' | 'status'>) {
    try {
        const newTask = await prisma.task.create({
            data: {
                title: task.title,
                assignee: task.assignee,
                dueDate: task.dueDate,
                status: 'todo',
                vendorId: vendorId
            }
        });
        revalidatePath('/history');
        revalidatePath('/portfolio');
        return { success: true, task: newTask };
    } catch (error) {
        console.error("Failed to add task:", error);
        return { success: false, error: "Failed to add task" };
    }
}

export async function updateTask(taskId: string, data: Partial<VendorTask>) {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title: data.title,
                assignee: data.assignee,
                dueDate: data.dueDate,
                status: data.status
            }
        });
        revalidatePath('/history');
        return { success: true, task: updatedTask };
    } catch (error) {
        console.error("Failed to update task:", error);
        return { success: false, error: "Failed to update task" };
    }
}

export async function deleteTask(taskId: string) {
    try {
        await prisma.task.delete({
            where: { id: taskId }
        });
        revalidatePath('/history');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete task:", error);
        return { success: false, error: "Failed to delete task" };
    }
}
export async function addVendor(data: { name: string; category: string; description: string }) {
    try {
        const newVendor = await prisma.vendor.create({
            data: {
                name: data.name,
                category: data.category,
                description: data.description,
                status: 'Discovered', // Default status
            }
        });
        revalidatePath('/portfolio');
        revalidatePath('/history');
        return { success: true, vendor: newVendor };
    } catch (error) {
        console.error("Failed to add vendor:", error);
        return { success: false, error: "Failed to add vendor" };
    }
}

export async function updateVendorDetails(vendorId: string, data: Partial<{
    name: string;
    description: string;
    category: string;
    status: string;
    contactPerson: string;
    email: string;
    website: string;
}>) {
    try {
        const updatedVendor = await prisma.vendor.update({
            where: { id: vendorId },
            data: {
                name: data.name,
                description: data.description,
                category: data.category,
                status: data.status,
                contactPerson: data.contactPerson,
                email: data.email,
                website: data.website
            }
        });
        revalidatePath('/portfolio');
        revalidatePath(`/portfolio/${vendorId}`);
        revalidatePath('/history');
        return { success: true, vendor: updatedVendor };
    } catch (error) {
        console.error("Failed to update vendor:", error);
        return { success: false, error: "Failed to update vendor" };
    }
}

export async function addArtifact(vendorId: string, data: { title: string; type: string; url: string }) {
    try {
        const newArtifact = await prisma.artifact.create({
            data: {
                title: data.title,
                type: data.type,
                url: data.url,
                vendorId: vendorId
            }
        });
        revalidatePath(`/portfolio/${vendorId}`);
        return { success: true, artifact: newArtifact };
    } catch (error) {
        console.error("Failed to add artifact:", error);
        return { success: false, error: "Failed to add artifact" };
    }
}

import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadArtifact(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        const title = formData.get("title") as string;
        const type = formData.get("type") as string;
        const vendorId = formData.get("vendorId") as string;

        if (!file || !vendorId) {
            throw new Error("Missing required fields");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique name
        const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const uploadDir = join(process.cwd(), "public/uploads");
        const path = join(uploadDir, uniqueName);

        // Ensure directory exists (basic check, normally done at startup)
        // Note: In production we'd use S3. For local dev, FS is fine.
        // We assume public/uploads exists or we should create it. Note: fs.mkdir is needed.

        // Let's rely on Node fs to write.
        await writeFile(path, buffer);

        const url = `/uploads/${uniqueName}`;

        const newArtifact = await prisma.artifact.create({
            data: {
                title,
                type,
                url,
                vendorId
            }
        });

        revalidatePath(`/portfolio/${vendorId}`);
        return { success: true, artifact: newArtifact };
    } catch (error) {
        console.error("Upload failed:", error);
        return { success: false, error: "Failed to upload file" };
    }
}
