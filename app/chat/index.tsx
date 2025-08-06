/**
 * SEFA.AI - Onboarding Chat Screen Component
 * 
 * This screen handles the initial user onboarding through an interactive chat.
 * Features:
 * - Step-by-step profile creation through conversational interface
 * - Collects user name, age, learning difficulties, schedule, and subject preferences
 * - Dynamic AI responses with educational focus
 * - Personalized avatar showing user's first initial
 * - Automatic navigation to dashboard after profile completion
 * - Enhanced AI chat with context-aware responses
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Message interface for chat system
 * Defines the structure of each message in the conversation
 */
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  // State management for onboarding flow progression
  const [onboardingStep, setOnboardingStep] = useState(0);
  
  /**
   * Onboarding questions for user profile creation
   * These questions collect essential information for personalizing the AI experience
   */
  const onboardingQuestions = useMemo(() => [
    { key: 'name', text: 'Hello! I\'m your educational AI assistant. What\'s your name?' },
    { key: 'age', text: 'Nice to meet you! How old are you? This helps me personalize your learning experience.' },
    { key: 'difficulty', text: 'Which subject do you find most challenging? (Mathematics, Portuguese, History, Geography)' },
    { key: 'schedule', text: 'What times do you usually have available for studying? (Morning, Afternoon, Evening)' },
    { key: 'subjects', text: 'Which subjects would you like to focus on? (Mathematics, Portuguese, History, Geography)' },
  ], []);
  
  // User profile data collected during onboarding
  const [userProfile, setUserProfile] = useState({});
  
  // User's name for personalized avatar display
  const [userName, setUserName] = useState('User');
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
  // Current input text in the chat field
  const [inputText, setInputText] = useState('');

  /**
   * Main message sending function
   * Handles both onboarding flow and general chat interactions
   */
  const sendMessage = async () => {
    // Don't send empty messages
    if (!inputText.trim()) return;
    
    // Onboarding flow: collect user profile information step by step
    if (onboardingStep < onboardingQuestions.length) {
      const key = onboardingQuestions[onboardingStep].key;
      const newProfile = { ...userProfile, [key]: inputText.trim() };
      setUserProfile(newProfile);
      
      // Update userName state immediately when user provides their name
      if (key === 'name') {
        setUserName(inputText.trim() || 'User');
      }
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text: inputText, isUser: true, timestamp: new Date() },
      ]);
      setInputText('');
      setTimeout(() => {
        if (onboardingStep + 1 < onboardingQuestions.length) {
          setMessages(prev => [
            ...prev,
            { id: (Date.now() + 1).toString(), text: onboardingQuestions[onboardingStep + 1].text, isUser: false, timestamp: new Date() },
          ]);
          setOnboardingStep(onboardingStep + 1);
        } else {
          // End of onboarding: save profile and go to dashboard
          AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
          setMessages(prev => [
            ...prev,
            { id: (Date.now() + 2).toString(), text: 'Perfect! Your profile is created. Welcome to SEFA.AI - your personal educational assistant!', isUser: false, timestamp: new Date() },
          ]);
          setTimeout(() => {
            router.replace('/(tabs)/Home');
          }, 1500);
        }
      }, 800);
      return;
    }
    if(inputText.trim() === 'Continue'){
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

  /**
   * AI Response Generation System
   * 
   * This function analyzes user input and provides contextually appropriate
   * educational responses. It uses keyword detection to identify topics and
   * responds with relevant, encouraging, and educational content.
   * 
   * @param userInput - The user's message text
   * @returns A contextually appropriate AI response
   */
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Subject-specific educational responses based on keyword detection
    if (input.includes('math') || input.includes('mathematics') || input.includes('calculate')) {
      const mathResponses = [
        'Great question about mathematics! Let me help you understand this concept.',
        'Mathematics can be challenging, but let\'s break this down step by step.',
        'I love math questions! This is a perfect opportunity to practice.',
        'Let\'s solve this mathematical problem together. What specific area are you working on?',
        'Mathematics is all about patterns and logic. What concept are you studying?'
      ];
      return mathResponses[Math.floor(Math.random() * mathResponses.length)];
    }
    
    if (input.includes('history') || input.includes('historical')) {
      const historyResponses = [
        'History is fascinating! Let\'s explore this historical period together.',
        'Understanding history helps us learn from the past. What era are you studying?',
        'History is full of amazing stories and lessons. What specific event interests you?',
        'Let\'s dive into this historical topic. History connects us to our past.',
        'Historical knowledge is crucial for understanding our world today.'
      ];
      return historyResponses[Math.floor(Math.random() * historyResponses.length)];
    }
    
    if (input.includes('geography') || input.includes('geographic') || input.includes('country') || input.includes('place')) {
      const geographyResponses = [
        'Geography helps us understand our world! What region are you studying?',
        'The world is full of amazing places and cultures. Let\'s explore together.',
        'Geography connects people, places, and environments. What fascinates you?',
        'Understanding geography helps us appreciate our planet\'s diversity.',
        'Let\'s discover the world through geography. What area interests you?'
      ];
      return geographyResponses[Math.floor(Math.random() * geographyResponses.length)];
    }
    
    if (input.includes('portuguese') || input.includes('language') || input.includes('grammar') || input.includes('write')) {
      const languageResponses = [
        'Language is the key to communication! Let\'s improve your Portuguese skills.',
        'Writing and grammar are essential skills. What aspect are you working on?',
        'Language connects us all. Let\'s practice your Portuguese together.',
        'Good communication skills are valuable in life. What would you like to practice?',
        'Let\'s enhance your language abilities. What specific area needs attention?'
      ];
      return languageResponses[Math.floor(Math.random() * languageResponses.length)];
    }
    
    if (input.includes('help') || input.includes('difficult') || input.includes('hard')) {
      const helpResponses = [
        'I\'m here to help you learn! What specific topic is challenging you?',
        'Don\'t worry, learning takes time. Let\'s work through this together.',
        'Every challenge is an opportunity to grow. What can I help you with?',
        'I understand this might be difficult. Let\'s break it down into smaller steps.',
        'You\'re not alone in this learning journey. What would you like to focus on?'
      ];
      return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }
    
    if (input.includes('study') || input.includes('learn') || input.includes('practice')) {
      const studyResponses = [
        'Excellent! Active studying is the best way to learn. What\'s your study plan?',
        'Practice makes perfect! What subject would you like to focus on today?',
        'Learning is a lifelong journey. What new concept are you exploring?',
        'Great initiative! Let\'s make your study session productive.',
        'Studying effectively is a skill. What techniques work best for you?'
      ];
      return studyResponses[Math.floor(Math.random() * studyResponses.length)];
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      const greetingResponses = [
        'Hello! I\'m your educational AI assistant. How can I help you learn today?',
        'Hi there! Ready to explore and learn together? What subject interests you?',
        'Hey! I\'m here to support your learning journey. What would you like to study?',
        'Hello! Let\'s make learning fun and effective. What can I help you with?',
        'Hi! I\'m excited to help you learn. What topic would you like to explore?'
      ];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // General educational responses
    const generalResponses = [
      'That\'s an interesting question! Let\'s explore this topic together.',
      'Learning is a wonderful journey. What would you like to discover?',
      'I\'m here to help you succeed in your studies. What can we work on?',
      'Every question is a step toward knowledge. What interests you?',
      'Let\'s make learning engaging and effective. What subject are you studying?',
      'I love your curiosity! What would you like to learn about today?',
      'Education opens doors to new possibilities. What door would you like to open?',
      'Your learning journey is unique. How can I support you today?'
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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
            <Text style={styles.userAvatarText}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      )}
    </View>
  );

  // On mount, start onboarding if no saved profile
  React.useEffect(() => {
    (async () => {
      const profile = await AsyncStorage.getItem('userProfile');
      if (!profile) {
        setMessages([
          { id: 'onb1', text: onboardingQuestions[0].text, isUser: false, timestamp: new Date() },
        ]);
        setOnboardingStep(0);
      }
    })();
  }, [onboardingQuestions]);

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
          placeholder="Type your question..."
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
