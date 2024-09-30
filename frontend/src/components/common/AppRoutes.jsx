import { Routes, Route } from "react-router-dom"
import HomePage from "../../pages/home/HomePage"
import Sidebar from "./Sidebar"
import NotificationPage from "../../pages/notifications/NotificationPage"

const AppRoutes = () => {
  return (
    <>
    <Sidebar/>
    <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/notifications" element={<NotificationPage/>}/>
    </Routes>
    </>
  )
}

export default AppRoutes