'use client'

import * as React from 'react'
import { PanelRightOpen, PanelRightClose } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Tab {
  id: string
  title: string
  content: React.ReactNode
  icon: React.ReactNode
}

interface CollapsibleTabsProps {
  tabs: Tab[]
  className?: string
  style?: React.CSSProperties
}

export function CollapsibleTabs({ tabs, className, style }: CollapsibleTabsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [selectedTab, setSelectedTab] = React.useState<string>('settings')
  const [isLoading, setIsLoading] = React.useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const selectedTabContent = tabs.find((tab) => tab.id === selectedTab)?.content

  const handleTabChange = (tabId: string) => {
    setIsLoading(true)
    setSelectedTab(tabId)
    setTimeout(() => setIsLoading(false), 500) // Simulate loading
  }

  const containerStyle = {
    ...style,
    minWidth: isExpanded ? '600px' : '60px',
    transition: 'min-width 0.3s ease',
  }

  return (
    <div
      className={cn(
        'flex border rounded-lg overflow-hidden transition-all duration-300 ease-in-out relative',
        className
      )}
      style={containerStyle}
    >
      <div
        className={cn(
          'flex-1 flex flex-col bg-background transition-all duration-300 ease-in-out',
          isExpanded ? 'opacity-100 mr-[60px]' : 'opacity-0 w-0'
        )}
      >
        <div className="flex-1 p-4 overflow-auto">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            selectedTabContent
          )}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-[60px] flex flex-col border-l bg-background">
        <button
          onClick={toggleExpanded}
          className="flex items-center justify-center h-[60px] w-[60px] hover:bg-muted transition-colors border-b"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <PanelRightClose className="h-6 w-6" />
          ) : (
            <PanelRightOpen className="h-6 w-6" />
          )}
        </button>

        <div className="flex flex-col items-center py-2 space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'group relative flex items-center justify-center w-12 h-12 rounded-lg transition-colors',
                tab.id === selectedTab
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {React.cloneElement(tab.icon as React.ReactElement, {
                className: 'h-4 w-4',
              })}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
