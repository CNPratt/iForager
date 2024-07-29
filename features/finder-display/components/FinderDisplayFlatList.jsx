import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import SortBySelect from "./sort-inputs/SortBySelect";
import SpeciesSelect from "./sort-inputs/SpeciesSelect";

const FinderDisplayFlatList = ({ unsortedListData, sortedListData, form }) => {
  return (
    <>
      <View
        style={{ display: "flex", flexDirection: "row", marginHorizontal: 10 }}
      >
        <View style={{ width: "50%", paddingRight: 5 }}>
          <SortBySelect form={form} />
        </View>
        <View style={{ width: "50%", paddingLeft: 5 }}>
          <SpeciesSelect form={form} unsortedListData={unsortedListData} />
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={sortedListData}
        renderItem={FinderDisplayItem}
        keyExtractor={(item) => item.trueID}
      />
    </>
  );
};

const FinderDisplayItem = ({ item }) => {
  const conditionalBorderStyle = item.isSelected
    ? { borderColor: "gray", backgroundColor: "lightgray" }
    : {};

  return (
    <TouchableOpacity onPress={item.handlePress}>
      <View style={[styles.item, conditionalBorderStyle]}>
        <Image
          source={{
            uri: item.image.replace("square", "small"),
          }}
          style={styles.cardImg}
        />
        {Object.keys(item).map((key) => {
          if (key === "handlePress") return null;

          return (
            <View key={key}>
              <Text>
                {key}: {item[key]}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default FinderDisplayFlatList;
