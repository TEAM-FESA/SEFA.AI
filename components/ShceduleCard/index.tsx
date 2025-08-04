import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type Porcent = {
    sucess: string;
};

export function Schedule() {

    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Your objective!</Text>
                <View>
                    <Pressable style={styles.buttonSchedule}><Text>SCHEDULE</Text></Pressable>
                </View>
                <View style={styles.progressSchedule}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 250,
        height: 150,
        marginRight: 30,
        marginLeft: 40,
        marginTop: 20,
        backgroundColor: '#000',
        transform: 'rotate(-5deg)',
        borderBottomLeftRadius: 70,
        borderTopRightRadius: 70,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 330,
        height: 150,
        paddingLeft: 20,
        paddingTop: 20,
        marginLeft: 15,
        backgroundColor: '#FEC20A',
        transform: 'rotate(5deg)',
        borderColor: 'black',
        borderWidth: 3,
        borderBottomLeftRadius: 70,
        borderTopRightRadius: 70
    },
    cardTitle:{
        color: 'white',
        fontWeight: 700,
        fontSize: 22,
    },
    buttonSchedule:{
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 50,
        paddingLeft: 20,
        marginTop: 10,
    },
    progressSchedule:{
        marginTop: 15,
        backgroundColor:'#FFDF7B',
        width: 290,
        height: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
    }
});
