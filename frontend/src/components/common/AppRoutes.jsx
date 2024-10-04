import { Routes, Route } from "react-router-dom"
import HomePage from "../../pages/home/HomePage"
import Sidebar from "./Sidebar"
import NotificationPage from "../../pages/notifications/NotificationPage"
import ProfilePage from "../../pages/profile/ProfilePage"
import RightPanel from "./RightPanel"

const AppRoutes = () => {
  return (
    <>
    <Sidebar/>
    <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/notifications" element={<NotificationPage/>}/>
        <Route path='/profile/:username' element={<ProfilePage/>}/>
    </Routes>
    <RightPanel/>
    </>
  )
}

export default AppRoutes