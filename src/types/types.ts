
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
    userId?: number,
    channelId?: number,
    title: string
}

export interface Content{
    title: string,
    content: string,
    channelId: number,
    createdAt: string,
}