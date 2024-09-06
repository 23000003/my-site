'use client'

import React from 'react'
import NavigateButton from '../components/navigateButton'
import Link from 'next/link'

export default function NotesChannel(): JSX.Element {
    
    const subject = "try";

    return (
        <main className='mt-14 p-5'>
            <div className='w-full flex flex-col sm:flex-row gap-3'>
                <Link 
                    className='flex flex-row px-5 mb-5 rounded-md h-24 items-center justify-between w-full bg-white
                        hover:bg-slate-200 transition duration-200 cursor-pointer'
                    href={`/Notes/${subject}`}
                >
                    <span className='text-lg'>Subject</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <div className='flex flex-row px-5 mb-5 rounded-md h-24 items-center justify-between w-full bg-white'>
                    <span className='text-lg'>Subject</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>
            <NavigateButton linkP='/Notes/addNotes'/>
        </main>
    )
}
