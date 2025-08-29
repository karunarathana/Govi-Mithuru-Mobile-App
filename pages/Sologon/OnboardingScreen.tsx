
import React, { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const { width } = Dimensions.get("window");

const data = [
  { id: "1", image: require("../../assets/Rating.png"), text: "Welcome to #Govi Mithuru 🌱" },
  { id: "2", image: require("../../assets/Rating.png"), text: "Connect Farmers, Suppliers, and Customers 🤝" },
  { id: "3", image: require("../../assets/Rating.png"), text: "Get Started with Smart Farming 🚀" },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <View style={styles.page}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>

        <View style={styles.buttonWrapper}>
          {currentIndex < data.length - 1 ? (
            <>
              <TouchableOpacity>
                <Text style={styles.skip}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => setCurrentIndex(currentIndex + 1)}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => navigation.navigate("SelectRoleView")}
            >
              <Text style={styles.nextText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  page: { width, justifyContent: "center", alignItems: "center", padding: 20 },
  image: { width: width * 0.7, height: width * 0.7, resizeMode: "contain", marginBottom: 20 },
  text: { fontSize: 22, fontWeight: "600", textAlign: "center" },
  pagination: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "grey", marginHorizontal: 4 },
  activeDot: { backgroundColor: "green", width: 12, height: 12 },
  buttonWrapper: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30, marginBottom: 40, alignItems: "center" },
  skip: { fontSize: 16, color: "grey" },
  nextBtn: { backgroundColor: "green", paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20 },
  nextText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
