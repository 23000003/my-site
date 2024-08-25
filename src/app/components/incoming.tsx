
import React, { useEffect, useState } from 'react'
import { ToDoType } from '@/types/types';
import { FetchToDo } from '../actions/todoAction';
import { 
    formatTimestamp, 
    getCurrentDate, 
    formatDateForComparison, 
    compareTimeDate 
} from '@/helper/timeconverter';

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


export default async function Incoming(): Promise<JSX.Element>{
    
    const currentDate = getCurrentDate();
    
    const MyTodo = await FetchToDoData();
    const filteredTodos = MyTodo.filter(todo => formatDateForComparison(todo.deadlineAt) === currentDate);
    
    return (
        <>
            {filteredTodos.length > 0 ? (
                <>
                    <span className='ml-3 mb-5 text-xl text-gray-500'>Incoming Deadline: {currentDate}</span>
                    {filteredTodos.map((todo: ToDoType, index: number) => (
                        <div className='flex flex-col bg-white p-5 rounded-xl mt-5' key={index}>
                            <span className='text-2xl font-bold'>{todo.title}</span>
                            <span className='text-lg mt-1'>{todo.content}</span>
                            <div className='mt-1 flex flex-row justify-between'>
                                <span className='text-lg text-gray-500'>{formatTimestamp(todo.deadlineAt)}</span>
                                <span className='text-lg text-gray-500'>{compareTimeDate(todo.deadlineAt)}</span>
                             </div>
                        </div>
                    ))}
                </>
            ) : (
                <div>No Todos Due Today</div>
            )}
        </>
    );

}
