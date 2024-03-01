export type shortRoomType = {
    name: string,
    background: string, 
    description: string,
}

export type fullRoomType = {
    id: string,
    name: string,
    owner: number,
    background: string, 
    discription: string, 
    created_at: Date, 
    pictures: string[],
    tags: string[],
    likes: number[]
}