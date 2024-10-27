import { IconButton } from "react-native-paper";

const GoBackIcon = ({ navigation }) => {
  return (
    <IconButton
      icon="arrow-left"
      size={30}
      onPress={() => navigation.goBack()}
    />
  );
};

export default GoBackIcon;
