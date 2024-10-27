import SelectInputWrapper from "../../../shared/components/form-components/input-wrappers/SelectInputWrapper";

const SortBySelect = ({ form }) => {
  return (
    <SelectInputWrapper
      form={form}
      name="sortBy"
      label="Sort By"
      options={[
        { value: "distance", label: "Distance" },
        { value: "date", label: "Date" },
        { value: "species", label: "Species" },
      ]}
    />
  );
};

export default SortBySelect;
