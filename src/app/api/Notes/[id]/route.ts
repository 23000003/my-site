"use server"
import { NextRequest, NextResponse } from 'next/server';
import { ToDoType } from '@/types/types';
import { db } from '@/db';
import { contentTable  } from '@/db/schema';
import { eq, asc, gt, sql } from 'drizzle-orm';


export async function GET(req: NextRequest, { params }: { params: { id: string } }){

    const id = Number(params.id);

    try{
        const res = await db.select()
            .from(contentTable)
             .where(sql `${contentTable.channelId} = ${id}`)
            .orderBy(asc(contentTable.createdAt));
        
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

        return NextResponse.json({message: "Notes Added Successfully"});

    }catch(err){
        return NextResponse.json({message: "Error processing Request"}, { status: 500 });
    }
}