import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "react-native-paper";
import { Keyboard } from "react-native";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import {
  BottomSheetWrapperHandleComponent,
  BottomSheetWrapperBackdrop,
} from "./BottomSheetWrapperComponents";

// BottomSheetWrapper MUST wrap its contents in a special container from the library to render correctly
// see https://ui.gorhom.dev/components/bottom-sheet/components/bottomsheetview/

const BottomSheetWrapper = forwardRef(
  (
    {
      iconLeft,
      iconRight,
      onPressIconLeft = () => {},
      onPressIconRight = () => {},
      title,
      isOpen,
      setIsOpen = () => {},
      children,
      sheetKey = "bottom-sheet",
    },
    ref
  ) => {
    const bottomSheetRef = useRef(null);

    const exposedOpen = () => {
      Keyboard.dismiss();
      setIsOpen(true);
      bottomSheetRef.current?.expand();
    };

    const exposedClose = () => {
      setIsOpen(false);
      bottomSheetRef.current?.close();
    };

    const onChange = (index) => {
      if (index < 0) {
        exposedClose();
      } else {
        exposedOpen();
      }
    };

    const handleComponent = useCallback(() => {
      return (
        <BottomSheetWrapperHandleComponent
          iconLeft={iconLeft}
          iconRight={iconRight}
          title={title}
          onPressIconLeft={onPressIconLeft}
          onPressIconRight={onPressIconRight}
          exposedOpen={exposedOpen}
          exposedClose={exposedClose}
        />
      );
    }, [
      iconLeft,
      iconRight,
      title,
      onPressIconLeft,
      onPressIconRight,
      exposedOpen,
      exposedClose,
    ]);

    useImperativeHandle(
      ref,
      () => {
        return {
          exposedOpen: exposedOpen,
          exposedClose: exposedClose,
        };
      },
      [bottomSheetRef]
    );

    return (
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          // For whatever reason, dynamic resizing refuses to work without a key
          key={sheetKey}
          topInset={150}
          enableDynamicSizing={true}
          enablePanDownToClose={true}
          onChange={onChange}
          handleComponent={handleComponent}
          index={-1}
          backdropComponent={BottomSheetWrapperBackdrop}
        >
          {children}
        </BottomSheet>
      </Portal>
    );
  }
);

BottomSheetWrapper.displayName = "BottomSheetWrapper";

export default BottomSheetWrapper;
