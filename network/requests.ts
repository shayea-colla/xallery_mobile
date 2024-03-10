import {
  transformUser,
  transformShortRoomsList,
  transformPicturesList,
  transformRoom,
} from "@/utils";
import { Axios } from "axios";
import {
  pictureType,
  user,
  fullRoomType,
  shortRoomType,
  uploadFileType,
} from "@/types";

export async function fetchUserProfile(api: Axios): Promise<user> {
  const res = await api.get("accounts/profile/");
  const data = await res.data;
  return transformUser(data);
}

export async function fetchUserInfo(
  api: Axios,
  userId: user["id"]
): Promise<user> {
  const res = await api.get(`accounts/${userId}/`);
  const data = await res.data;
  return transformUser(data);
}

export async function fetchUserRoomsShort(
  api: Axios,
  userId: user["id"]
): Promise<shortRoomType[]> {
  const res = await api.get(`rooms/?owner=${userId}`);
  const rooms = await res.data;
  return transformShortRoomsList(rooms);
}

export async function fetchRoomDetail(
  api: Axios,
  roomId: fullRoomType["id"]
): Promise<fullRoomType> {
  const res = await api.get(`rooms/${roomId}/`);
  const room = await res.data;
  return transformRoom(room);
}

export async function fetchRoomPictures(
  api: Axios,
  roomId: fullRoomType["id"]
): Promise<pictureType[]> {
  const res = await api.get(`pictures/?room=${roomId}`);
  const pictures = await res.data;
  return transformPicturesList(pictures);
}

export async function fetchUsersByUsername(
  api: Axios,
  username: string
): Promise<user[]> {
  const res = await api.get(`accounts/?username=${username}`);
  const data = await res.data;
  return data;
}

export async function fetchAllDesigners(api: Axios): Promise<user[]> {
  const res = await api.get(`accounts/`);
  const data = await res.data;
  return data;
}

export async function fetchFollowings(
  api: Axios,
  followingIds: user["id"][] | undefined
): Promise<user[]> {
  // how to fetch followings
  if (followingIds) {
    return followingIds.map(async (following): Promise<user> => {
      const res = await api.get(`accounts/${following}/`);
      const data = await res.data;
      return data;
    });
  }

  return [];
}

export async function fetchFollowers(
  api: Axios,
  followerIds: user["id"][] | undefined
): Promise<user[]> {
  // how to fetch followings
  if (followerIds) {
    return followerIds.map(async (follower): Promise<user> => {
      const res = await api.get(`accounts/${follower}/`);
      const data = await res.data;
      return data;
    });
  }

  return [];
}

export async function createNewRoom(
  api: Axios,
  name: string,
  discription: string,
  background: uploadFileType
) {
  // Contruct a form data object
  const formData = new FormData();

  // Append necessary fields
  formData.append("name", name);
  formData.append("discription", discription);
  formData.append("background", background); // Ignore TypeScript warning, it works fine

  // Construct the request config
  const config = {
    url: "rooms/",
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,

    // necessary due to axios issue
    transformRequest: () => {
      return formData;
    },
  };

  const res = await api.request(config);
  return await res.data;
}

export async function addPicture(
  api: Axios,
  picture: uploadFileType,
  roomId: fullRoomType["id"]
): Promise<pictureType> {
  const formData = new FormData();

  formData.append("room", roomId);
  formData.append("image", picture);

  const config = {
    url: "pictures/",
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,

    // necessary due to axios issue
    transformRequest: () => {
      return formData;
    },
  };

  const res = await api.request(config);
  return await res.data;
}
