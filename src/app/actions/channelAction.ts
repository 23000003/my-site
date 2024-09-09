"use server"
import { server } from "@/helper/config";
import { revalidateTag } from "next/cache";
import { Channel } from "@/types/types";

interface GetChannel {
    data: Channel[];
}

interface PostMessage{
    message: string;
}

export const ChannelRevalidating = async (): Promise<void> =>{
    revalidateTag('channel');
}

export const AddChannel = async(channelType: Channel) : Promise<string> =>{
    
    const { userId, title } = channelType;

    try{
        const res = await fetch(`${server}/api/Channel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, title })
        });

        await ChannelRevalidating();

        const data : PostMessage = await res.json();

        return data.message;
    }
    catch(err){
        console.log(err)
        throw new Error("Unexpected Error");
    }
}

export const GetChannel = async() : Promise<Channel[]> =>{
    
    try{
        const res = await fetch(`${server}/api/Channel`, {
            method: 'GET',
            next: {
                tags: ['channel'],
            }
        });

        const data:GetChannel = await res.json();
        console.log(data.data);
        return data.data;
    }
    catch(err){
        throw new Error("Unexpected Error");
    }
}

