'use client'

import React from 'react'
import NavigateButton from '../ToDos/navigateButton'
import { useRouter } from 'next/navigation'

export default function NotesChannel(): JSX.Element {
    
    const navigate = useRouter();

    const subject = "try";

    return (
        <main className='mt-14 p-5'>
            <div className='w-full flex flex-col sm:flex-row gap-3'>
                <div 
                    className='flex flex-row px-5 mb-5 rounded-md h-24 items-center justify-between w-full bg-white
                        hover:bg-slate-200 transition duration-200 cursor-pointer'
                    onClick={() => navigate.push(`/Notes/${subject}`)}
                >
                    <span className='text-lg'>Subject</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                <div className='flex flex-row px-5 mb-5 rounded-md h-24 items-center justify-between w-full bg-white'>
                    <span className='text-lg'>Subject</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>
            <NavigateButton linkP='/Notes/addNotes'/>
        </main>
    )
}
