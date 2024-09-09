'use client'

import { PostNotes } from '@/app/actions/NotesAction';
import { Content } from '@/types/types';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

export default function NotesForm() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const params = useParams();
    console.log(params.subject);
        
    const SubmitNotes = async(e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
        setMessage(null);

        if(!title || !content){
            setError("Fill All The Fields");
            return;
        }
        setError(null);
        setLoading(true);
        
        const NotesType: Content ={
            title,
            content,
            channelId: Number(params.subject),
            createdAt: new Date(),
        }

        try{
            const data:string = await PostNotes(NotesType);
            setMessage(data);
            setTitle('');
            setContent('');
        }catch(err){
            setError((err as Error).message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={SubmitNotes} className='flex flex-col'>
            <div className='text-center'>
                <span>Add Channel</span>
            </div>
            <div className='w-full mt-5 flex flex-col'>
                <label htmlFor="Title">Title:</label>
                <input 
                    type="text" 
                    id="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border w-full mt-1 h-8'
                />
                
                <label htmlFor="Content" className='mt-3'>Content:</label>
                <textarea
                    id="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='border w-full mt-1 h-80'
                />
                <button 
                    className={`mt-5 h-10 rounded-sm text-white w-full ${!loading ? 'bg-blue-800' : 'bg-blue-300'}`}
                    aria-disabled = {loading}
                    type='submit'
                >Add</button>
                {error && <p className='mt-3 text-red-500 text-center'>{error}</p>}
                {message && <p className='mt-3 text-green-500 text-center'>{message}</p>}
                {loading && <img src="/loading.gif" alt="" className='w-24 m-auto'/>}
                {/* <p className='mt-3 text-green-500 whitespace-pre-wrap'>{content}</p> */}
            </div>
        </form>
    );
}
