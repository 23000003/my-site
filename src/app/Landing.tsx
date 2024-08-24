
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { invalidateSecret } from '../helper/controller/action';
import { User } from '@/types/schemaTypes';

export default function Landing(): JSX.Element {
    
    const [timeout, setTimeout] = useState<boolean>(false);
    const [secretPass, setSecretPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useRouter();

    // if (!timeout) {
    //     return <div>Loading...</div>;
    // }

    const PassSecret = async (): Promise<void> => {
        setLoading(true);
        
        try{
            const validate: any | boolean = await invalidateSecret(secretPass);
            console.log(validate);

            if(validate == false){
                setError("Wrong Secret")
            }else{
                localStorage.setItem("token", validate.user.myToken);
                localStorage.setItem("id", validate.user.id);
                localStorage.setItem("name", validate.user.name);
                localStorage.setItem("email", validate.user.email);
                navigate.push('/Dashboard');
            }
        }catch(err){
            console.log(err)
            setError("Error Occured");
        }
        setLoading(false);
    }
    console.log(error);
    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
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
                    {loading && <p className='mt-3 text-green-500'>Loading....</p>}
                </div>
            </div>
        </div>
    );
}
