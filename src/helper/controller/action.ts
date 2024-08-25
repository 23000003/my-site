//app/helper/action.ts
"use server"
import axios from "axios";
import { server } from "../config";
import { User } from "@/types/schemaTypes";


export const invalidateSecret = async(secret: string): Promise<User | null> => {
    
    const isValid = secret === process.env.SECRET_PASS;

    if(!isValid){
        return null;
    }

    try{
        const data = await axios.get<User>(`${server}/api/user`);
        console.log(data);

        return data.data;
    }catch(err){
        throw new Error('An unknown error occurred');
    }

}