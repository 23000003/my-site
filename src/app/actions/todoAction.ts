"use server"
import { ToDoType } from "@/types/types";
import { server } from "@/helper/config";
import { revalidateTag } from "next/cache";
import axios from "axios";

interface FetchTodoResponse {
    data: ToDoType[];
}

interface PostTodoResponse {
    message: string;
}

export const TodoRevalidating = async (): Promise<void> =>{
    revalidateTag('todos');
}


export const SubmitAddToDo = async(toDo: ToDoType): Promise<string> =>{

    const { title, content, deadlineAt, userId } = toDo;

    try{
        const res = await fetch(`${server}/api/Todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, deadlineAt, userId })
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        await TodoRevalidating();
        
        const data: PostTodoResponse = await res.json();

        return data.message;

    }catch(err){
        throw new Error("Unexpected Error");
    }

}

export const FetchToDo = async(): Promise<ToDoType[]> =>{

    try{
        const res = await fetch(`${server}/api/Todo`, {
            method: 'GET',
            next: {
                tags: ['todos'],
            }
        });
        const data: FetchTodoResponse = await res.json();

        return data.data;
    }catch(err){
        throw new Error("Unexpected Error");
    }

}