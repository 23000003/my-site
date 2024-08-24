import React from 'react'

export default function Dashboard(): JSX.Element {
    
    return (
        <main className='mt-14 p-5'>
            <div className='flex flex-col bg-white p-5 rounded-xl'>
                <span className='text-2xl'>Incoming Todo</span>
                <span className='text-lg mt-1'>Subject: Networking</span>
                <span className='text-lg mt-1'>8:00PM Friday Aug 12</span>
            </div>
        </main>
    )
}
