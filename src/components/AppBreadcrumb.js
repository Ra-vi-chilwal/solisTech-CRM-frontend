import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {



  return (
    <>
    <h1>breadcrumb</h1>
    </>
    // <CBreadcrumb className="m-0 ms-2">
    //   <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
    //   {breadcrumbs.map((breadcrumb, index) => {
    //     return (
    //       <CBreadcrumbItem
    //         {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
    //         key={index}
    //       >
    //         {breadcrumb.name}
    //       </CBreadcrumbItem>
    //     )
    //   })}
    // </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
