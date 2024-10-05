"use client"

import { Content } from '@/types/types';
import Link from 'next/link';
import React, { useState } from 'react'
import { DeleteNote } from '../actions/NotesAction';
import { formatTimestamp } from '@/helper/timeconverter';
import Image from 'next/image'

interface Props {
    subject: string;
    MyNotes: Content[];
}


export default function SubjectNotes({ subject, MyNotes } : Props ): JSX.Element {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const TriggerDeleteNote = (id: number | undefined) =>{
        setLoading(true);
        const tryy = async () =>{
            const res = await DeleteNote(id);   
            setLoading(false);
            setMessage(res);
        }
        tryy();
    }
    return (
        <>
        {MyNotes.length > 0 ? (
            MyNotes.map((notes, index) => (
                <div className='bg-white p-5 mt-5' key={index}>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <div className='font-bold'>
                                {notes.title}
                            </div>
                            <i 
                                className="fa-solid text-red-500 fa-trash-can ml-5 cursor-pointer hover:text-red-400"
                                onClick={() => TriggerDeleteNote(notes.id)}
                            ></i>
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
                <Image src="/SadFace.jpg" className='w-32' alt="" width={128} height={128}/>
                <span className='mt-5'>No Notes :(</span>
            </div>
        )}
        {loading && (<Image src="/loading.gif" alt="" className='w-14 fixed right-20 top-0' width={56} height={56}/>)}
        {message && (<div className='fixed right-20 top-4 text-green-500'>{message}</div>)}
        <Link 
            className='bg-slate-500 text-white fixed bottom-10 right-14 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-400'
            href={`${subject}/addNotes`}
        >
            Add Notes
        </Link>
        </>
    )
}
