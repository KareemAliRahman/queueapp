import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpLogin } from '../api/api';
import { acc } from 'react-native-reanimated';

interface AuthProviderProps{}
type User = null | {
  email: string,
  refreshToken: string | undefined
}

export const AuthContext = React.createContext<{
    user: User,
    login: (email: string, password: string) => void,
    logout: () => void,
    accessToken: string 
}>({
    user: null,
    login: () => {},
    logout: () => {},
    accessToken: ""
});


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ user, setUser ] = React.useState<User>(null);
    const [ accessToken, setAccessToken ] = React.useState<string>("");

    return(
        <AuthContext.Provider value={{
            user,
            login: async (email: string, password: string) => {
                const response = await httpLogin(email,password);
                const accessToken = response.parsedBody?.accessToken; 
                const refreshToken = response.parsedBody?.refreshToken;
                const user = { email: email, refreshToken: refreshToken};
                accessToken && setAccessToken(accessToken);
                setUser(user);
                AsyncStorage.setItem('user', JSON.stringify(user));
            },
            logout: () => {
                setUser(null);
                AsyncStorage.removeItem('user');
            },
            accessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}