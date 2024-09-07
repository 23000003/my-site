import React from 'react'
import NavigateButton from './navigateButton'
import Link from 'next/link'
import { Channel } from '@/types/types';
import { GetChannel } from '../actions/channelAction';

async function FetchNotesChannel(): Promise<Channel[]> {
    try{
        const channel = await GetChannel();
        return channel;
    }   
    catch(err){
        return [];
    }
}

export default async function NotesChannel(): Promise<JSX.Element> {
    
    const channel = await FetchNotesChannel();

    return (
        <>
        <div className='w-full grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {channel.length > 0 ? (
                channel.map((subject, index) => (
                    <Link 
                        key={index}
                        className='flex flex-row px-5 mb-5 rounded-md h-24 items-center justify-between bg-white
                            hover:bg-slate-200 transition duration-200 cursor-pointer'
                        href={`/Notes/${subject.title}`}
                    >
                        <span className='text-lg'>{subject.title}</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                ))
            ) : (
                <span>No Subjects</span>
            )}
        </div>
        <NavigateButton linkP='/Notes/addChannel'/>
        </>
    )
}
