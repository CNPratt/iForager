import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, IconButton, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { useLazyFetchTaxaSearchQuery } from "../../../shared/api-slices/taxaSearchApi";
import SearchResult from "./SearchResult";
import TextInputWrapper from "../../../shared/components/form-components/input-wrappers/TextInputWrapper";
import { createMap, deleteMap } from "../../../shared/rtk-slices/userContent";
import { idObject } from "../../../shared/data/idObject";
import { BasicModal } from "../../../shared/components/BasicModal";

const CustomMapMakerScreen = ({ navigation }) => {
  const [newMapObjects, setNewMapObjects] = useState([]);

  const modalRef = useRef(null);

  const form = useForm({
    defaultValues: {
      newMapName: "",
      searchText: "",
    },
    mode: "onBlur",
  });

  const { control, handleSubmit, setValue, formState } = form;
  const { errors } = formState;

  const [triggerFetch, { data: searchResults = [] }] =
    useLazyFetchTaxaSearchQuery();

  const customMapsArray = useSelector((state) => state.userContent.customMaps);
  const dispatch = useDispatch();

  const addResult = (result) => {
    if (!newMapObjects.includes(result)) {
      setNewMapObjects([...newMapObjects, result]);
    }
  };

  const removeResult = (id) => {
    const filteredResults = newMapObjects.filter(
      (result) => result.taxonId !== id
    );

    setNewMapObjects(filteredResults);
  };

  const handleCreateMap = () => {
    let idRegex = /^[-,0-9]+$/;

    const newMapName = form.getValues("newMapName");

    const newMapIds = newMapObjects.map((result) => result.taxonId).join(",");

    const newMap = { title: newMapName, ids: newMapIds };

    const staticNameFilter =
      idObject[newMapName.split(" ").join("").toLowerCase()];

    const customMapFilter = customMapsArray.filter(
      (element) => element.title === newMapName
    );

    if (
      idRegex.test(newMapIds) &&
      !staticNameFilter &&
      !customMapFilter.length
    ) {
      dispatch(createMap(newMap));
      setValue("newMapName", "");
      setNewMapObjects([]);
    }
  };

  const handleSearch = () => {
    const searchText = form.getValues("searchText");

    triggerFetch(searchText);
  };

  return (
    <>
      <BasicModal
        title="Add Taxa By Search"
        ref={modalRef}
        modalContentStyle={styles.modalContent}
      >
        <View>
          <View style={styles.searchBar}>
            <TextInputWrapper
              form={form}
              name="searchText"
              label="Enter search text"
              containerStyles={{ flex: 1 }}
            />
            <IconButton icon="magnify" onPress={handleSearch} />
          </View>
          <ScrollView
            horizontal
            alwaysBounceVertical={false}
            style={styles.horizScrollView}
          >
            {newMapObjects.map((object) => {
              return (
                <View
                  key={object.taxonId}
                  id={object.taxonId}
                  style={styles.chip}
                >
                  <Text style={styles.textCenter}>{object.taxonId}</Text>
                  <Text style={styles.textCenter}>
                    {object.commonName ? object.commonName : object.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <ScrollView>
          {searchResults.map((result) => (
            <SearchResult
              key={result.taxonId}
              commonName={result.commonName}
              taxonId={result.taxonId}
              name={result.name}
              rank={result.rank}
              add={() => addResult(result)}
              newMapIds={newMapObjects
                .map((object) => object.taxonId)
                .join(",")}
              remove={() => removeResult(result.taxonId)}
            />
          ))}
        </ScrollView>
      </BasicModal>
      <View style={styles.pageContainer}>
        <Text>New Map Name</Text>
        <TextInputWrapper
          form={form}
          name="newMapName"
          label="Custom Map Name"
          rules={{ required: "Map name is required" }}
        />
        <View style={styles.buttonView}>
          <Button mode="contained" onPress={handleSubmit(handleCreateMap)}>
            Create Map
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              if (modalRef.current) {
                modalRef.current.open();
              }
            }}
          >
            Search
          </Button>
        </View>
        <ScrollView style={{ height: "100%" }}>
          {newMapObjects.map((object) => (
            <SearchResult
              key={object.taxonId}
              commonName={object.commonName}
              taxonId={object.taxonId}
              name={object.name}
              rank={object.rank}
              add={() => addResult(object)}
              newMapIds={newMapObjects
                .map((object) => object.taxonId)
                .join(",")}
              remove={() => removeResult(object.taxonId)}
            />
          ))}
        </ScrollView>
        {/* <ScrollView style={{ height: "100%" }}>
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
        </ScrollView> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  horizScrollView: {
    flexDirection: "row",
    backgroundColor: "gray",
  },
  chip: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    minWidth: 30,
    backgroundColor: "white",
  },
  textCenter: {
    textAlign: "center",
  },
  pageContainer: {
    padding: 10,
  },
  buttonView: {
    gap: 10,
  },
});

export default CustomMapMakerScreen;
