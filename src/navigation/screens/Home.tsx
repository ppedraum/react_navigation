import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
/**
 * SocialFeed.tsx
 *
 * Simulação (somente front-end) de um feed de publicações de uma rede social.
 * Todo o código está contido neste único arquivo, conforme solicitado.
 *
 * Dependências necessárias no projeto (React Native / Expo):
 *   npm install react-native-vector-icons
 *   (ou, em projetos Expo: expo install @expo/vector-icons e trocar o import
 *    para: import MaterialIcons from '@expo/vector-icons/MaterialIcons';)
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

interface Post {
    id: string;
    authorName: string;
    authorAvatar: string;
    imageUrl: string;
    caption: string;
    likes: number;
    dislikes: number;
    userReaction: 'like' | 'dislike' | null;
}

interface LoggedUser {
    name: string;
    avatarUrl: string;
}

// ---------------------------------------------------------------------------
// Dados mockados (simulação de back-end)
// ---------------------------------------------------------------------------

const LOGGED_USER: LoggedUser = {
    name: 'Maria Souza',
    avatarUrl: 'https://placehold.co/100x100/png?text=Eu',
};

const INITIAL_POSTS: Post[] = [
    {
        id: '1',
        authorName: 'João Pedro',
        authorAvatar: 'https://placehold.co/50x50/png?text=JP',
        imageUrl: 'https://placehold.co/600x400/png?text=Publicacao+1',
        caption: 'Curtindo o fim de semana! ☀️',
        likes: 24,
        dislikes: 1,
        userReaction: null,
    },
    {
        id: '2',
        authorName: 'Ana Clara',
        authorAvatar: 'https://placehold.co/50x50/png?text=AC',
        imageUrl: 'https://placehold.co/600x400/png?text=Publicacao+2',
        caption: 'Novo projeto finalizado hoje 🚀',
        likes: 58,
        dislikes: 3,
        userReaction: null,
    },
    {
        id: '3',
        authorName: 'Carlos Lima',
        authorAvatar: 'https://placehold.co/50x50/png?text=CL',
        imageUrl: 'https://placehold.co/600x400/png?text=Publicacao+3',
        caption: 'Viagem incrível pela serra 🏞️',
        likes: 12,
        dislikes: 0,
        userReaction: null,
    },
];

// ---------------------------------------------------------------------------
// Componente: Cabeçalho com usuário logado
// ---------------------------------------------------------------------------

interface LoggedUserHeaderProps {
    user: LoggedUser;
    onPress: () => void;
}

const LoggedUserHeader: React.FC<LoggedUserHeaderProps> = ({
    user,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.headerContainer}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Image
                source={{ uri: user.avatarUrl }}
                style={styles.headerAvatar}
            />
            <Text style={styles.headerUserName}>{user.name}</Text>
            <MaterialIcons
                name="chevron-right"
                size={24}
                color="#888"
                style={styles.headerChevron}
            />
        </TouchableOpacity>
    );
};

// ---------------------------------------------------------------------------
// Componente: Card de publicação
// ---------------------------------------------------------------------------

interface PostCardProps {
    post: Post;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onDislike }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image
                    source={{ uri: post.authorAvatar }}
                    style={styles.cardAvatar}
                />
                <Text style={styles.cardAuthorName}>{post.authorName}</Text>
            </View>

            <Image source={{ uri: post.imageUrl }} style={styles.cardImage} />

            <Text style={styles.cardCaption}>{post.caption}</Text>

            <View style={styles.reactionsRow}>
                <TouchableOpacity
                    style={styles.reactionButton}
                    activeOpacity={0.6}
                    onPress={() => onLike(post.id)}
                >
                    <MaterialIcons
                        name="thumb-up"
                        size={22}
                        color={
                            post.userReaction === 'like' ? '#1877F2' : '#555'
                        }
                    />
                    <Text
                        style={[
                            styles.reactionCount,
                            post.userReaction === 'like' &&
                                styles.reactionCountActiveLike,
                        ]}
                    >
                        {post.likes}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.reactionButton}
                    activeOpacity={0.6}
                    onPress={() => onDislike(post.id)}
                >
                    <MaterialIcons
                        name="thumb-down"
                        size={22}
                        color={
                            post.userReaction === 'dislike' ? '#E0245E' : '#555'
                        }
                    />
                    <Text
                        style={[
                            styles.reactionCount,
                            post.userReaction === 'dislike' &&
                                styles.reactionCountActiveDislike,
                        ]}
                    >
                        {post.dislikes}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// ---------------------------------------------------------------------------
// Componente principal: Feed
// ---------------------------------------------------------------------------

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

    const handleLike = (id: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id !== id) return post;

                // Já estava com like -> remove o like (toggle)
                if (post.userReaction === 'like') {
                    return {
                        ...post,
                        likes: post.likes - 1,
                        userReaction: null,
                    };
                }

                // Estava com dislike -> remove dislike e adiciona like
                if (post.userReaction === 'dislike') {
                    return {
                        ...post,
                        likes: post.likes + 1,
                        dislikes: post.dislikes - 1,
                        userReaction: 'like',
                    };
                }

                // Não tinha reação -> adiciona like
                return { ...post, likes: post.likes + 1, userReaction: 'like' };
            }),
        );
    };

    const handleDislike = (id: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id !== id) return post;

                // Já estava com dislike -> remove o dislike (toggle)
                if (post.userReaction === 'dislike') {
                    return {
                        ...post,
                        dislikes: post.dislikes - 1,
                        userReaction: null,
                    };
                }

                // Estava com like -> remove like e adiciona dislike
                if (post.userReaction === 'like') {
                    return {
                        ...post,
                        dislikes: post.dislikes + 1,
                        likes: post.likes - 1,
                        userReaction: 'dislike',
                    };
                }

                // Não tinha reação -> adiciona dislike
                return {
                    ...post,
                    dislikes: post.dislikes + 1,
                    userReaction: 'dislike',
                };
            }),
        );
    };

    const navigation = useNavigation();

    const handleProfilePress = () => {
        navigation.navigate('Profile', {
            user: LOGGED_USER.name,
            avatarUrl: LOGGED_USER.avatarUrl,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            <LoggedUserHeader user={LOGGED_USER} onPress={handleProfilePress} />
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard
                        post={item}
                        onLike={handleLike}
                        onDislike={handleDislike}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
        backgroundColor: '#DDD',
    },
    headerUserName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    headerChevron: {
        marginLeft: 4,
    },
    listContent: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    cardAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
        backgroundColor: '#DDD',
    },
    cardAuthorName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    cardImage: {
        width: '100%',
        height: 220,
        backgroundColor: '#EEE',
    },
    cardCaption: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    reactionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 4,
    },
    reactionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    reactionCount: {
        marginLeft: 6,
        fontSize: 14,
        color: '#555',
    },
    reactionCountActiveLike: {
        color: '#1877F2',
        fontWeight: '600',
    },
    reactionCountActiveDislike: {
        color: '#E0245E',
        fontWeight: '600',
    },
});

export default Home;
