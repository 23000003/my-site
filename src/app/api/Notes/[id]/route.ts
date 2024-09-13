"use server"
import { NextRequest, NextResponse } from 'next/server';
import { ToDoType } from '@/types/types';
import { db } from '@/db';
import { contentTable  } from '@/db/schema';
import { eq, asc, gt, sql, desc } from 'drizzle-orm';


export async function GET(req: NextRequest, { params }: { params: { id: string } }){

    const id = Number(params.id);

    try{
        const res = await db.select()
            .from(contentTable)
             .where(sql `${contentTable.channelId} = ${id}`)
            .orderBy(desc(contentTable.createdAt));
        
        if(!res){
            return NextResponse.json({data: []}, {status: 404});
        }

        return NextResponse.json({data: res}, {status: 200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Error processing request"}, { status: 500 });
    }
}


export async function POST(req: NextRequest){

    const { title, content, channelId, createdAt } = await req.json();

    console.log(channelId, "CHANNEL ID");

    try{

        const res = await db.insert(contentTable).values({
            title: title,
            content: content,
            channelId: channelId,
            createdAt: createdAt
        });

        console.log(res, "RESPIONSE");

        return NextResponse.json({message: "Notes Added Successfully"}, { status: 404 });

    }catch(err){
        return NextResponse.json({message: "Error processing Request"}, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
    
    const id = Number(params.id);

    try{
        const res = await db.delete(contentTable)
            .where(eq(contentTable.id, id));

        if(!res){
            return NextResponse.json({message: "Cannot Found Notes"}, { status: 404 });
        }
        
        return NextResponse.json({message: "Delete Note Successful"}, { status: 200 });
    }catch(err){
        console.log(err);
        return NextResponse.json({ message: "Error Deleting Request"}, { status: 500 });
    }
}