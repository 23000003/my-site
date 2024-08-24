'use client'

import React, { useState } from 'react'

export default function Landing(): JSX.Element {
    
    const [timeout, setOut] = useState<boolean>(false);
    const [secretPass, setSecretPass] = useState<string>('');

    setTimeout(() =>{
        setOut(true);
    }, 1000);

    if(!timeout){
        return <div>loading...</div>
    }

    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='bg-white shadow-xl border w-96 p-8'>
                <div className='flex flex-col items-center'>
                    <form action="" className='flex flex-col w-full mt-3'>
                        <label htmlFor="username">Enter Secret Pass</label>
                        <input 
                            type="text" 
                            id='username' 
                            className='border mt-2 h-8'
                            onChange={(e) => setSecretPass(e.target.value)}
                        />
                        <button className='mt-5 py-2 bg-blue-800 text-white'>Access</button>
                    </form>
                </div>
            </div>
        </div>
    )

}
