import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AdminProfile() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [fullName, setFullName] = useState("ADMIN");
    const [username, setUsername] = useState("admin");
    const [email, setEmail] = useState("admin@gmail.com");
    const [phone, setPhone] = useState("+94 7X XXX XXXX");
    const [darkMode, setDarkMode] = useState(false);
    const [push, setPush] = useState(true);
    const [location, setLocation] = useState(false);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission needed", "Allow gallery access to change avatar.");
                return;
            }
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.9,
            });
            if (!res.canceled) {
                setAvatar(res.assets[0].uri);
            }
        } catch (e) {
            Alert.alert("Oops", "Could not open gallery.");
        }
    };

    const onSave = () => {
        // TODO: call your API here
        Alert.alert("Saved", "Your profile has been updated.");
    };
    return (
        <>
            <View style={styles.screen}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    {/* Header Card */}
                    <View style={styles.headerCard}>
                        <Pressable onPress={pickImage} style={styles.avatarWrap}>
                            <Image
                                source={{
                                    uri:
                                        avatar ||
                                        "https://i.pravatar.cc/300?img=12",
                                }}
                                style={styles.avatar}
                            />
                            <View style={styles.camBadge}>
                                <Feather name="camera" size={16} color="#fff" />
                            </View>
                        </Pressable>

                        <Text style={styles.name}>{fullName}</Text>
                        <Text style={styles.username}>@{username}</Text>

                        <View style={styles.quickRow}>
                            <View style={styles.quickItem}>
                                <Feather name="user" size={18} />
                                <Text style={styles.quickText}>Profile</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.quickItem}>
                                <Feather name="shield" size={18} />
                                <Text style={styles.quickText}>Security</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.quickItem}>
                                <Feather name="bell" size={18} />
                                <Text style={styles.quickText}>Alerts</Text>
                            </View>
                        </View>
                    </View>

                    {/* Info Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Personal Info</Text>

                        <View style={styles.inputRow}>
                            <Feather name="user" size={18} style={styles.inputIcon} />
                            <TextInput
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="Full name"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <Feather name="at-sign" size={18} style={styles.inputIcon} />
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Username"
                                autoCapitalize="none"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <Feather name="mail" size={18} style={styles.inputIcon} />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <Feather name="phone" size={18} style={styles.inputIcon} />
                            <TextInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Phone"
                                keyboardType="phone-pad"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Preferences */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Preferences</Text>

                        <View style={styles.toggleRow}>
                            <View style={styles.toggleLeft}>
                                <MaterialIcons name="dark-mode" size={20} />
                                <View>
                                    <Text style={styles.toggleTitle}>Dark Mode</Text>
                                    <Text style={styles.toggleHint}>Use dark theme across the app</Text>
                                </View>
                            </View>
                            <Switch value={darkMode} onValueChange={setDarkMode} />
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.toggleRow}>
                            <View style={styles.toggleLeft}>
                                <Feather name="bell" size={20} />
                                <View>
                                    <Text style={styles.toggleTitle}>Push Notifications</Text>
                                    <Text style={styles.toggleHint}>Promotions & updates</Text>
                                </View>
                            </View>
                            <Switch value={push} onValueChange={setPush} />
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.toggleRow}>
                            <View style={styles.toggleLeft}>
                                <Feather name="map-pin" size={20} />
                                <View>
                                    <Text style={styles.toggleTitle}>Location Services</Text>
                                    <Text style={styles.toggleHint}>Improve local recommendations</Text>
                                </View>
                            </View>
                            <Switch value={location} onValueChange={setLocation} />
                        </View>
                    </View>
                    {/* Actions */}
                    <View style={styles.actionsRow}>
                        <Pressable style={[styles.actionBtn, styles.outlineBtn]} onPress={() => Alert.alert("Logged out")}>
                            <Feather name="log-out" size={16} />
                            <Text style={styles.actionText}>Log out</Text>
                        </Pressable>
                        <Pressable style={styles.actionBtn} onPress={onSave}>
                            <Feather name="save" size={16} color="#fff" />
                            <Text style={[styles.actionText, { color: "#fff" }]}>Save changes</Text>
                        </Pressable>
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </>
    )
}
const CARD_BG = "#ffffff";
const SOFT = "#f2f4f7";
const TEXT = "#1f2937";
const MUTED = "#6b7280";
const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: SOFT },
    scroll: { padding: 16 },
    headerCard: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 14,
        alignItems: "center",
    },
    avatarWrap: { position: "relative" },
    avatar: { width: 110, height: 110, borderRadius: 55 },
    camBadge: {
        position: "absolute",
        right: -2,
        bottom: -2,
        backgroundColor: "#2563eb",
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    name: { fontSize: 20, fontWeight: "700", color: TEXT, marginTop: 12 },
    username: { color: MUTED, marginTop: 2, marginBottom: 14 },

    quickRow: {
        marginTop: 8,
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    quickItem: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: SOFT,
        borderRadius: 12,
    },
    divider: { width: 1, height: 18, backgroundColor: "#e5e7eb" },

    card: {
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 2,
        marginBottom: 14,
    },
    cardTitle: { fontSize: 16, fontWeight: "700", color: TEXT, marginBottom: 10 },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    inputIcon: { marginRight: 8, color: MUTED },
    input: { flex: 1, fontSize: 15, color: TEXT },

    toggleRow: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    toggleLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    toggleTitle: { fontSize: 15, fontWeight: "600", color: TEXT },
    toggleHint: { fontSize: 12, color: MUTED, marginTop: 2 },
    separator: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 8 },

    actionsRow: { flexDirection: "row", gap: 12, marginTop: 6 },
    actionBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        backgroundColor: "#2563eb",
    },
    outlineBtn: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    actionText: { fontWeight: "700", color: "#111827" },
    quickText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 8,
    },
});