import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';


export default function TabTwoScreen() {
  const screenWidth = Dimensions.get("window").width;
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    async function loadUserName() {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          setUserName(profile.name || 'User');
        }
      } catch (error) {
        console.error('Erro ao carregar nome do usuário:', error);
      }
    }
    
    loadUserName();
  }, []);

  const lineData = {
    labels: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    datasets: [
      {
        data: [50, 70, 65, 60, 40, 45, 70, 55, 50, 80, 90, 60],
        strokeWidth: 2,
      }
    ]
  };


  const barData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [30, 10, 45, 40, 55, 60] // minutos por dia
      }
    ]
  };


  return (
    <View style={styles.container}>
      <View style={styles.perfilInfos}>
        <View style={styles.outerBorder}>
          <Image source={require("@/assets/images/user.png")} style={styles.userIcon} />
        </View>
        <View style={styles.userText}>
          <Text style={styles.nameUser}>Hello <Text style={styles.name}>{userName}</Text></Text>
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

      <View style={styles.graficos}>
        <View style={styles.titDecBack}>
          <View style={{
            backgroundColor: '#000',
            marginLeft: -10,
            marginRight: 40,
            transform: 'rotate(-5deg)',
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
            <Text style={{
              backgroundColor: '#FEC20A',
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: 10,
              marginRight: -40,
              transform: 'rotate(5deg)',
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}>Points</Text>
          </View>
        </View>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={170}
          chartConfig={{
            backgroundGradientFrom: "#f0f0f0",
            backgroundGradientTo: "#f0f0f0",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(254, 194, 10, ${opacity})`,
            labelColor: () => "#000",
            propsForDots: {
              r: "2",
              strokeWidth: "4",
              stroke: '#000',
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
            alignSelf: 'center'
          }}
        />
        <View style={styles.titDecBack}>
          <View style={{
            marginTop: 20,
            backgroundColor: '#000',
            marginLeft: -10,
            marginRight: 80,
            transform: 'rotate(-5deg)',
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}>
            <Text style={{
              backgroundColor: '#FEC20A',
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: 10,
              marginRight: -80,
              transform: 'rotate(5deg)',
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}>Time in the last day</Text>
          </View>
        </View>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={170}
          yAxisSuffix="min"
          fromZero
          chartConfig={{
            backgroundGradientFrom: "#f0f0f0",
            backgroundGradientTo: "#f0f0f0",
            decimalPlaces: 0,
            color: () => `rgba(254, 194, 10, 1)`,
            labelColor: () => "#000",
            propsForBackgroundLines: {
              stroke: "#e3e3e3"
            },
            barPercentage: 0.5
          }}
          style={{
            marginVertical: 8,
            borderRadius: 10,
            alignSelf: 'center'
          }}
        />
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
  graficos: {
    paddingVertical: 40,
    gap: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleGra: {
    fontSize: 22,
    fontWeight: 300,
  },
});
