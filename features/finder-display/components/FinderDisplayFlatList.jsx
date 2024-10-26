import React, { forwardRef, useEffect, useRef } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SortBySelect from "./sort-inputs/SortBySelect";
import SpeciesSelect from "./sort-inputs/SpeciesSelect";
import { FinderDisplayItem } from "./FinderDisplayItem";

const FinderDisplayFlatList = forwardRef(({ unsortedListData, sortedListData, form }, ref) => {
  
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
      <FlatList
        ref={ref}
        style={{ flex: 1, }}
        data={sortedListData}
        renderItem={FinderDisplayItem}
        keyExtractor={(item) => item.id}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
});

export default FinderDisplayFlatList;