import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'

const XalleryLogo = () => {
  // get the Xallery logo
  const logo_image:number = require("@/assets/images/full_logo.png")

  return (
    <View>
        <Image
          style={styles.image}
          source={logo_image}
          contentFit="contain"
          transition={100}
        />
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    height: 200
  }
});



export default XalleryLogo