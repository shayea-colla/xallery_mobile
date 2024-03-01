import { user } from "@/authentication"
import { fullRoomType } from "@/types"

export function transformData<T>(data: { expiry: Date, token: string, user: any}): { token: string, } {

    return {
       token: data.token,
    }
}

export function transformUser(user:any): user {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        description: user.discription,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        followers: user.followers.length,
        following: user.following.length,
        rooms: user?.rooms, // this field doesn't exist on Normal User
        type: user.type
    }
}


export function transformShortRooms(roomsList: fullRoomType[]) {
    return roomsList.map((room) => ({
        id: room.id,
        name: room.name,
        background: room.background, 
        description: room.discription, 
    }))

}