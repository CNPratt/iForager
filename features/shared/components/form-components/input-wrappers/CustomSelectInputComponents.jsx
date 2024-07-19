import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider, Text } from "react-native-paper";

export const CustomSelectInputRenderItem = ({
  item,
  handleSelect,
  CustomSheetLabelComponent,
}) => {
  if (item.heading) {
    return (
      <View>
        <Text style={styles.sheetHeading}>{item.heading}</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        disabled={item.disabled}
        style={styles.optionTouchable}
        onPress={() => {
          if (!item.disabled) {
            handleSelect(item);
          }
        }}
        accessibilityHint={"Select an option"}
        accessibilityLabel={`Select ${item.label}`}
      >
        {CustomSheetLabelComponent ? (
          <CustomSheetLabelComponent item={item} />
        ) : (
          <Text>{item.label}</Text>
        )}
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  optionTouchable: {
    paddingVertical: 10,
  },
  sheetHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00558c",
    paddingVertical: 10,
    fontFamily: "Poppins_600SemiBold",
  },
});
