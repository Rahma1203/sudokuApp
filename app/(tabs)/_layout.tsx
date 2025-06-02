import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSudokuStore } from '@/store/sudokuStore';

  const Play = (props: any) => <Ionicons name="play"  {...props} />;
  const Settings = (props: any) => <Ionicons name="settings"  {...props} />;

export default function TabLayout() {

  const {themeColor, isDarkMode} = useSudokuStore();
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: themeColor,
        tabBarInactiveTintColor: '#888',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Play',
          tabBarIcon: ({ size, color }) => <Play size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
         title: 'Settings',
          tabBarIcon: ({ size, color }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}