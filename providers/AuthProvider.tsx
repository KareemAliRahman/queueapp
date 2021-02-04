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
    loginUser: () => void,
    logout: () => void
}>({
    user: null,
    loginUser: () => {},
    logout: () => {}
});


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ user, setAppUser ] = React.useState<User>(null);

    return(
        <AuthContext.Provider value={{
            user,
            loginUser: () => {

                const user = { firstName: 'kareem', lastName: 'Ali'
                , email: "kareem@ali.com" , id: "1"};
                setAppUser(user);
                AsyncStorage.removeItem('doctor');
                AsyncStorage.setItem('user', JSON.stringify(user));

            },
            logout: () => {
                setAppUser(null);
                AsyncStorage.removeItem('user');
                AsyncStorage.removeItem('doctor');
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}