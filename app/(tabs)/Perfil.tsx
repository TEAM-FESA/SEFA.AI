import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

export default function Perfil() {

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
        <Pressable
          onPress={() => openNotifications()}
          style={styles.notificationButton}
          activeOpacity={0.7}
        >
          <View style={styles.outerBorder}>
            <View style={styles.bellContainer}>
              <Text style={styles.bellIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
      {notifications ? (
        <View style={styles.notificationsContainer}>
          <Pressable
            style={styles.overlay}
            onPress={() => openNotifications()}
            activeOpacity={1}
          />
          <View style={styles.notificationModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notificações</Text>
              <Pressable onPress={() => openNotifications()}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <View style={styles.notificationList}>
              <View style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.iconText}>📚</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Nova lição disponível</Text>
                  <Text style={styles.notificationSubtitle}>Matemática - Capítulo 3</Text>
                  <Text style={styles.notificationTime}>Há 2 horas</Text>
                </View>
              </View>
              <View style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.iconText}>🎯</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Meta alcançada!</Text>
                  <Text style={styles.notificationSubtitle}>Você completou 5 exercícios</Text>
                  <Text style={styles.notificationTime}>Há 1 dia</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.contentCards}>
        <View style={styles.cardsBack}>
          <Pressable style={styles.card}>
            <Image source={require("@/assets/images/ic.png")} style={[styles.icon, {
              width: 65,
              height: 65,
            }]}></Image>
            <Text style={styles.textCard}>Dados</Text>
          </Pressable>
        </View>
        <View style={styles.cardsBack}>
          <Pressable style={styles.card}>
            <Image source={require("@/assets/images/config.png")} style={[styles.icon, {
              width: 65,
              height: 65,
            }]}></Image>
            <Text style={styles.textCard}>Config</Text>
          </Pressable>
        </View>
        <View style={styles.cardsBack}>
          <Pressable style={styles.card}>
            <Image source={require("@/assets/images/infos.png")} style={[styles.icon, {
              width: 65,
              height: 65,
            }]}></Image>
            <Text style={styles.textCard}>App infos</Text>
          </Pressable>
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
  bellContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  bellIcon: {
    fontSize: 24,
    color: '#000',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationButton: {
    zIndex: 10,
  },
  outerBorder: {
    borderRadius: 200,
    borderWidth: 4,
    borderColor: '#000000', // Borda preta externa
    backgroundColor: '#FEC20A', // Background amarelo
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  notificationModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    width: '95%',
    maxHeight: '80%',
    marginTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  notificationIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FEC20A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 3,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
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
  },


  contentCards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    gap: 30,
  },
  cardsBack:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    height: 130,
    backgroundColor: '#000',
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    transform: 'rotate(-5deg)',
    marginLeft: -15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    height: 130,
    backgroundColor: '#FEC20A',
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: '#000',
    borderWidth: 3,
    transform: 'rotate(5deg)',
    marginLeft: 15,
    marginTop: -15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textCard: {
    fontSize: 26,
    fontWeight: 500,
    marginLeft: 40,
  },
  icon: {
    marginLeft: 50,
  }
});
