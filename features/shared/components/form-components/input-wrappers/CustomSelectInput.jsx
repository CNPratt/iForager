import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import BottomSheetWrapper from "../../BottomSheetWrapper";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { CustomSelectInputRenderItem } from "./CustomSelectInputComponents";

const CustomSelectInput = (props) => {
  const {
    fieldName,
    disabled,
    defaultOptionText,
    customBoxLabelComponent,
    customSheetLabelComponent,
    fieldOnChange,
    onChangeCallback,
    options,
    value,
    label,
    accessibilityLabel,
    title,
    error,
    iconLeft,
    iconRight,
    onPressIconLeft,
    onPressIconRight,
    onBlur = () => {},
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetRef = useRef(null);

  const CustomBoxLabelComponent = customBoxLabelComponent;
  const CustomSheetLabelComponent = customSheetLabelComponent;

  const handlePress = () => {
    setIsOpen(true);
    bottomSheetRef.current.exposedOpen();
  };

  const handleSelect = (option) => {
    onBlur();
    setIsOpen(false);

    fieldOnChange(option.value);
    onChangeCallback(option.value);

    bottomSheetRef.current.exposedClose();
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CustomSelectInputRenderItem
          item={item}
          handleSelect={handleSelect}
          CustomSheetLabelComponent={CustomSheetLabelComponent}
        />
      );
    },
    [handleSelect, CustomSheetLabelComponent]
  );

  const selectedObject = useMemo(
    () => options.find((option) => option.value && option.value === value),
    [options, value]
  );

  const selectedLabel = selectedObject?.label;

  const defaultLabelToUse = defaultOptionText || "Select an option";

  const mainInputStyles = [styles.input];
  const labelStyles = [styles.label];

  if (disabled) {
    labelStyles.push(styles.disabledLabel);
    mainInputStyles.push(styles.disabledInput);
  }

  if (isOpen) {
    labelStyles.push(styles.fakeLabelfocus);
    mainInputStyles.push(styles.fakeFocus);
  }

  if (error) {
    labelStyles.push(styles.errorText);
    mainInputStyles.push(styles.errorBorder);
  }

  return (
    <View style={styles.container}>
      <Text style={labelStyles}>{label}</Text>
      {/* This view wrapper prevents small layout shifts resulting from fakeFocus border width increase */}
      <View style={isOpen || error ? {} : styles.focusBorderCompensator}>
        <TouchableOpacity
          style={mainInputStyles}
          onPress={handlePress}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={"Select an option"}
          disabled={disabled}
        >
          {CustomBoxLabelComponent ? (
            <CustomBoxLabelComponent
              item={selectedObject || { label: defaultLabelToUse }}
            />
          ) : (
            <Text style={[styles.defaultLabel, error && styles.errorText]}>
              {selectedLabel || defaultLabelToUse}
            </Text>
          )}
        </TouchableOpacity>
        {disabled && <View style={styles.overlay} />}
      </View>

      <BottomSheetWrapper
        iconLeft={iconLeft}
        iconRight={iconRight}
        onPressIconLeft={onPressIconLeft}
        onPressIconRight={onPressIconRight}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        ref={bottomSheetRef}
        sheetKey={`bottom-sheet-${fieldName}`}
      >
        <BottomSheetFlatList
          style={styles.flatList}
          contentContainerStyle={styles.contentContainer}
          data={options}
          keyExtractor={(item) => item.value || item.heading}
          renderItem={renderItem}
        />
      </BottomSheetWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    position: "absolute",
    top: -7,
    left: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#484848",
    zIndex: 1,
  },
  fakeLabelfocus: {
    color: "#00558c",
  },
  disabledLabel: {
    color: "#e8e8e8",
  },
  defaultLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
  },
  disabledInput: {
    borderColor: "#e8e8e8",
    color: "#e8e8e8",
  },
  fakeFocus: {
    borderWidth: 2,
    borderColor: "#00558c",
    color: "#00558c",
  },
  focusBorderCompensator: { borderWidth: 1, borderColor: "transparent" },
  flatList: {
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    opacity: 0.5,
  },
  errorText: {
    // color: theme.colors.error,
  },
  errorBorder: {
    // borderColor: theme.colors.error,
    borderWidth: 2,
  },
});

export default React.memo(CustomSelectInput);
