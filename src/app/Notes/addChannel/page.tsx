import Channelform from '@/app/components/forms/Channelform'
import React from 'react'

export default function AddChannel() {
    return (
        <main className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='bg-white w-96 p-5 rounded-md'>
                <Channelform/>
            </div>
        </main>
    )
}
