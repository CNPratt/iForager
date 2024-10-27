import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const CustomMapsMenu = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text>Custom Maps Menu</Text>
      </View>

      <View
        style={{
          gap: 10,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Custom Map Maker");
          }}
        >
          Create New Map
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Custom Maps Manager");
          }}
        >
          Manage Custom Maps
        </Button>
      </View>
    </View>
  );
};

export default CustomMapsMenu;
