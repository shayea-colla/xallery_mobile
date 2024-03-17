import { useSession } from '@/authentication/ctx';
import { View } from '@/components';
import { fetchFollowings } from '@/network';
import { StyleSheet } from 'react-native';
import { margins } from '../Styles';
import DesignersList from './DesignersList';
import { useQuery } from '@tanstack/react-query';

export default function FollowingsView() {
  const { api, user, session } = useSession();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["search", "designers", "followers"],
    queryFn: async () => await fetchFollowings(api, user?.following),
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
        justifyContent: 'center',
        alignItems: 'center',
    }
})
