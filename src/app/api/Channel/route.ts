import { NextRequest, NextResponse } from 'next/server';
import { ToDoType } from '@/types/types';
import { db } from '@/db';
import { channelTable  } from '@/db/schema';
import { eq, asc, gt, sql } from 'drizzle-orm';


export async function GET() {
    try{
        const res = await db.select()
            .from(channelTable);

        return NextResponse.json({ data: res }, { status: 200 });
    }catch(err){
        return NextResponse.json({ message: "Error Fetching"}, { status: 500 });
    }
}

export async function POST(req: NextRequest){
    
    try {
    
        const { title, userId } = await req.json();

        console.log(title. userId);

        await db.insert(channelTable).values({ 
            title: title, 
            userId: userId, 
        });

        return NextResponse.json({ message: 'Subject Added Successfully' }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }

}