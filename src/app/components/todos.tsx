import React from 'react'
import { ToDoType } from '@/types/types';
import { 
    formatTimestamp, 
} from '@/helper/timeconverter';
import { FetchToDo } from '../actions/todoAction';

interface MyTodosProps {
    MyTodo: ToDoType[];
}

async function FetchToDoData(): Promise<ToDoType[]>{
    
    try{
        const MyTodo = await FetchToDo();
        return MyTodo;
    }
    catch(err){
        return [];
    }

}

export default async function MyTodos(): Promise<JSX.Element> {
    
    const MyTodo = await FetchToDoData();

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
