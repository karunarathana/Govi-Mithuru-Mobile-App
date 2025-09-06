import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import ChatScreen from "./CustomePage/ChatScreen";
import CustomerHome from "./CustomePage/CustomerHome";
import CustomerProfile from "./CustomePage/CustomerProfile";
import PricePrediction from "./CustomePage/PricePrediction";

export default function CustomerDash() {
    const Tab = createBottomTabNavigator();

    function HomeScreen() {
        return (
            <CustomerHome />
        );
    }

    function ProfileScreen() {
        return (
            <>
            <PricePrediction/>
            </>
        );
    }

    function SettingsScreen() {
        return (
            <CustomerProfile/>
        );
    }

    function MailScreen() {
        return (
           <ChatScreen/>
        );
    }

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = "home-outline";

                        if (route.name === "Home") iconName = "home-outline";
                        else if (route.name === "Profile") iconName = "person-outline";
                        else if (route.name === "Settings") iconName = "settings-outline";
                        else if (route.name === "Mail") iconName = "mail-outline";

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        marginBottom: 5,
                        textAlign: "center",
                        fontSize: 12,
                        padding: 5,
                    },
                    tabBarStyle: {
                        backgroundColor: "#AAFF99",
                        borderRadius: 20,
                        height: 70,
                        marginHorizontal: 20,
                        marginBottom: 10,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 5,
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        right: 10,
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Predit" component={ProfileScreen} />
                <Tab.Screen name="Mail" component={MailScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </>
    );
}
