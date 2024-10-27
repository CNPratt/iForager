import SelectInputWrapper from "../../../shared/components/form-components/input-wrappers/SelectInputWrapper";

const SpeciesSelect = ({ form, unsortedListData }) => {
  let speciesFullnameArray = [];

  if (unsortedListData) {
    unsortedListData.forEach((observation) => {
      if (
        observation.species &&
        speciesFullnameArray.indexOf(observation.species) === -1
      ) {
        speciesFullnameArray.push(observation.species);
      }
    });
  }

  const options = speciesFullnameArray.map((name) => {
    return { value: name, label: name };
  });

  return (
    <SelectInputWrapper
      form={form}
      name="speciesName"
      label="Species Name"
      options={[{ value: "all", label: "All" }, ...options]}
    />
  );
};

export default SpeciesSelect;
