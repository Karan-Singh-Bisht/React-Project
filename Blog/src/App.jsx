import { useCallback, useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import './App.css'
import authService from './appWrite/auth_service';
import {login,logout} from './store/features/auth/authSlice';
import Loading from './components/loading/Loading';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {    //authService se current User ka data nikala phir usse dispatch kiya.
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  },[]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap justify-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):<Loading/>;
}

export default App
