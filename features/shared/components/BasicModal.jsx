import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Portal, Button, IconButton, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export const BasicModal = forwardRef(
  (
    {
      title,
      children,
      hideModal,
      modalContainerStyle,
      modalContentStyle,
      onClose,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const showModal = () => setIsVisible(true);

    const hideModalInternal = () => {
      setIsVisible(false);
      if (hideModal) hideModal();
      if (onClose) onClose();
    };

    useImperativeHandle(ref, () => ({
      open: showModal,
      close: hideModalInternal,
    }));

    return (
      <>
        <Portal>
          <Modal
            dismissable={true}
            visible={isVisible}
            onDismiss={hideModalInternal}
            contentContainerStyle={[styles.modalContainer, modalContainerStyle]}
          >
            <View style={[styles.modalContent, modalContentStyle]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                }}
              >
                <IconButton icon="close" style={{ display: "none" }} />
                <Text
                  style={{
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  {title}
                </Text>
                <IconButton icon="close" onPress={hideModalInternal} />
              </View>
              {children}
            </View>
          </Modal>
        </Portal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
  },
});
