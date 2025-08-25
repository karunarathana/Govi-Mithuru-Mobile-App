import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define a Product type
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string | null;
}

export default function AddFoodView(){
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Sample product list
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Apple", price: "250", category: "Fruits", image: null },
    { id: 2, name: "Carrot", price: "180", category: "Vegetables", image: null },
  ]);

  // Pick Image
  const pickImage = async (): Promise<void> => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    
    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  // Save or Update Product
  const handleSubmit = (): void => {
    if (!productName || !price || !category) {
      Alert.alert("⚠️ Please fill all fields!");
      return;
    }

    if (editingId) {
      // Update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, name: productName, price, category, image } : p
        )
      );
      setEditingId(null);
      Alert.alert("✏️ Product Updated!");
    } else {
      // Add
      const newProduct: Product = {
        id: Date.now(),
        name: productName,
        price,
        category,
        image,
      };
      setProducts([...products, newProduct]);
      Alert.alert("✅ Product Added!");
    }

    // Reset form
    setProductName("");
    setPrice("");
    setCategory("");
    setImage(null);
  };

  // Edit Product
  const handleEdit = (product: Product): void => {
    setEditingId(product.id);
    setProductName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
  };

  // Delete Product
  const handleDelete = (id: number): void => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          setProducts(products.filter((p) => p.id !== id));
          Alert.alert("🗑️ Product Deleted!");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
        </Text>

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
            placeholder="Enter Category (Fruits/Vegetables)"
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

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="save" size={20} color="white" />
          <Text style={styles.buttonText}>{editingId ? " Update Product" : " Save Product"}</Text>
        </TouchableOpacity>

        {/* Product List */}
        <Text style={styles.subtitle}>📦 Product List</Text>
        {products.map((product) => (
          <View key={product.id} style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {product.image ? (
                <Image source={{ uri: product.image }} style={styles.cardImage} />
              ) : (
                <Ionicons name="image" size={50} color="gray" />
              )}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{product.name}</Text>
                <Text style={styles.cardText}>💰 {product.price} LKR / KG</Text>
                <Text style={styles.cardText}>📂 {product.category}</Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleEdit(product)}>
                <Ionicons name="create" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(product.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "green", textAlign: "center", marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10, color: "#333" },
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
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
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
  uploadText: { color: "green", fontSize: 16 },
  image: { width: "100%", height: "100%", borderRadius: 12 },
  button: {
    flexDirection: "row",
    backgroundColor: "green",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImage: { width: 60, height: 60, borderRadius: 8 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardText: { fontSize: 14, color: "#666" },
  cardActions: { flexDirection: "row", gap: 15 },
});
