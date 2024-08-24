import React from 'react'
import NavigateButton from './Components/client/navigateButton'

export default function ToDos(): JSX.Element {
    return (
        <main className='mt-14 p-5'>
            <div className='bg-white w-full h-24 px-5 rounded-md mb-5'>
                <div className='flex flex-row h-full items-center justify-between w-full'>
                    <span className='text-lg'>Subject</span>
                    <span className='text-lg'>Contentt</span>
                    <span className='text-lg'>8:00PM Friday Aug 12</span>
                </div>
            </div>
            <NavigateButton linkP='/ToDos/addTodo'/>
        </main>
    )
}
