export type user = {
  id: number,
  firstName?: string,
  lastName?: string,
  username: string,
  email: string,
  picture?: string, // picture is a string
  profilePicture?: URL,
  description?: string,
  following?: number[],
  followers?: number[],
  likedPictures: string[],
  likedRooms: string[],
  rooms: string[],
  type: "NORMAL" | "DESIGNER"
}
