import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    
    const result = await db.select().from(usersTable).where(eq(usersTable.id, 1));

    return NextResponse.json({ user: result[0] });
}