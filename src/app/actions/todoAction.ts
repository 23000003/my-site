"use server"
import { ToDoType } from "@/types/types";
import { server } from "@/helper/config";
import { revalidateTag } from "next/cache";

interface FetchTodoResponse {
    data: ToDoType[];
}

export const Revalidating = async (): Promise<void> =>{
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

        await Revalidating();
        
        return "Added Successfully"

    }catch(err){
        throw new Error("Unexpected Error");
    }

}

export const FetchToDo = async(): Promise<ToDoType[]> =>{

    try{
        const res = await fetch(`${server}/api/Todo`, {
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