import React from 'react'
import SubjectNotes from '../../components/subjectNotes'
import { Params } from '@/types/types';


export default function page({params} : {params : Params}) : JSX.Element {
    
    const subject : string = params.subject;

    return (
        <main className='mt-10 p-5'>
            <SubjectNotes subject={subject}/>
        </main>
    )
}
