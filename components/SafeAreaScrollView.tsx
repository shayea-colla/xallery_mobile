import { ScrollView } from 'react-native';
import { SafeAreaView, ViewProps} from './Themed';


export default function SafeAreaScrollView(props: ViewProps) {
  const { style, children, ...otherProps } = props;

  return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} >
        <SafeAreaView style={style} {...otherProps}>
                {children}
        </SafeAreaView>
      </ScrollView>
  );
}
