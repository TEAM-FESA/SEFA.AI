import { Image } from "expo-image";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Schedule } from "@/components/ShceduleCard";
import { ThemeCard } from "@/components/ThemeCard";


export default function Home() {
  const [notifications, setNotifications] = useState(false);

  const openNotifications = () => {
    if (notifications) {
      setNotifications(false)
    }
    else {
      setNotifications(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.perfilInfos}>
        <View style={styles.outerBorder}>
          <Image source={require("@/assets/images/user.png")} style={styles.userIcon} />
        </View>
        <View style={styles.userText}>
          <Text style={styles.nameUser}>Hello <Text style={styles.name}>Franklin</Text></Text>
          <Text style={styles.nameUser}>Welcome!</Text>
        </View>
        <Pressable onPress={() => openNotifications()}>
          <View style={styles.outerBorder}>
            <Image source={require("@/assets/images/alert.png")} style={styles.notifications} />
          </View>
        </Pressable>
      </View>
      {notifications ? (
        <Pressable style={styles.notificationsContainer} onPress={() => openNotifications()}>
          <Text style={styles.textContainer}> NOTIFICAÇÕES </Text>
        </Pressable>
      ) :
        <>
        </>
      }
      <View>
        <Text style={styles.textCardsTit}>Goals</Text>
        <Schedule sucess={70}/>
        <Text style={styles.textCardsTit}>In Progress</Text>
        <View style={styles.cardsList}>
          <ThemeCard materia={'Mathematics'} />
          <ThemeCard materia={'Mathematics'} />
          <ThemeCard materia={'Mathematics'} />
          <ThemeCard materia={'Mathematics'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  perfilInfos: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FEC20A',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 65,
    paddingBottom: 25,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  userIcon: {
    height: 78,
    width: 78,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: '#FFFFFF', // Borda branca interna
  },
  notifications: {
    height: 38,
    width: 38,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'white',
    padding: 5,
  },
  outerBorder: {
    borderRadius: 200,
    borderWidth: 4,
    borderColor: '#000000', // Borda preta externa
  },
  userText: {
    display: 'flex',
    flexDirection: 'column'
  },
  nameUser: {
    marginLeft: -25,
    marginRight: 25,
    fontSize: 20,
  },
  name: {
    fontWeight: 700,
  },
  notificationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 900,
    width: 420,
    zIndex: 50,
  },
  textContainer: {
    fontSize: 28,
    fontWeight: 700,
    color: '#fff',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingLeft: 40,
    flex: 1,
  },
  textCardsTit: {
    marginTop: 20,
    paddingTop: 0,
    paddingLeft: 40,
  }
});
