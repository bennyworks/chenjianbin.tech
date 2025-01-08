'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { dashboardConfig } from '@/config/dashboard'
import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function MainBreadcrumb() {
  const pathname = usePathname()

  // 生成面包屑路径
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: { title: string; href: string }[] = []

    // 遍历路径生成面包屑
    let currentPath = ''
    paths.forEach((path) => {
      currentPath += `/${path}`

      // 从配置中查找匹配的路径
      const matchedMainNav = dashboardConfig.navMain.find((item) => item.href === currentPath)
      const matchedSecondaryNav = dashboardConfig.navSecondary.find(
        (item) => item.href === currentPath
      )
      const matchedProject = dashboardConfig.projects.find((item) => item.href === currentPath)

      if (matchedMainNav?.title && matchedMainNav?.href) {
        breadcrumbs.push({
          title: matchedMainNav.title,
          href: matchedMainNav.href,
        })
      } else if (matchedSecondaryNav?.title && matchedSecondaryNav?.href) {
        breadcrumbs.push({
          title: matchedSecondaryNav.title,
          href: matchedSecondaryNav.href,
        })
      } else if (matchedProject?.title && matchedProject?.href) {
        breadcrumbs.push({
          title: matchedProject.title,
          href: matchedProject.href,
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="{breadcrumb.href}">{breadcrumb.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index === breadcrumbs.length - 1 && (
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
            <BreadcrumbSeparator
              className={`${index < breadcrumbs.length - 1 ? 'hidden md:block' : 'invisible'}`}
            />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
