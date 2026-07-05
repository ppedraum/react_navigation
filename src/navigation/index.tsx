import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    createNativeStackScreen,
} from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import Home from './screens/Home';
import Profile from './screens/Profile';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: createNativeStackScreen({
            screen: Home,
        }),
        Profile: createNativeStackScreen({
            screen: Profile,
            options: {
                title: 'Perfil',
            },
        }),
    },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
    interface RootNavigator extends RootStackType {}
}
