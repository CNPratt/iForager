import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

const TextInputWrapper = ({
  control,
  name,
  label,
  rules = {},
  defaultValue = "",
  error,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={label}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!error}
            {...textInputProps}
          />
        )}
        name={name}
        rules={rules}
      />
      {error?.message && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextInputWrapper;
