import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function AdminHome() {
  const [searchText, setSearchText] = useState("");
  const stats = [
    { id: "1", title: "Total Users", value: "1200", icon: "account-group", color: "#4CAF50" },
    { id: "2", title: "Total Products", value: "340", icon: "shopping", color: "#2196F3" },
    { id: "3", title: "Economic Officers", value: "15", icon: "account-tie", color: "#FF9800" },
    { id: "4", title: "Revenue", value: "$56K", icon: "cash-multiple", color: "#9C27B0" },
  ];

  const products = [
    { id: "1", name: "Rice", price: "120 Rs", stock: "200 KG", icon: "rice" },
    { id: "2", name: "Potato", price: "180 Rs", stock: "150 KG", icon: "food-apple" },
    { id: "3", name: "Carrot", price: "200 Rs", stock: "90 KG", icon: "carrot" },
    { id: "4", name: "Onion", price: "150 Rs", stock: "120 KG", icon: "food-variant" },
  ];

  const officers = [
    { id: "1", name: "Mr. Silva", role: "Chief Officer", phone: "077-1234567" },
    { id: "2", name: "Ms. Perera", role: "Field Officer", phone: "071-9876543" },
  ];

  const messages = [
    { id: "1", user: "Nuwan", text: "Need help with product order" },
    { id: "2", user: "Sandeepa", text: "Can you update rice stock?" },
    { id: "3", user: "Kumari", text: "Price list request for vegetables" },
  ];

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.cusHeader}>
          <View>
            <Text style={styles.customGreeting}>Welcome Back ✌</Text>
            <Text style={styles.customerName}>Ruvindu Dulmi...</Text>
          </View>
          <View>
            <Image style={styles.customProfilepick} source={require('../../../assets/icon/admin.png')} />
          </View>
        </View>
        <View style={styles.cusSearchBar}>
          <View style={styles.serchBarmainWrapper}>
            <Feather name="search" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.customSearchIcon}>
            <Feather name="menu" size={25} color="#888" />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: item.color }]}>
              <Icon name={item.icon} size={28} color="white" />
              <Text style={styles.cardValue}>{item.value}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Products Section */}
        <Text style={styles.sectionTitle}>🛒 Products & Prices</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Icon name={item.icon} size={26} color="#4CAF50" />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productStock}>{item.stock}</Text>
              <Text style={styles.productPrice}>{item.price} / KG</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  customGreeting: {
    fontSize: 20,
  },
  customerName: {
    fontSize: 30,
    fontWeight: "bold"
  },
  customProfilepick: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 1000, // big number works for percentage to force circle
  },
  cusHeader: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cusSearchBar: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  customSearchIcon: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  serchBarmainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '80%'
  },
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 15 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  statsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop:15},
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: { fontSize: 14, color: "white", marginTop: 5 },
  cardValue: { fontSize: 20, fontWeight: "bold", color: "white", marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  productName: { fontSize: 16, fontWeight: "500", marginLeft: 10, flex: 1 },
  productStock: { fontSize: 14, color: "#888", marginRight: 10 },
  productPrice: { fontSize: 15, fontWeight: "bold", color: "#2196F3" },
  officerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  officerName: { fontSize: 16, fontWeight: "500" },
  officerRole: { fontSize: 14, color: "#666" },
  officerPhone: { fontSize: 14, fontWeight: "bold", color: "#4CAF50" },
  messageCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  messageUser: { fontSize: 15, fontWeight: "600" },
  messageText: { fontSize: 14, color: "#555" },
});