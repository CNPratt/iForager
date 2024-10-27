import { ScrollView } from "react-native";
import { CustomMapCard } from "./custom-map-maker/CustomMapCard";
import { useSelector } from "react-redux";

const CustomMapsManager = ({ navigation }) => {
  const customMapsArray = useSelector((state) => state.userContent.customMaps);

  return (
    <ScrollView style={{ height: "100%" }}>
      {customMapsArray.map((map) => {
        return (
          <CustomMapCard
            key={map.title}
            title={map.title}
            ids={map.ids}
            nav={navigation}
            // deleteCustomMap={() => {
            //   dispatch(deleteMap(map.title));
            // }}
          />
        );
      })}
    </ScrollView>
  );
};

export default CustomMapsManager;
