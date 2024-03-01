import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView, ViewProps, View } from './Themed';


export default function SafeAreaScrollView(props: ViewProps) {
  const { style, children, ...otherProps } = props;
  const theme = useTheme()

  return (
    <View style={{backgroundColor: theme.colors.background}}>
       <SafeAreaView style={style} {...otherProps}>
          <ScrollView>
              {children}
          </ScrollView>
       </SafeAreaView>
    </View>
  );
}
