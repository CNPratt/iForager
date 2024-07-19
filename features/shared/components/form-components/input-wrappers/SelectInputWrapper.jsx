import CustomSelectInput from "./CustomSelectInput";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";

const SelectInputWrapper = (props) => {
  const {
    form,
    fieldName,
    label,
    rules,
    defaultValue,
    omitError,
    options,
    disabled,
    defaultOptionText,
    customBoxLabelComponent,
    customSheetLabelComponent,
    accessibilityLabel,
    iconLeft,
    onPressIconLeft,
    iconRight,
    onPressIconRight,
    onChange: onChangeCallback = () => {},
  } = props;

  const { control, formState } = form;
  const { errors } = formState;
  const hasError = errors?.[fieldName];

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur, name } }) => {
          return (
            <CustomSelectInput
              fieldName={fieldName}
              label={label}
              value={value}
              options={options}
              fieldOnChange={onChange}
              onChangeCallback={onChangeCallback}
              onBlur={onBlur}
              title={label}
              disabled={disabled}
              defaultOptionText={defaultOptionText}
              customBoxLabelComponent={customBoxLabelComponent}
              customSheetLabelComponent={customSheetLabelComponent}
              accessibilityLabel={accessibilityLabel}
              accessibilityHint={label ? `Input for ${label}` : ""}
              iconLeft={iconLeft}
              onPressIconLeft={onPressIconLeft}
              iconRight={iconRight}
              onPressIconRight={onPressIconRight}
              error={hasError}
            />
          );
        }}
        name={fieldName}
        rules={rules}
        defaultValue={defaultValue}
      />
      {/* Error state here */}
    </View>
  );
};

export default SelectInputWrapper;
