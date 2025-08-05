import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type Porcent = {
    sucess: number;
};


export function Schedule(props: Porcent) {

    let barSucess = props.sucess / 100;
    const widthCalculada = 290 * barSucess;


    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Your objective!</Text>
                <View style={styles.itensScheadule}>
                    <Pressable style={styles.buttonSchedule} onPress={() => console.log(barSucess)}><Text>SCHEDULE   ➔</Text></Pressable>
                    <Text style={styles.progress}>{props.sucess ? `${props.sucess}%` : '0%'}</Text>
                </View>
                <View style={styles.progressSchedule}>
                    <View style={[styles.progressScheduleF, { width: widthCalculada }]}></View>
                </View>

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
    cardTitle: {
        color: 'white',
        fontWeight: 700,
        fontSize: 22,
    },
    buttonSchedule: {
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 10,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    progressSchedule: {
        marginTop: 15,
        backgroundColor: '#FFDF7B',
        width: 290,
        height: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    progressScheduleF: {
        backgroundColor: '#C39300',
        height: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    itensScheadule: {
        display: 'flex',
        flexDirection: 'row',
        width: 280,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progress: {
        color: 'white',
        fontSize: 26,
        fontWeight: 800,
    }
});
