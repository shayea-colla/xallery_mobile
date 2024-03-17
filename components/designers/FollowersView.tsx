import { useSession } from '@/authentication/ctx'
import { View } from '@/components'
import { fetchFollowers } from '@/network'
import { useQuery } from '@tanstack/react-query'
import { StyleSheet } from 'react-native'
import { margins } from '../Styles'
import DesignersList from './DesignersList'

export default function FollowersView () {
  const { api, user, session } = useSession();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["search", "designers", "followers"],
    queryFn: async () => await fetchFollowers(api, user?.followers),
  });

  console.log(session)

  return (
    <View style={styles.container}>
      <View style={[margins.startEndMargins, {marginTop: 10}]}>
        {data && <DesignersList data={data} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }
})
