'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { BurgerMenuInfo } from '@/helper/BurgerMenu';
import { usePathname, useRouter } from 'next/navigation';
import getSession from '@/middleware/session';


export default function BurgerMenu(): JSX.Element {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const navigate = useRouter();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if(!id || !token){
            navigate.push('/');
        }else{
            const getSessW = async () => {
                console.log("hey");
                const valid = await getSession(token, Number(id));
                console.log(valid);
                if(!valid){
                    navigate.push("/");
                    localStorage.removeItem('id');
                    localStorage.removeItem('token');
                }else{
                    navigate.push("/Dashboard")
                }
            }
            getSessW();
        }
        console.log(id);
    }, [pathname]);

    console.log("Test");
    
    const navLabel = useMemo((): string => {
        const menuItem = BurgerMenuInfo.find(item => item.link === pathname);
        return menuItem ? menuItem.text : ' ';
      }, [pathname]);

    const handleClick = (): void => {
        setIsOpen(!isOpen);
    };

    if(pathname == '/'){
        return <></>
    }

    return (
        <>
        <div className='flex items-center h-full px-5 justify-between' onClick={handleClick}>
            <span className='text-white'>{navLabel}</span>
            <div className="flex flex-col justify-center items-end h-full mr-5 cursor-pointer mt-1">
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
            <div className={`h-screen w-64 bg-white fixed right-0 border-l-2 flex flex-col -mt-14 ${isOpen ? 'ease-in trasition duration-200' : ''}`}>
                <div className='p-6 flex-1'>
                    <div className='flex flex-row items-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjspNyVZ_RBiG68niLT-38T93kitl5Qk5nNw&s" className='w-10 rounded-3xl' />
                        <span className='ml-4'>Username</span>
                    </div>
                    <hr className='my-4'/>
                    
                    {BurgerMenuInfo.map((burger, index) => (
                        <div 
                            className='mt-3 cursor-pointer hover:bg-gray-200 px-5 py-3 rounded-lg trasition duration-200' 
                            key={index}
                            onClick={() => {navigate.push(burger.link), setIsOpen(false)}}
                        >
                            <i className={burger.icon}></i>
                            <span className='ml-3'>{burger.text}</span>
                        </div>
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
