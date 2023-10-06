import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  CourseScreen,
  FacultyScreen,
  GroupScreen,
  RaspScreen,
} from './screens';
import { darkBlue, white } from './constants';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Faculty"
          component={FacultyScreen}
          options={{
            title: 'Выберите факультет',
            statusBarColor: darkBlue,
            statusBarStyle: 'light',
            headerTintColor: white,
            headerStyle: {
              backgroundColor: darkBlue,
            },
          }}
        />
        <Stack.Screen
          name="Course"
          component={CourseScreen}
          options={{
            title: 'Выберите курс',
            statusBarColor: darkBlue,
            statusBarStyle: 'light',
            headerTintColor: white,
            headerStyle: {
              backgroundColor: darkBlue,
            },
          }}
        />
        <Stack.Screen
          name="Group"
          component={GroupScreen}
          options={{
            title: 'Выберите группу',
            statusBarColor: darkBlue,
            statusBarStyle: 'light',
            headerTintColor: white,
            headerStyle: {
              backgroundColor: darkBlue,
            },
          }}
        />
        <Stack.Screen
          name="Rasp"
          component={RaspScreen}
          options={{ title: 'Расписание', statusBarStyle: 'dark' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Navigation };
