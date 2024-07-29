import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export const FinderDisplayItem = ({ item }) => {
  const conditionalBorderStyle = item.isSelected
    ? { borderColor: "gray", backgroundColor: "lightgray" }
    : {};

  const distanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedDistance = distanceFormatter.format(item.distance);

  return (
    <TouchableOpacity onPress={item.handlePress}>
      <View style={[styles.item, conditionalBorderStyle]}>
        <Image
          source={{
            uri: item.image.replace("square", "small"),
          }}
          style={styles.cardImg}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.species} numberOfLines={1} ellipsizeMode="tail">
            {item.species}
          </Text>
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
            {item.genLocation}
          </Text>
          <Text style={styles.distance} numberOfLines={1} ellipsizeMode="tail">
            Distance: {formattedDistance} km
          </Text>
          <Text style={styles.date} numberOfLines={1} ellipsizeMode="tail">
            Date: {item.createDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },
  cardImg: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    height: "100%",
    paddingVertical: 5,
    paddingRight: 5,
    overflow: "hidden",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  species: {
    fontSize: 12,
    fontStyle: "italic",
  },
  location: {
    fontSize: 10,
    color: "gray",
  },
  coordinates: {
    fontSize: 10,
    color: "gray",
  },
  distance: {
    fontSize: 10,
    color: "gray",
  },
  date: {
    fontSize: 10,
    color: "gray",
  },
});

export default FinderDisplayItem;
