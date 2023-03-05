import { useAuth0 } from '@auth0/auth0-react';
import { createUser } from '../../helper/createUser';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/action';
import { useEffect } from 'react';

export const useLogin = () => {

    const { loginWithRedirect, user, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()

    const loginUser = () => {
        loginWithRedirect()
    }

    const saveNewUser = async () => {

        if (user?.email && user?.picture && user?.nickname) {

            const newUser = {
                username: user.nickname,
                email: user.email,
                picture: user.picture
            }

            dispatch(await userLogin(newUser))
        }
    }   

    useEffect( ()=> {
        saveNewUser()
    }, [isAuthenticated])

  return {
    loginUser,
    saveNewUser
  }
}
