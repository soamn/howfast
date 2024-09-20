import { Tabs } from "expo-router";
import { View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Tasks",
          headerStyle: {
            backgroundColor: "#F6F3E4",
          },
          title: "Tasks",
          tabBarActiveTintColor: "black",
          tabBarActiveBackgroundColor: "#F6F3E4",
          tabBarBadge: "📃",
          tabBarBadgeStyle: { backgroundColor: "transparent" },
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📃</Text>,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          headerTitle: "Calendar",
          headerStyle: { backgroundColor: "#F6F3E4" },
          title: "Calendar",
          tabBarActiveTintColor: "black",
          tabBarActiveBackgroundColor: "#F6F3E4",
          tabBarBadge: "🗓️",
          tabBarBadgeStyle: { backgroundColor: "transparent" },
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗓️</Text>,
        }}
      />
    </Tabs>
  );
}
