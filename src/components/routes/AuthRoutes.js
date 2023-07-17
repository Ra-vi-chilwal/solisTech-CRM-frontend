import { exact } from 'prop-types';
import AuthLayout from '../../layout/AuthLayout';
import Login from '../../views/pages/login/Login';
import UnAuthorised from '../../views/pages/page404/Page404';
const AuthRoutes = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: "/auth/login",
            element: <Login />,
           
        },
        {
            path: "/auth/page404",
            element: <UnAuthorised/>
        },
    ]
};

export default AuthRoutes;