"use server"
import axios from "axios";
import { server } from "@/helper/config";
import { User } from "@/types/types";


export const invalidateSecret = async(secret: string): Promise<User | null> => {
    
    const isValid = secret === process.env.SECRET_PASS;

    if(!isValid){
        return null;
    }

    try{
        const data = await axios.get<User>(`${server}/api/user`);
        return data.data;
    }catch(err){
        throw new Error((err as Error).message);
    }

}