import React, { Children } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import UpdatewebsitesLead from '../../views/Source/WebsiteLead/UpdateWebsitesLead'
const Dashboard = React.lazy(() => import('../../views/dashboard/Dashboard'))
const Role = React.lazy(() => import('../../views/AdminTool/Role'))
const Plan = React.lazy(() => import('../../views/AdminTool/Plan'))
const Company = React.lazy(() => import('../../views/AdminTool/Company'))
const User = React.lazy(() => import('../../views/AdminTool/User'))
const Custom = React.lazy(() => import('../../views/Source/ManualData'))
const UpdateLead = React.lazy(() => import('../../views/Source/subManualData/UpdateLead'))
const Facebook = React.lazy(() => import('../../views/Source/FacebookLead/getFacebookLead'))
const WebsitesLead = React.lazy(() => import('../../views/Source/WebsiteLead/WebsiteLeadDetails'))
const SubMenual = React.lazy(() => import('../../views/Source/subManualData/subManualDetails'))
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
            permissions: [{ label: "Read", value: "read" },{ label: "Create", value: "create" },{ label: "Update", value: "update" },{ label: "Delete", value: "delete" },{ label: "Root", value: "root" }],
            element: <User />
        
    },
    {
        
            path: 'admin-tool/plan',
            permissions: [{ label: "Read", value: "read" },{ label: "Create", value: "create" },{ label: "Update", value: "update" },{ label: "Delete", value: "delete" },{ label: "Root", value: "root" }],
            element: <Plan />
        
    },
    {
        
            path: 'admin-tool/company',
            permissions: [{ label: "Read", value: "read" },{ label: "Create", value: "create" },{ label: "Update", value: "update" },{ label: "Delete", value: "delete" },{ label: "Root", value: "root" }],
            element: <Company />
        
    },
    {
        
            path: 'admin-tool/role',
            permissions: [{ label: "Read", value: "read" },{ label: "Create", value: "create" },{ label: "Update", value: "update" },{ label: "Delete", value: "delete" }],
            element: <Role />
        
    },

    //facebook
    {
        
        path: 'source/facebook',
        permissions: [{ label: "Read", value: "read" }],
        element: <Facebook />
    
},
//websites
    {
        
        path: 'source/website',
        permissions: [{ label: "Read", value: "read" }],
        element: <WebsitesLead />
    
},
    {
        
        path: 'source/website/:id',
        permissions: [{ label: "Read", value: "read" }],
        element: <UpdatewebsitesLead />
    
},
    {
        
            path: 'source/custom',
            permissions: [{ label: "Read", value: "read" }],
            element: <Custom />
        
    },
    {
        
            path: 'source/custom/update/:id',
            permissions: [{ label: "Read", value: "read" }],
            element: <UpdateLead />
        
    },
    {
        
            path: 'source/custom/:id',
            permissions: [{ label: "Read", value: "read" }],
            element: < SubMenual/>
        
    },
//     {
        
//             path: 'admin-tool/role',
//             permissions: [{ label: "Read", value: "read" }],
//             element: <Role />
        
//     },
//     {
        
//             path: 'admin-tool/role',
//             permissions: [{ label: "Read", value: "read" }],
//             element: <Role />
        
//     },
//     {
        
//             path: 'admin-tool/role',
//             permissions: [{ label: "Read", value: "read", }],
//             element: <Role />
        
//     },
//     {
        
//             path: 'admin-tool/role',
//             permissions: [{ label: "Read", value: "read" }],
//             element: <Role />
        
//     },
//     {
        
//             path: 'admin-tool/role',
//             permissions: [{ label: "Read", value: "read" }],
//             element: <Role />
        
//     },
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

