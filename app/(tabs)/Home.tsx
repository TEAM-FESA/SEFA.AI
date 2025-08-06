/**
 * SEFA.AI - Home Dashboard Component
 * 
 * Main dashboard screen showing personalized learning content and user progress.
 * Features:
 * - Personalized greeting with user's name from profile
 * - Notification system for educational updates
 * - Study schedule cards and recommendations
 * - Subject theme cards for quick navigation
 * - Progress tracking and learning analytics
 * - Integration with user profile and preferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Schedule } from "@/components/ShceduleCard";
import { ThemeCard } from "@/components/ThemeCard";


export default function Home() {
  // State for notification panel visibility
  const [notifications, setNotifications] = useState(false);
  
  // User's name loaded from profile for personalized greeting
  const [userName, setUserName] = useState('User');

  /**
   * Load user profile data on component mount
   * Retrieves the user's name for personalized dashboard experience
   */
  useEffect(() => {
    async function loadUserName() {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          setUserName(profile.name || 'User');
        }
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    }
    
    loadUserName();
  }, []);

  /**
   * Toggle notification panel visibility
   * Controls the display of educational notifications and updates
   */
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
      {/* Header section with user profile and notifications */}
      <View style={styles.perfilInfos}>
        {/* User profile picture */}
        <View style={styles.outerBorder}>
          <Image source={require("@/assets/images/user.png")} style={styles.userIcon} />
        </View>
        
        {/* Personalized greeting with user's name */}
        <View style={styles.userText}>
          <Text style={styles.nameUser}>Hello <Text style={styles.name}>{userName}</Text></Text>
          <Text style={styles.nameUser}>Welcome!</Text>
        </View>
        
        {/* Notification bell with badge */}
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
      {/* Notification panel modal overlay */}
      {notifications ? (
        <View style={styles.notificationsContainer}>
          <Pressable 
            style={styles.overlay}
            onPress={() => openNotifications()}
            activeOpacity={1}
          />
          <View style={styles.notificationModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <Pressable onPress={() => openNotifications()}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <View style={styles.notificationList}>
              {/* Educational notification examples */}
              <View style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.iconText}>📚</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>New lesson available</Text>
                  <Text style={styles.notificationSubtitle}>Mathematics - Chapter 3</Text>
                  <Text style={styles.notificationTime}>2 hours ago</Text>
                </View>
              </View>
              <View style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.iconText}>🎯</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Goal achieved!</Text>
                  <Text style={styles.notificationSubtitle}>You completed 5 exercises</Text>
                  <Text style={styles.notificationTime}>1 day ago</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {/* Main dashboard content */}
      <View>
        {/* Learning goals section */}
        <Text style={styles.textCardsTit}>Goals</Text>
        <Schedule sucess={70}/>
        
        {/* Current progress section */}
        <Text style={styles.textCardsTit}>In Progress</Text>
        <View style={styles.cardsList}>
          {/* Subject theme cards for quick navigation */}
          <ThemeCard materia={'Mathematics'} />
          <ThemeCard materia={'Mathematics'} />
          <ThemeCard materia={'Mathematics'} />
          <ThemeCard materia={'Mathematics'} />
        </View>
      </View>
    </View>
  );
}

/**
 * Stylesheet for Home Dashboard
 * Modern, clean design with consistent spacing and responsive layout
 */
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
  }
});
