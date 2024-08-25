import React from 'react'
import Form from '../../components/form'

export default function AddTodos(): JSX.Element {
    
    return (
        <main className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='bg-white w-96 p-5 rounded-md'>
                <Form />
            </div>
        </main>
    )
}
