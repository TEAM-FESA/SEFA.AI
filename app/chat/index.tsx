// app/(tabs)/Chat.tsx - CHAT SEFA.AI
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! What is your name?',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Lula',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'How old are you?',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '4',
      text: '15',
      isUser: true,
      timestamp: new Date(),
    },
    {
        id: '5',
        text: 'Type continue to go to the home screen',
        isUser: false,
        timestamp: new Date(),
      },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    if(inputText.trim() == 'Continue'){
        router.replace('/(tabs)/Home');
    }
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simula resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      'That\'s interesting! Tell me more about that.',
      'I understand. How can I help you with that?',
      'Great! Let\'s explore this topic together.',
      'I see. What would you like to learn about?',
      'Perfect! I can help you with that.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      {!item.isUser && (
        <View style={styles.aiAvatar}>
          <Image 
            source={require('../../assets/images/toucan.png')}
            style={styles.avatarImage}
          />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser ? styles.userMessageText : styles.aiMessageText
        ]}>
          {item.text}
        </Text>
      </View>
      {item.isUser && (
        <View style={styles.userAvatar}>
          <View style={styles.userAvatarCircle}>
            <Text style={styles.userAvatarText}>U</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <TouchableOpacity 
            style={styles.chatButtonContainer}
            onPress={() => {
              console.log('Botão Chat pressionado');
              router.push('/(tabs)/Home');
            }}
            activeOpacity={0.7}
          >
            <View style={styles.chatButtonShadow} />
            <View style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Introduction</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Input - Mantendo o original */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua pergunta..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Image 
            source={require("@/assets/images/send.png")} 
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  headerCenter: {
    alignItems: 'center',
  },

  chatButtonContainer: {
    position: 'relative',
    zIndex: 10,
  },
  chatButtonShadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 0,
    bottom: 0,
    backgroundColor: '#FEC20A',
    borderRadius: 8,
    zIndex: 1,
  },
  chatButton: {
    backgroundColor: '#FEC20A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 3,
    position: 'relative',
  },
  chatButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    
  },

  divider: {
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 20,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 25,
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#FEC20A',
    marginLeft: 8,
  },
  userBubble: {
    backgroundColor: '#000',
    marginRight: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#000',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEC20A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarImage: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  userAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent:'center',
    marginBottom: 15,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingRight: 50,
    fontSize: 16,
    maxHeight: 60,
  },
  sendButton: {
    backgroundColor: '#FEC20A',
    width: 36,
    height: 36,
    borderRadius: 18,
    position: 'absolute',
    right: 25,
    top: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#FEC20A',
  },
  sendIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
  },
});
