export type shortRoomType = {
    id: string,
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
    pictures: pictureType[],
    tags: string[],
    likes: number[]
}


export type pictureType  = {
    id: string,
    owner: number,
    image: string,
    room: string,
    likes: number[]
}