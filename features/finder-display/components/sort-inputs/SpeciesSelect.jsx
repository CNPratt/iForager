import SelectInputWrapper from "../../../shared/components/form-components/input-wrappers/SelectInputWrapper";

const SpeciesSelect = ({ form, unsortedListData }) => {
  let speciesFullnameArray = [];

  if (unsortedListData) {
    unsortedListData.forEach((observation) => {
      if (
        observation.name &&
        speciesFullnameArray.indexOf(observation.name) === -1
      ) {
        speciesFullnameArray.push(observation.name);
      }
    });
  }

  const options = speciesFullnameArray.map((name) => {
    return { value: name, label: name };
  });

  return (
    <SelectInputWrapper
      form={form}
      fieldName="speciesName"
      label="Species Name"
      options={[{ value: "all", label: "All" }, ...options]}
    />
  );
};

export default SpeciesSelect;
