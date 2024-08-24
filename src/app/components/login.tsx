import React from 'react'
import Link from 'next/link'

export default function Login():JSX.Element {
    
    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            <div className='bg-white shadow-xl border w-96 p-8'>
                <div className='flex flex-col items-center'>
                    <span className='text-xl'>Welcome Back!</span>
                    <form action="" className='flex flex-col w-full mt-3'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' className='border mt-2 h-8'/>
                        <label htmlFor="pass" className='mt-5'>Password</label>
                        <input type="password" id='pass' className='border mt-2 h-8'/>
                        <button className='mt-5 py-2 bg-blue-800 text-white'>Login</button>
                    </form>
                    <span className='text-sm mt-5'>
                        Dont have an account? 
                        <Link href="/CreateAccount" className='text-blue-500 ml-2 underline'>
                            Create Account.
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
