import React from 'react'

export default function loading() {
    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='w-64'>
                <img src="/loading.gif" alt="loading" />
            </div>
        </div>
    )
}
