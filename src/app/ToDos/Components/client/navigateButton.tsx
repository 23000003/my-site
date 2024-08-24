'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface LinkProps {
    linkP: string;
}

export default function NavigateButton({ linkP } : LinkProps): JSX.Element {
    
    const navigate = useRouter();

    return (
        <div className='fixed bottom-0 right-0 mr-10 mb-10 -z-10'>
            <button 
                className='bg-white py-5 px-7 text-xl rounded-xl hover:bg-slate-100'
                onClick={() => navigate.push(linkP)}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}
