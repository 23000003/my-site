"use server"
import { Content } from "@/types/types"
import { server } from "@/helper/config";
import { revalidateTag } from "next/cache";

interface GetNotes {
    data: Content[];
}

interface NotesMessage{
    message: string;
}

export const NotesRevalidating = async(): Promise<void> =>{
    revalidateTag('notes');
}

export const PostNotes = async(Notes: Content) : Promise<string> =>{

    const { title, content, channelId, createdAt } = Notes;

    try{

        const res = await fetch(`${server}/api/Notes/${channelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, channelId, createdAt }),
        })

        await NotesRevalidating();

        const data : NotesMessage = await res.json();

        return data.message;
    }catch(err){
        console.log(err);
        throw new Error("Unexpected Error");
    }

}


export const GetNotes = async(id: string) : Promise<Content[]> => {

    try{

        const res = await fetch(`${server}/api/Notes/${id}`, {
            method: 'GET',
            next: {
                tags: ['notes'],
            }
        });

        const data : GetNotes = await res.json();
        return data.data;

    }catch(err){
        throw new Error("Unexpected Error")
    }
}