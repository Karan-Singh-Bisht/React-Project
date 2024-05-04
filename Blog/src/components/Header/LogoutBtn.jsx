import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth_service'
import { logout } from '../../store/features/auth/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then( () => {
            dispatch(logout());
        }) ;  //authService is a promise.
    }

  return (
    <button onClick={logoutHandler} className='px-3 py-2 rounded-md text-white bg-red-400'>Logout</button>
  )
}

export default LogoutBtn;