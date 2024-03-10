import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";

export default function LoadingDialog({
  title,
  visible,
  content,
  handleCancelation,
}: {
  title: string;
  visible: boolean;
  content?: React.ReactNode;
  handleCancelation?: () => void;
}) {
  return (
    <Portal>
      <Dialog dismissable={false} visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {content ? (
            <Text>{content}</Text>
          ) : (
            <ActivityIndicator size={"large"} />
          )}
        </Dialog.Content>
        {handleCancelation && (
          <Dialog.Actions>
            <Button onPress={handleCancelation}>cancel</Button>
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
}
