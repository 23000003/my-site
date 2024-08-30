'use client'
import React, { useEffect } from 'react'
import { Revalidating } from '../actions/todoAction'

export default function RevalidateButton(): JSX.Element {
    
    const Revalidate = async (): Promise<void> =>{
        await Revalidating();
        console.log("revalidated");
    }

    return (
        <span 
            className='fixed bottom-10 right-14 bg-slate-500 px-5 
                py-3 rounded-xl text-white cursor-pointer hover:bg-slate-400'
            onClick={Revalidate}
        >Refresh</span>
    )
}
