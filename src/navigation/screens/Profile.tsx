import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import {
    RouteProp,
    useRoute,
    StaticScreenProps,
} from '@react-navigation/native';
/**
 * Profile.tsx
 *
 * Tela de perfil do usuário logado.
 * As informações exibidas (nome e avatar) são recebidas via route.params,
 * ou seja, esta tela não possui dados fixos: ela apenas renderiza o que
 * for passado pela navegação ao ser aberta (por exemplo, a partir do
 * TouchableOpacity do cabeçalho no SocialFeed.tsx).
 *
 * Exemplo de navegação (a partir de outra tela):
 *
 *   navigation.navigate('Profile', {
 *     name: 'Maria Souza',
 *     avatarUrl: 'https://placehold.co/100x100/png?text=Eu',
 *   });
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

// Parâmetros esperados nesta tela
type Props = StaticScreenProps<{
    user: string;
    avatarUrl: string;
}>;

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

const Profile = ({ route }: Props) => {
    const { user, avatarUrl } = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                </View>

                <Text style={styles.name}>{user}</Text>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nome</Text>
                        <Text style={styles.infoValue}>{user}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ---------------------------------------------------------------------------
// Estilos
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
    },
    avatarWrapper: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        borderRadius: 75,
        marginBottom: 16,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#DDD',
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#222',
        marginBottom: 24,
    },
    infoCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: '#888',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
});

export default Profile;
