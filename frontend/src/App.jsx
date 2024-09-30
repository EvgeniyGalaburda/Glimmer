import {Routes,  Route } from 'react-router-dom'
import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignUpPage from './pages/auth/signup/SignUpPage.jsx'
import AppRoutes from './components/common/AppRoutes.jsx'

function App() {

  return (
    <div className='bg-base-200 scrollbar-none'>
    <div className='flex max-w-7xl mx-auto'>
      <Routes>
        <Route path='/*' element={<AppRoutes/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App
