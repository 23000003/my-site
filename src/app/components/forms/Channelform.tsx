'use client'
import { AddChannel } from '@/app/actions/channelAction';
import { Channel } from '@/types/types';
import { revalidateTag } from 'next/cache';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Channelform(): JSX.Element {

    const [subject, setSubject] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const CreateChannel = async(e: React.FormEvent<HTMLFormElement>): Promise<void> =>{
        e.preventDefault();

        if(!subject){
            setError("Dont Leave it Blank");
            return;
        }

        setError(null)
        setMessage(null);
        setLoading(true);

        const userId:number = Number(localStorage.getItem('id'));
        
        const channelType: Channel = {
            title: subject,
            userId,
        }

        try{
            const data:string = await AddChannel(channelType);
            setMessage(data);
            setSubject('');
        }
        catch(err){
            setError((err as Error).message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={CreateChannel} className='flex flex-col'>
            <div className='text-center'>
                <span>Add Channel</span>
            </div>
            <div className='w-full mt-5'>
                <label htmlFor="Subject">Channel Name:</label>
                <input 
                    type="text" 
                    id="Subject"
                    value={subject} 
                    className='border w-full mt-1 h-8'
                    onChange={(e) => setSubject(e.target.value)}
                />
                <button 
                    className={`mt-5 h-10 rounded-sm text-white w-full ${!loading ? 'bg-blue-800' : 'bg-blue-300'}`}
                    aria-disabled = {loading}
                    type='submit'
                >Add</button>
                {error && <p className='mt-3 text-red-500 text-center'>{error}</p>}
                {message && <p className='mt-3 text-green-500 text-center'>{message}</p>}
                {loading && <Image src="/loading.gif" alt="" className='w-24 m-auto' width={96} height={96}/>}
            </div>
        </form>
    )
}
