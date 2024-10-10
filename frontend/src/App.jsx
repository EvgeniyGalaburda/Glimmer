import {Routes,  Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignUpPage from './pages/auth/signup/SignUpPage.jsx'
import AppRoutes from './components/common/AppRoutes.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner.jsx'

function App() {
  const {data, isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();

        if(data.error) return null;
        if(!res.ok) throw new Error(data.error);
        else return data
      } catch (error) {
        toast.error(error.message);
      }
    }, retry: false
  })

  if(isLoading){
    return <div className='h-screen flex justify-center items-center'>
      <LoadingSpinner size='lg'/>
    </div>
  }

  return (
    <div className='bg-base-200'>
    <div className='flex max-w-7xl mx-auto'>
      <Routes>
        <Route path='/*' element={data ? <AppRoutes/>: <Navigate to='/login'/>}/>
        <Route path='/login' element={!data ? <LoginPage/>: <Navigate to='/'/>}/>
        <Route path='/signup' element={!data ? <SignUpPage/> : <Navigate to='/'/>}/>
      </Routes>
      <Toaster/>
    </div>
    </div>
  )
}

export default App
