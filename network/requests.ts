import {
  transformUser,
  transformShortRoomsList,
  transformPicturesList,
} from "@/utils";
import { user } from "@/authentication";
import { Axios } from "axios";
import { fullRoomType, shortRoomType } from "@/types";
import { pictureType } from "@/types/room";
import { transformRoom } from "@/utils/transformers";

export async function fetchUserProfile(api: Axios): Promise<user> {
  const res = await api.get("accounts/profile/");
  const data = await res.data;
  return transformUser(data);
}

export async function fetchUserInfo(api: Axios, userId: number): Promise<user> {
  const res = await api.get(`accounts/${userId}/`);
  const data = await res.data;
  return transformUser(data);
}

export async function fetchUserRoomsShort(
  api: Axios,
  userId: number
): Promise<shortRoomType[]> {
  const res = await api.get(`rooms/?owner=${userId}`);
  const rooms = await res.data;
  return transformShortRoomsList(rooms);
}

export async function fetchRoomDetail(
  api: Axios,
  roomId: string
): Promise<fullRoomType> {
  const res = await api.get(`rooms/${roomId}/`);
  const room = await res.data;
  return transformRoom(room);
}

export async function fetchRoomPictures(
  api: Axios,
  roomId: string
): Promise<pictureType[]> {
  const res = await api.get(`pictures/?room=${roomId}`);
  const pictures = await res.data;
  return transformPicturesList(pictures);
}

export async function fetchUsersByUsername(api: Axios, username: string): Promise<user[]> {
  const res = await api.get(`accounts/?username=${username}`);
  const data = await res.data;
  return data;
}


export async function fetchAllDesigners(api: Axios): Promise<user[]> {
  const res = await api.get(`accounts/`);
  const data = await res.data;
  return data;
}

export async function fetchFollowings(api: Axios, followingIds: number[] | undefined): Promise<user[]> {
  // how to fetch followings
  if (followingIds) {
    return followingIds.map(async (following) => {
      const res = await api.get(`accounts/${following}/`)
      const data = await res.data
      return data
    })
  }

  return []
}

export async function fetchFollowers(api: Axios, followerIds: number[] | undefined): Promise<user[]> {
  // how to fetch followings
  if (followerIds) {
    return followerIds.map(async (follower) => {
      const res = await api.get(`accounts/${follower}/`)
      const data = await res.data
      return data
    })
  }

  return []
}
