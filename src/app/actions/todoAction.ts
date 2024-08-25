"use server"
import axios from "axios";
import { ToDoType } from "@/types/types";
import { server } from "@/helper/config";

export const SubmitAddToDo = async(toDo: ToDoType): Promise<string> =>{

    const { title, content, deadlineAt, userId } = toDo;

    try{
        const data = await axios.post(`${server}/api/Todo`, { title, content, deadlineAt, userId });
        
        return data.data.message

    }catch(err){
        throw new Error("Unexpected Error");
    }

}

export const FetchToDo = async(): Promise<ToDoType[]> =>{

    try{
        const MyTodo = await axios.get<{ data: ToDoType[] }>(`${server}/api/Todo`);
        const passTodo = MyTodo.data.data;
        return passTodo;
    }catch(err){
        throw new Error("Unexpected Error");
    }

}