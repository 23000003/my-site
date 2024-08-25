import React from 'react'
import { server } from '@/helper/config'
import { ToDoType } from '@/types/types'
import axios from 'axios'
import Incoming from './incoming';
import { FetchToDo } from '../ToDos/addTodo/action';

export default async function Dashboard(): Promise<JSX.Element >{

    const passTodo = await FetchToDo();

    return (
        <main className='mt-14 p-5'>
            <Incoming MyTodo = {passTodo}/>
        </main>
    )
}
