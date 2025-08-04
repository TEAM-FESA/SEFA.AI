import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type cardContent = {
    materia: string;
};

export function ThemeCard(props: cardContent) {

    return (
        <View style={styles.cardContainer}>
            <Pressable style={styles.card}>
                <Text>{props.materia}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer:{
        display: 'flex',
        flexDirection: 'column',
        width: 140,
        height: 120,
        marginRight: 30,
        marginTop: 20,
        backgroundColor: '#000',
        transform: 'rotate(-10deg)',
        borderBottomLeftRadius: 70,
        borderTopRightRadius: 70,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    },
    card:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 120,
        marginLeft: 15,
        backgroundColor: '#FEC20A',
        transform: 'rotate(10deg)', 
        borderBottomLeftRadius: 70,
        borderTopRightRadius: 70,
        borderColor: 'black',
        borderWidth: 3,
    }
  });
