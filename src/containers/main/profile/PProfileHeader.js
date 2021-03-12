import * as React from 'react';
import { Appbar, Menu, Divider } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import StoreContext from "../../../context/index";

function PublicProfileBar({ navigation, previous }) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const  { store, setStore } = React.useContext(StoreContext);
    const route = useRoute();
    return (
        <Appbar.Header style={{backgroundColor: "white"}}>
            <Appbar.BackAction onPress={navigation.goBack} color={colors.primary}/>
            <Appbar.Content title={store.publicUserInfo.info.u_name+" profile"} color={colors.primary} />
        </Appbar.Header>
    );
}
export default PublicProfileBar
