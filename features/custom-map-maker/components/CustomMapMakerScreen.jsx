import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { useLazyFetchTaxaSearchQuery } from "../../shared/api-slices/taxaSearchApi";
import { CustomMapCard } from "./CustomMapCard";
import SearchResult from "../components/SearchResult";
import TextInputWrapper from "../../shared/components/form-components/input-wrappers/TextInputWrapper";
import { createMap, deleteMap } from "../../shared/rtk-slices/userContent";
import { idObject } from "../../shared/data/idObject";

const CustomMapMakerScreen = ({ navigation }) => {
  const [mode, setMode] = useState("create");
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      newMapName: "",
      newMapIds: "",
      searchText: "",
    },
  });

  const [newMapName, newMapIds, searchText] = useWatch({
    control,
    name: ["newMapName", "newMapIds", "searchText"],
  });

  const [triggerFetch, { data: searchResults = [] }] =
    useLazyFetchTaxaSearchQuery();

  const customMapsArray = useSelector((state) => state.userContent.customMaps);
  const dispatch = useDispatch();

  const addResultId = (id) => {
    const idArray = newMapIds.split(",");
    if (!idArray.includes(id.toString())) {
      setValue("newMapIds", newMapIds ? `${newMapIds},${id}` : id.toString());
    }
  };

  const removeResultId = (id) => {
    const idArray = newMapIds.split(",");
    setValue(
      "newMapIds",
      idArray.filter((item) => item !== id.toString()).join(",")
    );
  };

  const modeSwitch = () => {
    setMode((prevMode) => (prevMode === "create" ? "mymaps" : "create"));
  };

  const handleCreateMap = () => {
    let idRegex = /^[-,0-9]+$/;

    const newMap = { title: newMapName, ids: newMapIds };
    const staticNameFilter =
      idObject[newMapName.split(" ").join("").toLowerCase()];
    const customMapFilter = customMapsArray.filter(
      (element) => element.title === newMapName
    );

    if (
      newMapName &&
      idRegex.test(newMapIds) &&
      !staticNameFilter &&
      !customMapFilter.length
    ) {
      dispatch(createMap(newMap));
      setValue("newMapName", "");
      setValue("newMapIds", "");
      setMode("mymaps");
    }
  };

  const handleSearch = () => {
    triggerFetch(searchText);
  };

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <Text>New Map Name</Text>
      <TextInputWrapper
        control={control}
        name="newMapName"
        label="Custom Map Name"
        rules={{ required: "Map name is required" }}
      />
      <Text>New Map IDs</Text>
      <TextInputWrapper
        control={control}
        name="newMapIds"
        label="Custom Map Ids"
        rules={{ required: "Map IDs are required" }}
      />
      <Text>Taxa Search</Text>
      <TextInputWrapper
        control={control}
        name="searchText"
        label="Enter search here"
      />
      <View
        style={{
          gap: 10,
        }}
      >
        <Button mode="contained" onPress={handleSubmit(handleCreateMap)}>
          Create Map
        </Button>
        <Button mode="contained" onPress={handleSearch}>
          Search
        </Button>
        <Button mode="contained" onPress={modeSwitch}>
          {mode === "create" ? "My Maps" : "Results"}
        </Button>
      </View>
      {mode === "create" ? (
        <ScrollView style={{ height: "100%" }}>
          {searchResults.map((result) => (
            <SearchResult
              key={result.taxonId}
              commonName={result.commonName}
              taxonId={result.taxonId}
              name={result.name}
              rank={result.rank}
              add={() => addResultId(result.taxonId)}
              newMapIds={newMapIds}
              remove={() => removeResultId(result.taxonId)}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={{ height: "100%" }}>
          {customMapsArray.map((map) => (
            <CustomMapCard
              key={map.title}
              title={map.title}
              ids={map.ids}
              nav={navigation}
              addCustomMap={createMap}
              deleteCustomMap={() => {
                dispatch(deleteMap(map.title));
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomMapMakerScreen;
