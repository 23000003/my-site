'use client'

import React from 'react'
import { ToDoType } from '@/types/types';
import { formatTimestamp } from '@/helper/timeconverter';

interface MyTodosProps {
    MyTodo: ToDoType[];
}

export default function MyTodos({MyTodo}: MyTodosProps): JSX.Element {

    return (
        <>
        {MyTodo.length > 0 ? (
            MyTodo.map((todo: ToDoType, index: number) => (
                <div className='bg-white w-full h-24 px-5 rounded-md mb-5 hover:bg-slate-100 cursor-pointer' key={index}>
                    <div className='flex flex-row h-full items-center justify-between w-full'>
                        <span className='text-lg'>{todo.title}</span>
                        <span className='text-lg'>{todo.content}</span>
                        <span className='text-lg'>{formatTimestamp(todo.deadlineAt)}</span>
                    </div>
                </div>
            ))
        ) : (
            <div>EMpty</div>
        )}
        </>
    )

}
