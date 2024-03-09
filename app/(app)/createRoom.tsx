import { useState } from "react";
import { SafeAreaView, View } from "@/components";
import { Button, TextInput, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { RoomCard } from "@/components/core";
import { ViewProps } from "@/components/Themed";

export default function createRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [roomBackground, setRoomBackground] = useState<ImagePicker.ImagePickerResult>();
  // Room Form consist of :
  // - room name
  // - room description
  // - room background
  // - room tags

  const handleRoomCreation = () => {
    // check for all input if populated or not, or you can just check for the preview variable
    if (roomReady) {
      // you need
      alert("room is ready")
      return
    }
  };


  const handleImagePicking = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setRoomBackground(result);
    }
  };

  const onRoomNameChange = (text: string) => {
    setRoomName(text)
  }

  const onRoomDescriptionChange = (text: string) => {
    setRoomDescription(text)
  }

  const roomReady = roomBackground && roomName && roomDescription;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, justifyContent: "space-between", marginBottom: 20 }}
      >
        <View>
          <TextInput
            value={roomName}
            onChangeText={onRoomNameChange}
            mode="outlined"
            label="name"
          />
          <TextInput
            value={roomDescription}
            onChangeText={onRoomDescriptionChange}
            numberOfLines={5}
            multiline
            mode="outlined"
            label="Description"
          />
          <Button
            style={{ marginTop: 10 }}
            icon={"image"}
            mode="elevated"
            onPress={handleImagePicking}
          >
            Choose background image
          </Button>
          {roomReady && (
            <PreviwCard
              style={{
                width: "50%",
                alignSelf: "center",
                marginTop: 20,
              }}
              name={roomName}
              background={roomBackground.assets[0].uri}
              description={roomDescription}
            />
          )}
        </View>

        <View>
          <Button onPress={handleRoomCreation} mode="contained">
            Create
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

function PreviwCard({
  name,
  background,
  description,
  style,
}: { name: string; background: string; description: string } & ViewProps) {
  return (
    <View style={[style]}>
      <RoomCard background={background} name={name} description={description} />
    </View>
  );
}
