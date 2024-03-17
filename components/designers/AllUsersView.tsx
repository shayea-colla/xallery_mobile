import { useSession } from "@/authentication/ctx";
import { View } from "@/components";
import { fetchAllDesigners } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { margins } from "../Styles";
import DesignersList from "./DesignersList";

export default function AllUsersView() {
  const { api, user } = useSession();
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["search", "designers"],
    queryFn: async () => await fetchAllDesigners(api),
  });

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
  },
});
