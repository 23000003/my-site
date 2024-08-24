import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from '@/types/schemaTypes';

export async function GET() {
    
    const result = await db.select().from(usersTable).where(eq(usersTable.id, 1));

    return NextResponse.json({ User: result[0] });
}