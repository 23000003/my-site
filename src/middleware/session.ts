'use server'
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { sql } from 'drizzle-orm';
// import bcrypt from 'bcryptjs';

export default async function getSession(token: string, id: number){
    
    //Instead of JWT why not my own token ?

    // const salt = await bcrypt.genSalt();
    // const hashed = await bcrypt.hash(token, salt);
    // console.log(hashed)

    try{
        const user = db.select()
            .from(usersTable)
            .where(sql `${usersTable.id} = ${id} and ${usersTable.myToken} = ${token}`);
        
        return user !== null;
    }
    catch(err){
        console.log(err);
        return false;
    }
    
}