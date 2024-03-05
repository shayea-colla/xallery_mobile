import { fullRoomType, shortRoomType, pictureType, user } from "@/types";

export function transformData(data: {
  expiry: Date;
  token: string;
  user: user;
}): { token: string, user: user } {
  return {
    token: data.token,
    user: data.user
  };
}

export function transformUser(user: any): user {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    description: user.discription,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
    followers: user.followers,
    following: user.following,
    likedPictures: user.liked_pictures,
    likedRooms: user.liked_rooms,
    rooms: user?.rooms, // this field doesn't exist on Normal User
    type: user.type,
  };
}

export function transformFullRoomsList(
  roomsList: fullRoomType[]
): fullRoomType[] {
  return roomsList.map((room) => ({
    id: room.id,
    owner: room.owner,
    name: room.name,
    background: room.background,
    discription: room.discription,
    created_at: room.created_at,
    pictures: room.pictures,
    tags: room.tags,
    likes: room.likes,
  }));
}

export function transformShortRoomsList(
  roomsList: fullRoomType[]
): shortRoomType[] {
  return roomsList.map((room) => ({
    id: room.id,
    name: room.name,
    background: room.background,
    description: room.discription,
  }));
}

export function transformRoom(room: fullRoomType): fullRoomType {
  return {
    id: room.id,
    owner: room.owner,
    name: room.name,
    background: room.background,
    discription: room.discription,
    created_at: room.created_at,
    pictures: room.pictures,
    tags: room.tags,
    likes: room.likes,
  };
}

export function transformPicturesList(
  picturesList: pictureType[]
): pictureType[] {
  return picturesList.map((picture) => ({
    id: picture.id,
    owner: picture.owner,
    room: picture.room,
    image: picture.image,
    likes: picture.likes,
  }));
}
