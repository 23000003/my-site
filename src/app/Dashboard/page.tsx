import React from 'react'
import { server } from '@/helper/config'
import { ToDoType } from '@/types/types'
import axios from 'axios'
import Incoming from './incoming';

export default async function Dashboard(): Promise<JSX.Element >{

    const MyTodo = await axios.get<{ data: ToDoType[] }>(`${server}/api/Todo`);
    const passTodo = MyTodo.data.data;

    return (
        <main className='mt-14 p-5'>
            <Incoming MyTodo = {passTodo}/>
        </main>
    )
}
