import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView, View } from "@/components";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { RoomCard } from "@/components/core";
import { ViewProps } from "@/components/Themed";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/authentication/ctx";
import { createNewRoom } from "@/network/requests";
import { router } from "expo-router";
import { LoadingDialog } from '@/components/core'

type fileUploadType = {
  uri: string;
  type: string;
  name: string | "backgroundImage";
};

export default function createRoom() {
  const { api } = useSession();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [background, setBackground] = useState<fileUploadType>();
  const [loading, setLoading] = useState(false);
  const queryCliet = useQueryClient();

  const createRoomQuery = useMutation({
    mutationKey: ["createRoom"],

    mutationFn: async () => await createNewRoom(api, name, description, background),

    onSuccess: () => {
      queryCliet.invalidateQueries({ queryKey: ["profile"] });
      router.replace("/profile");
    },

    onError: () => {
      alert(
        "failed to create your room,check your phone is connected to the internet and try again"
      );
    },
    onSettled: () => setLoading(false),
  });

  const handleRoomCreation = () => {
    if (roomReady) {
      setLoading(true);
      createRoomQuery.mutate();
    }
  };

  const handleImagePicking = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!result.canceled) {
      // Get ONLY the file extention ,
      const mimType = result.assets[0].mimeType;
      const [, extention] = mimType?.split("/") || ["image", "png"];
      // Generate a new filename ({currentDate}.{imageExtention}) , ( fileName provided by result is mostly null )
      const fileName = `${new Date()}.${extention}`;

      setBackground({
        uri: result.assets[0].uri,
        type: mimType || "image/*",
        name: fileName,
      });
    }
  };

  const roomReady = background && name && description;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-start", marginBottom: 20 }}
      >
        <View>
          <TextInput
            style={{ marginBottom: 8 }}
            value={name}
            onChangeText={(text) => setName(text)}
            mode="flat"
            label="name"
          />
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            numberOfLines={5}
            multiline
            mode="flat"
            label="Description"
          />
          <Button
            style={{ marginTop: 10, alignSelf: "center" }}
            icon={"image"}
            mode="text"
            onPress={handleImagePicking}
          >
            Choose background image
          </Button>

          <PreviwCard
            style={{
              width: "50%",
              alignSelf: "center",
              marginTop: 10,
            }}
            name={name}
            background={background?.uri}
            description={description}
          />
        </View>
        <Button
          style={{ alignSelf: "center", marginTop: 25 }}
          onPress={handleRoomCreation}
          mode="contained"
        >
          Create
        </Button>
      </KeyboardAvoidingView>
      <LoadingDialog title="Creating your room..." visible={loading} />
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
