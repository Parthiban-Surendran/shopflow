import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Image,
  StyleSheet,
  Animated,
} from "react-native";

const CustomLoader = ({ visible, autoClose = false }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-close after 3 seconds if enabled
      if (autoClose) {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 3000);
      }
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
        <View style={styles.loaderContainer}>
          <Image
            source={require("../assets/loader.gif")}
            style={styles.gifStyle}
          />
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Blurred effect
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  gifStyle: {
    width: 80,
    height: 80,
  },
});

export default CustomLoader;
