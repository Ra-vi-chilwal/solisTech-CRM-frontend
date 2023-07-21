import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartLine,
  cilIndustry,
  cilGroup,
  cilBuilding,
  cilCouch,
  cilDescription,
  cibGoogle,
  cilUsb,
  cilUserPlus,
  cilHttps,
  cilPuzzle,
  cilSpeedometer,
  cibLinkedinIn,
  cibInstagram,
  cibFacebook,
  cibHackhands,
  cibMyspace,
  cibUpwork,
  cibFlutter
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },



  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Source',
    to: '/source',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Websites',
        icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
        to: '/source/website',
      },
      {
        component: CNavItem,
        name: 'Facebook',
        icon: <CIcon icon={cibFacebook
        } customClassName="nav-icon" />,
        to: '/source/facebook',
      },
      {
        component: CNavItem,
        name: 'Instagram',
        icon: <CIcon icon={cibInstagram} customClassName="nav-icon" />,
        to: '/source/instagram',
      },
      {
        component: CNavItem,
        name: 'Justdial',
        icon: <CIcon icon={cibHackhands} customClassName="nav-icon" />,
        to: '/source/justdial',
      },
      {
        component: CNavItem,
        name: 'Google Ads.',
        icon: <CIcon icon={cibGoogle} customClassName="nav-icon" />,
        to: '/source/google-ads',
      },
      {
        component: CNavItem,
        name: 'Linkdin',
        icon: <CIcon icon={cibLinkedinIn} customClassName="nav-icon" />,
        to: '/source/linkdin',
      },
      {
        component: CNavItem,
        name: 'Manual Data',
        icon: <CIcon icon={cibMyspace} customClassName="nav-icon" />,
        to: '/source/custom',
      },
      {
        component: CNavItem,
        name: 'Upwork',
        icon: <CIcon icon={cibUpwork} customClassName="nav-icon" />,
        to: '/source/custom',
      },
      {
        component: CNavItem,
        name: 'Fiverr',
        icon: <CIcon icon={cibFlutter} customClassName="nav-icon" />,
        to: '/source/custom',
      },

    ],
  },

 


  {
    component: CNavGroup,
    name: 'Admin Tool',
    icon: <CIcon icon={cilUserPlus
    } customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Role',
        icon: <CIcon icon={cilCouch
        } customClassName="nav-icon" />,
        to: '/admin-tool/role',
      },
      {
        component: CNavItem,
        name: 'Company',
        to: '/admin-tool/company',
        icon: <CIcon icon={cilBuilding
        } customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Plan',
        icon: <CIcon icon={cilUsb
        } customClassName="nav-icon" />,
        to: '/admin-tool/plan',
      },
      {
        component: CNavItem,
        name: 'User',
        icon: <CIcon icon={cilGroup
        } customClassName="nav-icon" />,
        to: '/admin-tool/user',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Logout',
    icon: <CIcon icon={cilHttps
    } customClassName="nav-icon" />,
    to: '/auth/login',
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
