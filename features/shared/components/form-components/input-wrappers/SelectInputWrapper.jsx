import { Controller } from "react-hook-form";
import { View } from "react-native";
import React, { useRef } from "react";
import { Button, Text } from "react-native-paper";
import { BasicModal } from "../../BasicModal";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const SelectInputWrapper = ({
  form,
  fieldName,
  label,
  rules,
  defaultValue,
  options,
  modalContainerStyle = {},
  modalContentStyle = {},
  ...rest
}) => {
  const { control, formState } = form;
  const { errors } = formState;
  const hasError = errors?.[fieldName];

  const modalRef = useRef(null);

  return (
    <View>
      <Controller
        control={control}
        render={({
          field: { onChange, value, onBlur, name },
          fieldState: { error },
        }) => {
          const selectedOption = options.find(
            (option) => option.value === value
          );

          return (
            <>
              <BasicModal
                ref={modalRef}
                onClose={onBlur}
                modalContentStyle={{ width: "100%", ...modalContentStyle }}
                modalContainerStyle={{ ...modalContainerStyle }}
              >
                <Text>{label}</Text>
                <ScrollView style={{ width: "100%" }}>
                  {options.map((option) => {
                    const isSelected = option.value === value;

                    return (
                      <TouchableOpacity
                        style={{
                          minWidth: "100%",
                          padding: 10,
                          backgroundColor: isSelected ? "lightgray" : "white",
                        }}
                        key={option.value}
                        onPress={() => {
                          onChange(option.value);
                          modalRef.current.close();
                        }}
                      >
                        <Text style={{ textAlign: "center" }}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </BasicModal>
              <Text>{label}</Text>
              <Button mode="contained" onPress={() => modalRef.current.open()}>
                {selectedOption ? selectedOption.label : "Select an option"}
              </Button>
              {hasError && (
                <Text style={{ color: "red" }}>{error.message}</Text>
              )}
            </>
          );
        }}
        name={fieldName}
        rules={rules}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default SelectInputWrapper;
