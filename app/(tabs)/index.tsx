// app/(tabs)/index.tsx - CHAT PRINCIPAL SEFA.AI
import React, { useRef, useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';



export default function ChatScreen() {


  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Dados de exemplo para os cards
  const cardData = [
    { id: '1', title: 'Sun', content: 'Conteúdo do card 1' },
    { id: '2', title: 'Mon', content: 'Conteúdo do card 2' },
    { id: '3', title: 'Tue', content: 'Conteúdo do card 3' },
    { id: '4', title: 'Wed', content: 'Conteúdo do card 4' },
    { id: '5', title: 'Thurs', content: 'Conteúdo do card 4' },
    { id: '6', title: 'Fri', content: 'Conteúdo do card 4' },
    { id: '7', title: 'Sat', content: 'Conteúdo do card 4' }
  ];

  const renderItem = ({ item }) => (
    <View style={item['id']==1?styles.firstCard:styles.card}>
      <Text style={item['id']==1?styles.firstCardTitle:styles.cardTitle}>{item.title}</Text>
    </View>
  );

  const scrollToIndex = (index) => {
    if (index >= 0 && index < cardData.length) {
      flatListRef.current?.scrollToIndex({ animated: true, index });
      setCurrentIndex(index);
    }
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titStyle}>
          <View style={styles.titInterStyle}>
            <Text style={styles.textStyle}>Tasks</Text>
          </View>
        </View>

        <View style={styles.containerCarrosel}>
          <Text>Days</Text>
          {/* Carrossel */}
          <FlatList
            ref={flatListRef}
            data={cardData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / 800
              );
              setCurrentIndex(newIndex);
            }}
            style={styles.carousel}
          />
        </View>

        <View style={styles.schedulesContainer}>
          <Text>Set your schedules</Text>
          <View style={styles.schedulesArea}>
            <Pressable style={styles.addTask}>
            <Text style={styles.addTaskIcon}>+</Text>
            </Pressable>
            <Text>Add Task</Text>
          </View>
        </View>
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titStyle: {
    marginTop: 50,
    backgroundColor: '#000',
    width: 130,
    height: 60,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    transform: 'rotate(-5deg)',
    marginLeft: -35,
  },
  titInterStyle: {
    display: 'flex',
    marginTop: -3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEC20A',
    width: 150,
    height: 60,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    transform: 'rotate(5deg)',
    marginLeft: 15,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 700
  },
  carousel: {
    display: 'flex',
    flexDirection: 'row',
    width: 350,
    marginTop: 10,
    borderRightColor: '#333',
    borderRightWidth: 1,
    borderLeftColor: '#333',
    borderLeftWidth: 1,
  },
  card: {
    backgroundColor: '#FEC20A',
    marginRight: 2.5,
    marginLeft: 2.5,
    height: 100,
    width: 120,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: '#000',
    borderWidth: 3,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  containerCarrosel:{
    marginTop: 30,
    height: 132,
  },
  cardTitle:{
    fontSize: 18,
    fontWeight: 500,
  },
  firstCardTitle:{
    fontSize: 18,
    fontWeight: 500,
    color:'#fff',
  },
  firstCard:{
    backgroundColor: '#000',
    marginRight: 2.5,
    marginLeft: 2.5,
    height: 100,
    width: 120,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: '#000',
    borderWidth: 3,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  schedulesContainer:{
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    textAlign: 'left',
    justifyContent: 'flex-start',
    width: 350,
    marginTop: 35,
  },
  schedulesArea:{
    backgroundColor:'#FEC20A',
    width: 350,
    height: 350,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderColor: '#000',
    borderWidth: 3,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addTaskIcon:{
    fontSize: 32,
    color: '#fff',
  },
  addTask:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:50,
    height: 55,
    backgroundColor: '#000',
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }

});
