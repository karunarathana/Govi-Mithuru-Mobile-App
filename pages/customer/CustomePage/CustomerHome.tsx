import { getAllProduct, Product } from '@/service/login/CreateFoodService';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Catagories from '../components/Catagories';
import Foods from '../components/Foods';

export default function CustomerHome() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);



  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Working");

      const products = await getAllProduct();
      setProducts(products?.items ?? []);

    };

    fetchProducts();
  }, [])
  return (
    <>
      <View style={{ flex: 1, margin: 10 }}>
        <SafeAreaView>
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
            <View style={styles.container}>
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
          <View style={{ marginTop: 15 }}>
            <Image style={{ width: '100%', height: 190 }} source={require('../../../assets/adds.png')} />
          </View>
          <View>
            <View style={styles.categoriesMainWrapper}>
              <Text>Categories</Text>
              <Text>View All</Text>
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} // hide scrollbar
                contentContainerStyle={styles.scrollContent}
              >
                <Catagories nameOfCategories="Fruits" />
                <Catagories nameOfCategories="Veggies" />
                <Catagories nameOfCategories="Meat" />
                <Catagories nameOfCategories="Snacks" />
                <Catagories nameOfCategories="Drinks" />
                <Catagories nameOfCategories="Bakery" />
              </ScrollView>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.categoriesMainWrapper}>
              <Text>Today Price Of Product</Text>
              <Text>View All</Text>
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {products.map((product) => (
                  <Foods
                    key={product.productID}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    productImage={product.placeImageData}
                  />
                ))}
              </ScrollView>

            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
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
  container: {
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
  categoriesMainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scrollContent: {
    paddingHorizontal: 2,
    gap: 10
  },
});

