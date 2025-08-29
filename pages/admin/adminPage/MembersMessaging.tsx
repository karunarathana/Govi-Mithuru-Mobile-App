import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Message {
    id: number;
    sender: "admin" | string; // "admin" or member name
    text: string;
    timestamp: string;
}

interface Member {
    id: number;
    name: string;
}

export default function MessagingApp() {
    const [members] = useState<Member[]>([
        { id: 1, name: "Ruvindu" },
        { id: 2, name: "Sandeepa" },
        { id: 3, name: "Nipun" },
    ]);

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "admin", text: "Welcome to Govi Mithuru App!", timestamp: "09:00 AM" },
    ]);

    const [selectedMember, setSelectedMember] = useState<string | "all">("all");
    const [messageText, setMessageText] = useState("");

    // Send message
    const sendMessage = () => {
        if (!messageText) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: selectedMember === "all" ? "admin" : "Admin to " + selectedMember,
            text: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, newMessage]);
        setMessageText("");
    };

    // Delete message
    const deleteMessage = (id: number) => {
        Alert.alert("Delete Message", "Are you sure?", [
            { text: "Cancel" },
            { text: "Delete", onPress: () => setMessages((prev) => prev.filter((m) => m.id !== id)) },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>📩 Messaging System</Text>

            {/* Select Member */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{ id: 0, name: "All Members" }, ...members]}
                keyExtractor={(item) => item.id.toString()}
                style={{ marginBottom: 15 }}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => {
                    const isSelected = selectedMember === (item.id === 0 ? "all" : item.name);
                    return (
                        <TouchableOpacity
                            style={[
                                styles.memberCard,
                                { backgroundColor: isSelected ? "green" : "#fff" },
                                isSelected && { shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
                            ]}
                            onPress={() => setSelectedMember(item.id === 0 ? "all" : item.name)}
                        >
                            {/* Optional avatar */}
                            <View style={styles.avatar}>
                                <Text style={{ color: isSelected ? "#fff" : "#555", fontWeight: "bold" }}>
                                    {item.name.charAt(0)}
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.memberName,
                                    { color: isSelected ? "#fff" : "#555" },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />


            {/* Messages List */}
            <FlatList
                data={messages.filter(
                    (msg) => selectedMember === "all" || msg.sender.includes(selectedMember)
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                    <View style={styles.messageCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.msgSender}>{item.sender}</Text>
                            <Text style={styles.msgText}>{item.text}</Text>
                            <Text style={styles.msgTime}>{item.timestamp}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                            <MaterialIcons name="delete" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Input Box */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Type a message..."
                    value={messageText}
                    onChangeText={setMessageText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ height: 100 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5", padding: 10 },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    memberChip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: "#ddd",
        borderRadius: 20,
        marginRight: 8,
    },
    memberChipSelected: { backgroundColor: "green" },
    memberChipText: { fontSize: 14, color: "#333" },
    messageCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2,
    },
    msgSender: { fontSize: 14, fontWeight: "bold" },
    msgText: { fontSize: 16, marginTop: 2 },
    msgTime: { fontSize: 12, color: "#888", marginTop: 2 },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 10,
    },
    messageInput: {
        flex: 1,
        backgroundColor: "#eee",
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 45,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 25,
        marginLeft: 10,
    },
    memberCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: "#fff",
        elevation: 2,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    memberName: {
        fontSize: 14,
        fontWeight: "600",
    },
});
