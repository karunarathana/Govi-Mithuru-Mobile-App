import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Mail {
    id: string;
    sender: string;
    subject: string;
    snippet: string;
    time: string;
}

const mails: Mail[] = [
    {
        id: "1",
        sender: "Google",
        subject: "Welcome to Gmail",
        snippet: "Thank you for creating a Google account.",
        time: "09:30 AM",
    },
    {
        id: "2",
        sender: "Facebook",
        subject: "New Login Alert",
        snippet: "We noticed a new login to your account.",
        time: "Yesterday",
    },
    {
        id: "3",
        sender: "Amazon",
        subject: "Your Order has been Shipped",
        snippet: "Your package is on the way.",
        time: "2 days ago",
    },
];

export default function MailInbox() {
    const renderItem = ({ item }: { item: Mail }) => (
        <TouchableOpacity style={styles.mailItem}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.sender[0]}</Text>
            </View>
            <View style={styles.mailContent}>
                <View style={styles.mailHeader}>
                    <Text style={styles.sender}>{item.sender}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.snippet}>{item.snippet}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
                <View style={styles.container}>
                    <FlatList
                        data={mails}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", padding: 10 ,marginTop:50},
    mailItem: {
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    avatarText: { color: "white", fontWeight: "bold", fontSize: 18 },
    mailContent: { flex: 1 },
    mailHeader: { flexDirection: "row", justifyContent: "space-between" },
    sender: { fontWeight: "bold", fontSize: 16 },
    time: { color: "gray", fontSize: 12 },
    subject: { fontSize: 14, marginTop: 2 },
    snippet: { fontSize: 12, color: "gray", marginTop: 1 },
});
