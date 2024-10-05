
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { invalidateSecret } from './actions/secretAction';
import { User } from '@/types/types';
import Image from 'next/image';

export default function Landing(): JSX.Element {
    
    const [timeout, setTime] = useState<boolean>(true);
    const [secretPass, setSecretPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useRouter();

    const PassSecret = async (): Promise<void> => {
        
        try{
            const validate: User | null = await invalidateSecret(secretPass);
            setLoading(true)

            if(validate === null){
                setTimeout(() => {
                    setError("Wrong Secret")
                    setLoading(false);
                }, 1000);

            }else{
                localStorage.setItem("token", validate.User.myToken);
                localStorage.setItem("id", validate.User.id.toString());
                localStorage.setItem("name", validate.User.name);
                localStorage.setItem("email", validate.User.email);
                setTimeout(() =>{
                    navigate.push('/Dashboard');
                }, 1000)
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

    console.log(loading);
    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            {!timeout ? (
                <div className='bg-white shadow-xl border w-96 p-8'>
                <div className='flex flex-col items-center'>
                    <form action={PassSecret} className='flex flex-col w-full mt-3'>
                        <label htmlFor="secret">Enter Secret Pass</label>
                        <input
                            type="password"
                            id='secret'
                            className='border mt-2 h-8'
                            value={secretPass}
                            onChange={(e) => setSecretPass(e.target.value)}
                        />
                        <button
                            className={`mt-5 py-2 text-white ${!loading ? 'bg-blue-800' : 'bg-blue-300'}`}
                            type='submit'
                            disabled={loading}
                            onClick={() => {setError('')}}
                        >
                            Access
                        </button>
                    </form>
                    {error && <p className='mt-3 text-red-500'>{error}</p>}
                    {loading && <Image src="/loading.gif" alt="loading" className='w-16 mt-4' width={64} height={64}/>}
                </div>
            </div>
            ) : (
                <div className='w-64'>
                    <Image src="/loading.gif" alt="loading" width={256} height={256}/>
                </div>
            )}
        </div>
    );
}
