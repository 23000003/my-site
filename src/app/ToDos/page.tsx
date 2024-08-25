import React from 'react'
import MyTodos from './todos'
import NavigateButton from './navigateButton'
import axios from 'axios'
import { server } from '@/helper/config'
import { ToDoType } from '@/types/types'

export default async function ToDos(): Promise<JSX.Element> {

    const MyTodo = await axios.get<{ data: ToDoType[] }>(`${server}/api/Todo`);
    const passTodo = MyTodo.data.data;

    return (
        <main className='mt-14 p-5'>
            <MyTodos MyTodo = {passTodo}/>
            <NavigateButton linkP='/ToDos/addTodo'/>
        </main>
    )
}
