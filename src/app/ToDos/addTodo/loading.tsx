import React from 'react'
import Image from 'next/image'

export default function loading() {
    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='w-64'>
                <Image src="/loading.gif" alt="loading" width={256} height={256}/>
            </div>
        </div>
    )
}