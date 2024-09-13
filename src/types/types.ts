
export interface ToDoType{
    title: string;
    content: string;
    deadlineAt: string;
    userId: number;
}

export interface Params {
    subject: string;
}

export interface User {
    User:{
        id: number;
        name: string;
        password: string;
        myToken: string;
        email: string;
    }
};

export interface Channel{
    id?: number,
    userId?: number,
    title: string
}

export interface Content{
    id?: number,
    title: string,
    content: string,
    channelId: number,
    createdAt: Date,
}