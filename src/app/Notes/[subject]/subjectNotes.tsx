import React from 'react'

interface Props {
    subject: string;
}

export default function SubjectNotes({ subject } : Props ): JSX.Element {
    
    return (
        <>
        <div className='bg-white p-5'>
            <div>
                Title: How to Add
            </div>
            <hr className='my-3'/>
            <div className='mt-8 mb-3'>
                DWAODJ WAOD JAWOD JOWAJD OAWD JOAWJDO AWOJD JAOWDJ OAWDJ OAWDJOAWDJ OAWO JDAWJO D DWAODJ WAOD JAWOD JOWAJD OAWD JOAWJDO AWOJD JAOWDJ OAWDJ OAWDJOAWDJ OAWO JDAWJO D
            </div>
        </div>
        <div 
            className='bg-slate-500 text-white fixed bottom-10 right-14 px-5 py-3 rounded-xl'
        >
            Add Notes
        </div>
        </>
    )
}
