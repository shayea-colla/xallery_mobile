import { View } from "@components/Themed";
import { Button, Dialog, Portal, Text } from "react-native-paper";

type DialogProps = {
  visible: boolean;
  // this means a function type that returns nothing
  hideDialog: () => void;
  message: string;
  title?: string;
};

export default function AlertDialog({
  visible,
  hideDialog,
  message,
  title,
}: DialogProps) {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          <Dialog.Content>
            <Text variant="bodyMedium">{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>try again</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
