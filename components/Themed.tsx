/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { margins as styleMargins } from './Styles'

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}


export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const theme = useTheme()
  //const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor: theme.colors.background }, style]} {...otherProps} />;
}

export function SafeAreaView(props:{ margins?: boolean } & ViewProps) {
  const { margins = true, style, ...otherProps } = props;
  const insets = useSafeAreaInsets()

  // Apply safe area rules to this type of view
  const safeStyle = {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      flex: 1,
  }

  let StyleMargins = {
       marginEnd: 0,
       marginStart: 0
    }
  
  if (margins) {
    StyleMargins = styleMargins.startEndMargins
  } 

  return (
    <View style={safeStyle} >
        <View style={[style, StyleMargins]} {...otherProps} />
    </View>
  );
}
