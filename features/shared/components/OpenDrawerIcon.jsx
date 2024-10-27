import { IconButton } from "react-native-paper";

const OpenDrawerIcon = (props) => {
  return (
    <IconButton
      icon="menu"
      size={30}
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

export default OpenDrawerIcon;
