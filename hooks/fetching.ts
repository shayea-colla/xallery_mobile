import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo, fetchUserProfile } from "@/network";
import { useSession } from "@/authentication/ctx";

export function useFetchUserInfo(userId: number) {
  const { api } = useSession()

  const userQuery = useQuery({
    queryKey: ["user", {userId: userId}],
    queryFn: () => fetchUserInfo(api, userId)
  })

  return userQuery

}


export function useFetchUserProfile() {
    const { api, session, setUser } = useSession()

    console.log(api.defaults)

    const query = useQuery({
        queryKey: ["profile"],
        queryFn: async () => fetchUserProfile(api)
    }) 

    useEffect(() => {
        if (query.data) {
            setUser(query.data)
        }

    }, [query.data, session])

    return query
}
