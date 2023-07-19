import React, { Children } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
const Dashboard = React.lazy(() => import('../../views/dashboard/Dashboard'))
const Role = React.lazy(() => import('../../views/AdminTool/Role'))
const Plan = React.lazy(() => import('../../views/AdminTool/Plan'))
const Company = React.lazy(() => import('../../views/AdminTool/Company'))
const User = React.lazy(() => import('../../views/AdminTool/User/user'))
const MainRoutes = {
path:"/",
element:<DefaultLayout/>,
children:[
    {
        
            path: '/',
            permissions: [{ label: "Read", value: "read" },],
            element: <Dashboard />  
        
    },
    {
        
            path: 'admin-tool/user',
            permissions: [{ label: "Read", value: "read" },{ label: "Create", value: "create" },{ label: "Update", value: "update" },{ label: "Delete", value: "delete" }],
            element: <User />
        
    },
    {
        
            path: 'admin-tool/plan',
            permissions: [{ label: "Read", value: "read" }],
            element: <Plan />
        
    },
    {
        
            path: 'admin-tool/company',
            permissions: [{ label: "Read", value: "read" }],
            element: <Company />
        
    },
    {
        
            path: 'admin-tool/role',
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

