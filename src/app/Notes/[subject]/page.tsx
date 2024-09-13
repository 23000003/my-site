import React from 'react'
import SubjectNotes from '../../components/subjectNotes'
import { Params } from '@/types/types';
import { GetNotes } from '@/app/actions/NotesAction';
import { Content } from '@/types/types';


async function FetchNotes(subject: string): Promise<Content[]> {

    try{
        const MyNotes = await GetNotes(subject);
        return MyNotes;
    }catch(err){
        return [];
    }

}

export default async function page({params} : {params : Params}) : Promise<JSX.Element> {
    
    const subject : string = params.subject;
    const MyNotes = await FetchNotes(subject);

    return (
        <main className='mt-10 p-5'>
            <SubjectNotes subject={subject} MyNotes = {MyNotes}/>
        </main>
    )
}
