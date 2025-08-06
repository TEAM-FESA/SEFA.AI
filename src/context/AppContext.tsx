import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { ChatSession, Message, UserProfile } from '../types';

// State interface
interface AppState {
  user: UserProfile | null;
  currentChat: ChatSession | null;
  chatHistory: ChatSession[];
  isLoading: boolean;
  error: string | null;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> }
  | { type: 'SET_CURRENT_CHAT'; payload: ChatSession }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_CHAT_HISTORY'; payload: ChatSession[] };

// Initial state
const initialState: AppState = {
  user: null,
  currentChat: null,
  chatHistory: [],
  isLoading: false,
  error: null,
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChat: action.payload };
    
    case 'ADD_MESSAGE':
      if (!state.currentChat) return state;
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, action.payload],
          updatedAt: new Date(),
        },
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'LOAD_CHAT_HISTORY':
      return { ...state, chatHistory: action.payload };
    
    default:
      return state;
  }
}

// Context interface
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loadUserProfile: () => Promise<void>;
  saveUserProfile: (profile: UserProfile) => Promise<void>;
  loadChatHistory: () => Promise<void>;
  saveChatHistory: (chats: ChatSession[]) => Promise<void>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user profile from AsyncStorage
  const loadUserProfile = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const userProfile = await AsyncStorage.getItem('userProfile');
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        dispatch({ type: 'SET_USER', payload: profile });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load user profile' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Save user profile to AsyncStorage
  const saveUserProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      dispatch({ type: 'SET_USER', payload: profile });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save user profile' });
    }
  };

  // Load chat history from AsyncStorage
  const loadChatHistory = async () => {
    try {
      const chatHistory = await AsyncStorage.getItem('chatHistory');
      if (chatHistory) {
        const chats = JSON.parse(chatHistory);
        dispatch({ type: 'LOAD_CHAT_HISTORY', payload: chats });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load chat history' });
    }
  };

  // Save chat history to AsyncStorage
  const saveChatHistory = async (chats: ChatSession[]) => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(chats));
      dispatch({ type: 'LOAD_CHAT_HISTORY', payload: chats });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save chat history' });
    }
  };

  const value: AppContextType = {
    state,
    dispatch,
    loadUserProfile,
    saveUserProfile,
    loadChatHistory,
    saveChatHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 