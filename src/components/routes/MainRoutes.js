import React, { Children } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
const Dashboard = React.lazy(() => import('../../views/dashboard/Dashboard'))
const Role = React.lazy(() => import('../../views/AdminTool/role'))
const MainRoutes = {
path:"/",
element:<DefaultLayout/>,
children:[
    {
        
            path: '/',
            permissions: [{ label: "Read", value: "read" }],
            element: <Dashboard />  
        
    },
    {
        
            path: '/role',
            permissions: [{ label: "Read", value: "read" }],
            element: <Role />
        
    },
]
}


export default MainRoutes;

// {
//     path: '/users',
//     permissions: { permission: "User", access: ["read"] },
//     element: <Users />
// },
// {
//     path: '/roles',
//     permissions: { permission: "Roles", access: ["read"] },
//     element: <Roles />
// },

