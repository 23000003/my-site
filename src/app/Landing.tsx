
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { invalidateSecret } from '../helper/controller/action';
import { User } from '@/types/schemaTypes';

export default function Landing(): JSX.Element {
    
    const [timeout, setTime] = useState<boolean>(true);
    const [secretPass, setSecretPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useRouter();

    const PassSecret = async (): Promise<void> => {
        try{
            setLoading(true);
            const validate: User | null = await invalidateSecret(secretPass);
            console.log(validate);
            if(validate === null){
                setLoading(false);
                setError("Wrong Secret")
            }else{
                localStorage.setItem("token", validate.User.myToken);
                localStorage.setItem("id", validate.User.id.toString());
                localStorage.setItem("name", validate.User.name);
                localStorage.setItem("email", validate.User.email);
                setLoading(false);
                navigate.push('/Dashboard');
            }
        }catch(err){
            setLoading(false);
            setError("Error Occured");
        }
    }

    useEffect(() =>{
        setTimeout(() =>{
            setTime(false);
        }, 5000);
    }, []);

    console.log(loading)

    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            {!timeout ? (
                <div className='bg-white shadow-xl border w-96 p-8'>
                <div className='flex flex-col items-center'>
                    <form action={PassSecret} className='flex flex-col w-full mt-3'>
                        <label htmlFor="secret">Enter Secret Pass</label>
                        <input
                            type="text"
                            id='secret'
                            className='border mt-2 h-8'
                            value={secretPass}
                            onChange={(e) => setSecretPass(e.target.value)}
                        />
                        <button
                            className='mt-5 py-2 bg-blue-800 text-white'
                            type='submit'
                        >
                            Access
                        </button>
                    </form>
                    {error && <p className='mt-3 text-red-500'>{error}</p>}
                    {loading && <img src="/loading.gif" alt="loading" className='w-16 mt-4'/>}
                </div>
            </div>
            ) : (
                <div className='w-64'>
                    <img src="/loading.gif" alt="loading" />
                </div>
            )}
        </div>
    );
}
