import { useMemo, useCallback, useRef, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button, useTheme, FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import AutoHeightImage from "react-native-auto-height-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fullRoomType, pictureType, uploadFileType } from "@/types";
import { calculateImageHeightLevel } from "@/utils/general";
import { useSession } from "@/authentication/ctx";
import { addPicture } from "@/network";

import { View } from "../Themed";
import { LoadingDialog } from "../core";

export default function AddPicture({ room }: { room: fullRoomType }) {
  const theme = useTheme();
  const { api } = useSession();

  // Break points for the modal 
  const snapPoints = useMemo(
    () => [
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
    ],
    []
  );

  // Specifiy the default index of the modal
  const defaultIndex = 2;

  // BottomSheet reference 
  const ref = useRef<BottomSheetModal>(null);

  // Picture that the user picked up took by the camera
  const [picture, setPicture] = useState<uploadFileType>();

  const queryClient = useQueryClient();

  const addPictureMutation = useMutation({
    mutationKey: ["addPicture"],
    mutationFn: async () => await addPicture(api, picture, room.id),

    onSuccess: (data) => {
      // update the room imediatly ( invalidate the pictures query for that room )
      queryClient.setQueryData(
        ["pictures", { roomId: room.id }],
        (oldData: pictureType[]) => {
          return [...oldData, data];
        }
      );
    },
    onError: (error) => {
      const data = error?.response.data;
      console.log(data);
      alert(
        "Soemthing went wrong, check your phone is connected to the internet and try again."
      );
    },
  });

  const margin = 12;
  const phoneWidth = Dimensions.get("window").width - margin * 2;

  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  );

  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  };

  const handlePicturePicking = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const image = result.assets[0];

      const mimType = image.mimeType;

      // Get ONLY the file extention ,
      const [, extention] = mimType?.split("/") || ["image", "png"];

      // Generate a new filename ({currentDate}.{imageExtention}) , ( fileName provided by result is mostly null )
      const fileName = `${new Date()}.${extention}`;

      // Fixme ( imageHiehgLevel is somewhat uncorrect, find the problem and fix it)
      let level = calculateImageHeightLevel(image.height);

      if (level > snapPoints.length - 1) {
        // Set level to be the heighest
        level = snapPoints.length - 1;
      }

      // Expand the sheet to the specified level
      ref.current?.snapToIndex(level);

      setPicture({
        uri: image.uri,
        type: mimType || "image/*",
        name: fileName,
      });
    }
  };

  const handleCameraPicking = async () => {
    // TODO ( complete camera implementaion )
    const perm = await ImagePicker.getCameraPermissionsAsync();

    console.log(perm);
    if (perm.granted) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.canceled) {
        console.log(result);
      }
    }
  };

  const handleAddingPicture = () => {
    // check that picture is ready
    if (picture?.uri) {
      ref.current?.close();
      addPictureMutation.mutate();
    }
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius: theme.roundness,
      marginTop: 20,
    },
  });

  return (
    <BottomSheetModalProvider>
      <FAB
        style={{ position: "absolute", bottom: 22, right: 22 }}
        icon={"plus"}
        label="Add Picture"
        onPress={() => ref.current?.present()}
      />
      <BottomSheetModal
        onDismiss={() => setPicture(undefined)}
        backgroundStyle={{ backgroundColor: theme.colors.primaryContainer }}
        snapPoints={snapPoints}
        index={defaultIndex}
        backdropComponent={renderBackDrop}
        ref={ref}
      >
        <BottomSheetView style={{ flex: 1, margin: margin }}>
          {!picture?.uri ? (
            <>
              <Button
                style={styles.button}
                icon="image"
                mode="elevated"
                onPress={handlePicturePicking}
              >
                Choose from gallery
              </Button>
              <Button
                style={styles.button}
                icon="camera"
                mode="elevated"
                onPress={handleCameraPicking}
              >
                Camera
              </Button>
            </>
          ) : (
            <>
              <AutoHeightImage
                style={{ borderRadius: 12 }}
                source={{ uri: picture.uri }}
                width={phoneWidth}
              />
              <View
                style={{
                  backgroundColor: "transparent",
                  marginTop: 20,
                  flexDirection: "row",
                  gap: 14,
                }}
              >
                <Button
                  mode="contained"
                  style={[{ flex: 1, borderRadius: theme.roundness }]}
                  onPress={() => {
                    setPicture(undefined);
                    ref.current?.snapToIndex(defaultIndex);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={[{ flex: 1, borderRadius: theme.roundness }]}
                  mode="contained"
                  onPress={handleAddingPicture}
                >
                  Add
                </Button>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
      <LoadingDialog
        title="Adding Picture..."
        visible={addPictureMutation.status === "pending"}
      />
    </BottomSheetModalProvider>
  );
}
