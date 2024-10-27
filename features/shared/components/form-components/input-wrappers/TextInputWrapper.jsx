import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

const TextInputWrapper = ({
  form,
  name,
  label,
  rules = {},
  defaultValue = "",
  containerStyles = {},
  ...textInputProps
}) => {
  const { control } = form;
  const { errors } = form.formState;

  const error = errors[name];

  return (
    <View style={[styles.container, containerStyles]}>
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
      {(error?.message && (
        <Text style={styles.errorText}>{error.message}</Text>
      )) || (
        <Text
          style={{
            ...styles.errorText,
            opacity: 0,
          }}
        >
          Placeholder
        </Text>
      )}
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
