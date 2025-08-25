import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddFoodView() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log({
      productName,
      price,
      category,
      image,
    });
    alert("✅ Product Added Successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>➕ Add New Product</Text>

        {/* Product Name */}
        <View style={styles.inputContainer}>
          <Ionicons name="pricetag" size={20} color="green" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Product Name"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Price */}
        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={20} color="green" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Price (Per KG)"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
        </View>

        {/* Category */}
        <View style={styles.inputContainer}>
          <Ionicons name="list" size={20} color="green" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Category (Ex: Fruits, Vegetables)"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Upload Image */}
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.uploadText}>📷 Upload Product Image</Text>
          )}
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="save" size={20} color="white" />
          <Text style={styles.buttonText}> Save Product</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  imageUpload: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  uploadText: {
    color: "green",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "green",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
