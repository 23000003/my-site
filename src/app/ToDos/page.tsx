import React from 'react'
import MyTodos from '../components/todos'
import NavigateButton from '../components/navigateButton'

export default async function ToDos(): Promise<JSX.Element> {

    return (
        <main className='mt-14 p-5'>
            <MyTodos/>
            <NavigateButton linkP='/ToDos/addTodo'/>
        </main>
    )
}
