import React from 'react'

export default function page({params} : any) {
    return (
        <main className='mt-14 p-5'>
            {params.subject}
        </main>
    )
}
