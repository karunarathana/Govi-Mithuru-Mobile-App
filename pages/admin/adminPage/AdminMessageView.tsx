import { createMessage } from "@/service/login/MessageService";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AdminMessageView() {
  const [messages, setMessages] = useState([
    { id: "1", user: "Admin", text: "Need help with product order" },
    { id: "2", user: "Admin", text: "Can you update rice stock?" },
    { id: "3", user: "Admin", text: "Price list request for vegetables" },
  ]);

  const [typeMessage, setTypeMessage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // handle send (create or update)
  const handleSend = async () => {
    if (typeMessage.trim() === "") return;

    if (editId) {
      // Update message
      setMessages(
        messages.map((msg) =>
          msg.id === editId ? { ...msg, text: typeMessage } : msg
        )
      );
      setEditId(null);
      setTypeMessage("");
    } else {
      // Create new message
      const newMessage = {
        id: (messages.length + 1).toString(),
        user: "Admin",
        text: typeMessage,
      };

      setMessages([...messages, newMessage]);
      await createMessage("", ""); // API call
      setTypeMessage("");
    }
  };

  // delete message
  const handleDelete = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  // edit message
  const handleEdit = (id: string, text: string) => {
    setEditId(id);
    setTypeMessage(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {editId ? "✏️ Edit Message" : "Add New Message"}
      </Text>

      {/* Messages Section */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>📩 Recent Messages</Text>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <Icon name="message-text" size={24} color="#2196F3" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.messageUser}>{msg.user}</Text>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>

            {/* Edit & Delete buttons */}
            <TouchableOpacity
              onPress={() => handleEdit(msg.id, msg.text)}
              style={styles.iconButton}
            >
              <Icon name="pencil" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(msg.id)}
              style={styles.iconButton}
            >
              <Icon name="delete" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        ))}
        {/* Input + Send */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={typeMessage}
          onChangeText={setTypeMessage}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name={editId ? "check" : "send"} size={22} color="white" />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 15 },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  messageUser: { fontSize: 15, fontWeight: "600" },
  messageText: { fontSize: 14, color: "#555" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 50,
    marginLeft: 8,
  },
  iconButton: {
    marginLeft: 8,
  },
});
