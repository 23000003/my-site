'use client'
import React, { useEffect } from 'react'
import { TodoRevalidating } from '../actions/todoAction'
import { NotesRevalidating } from '../actions/NotesAction';

export default function RevalidateButton(): JSX.Element {
    
    useEffect(() =>{
        const Revalidate = async () =>{
            await TodoRevalidating();
            await NotesRevalidating();
        }
        Revalidate();
    },[]);

    return (
        <span 
            className='fixed bottom-10 right-14 bg-slate-500 px-5 -z-10
                py-3 rounded-xl text-white cursor-pointer hover:bg-slate-400'
        >Refresh</span>
    )
}
