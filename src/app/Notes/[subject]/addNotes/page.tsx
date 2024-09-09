import NotesForm from '@/app/components/forms/NotesForm'
import React from 'react'

export default function page() {
    
    return (
        <main className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='bg-white w-4/5 p-5 rounded-md'>
                <NotesForm/>
            </div>
        </main>
    )
}
