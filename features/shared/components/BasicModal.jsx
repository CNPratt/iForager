import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Portal, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export const BasicModal = forwardRef(
  (
    { children, hideModal, modalContainerStyle, modalContentStyle, onClose },
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
            visible={isVisible}
            onDismiss={hideModalInternal}
            contentContainerStyle={[styles.modalContainer, modalContainerStyle]}
          >
            <View style={[styles.modalContent, modalContentStyle]}>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
  },
});
