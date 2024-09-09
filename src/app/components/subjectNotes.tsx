import { Content } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { GetNotes } from '../actions/NotesAction';
import { revalidateTag } from 'next/cache';
import { formatTimestamp } from '@/helper/timeconverter';

interface Props {
    subject: string;
}

async function FetchNotes(subject: string): Promise<Content[]> {

    try{
        const MyNotes = await GetNotes(subject);
        return MyNotes;
    }catch(err){
        return [];
    }

}

export default async function SubjectNotes({ subject } : Props ): Promise<JSX.Element> {
    
    const MyNotes = await FetchNotes(subject);

    return (
        <>
        {MyNotes.length > 0 ? (
            MyNotes.map((notes, index) => (
                <div className='bg-white p-5 mt-5' key={index}>
                    <div className='flex flex-row justify-between'>
                        <div className='font-bold'>
                            {notes.title}
                        </div>
                        <div>
                            {formatTimestamp(notes.createdAt.toString())}
                        </div>
                    </div>
                    <hr className='my-3'/>
                    <div className='mt-8 mb-3 whitespace-pre-wrap'>
                        {notes.content}
                    </div>
                </div>
            ))
        ) : (
            <div className='flex flex-col items-center justify-center mt-28'>
                <img src="/SadFace.jpg" className='w-32'/>
                <span className='mt-5'>No Notes :(</span>
            </div>
        )}

        <Link 
            className='bg-slate-500 -z-50 text-white fixed bottom-10 right-14 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-400'
            href={`${subject}/addNotes`}
        >
            Add Notes
        </Link>
        </>
    )
}
