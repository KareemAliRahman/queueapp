import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps{}
type User = null | {
  firstName : string,
  lastName : string,
  id: string,
  email: string,
}

export const AuthContext = React.createContext<{
    user: User,
    login: () => void,
    logout: () => void
}>({
    user: null,
    login: () => {},
    logout: () => {}
});


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ user, setUser ] = React.useState<User>(null);

    return(
        <AuthContext.Provider value={{
            user,
            login: () => {

                const user = { firstName: 'kareem', lastName: 'Ali'
                , email: "kareem@ali.com" , id: "1"};
                setUser(user);
                AsyncStorage.setItem('user', JSON.stringify(user));

            },
            logout: () => {
                setUser(null);
                AsyncStorage.removeItem('user');
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}