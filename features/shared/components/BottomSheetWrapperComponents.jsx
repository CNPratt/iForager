import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export const BottomSheetWrapperBackdrop = (props) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.2}
  />
);

export const BottomSheetWrapperHandleComponent = ({
  iconLeft,
  iconRight,
  title,
  onPressIconLeft,
  onPressIconRight,
  exposedOpen,
  exposedClose,
}) => {
  return (
    <View style={styles.sheetTitle}>
      {iconLeft ? (
        <IconButton
          icon={iconLeft}
          mode="contained"
          // containerColor={theme.colors.secondaryContainer}
          onPress={() => {
            onPressIconLeft({ exposedOpen, exposedClose });
          }}
          size={18}
        />
      ) : (
        <View style={styles.iconSpacer} />
      )}
      <Text style={styles.sheetTitle}>{title}</Text>
      {iconRight ? (
        <IconButton
          icon={iconRight}
          mode="contained-tonal"
          onPress={() => {
            onPressIconRight({ exposedOpen, exposedClose });
          }}
          // containerColor={theme.colors.secondaryContainer}
          size={18}
        />
      ) : (
        <View style={styles.iconSpacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sheetTitle: {
    paddingVertical: 2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  iconSpacer: {
    height: 46,
    width: 46,
  },
});
