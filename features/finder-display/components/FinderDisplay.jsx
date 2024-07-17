import { Image, StyleSheet, Text, View } from "react-native";
import { useFetchObservationsQuery } from "../../shared/api-slices/observationsApi";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapMarkers from "./MapMarkers";

const FinderDisplay = ({ type }) => {
  const location = useSelector((state) => state.config.location);

  const { data, error, isLoading } = useFetchObservationsQuery({
    latlon: [location.coords.latitude, location.coords.longitude],
    type: type,
    unfiltered: false,
    radius: 20,
  });

  const listData = data || [];

  return (
    <>
      <View style={styles.container}>
        <MapView
          // Must switch to development build for this to work
          // provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            title="Home"
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="brown"
          />
          <MapMarkers items={listData} />
        </MapView>
        <FlatList
          style={{ flex: 1 }}
          data={listData}
          renderItem={FinderDisplayItem}
          keyExtractor={(item) => item.trueID}
        />
      </View>
    </>
  );
};

const FinderDisplayItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.image.replace("square", "small"),
        }}
        style={styles.cardImg}
      />
      {Object.keys(item).map((key) => {
        return (
          <View key={key}>
            <Text>
              {key}: {item[key]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    padding: 10,
  },
  cardImg: {
    height: 100,
    width: 100,
    alignContent: "flex-start",
  },
});

export default FinderDisplay;
