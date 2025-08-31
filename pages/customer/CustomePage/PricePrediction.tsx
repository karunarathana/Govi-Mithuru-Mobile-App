import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PricePrediction() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedVegetable, setSelectedVegetable] = useState("");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const vegetables = ["Tomato", "Carrot", "Potato", "Cabbage"];

  const handlePrediction = () => {
    // TODO: Call backend API to get prediction
    const randomPrice = Math.floor(Math.random() * 500) + 50;
    setPredictedPrice(randomPrice);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>🥦 එළවළු මිල අනාවැකි 🥬</Text>

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialIcons name="calendar-today" size={20} color="#4CAF50" />
          <Text style={styles.inputText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}

        {/* Vegetable Picker */}
        <View style={styles.input}>
          <MaterialIcons name="restaurant" size={20} color="#4CAF50" />
          <Picker
            selectedValue={selectedVegetable}
            onValueChange={(itemValue) => setSelectedVegetable(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Vegetable" value="" />
            {vegetables.map((veg) => (
              <Picker.Item key={veg} label={veg} value={veg} />
            ))}
          </Picker>
        </View>

        {/* Predict Button */}
        <TouchableOpacity style={styles.button} onPress={handlePrediction}>
          <Text style={styles.buttonText}>🔮 මිල අනාවැකි කරන්න</Text>
        </TouchableOpacity>

        {/* Predicted Price Card */}
        {predictedPrice !== null && selectedVegetable && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>{selectedVegetable} සඳහා අනාවැකි මිල</Text>
            <Text style={styles.resultPrice}>Rs. {predictedPrice}/KG</Text>
            <Text style={styles.resultDate}>දිනය: {selectedDate.toDateString()}</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2E7D32",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#cce5cc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  picker: {
    flex: 1,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  resultCard: {
    marginTop: 25,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 10,
  },
  resultPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 10,
  },
  resultDate: {
    fontSize: 14,
    color: "#666",
  },
});
