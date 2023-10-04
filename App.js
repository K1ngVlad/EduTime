import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { appStyles } from './AppStyles';

export default function App() {
  return (
    <View style={appStyles.container}>
      <Text>Ладно</Text>
      <StatusBar style="auto" />
    </View>
  );
}
