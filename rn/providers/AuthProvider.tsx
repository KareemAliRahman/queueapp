import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpLogin, httpLogout, httpToken } from '../api/api';

interface AuthProviderProps{}
type User = null | {
  email: string,
  refreshToken: string 
}

export const AuthContext = React.createContext<{
    user: User,
    login: (email: string, password: string) => void,
    authenticate: () => void,
    logout: () => void,
    accessToken: string 
}>({
    user: null,
    login: () => {},
    authenticate: () => {},
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
                AsyncStorage.removeItem('user');
                AsyncStorage.setItem('user', JSON.stringify(user));
            },
            authenticate: async () => {
                const storedUser = await AsyncStorage.getItem('user');
                if(storedUser){
                    const user : User = JSON.parse(storedUser);
                    const refreshToken = user?.refreshToken;
                    const email = user?.email;
                    try{
                        const response = await httpToken(refreshToken);
                        const accessToken = response.parsedBody?.accessToken;
                        setAccessToken(accessToken);
                        setUser({email: email, refreshToken: refreshToken});
                    }catch(error){
                        setUser(null);
                        const storedUser = await AsyncStorage.getItem('user');
                        AsyncStorage.removeItem('user');
                        if(storedUser){
                            const user : User = JSON.parse(storedUser);
                            const refreshToken = user?.refreshToken;
                            httpLogout(refreshToken);
                        }
                        return;
                    }
                }
            },
            logout: async () => {
                setUser(null);
                const storedUser = await AsyncStorage.getItem('user');
                AsyncStorage.removeItem('user');
                if(storedUser){
                    const user : User = JSON.parse(storedUser);
                    const refreshToken = user?.refreshToken;
                    httpLogout(refreshToken);
                }
            },
            accessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}