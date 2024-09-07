import { NextRequest, NextResponse } from 'next/server';
import { ToDoType } from '@/types/types';
import { db } from '@/db';
import { todoTable } from '@/db/schema';
import { eq, asc, gt, sql } from 'drizzle-orm';

export async function POST(req: NextRequest){

    try {
    
        const { title, content, deadlineAt, userId } = await req.json();

        await db.insert(todoTable).values({ 
            title: title, 
            content: content,
            userId: userId, 
            deadlineAt: deadlineAt
        });

        return NextResponse.json({ message: 'ToDo added successfully' }, { status: 200 });

    } catch (err) {

        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}

export async function GET(){

    try{
        const now = new Date().toISOString(); 

        const res = await db.select()
            .from(todoTable)
            .where(sql `${todoTable.userId} = 1 and ${todoTable.deadlineAt} > ${now}`)
            .orderBy(asc(todoTable.deadlineAt));

        return NextResponse.json({ data: res }, {status: 200});
    }catch(err){
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}