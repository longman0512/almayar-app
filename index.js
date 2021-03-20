import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppNavigator from './src/AppNavigator';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import StoreContext from "./src/context/index";

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    }
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    }
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    }
  }
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};
function Root() {
  const [store, setStore] = React.useState("dm");
  const value = { store, setStore };

  return  <StoreContext.Provider value = {value}>
            <PaperProvider theme={theme}>
              <App />
            </PaperProvider>
          </StoreContext.Provider>
        ;
}

AppRegistry.registerComponent(appName, () => Root);
