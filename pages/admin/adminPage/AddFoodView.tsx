import { addNewProduct, deleteProduct, getAllProduct, updateProduct } from "@/service/login/CreateFoodService";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
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

// Define Product type
interface Product {
  productID: number;
  productName: string;
  productPrice: string;
  productCategory: string;
  placeImageData: string | null; // Base64 from DB
  productCreateData: string;
  others: string | null;
}

export default function AddFoodView() {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null); // Can be Base64 or URI
  const [editingId, setEditingId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from service
  const handleProductView = async () => {
    try {
      const result = await getAllProduct();
      if (result?.items) setProducts(result.items);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    console.log("Refresh");

    handleProductView();
  }, []);

  // Pick Image (from gallery)
  const pickImage = async (): Promise<void> => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true, // Get Base64 to send to backend
    });

    if (!res.canceled) {
      setImage(`data:image/jpeg;base64,${res.assets[0].base64}`);
    }
  };

  const productDto = {
    productName,
    productPrice: price,
    productCategory: category,
  };

  // Save or Update Product
  const handleSubmit = async (): Promise<void> => {
    if (!productName || !price || !category) {
      Alert.alert("⚠️ Please fill all fields!");
      return;
    }

    if (editingId) {
      // Update existing product locally
      setProducts((prev) =>
        prev.map((p) =>
          p.productID === editingId
            ? { ...p, productName, productPrice: price, productCategory: category, placeImageData: image }
            : p
        )
      );
      console.log(editingId);
      const result = await updateProduct(editingId, image, productDto);
      setEditingId(null);
      console.log(result);
      handleProductView();

      Alert.alert("✏️ Product Updated!");
    } else {
      // Add new product
      try {
        await addNewProduct(image, productDto); // Send Base64 image
        const newProduct: Product = {
          productID: Date.now(),
          productName,
          productPrice: price,
          productCategory: category,
          placeImageData: image,
          productCreateData: new Date().toISOString(),
          others: null,
        };
        setProducts([...products, newProduct]);
        Alert.alert("✅ Product Added!");
        handleProductView();
      } catch (error) {
        console.log("Error adding product:", error);
        Alert.alert("❌ Failed to add product");
      }
    }

    // Reset form
    setProductName("");
    setPrice("");
    setCategory("");
    setImage(null);
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingId(product.productID);
    setProductName(product.productName);
    setPrice(product.productPrice);
    setCategory(product.productCategory);

    // Ensure Base64 prefix for DB image
    if (product.placeImageData && !product.placeImageData.startsWith("data:image")) {
      setImage(`data:image/jpeg;base64,${product.placeImageData}`);
    } else {
      setImage(product.placeImageData);
    }

  };

  // Delete product
  const handleDelete = (id: number) => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteProduct(id);
          setProducts(products.filter((p) => p.productID !== id));
          Alert.alert("🗑️ Product Deleted!");
          handleProductView();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.title}>{editingId ? "✏️ Edit Product" : "➕ Add New Product"}</Text>

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
          {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text style={styles.uploadText}>📷 Upload Product Image</Text>}
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="save" size={20} color="white" />
          <Text style={styles.buttonText}>{editingId ? " Update Product" : " Save Product"}</Text>
        </TouchableOpacity>

        {/* Product List */}
        <Text style={styles.subtitle}>📦 Product List</Text>
        <ScrollView
          style={{ height: 170 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          {products.map((product) => (
            <View key={product.productID} style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {product.placeImageData ? (
                  <Image source={{ uri: `data:image/jpeg;base64,${product.placeImageData}` }} style={styles.cardImage} />
                ) : (
                  <Ionicons name="image" size={50} color="gray" />
                )}
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.cardTitle}>{product.productName}</Text>
                  <Text style={styles.cardText}>💰 {product.productPrice} LKR / KG</Text>
                  <Text style={styles.cardText}>📂 {product.productCategory}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => handleEdit(product)}>
                  <Ionicons name="create" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(product.productID)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
});
