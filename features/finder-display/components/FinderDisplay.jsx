import { StyleSheet, View} from "react-native";
import { useFetchObservationsQuery } from "../../shared/api-slices/observationsApi";
import { useSelector } from "react-redux";
import FinderDisplayFlatList from "./FinderDisplayFlatList";
import FinderDisplayMap from "./FinderDisplayMap";
import { useForm, useWatch } from "react-hook-form";
import { useState, useEffect, useRef  } from "react";

const distMethod = (a, b) => (a.distance > b.distance ? 1 : -1);
const dateMethod = (a, b) => (a.createDate > b.createDate ? -1 : 1);
const speciesMethod = (a, b) => (a.species > b.species ? 1 : -1);

const FinderDisplay = ({ ids }) => {
  const [selectedId, setSelectedId] = useState(null);

  const location = useSelector((state) => state.config.location);

  const mapRef = useRef(null);
  const flatListRef = useRef(null);

  const { data, error, isLoading } = useFetchObservationsQuery({
    latlon: [location.coords.latitude, location.coords.longitude],
    ids: ids,
    unfiltered: false,
    radius: 20,
  });

  const form = useForm({
    defaultValues: {
      sortBy: "distance",
      speciesName: "all",
    },
  });

  const [sortByValue, speciesNameValue] = useWatch({
    control: form.control,
    name: ["sortBy", "speciesName"],
  });

  function sortAndFilterData(data, sortByValue, speciesNameValue) {
    let sortedData = [...data];

    switch (sortByValue) {
      case "distance":
        sortedData.sort(distMethod);
        break;
      case "date":
        sortedData.sort(dateMethod);
        break;
      case "species":
        sortedData.sort(speciesMethod);
        break;
      default:
        break;
    }

    if (speciesNameValue !== "all") {
      sortedData = sortedData.filter((observation) => {
        return observation.species === speciesNameValue;
      });
    }

    return sortedData;
  }

  const rawListData = data ? [...data] : [];

  const unsortedListData = rawListData.map((observation) => {
    const newObservation = {
      ...observation,
      handlePress: () => {
        setSelectedId(observation.id);
      },
      isSelected: observation.id === selectedId,
    };

    return newObservation;
  });

  let sortedListData = sortAndFilterData(
    unsortedListData,
    sortByValue,
    speciesNameValue
  );

  useEffect(() => {
    if (selectedId) {
      // Scroll to the selected item in the flatlist
      // or animate to the selected marker on the map
      const selectedItem = sortedListData.find((item) => item.id === selectedId);

      if (selectedItem) {
        if (flatListRef.current) {
          const index = sortedListData.indexOf(selectedItem);

          console.log("scrolling to index", index);

          flatListRef.current.scrollToIndex({index: index, animated: true});
        }
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: selectedItem.lat,
            longitude: selectedItem.lon,
            // latitudeDelta: 0.01,
            // longitudeDelta: 0.01,
          });
        }
      }
    }
  }, [selectedId]);

  return (
    <>
      <View style={styles.container}>
        <FinderDisplayMap
          ref={mapRef}
          listData={sortedListData}
          location={location}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <FinderDisplayFlatList
          ref={flatListRef}
          form={form}
          sortedListData={sortedListData}
          unsortedListData={unsortedListData}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default FinderDisplay;
