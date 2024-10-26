import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SortBySelect from "./sort-inputs/SortBySelect";
import SpeciesSelect from "./sort-inputs/SpeciesSelect";
import { FinderDisplayItem } from "./FinderDisplayItem";
import { ActivityIndicator } from "react-native-paper";

const FinderDisplayFlatList = forwardRef(
  ({ unsortedListData, sortedListData, form, isFetching }, ref) => {
    const flatlistRef = useRef(null);

    useImperativeHandle(ref, () => ({
      scrollToIndex: (config) => {
        if (flatlistRef.current) {
          flatlistRef.current.scrollToIndex(config);
        }
      },
    }));

    const getItemLayout = (data, index) => {
      const ITEM_HEIGHT = 122; // Finder item height including margin and border, 100 + 10 + 10 + 1 + 1

      return {
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      };
    };

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 10,
            marginBottom: 5,
          }}
        >
          <View style={{ width: "50%", paddingRight: 5 }}>
            <SortBySelect form={form} />
          </View>
          <View style={{ width: "50%", paddingLeft: 5 }}>
            <SpeciesSelect form={form} unsortedListData={unsortedListData} />
          </View>
        </View>
        {isFetching && (
          <ActivityIndicator
            animating={true}
            color="#000"
            size="large"
            style={{ flex: 1, justifyContent: "center" }}
          />
        )}
        {!isFetching && (
          <FlatList
            ref={flatlistRef}
            style={{ flex: 1 }}
            data={sortedListData}
            renderItem={(props) => <FinderDisplayItem {...props} />}
            keyExtractor={(item) => item.id}
            scrollIndicatorInsets={{ right: 1 }}
            getItemLayout={getItemLayout}
          />
        )}
      </View>
    );
  }
);

export default FinderDisplayFlatList;
