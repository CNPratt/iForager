import { Controller } from "react-hook-form";
import { View, Text } from "react-native";
import React, { useRef } from "react";
import { Button } from "react-native-paper";
import { BasicModal } from "../../BasicModal";

const SelectInputWrapper = ({
  form,
  fieldName,
  label,
  rules,
  defaultValue,
  options,
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
                modalContentStyle={{ width: "100%" }}
              >
                <Text>{"Select an option"}</Text>
                {options.map((option) => (
                  <Button
                    style={{ width: "100%" }}
                    key={option.value}
                    onPress={() => {
                      onChange(option.value);
                      modalRef.current.close();
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
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
