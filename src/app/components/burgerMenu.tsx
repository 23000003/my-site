'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { BurgerMenuInfo } from '@/helper/BurgerMenu';
import { usePathname, useRouter } from 'next/navigation';
import getSession from '@/middleware/session';
import Link from 'next/link';

export default function BurgerMenu(): JSX.Element {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [slidingAnim, setSlidingAnim] = useState<boolean>(false);
    const pathname = usePathname();
    const navigate = useRouter();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if(!id || !token){
            navigate.push('/');
        }else{
            const getSessW = async () => {
                const valid = await getSession(token, Number(id));
                if(!valid){
                    navigate.push("/");
                    localStorage.removeItem('id');
                    localStorage.removeItem('token');
                }
            }
            getSessW();
        }
    }, []);
    
    const navLabel = useMemo((): string => {
        const menuItem = BurgerMenuInfo.find(item => item.link === pathname);
        return menuItem ? menuItem.text : ' ';
      }, [pathname]);

    const handleClick = (): void => {
        setSlidingAnim(false);
        setTimeout(() =>{
            setIsOpen(false);
        }, 300);
    };

    if(pathname == '/'){
        return <></>
    }

    useEffect(() =>{
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';

        // return () =>{
        //     document.body.style.overflow = 'auto';
        // }
    }, [isOpen])

    return (
        <>
        <div className='flex items-center h-full px-5 justify-between'>
            <span className='text-white'>{navLabel}</span>
            <div 
                className="flex flex-col justify-center items-end h-full mr-5 cursor-pointer mt-1" 
                onClick={() => {setIsOpen(true), setSlidingAnim(true)}}
            >
                <span 
                    className='bg-white block h-0.5 w-6 rounded-sm mb-1'
                ></span>
                <span 
                    className='bg-white block h-0.5 w-6 rounded-sm mb-1'
                ></span>
                <span 
                    className='bg-white block h-0.5 w-6 rounded-sm mb-1'
                ></span>  
            </div>
        </div>
        
        {isOpen && (
            <>
            <div className='fixed h-screen w-screen bg-black opacity-50 -mt-14' onClick={handleClick}></div>
            <div className={`h-screen w-64 bg-white fixed right-0 border-l-2 flex flex-col -mt-14 Menu ${slidingAnim ? 'MenuTab-slide-in' : 'MenuTab-slide-out'}`}>
                <div className='p-6 flex-1'>
                    <div className='flex flex-row items-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s" className='w-10 rounded-3xl' />
                        <span className='ml-4'>Username</span>
                    </div>
                    <hr className='my-4'/>
                    
                    {BurgerMenuInfo.map((burger, index) => (
                        <Link
                            href={burger.link} 
                            className='mt-3 cursor-pointer hover:bg-gray-200 px-5 py-3 rounded-lg trasition duration-200 flex items-center' 
                            key={index}
                            onClick={handleClick}
                        >
                            <div className='flex w-5'>
                                <i className={burger.icon}></i>
                            </div>
                            <div className='flex'>
                                <span className='ml-3'>{burger.text}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='text-center mb-10 cursor-pointer hover:text-red-800 text-red-500'>
                    <i className="fa-solid fa-right-from-bracket mr-3"></i>
                    <span>Logout</span>
                </div>
            </div>
            </>
        )}
        </>
    )
}
