import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export function setHeaderTitleAsync(headerTitle: string | undefined) {
  const navigation = useNavigation()
  useEffect(() => {
    if(headerTitle) {
      navigation.setOptions({headerTitle: headerTitle})
    }
  }, [headerTitle])
}