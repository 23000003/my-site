'use client'

import React, { useState } from 'react'
import { SubmitAddToDo } from '../actions/todoAction';
import { ToDoType } from '@/types/types';

export default function Form(): JSX.Element {
    
    const [subject, setSubject] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const AddToDo = async(e: React.FormEvent<HTMLFormElement>): Promise<void> =>{
        e.preventDefault();
        setError(null)
        setMessage(null);
        if(!subject || !date || !details){
            setError("Don't Leave Inputs Blank");
            return;
        }
        setLoading(true);
        const userId:number = Number(localStorage.getItem('id'));
        
        const newToDo: ToDoType = {
            title: subject,
            content: details,
            deadlineAt: date,
            userId,
        };
        
        try{
            const data:string = await SubmitAddToDo(newToDo);
            setError(null);
            setLoading(false)
            setMessage(data);
            setDate('');
            setDetails('');
            setSubject('');
        }catch(err: any){
            setLoading(false)
            setError(err.message)
        }
    }

    return (
        <form onSubmit={AddToDo} className='flex flex-col'>
            <span className='text-center'>Add todo</span>
            
            <label htmlFor="subject" className='mt-3'>Subject</label>
            <input 
                type="text" 
                className='border mt-1'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                id='subject'
            />
            
            <label htmlFor="details" className='mt-3'>Details</label>
            <input 
                type="text" 
                className='border mt-1 h-12'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                id='details'
            />
            
            <label htmlFor="date" className='mt-3'>Date</label>
            <input 
                type="datetime-local" 
                className='border mt-1'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id='date'
            />
            
            <button 
                className='mt-5 bg-blue-500 h-10 rounded-sm text-white'
                type='submit'
            >Add</button>
            {error && <p className='mt-3 text-red-500 text-center'>{error}</p>}
            {message && <p className='mt-3 text-green-500 text-center'>{message}</p>}
            {loading && <img src="/loading.gif" alt="" className='w-24 m-auto'/>}
        </form>
    )
}
