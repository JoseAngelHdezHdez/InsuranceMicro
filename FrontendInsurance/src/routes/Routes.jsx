import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// Components
// import Home from '../pages/Home';
import CreditRequest from '../pages/CreditRequest';
import NoticeOfPrivacy from '../pages/NoticeOfPrivacy';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';

const RoutesFactor = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/inicio-sesion" replace />} />
                <Route path='/inicio-sesion' element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/users' element={<CreditRequest />} />
                    <Route path='/insurance' element={<NoticeOfPrivacy />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesFactor
