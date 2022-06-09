import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import { Provider as PaperProvider } from 'react-native-paper' 
import { useDispatch, useSelector, Provider as StoreProvider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './redux/store'
import { setUserData, clearUserData } from './redux/auth';

import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import SliderScreen from './screens/Slider';
import ListToSave from './screens/ListToSave';
import Loading from './components/loadin';

import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AutenticatedView() { 
    return (
      <BottomTabs.Navigator screenOptions={{ 
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary1 },
          tabBarActiveTintColor: 'white',
      }}>
          <BottomTabs.Screen
              name="Inicio"
              component={Home}
              options={{   
                title: 'Recorrido',
                headerTitleAlign: 'center',
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
              }}
          />
          <BottomTabs.Screen
              name="List"
              component={ListToSave}
              options={{
                title: 'Rondines por subir',
                headerTitleAlign: 'center',
                tabBarLabel: 'Por subir',
                tabBarIcon: ({ color, size }) => <Ionicons name="ios-list-circle-outline" size={size} color={color} />  
              }}
          />
          <BottomTabs.Screen
              name="Profile"
              component={Profile}
              options={{
                title: 'Perfil',
                headerTitleAlign: 'center',
                tabBarLabel: 'Perfil',
                tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />
              }}
          />
      </BottomTabs.Navigator>
  )
}

function MainView() {
  return (
      <Stack.Navigator>
          <Stack.Screen
              name='Home'
              component={AutenticatedView}
              options={{ headerShown: false }} 
          />
          <Stack.Screen
              name='Slider'
              component={SliderScreen}
              options={{ headerShown: false }} 
          />
      </Stack.Navigator>
  )
}

function LoginView() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    )
}

function Load(){
    return  <Loading />
}

function Navigate(){
    const autenticated = useSelector((state) => state.auth.userData );
    const [load, setLoad] = useState(false);
    
    const dispatch = useDispatch();

    const getUserAsyncStore = async()=>{ 
      const storedUser = await AsyncStorage.getItem('userData'); 
      if(!storedUser){ 
        dispatch(clearUserData())
      }else{ 
        dispatch(setUserData(JSON.parse(storedUser)));
      } 
      setLoad(true);
    }

    useEffect(()=>{
        getUserAsyncStore();
    },[])

    if(!autenticated && !load ){
      return <Loading />
    } 
    
    return ( 
        <NavigationContainer>
            {autenticated && <MainView />}
            {!autenticated && <LoginView />}
        </NavigationContainer> 
    )
}

export default function App() {
  return (
        <>
          <StoreProvider store={store} >
            <StatusBar style="auto" />
            <PaperProvider>
              <Navigate />
            </PaperProvider>
          </StoreProvider>
        </>
    );
}
