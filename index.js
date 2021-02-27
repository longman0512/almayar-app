import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppNavigator from './src/AppNavigator';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import StoreContext from "./src/context/index";

function Root() {
  const [store, setStore] = React.useState("dm");
  const value = { store, setStore };

  return  <StoreContext.Provider value = {value}>
            <PaperProvider>
              <App />
            </PaperProvider>
          </StoreContext.Provider>
        ;
}

AppRegistry.registerComponent(appName, () => Root);
