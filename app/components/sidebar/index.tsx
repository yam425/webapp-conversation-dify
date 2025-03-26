import React from 'react'
import type { FC } from 'react'
import type { ConversationItem } from '@/types/app'
import Link from 'next/link'
import { APP_INFO } from '@/config'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export type ISidebarProps = {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
  isShowSidebar: boolean
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
  isShowSidebar,
}) => {
  return (
    <div
      className={`shrink-0 flex flex-col overflow-y-auto bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px] 
        border-r border-gray-200 h-screen transition-all ease-in-out duration-300 
        ${isShowSidebar ? 'translate-x-0' : '-translate-x-full mobile:absolute'}`}
    >
      <div className="flex flex-row gap-3 items-center py-3 px-4">
        <Link href="https://sql.com.my" target="_blank" rel="noopener noreferrer">
          <span className="text-lg font-semibold hover:bg-muted rounded-md cursor-pointer">
            {APP_INFO.title}
          </span>
        </Link>
      </div>

      <nav className="mt-2 flex-1 space-y-1 bg-white p-4 !pt-0">
        {list.map((item) => {
          const isCurrent = item.id === currentId
          return (
            <div
              onClick={() => onCurrentIdChange(item.id)}
              key={item.id}
              className={classNames(
                isCurrent
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
              )}
            >
              {item.name}
            </div>
          )
        })}
      </nav>
      <div className="flex flex-shrink-0 pr-4 pb-4 pl-4">
        <div className="text-gray-400 font-normal text-xs">© {copyRight} {(new Date()).getFullYear()}</div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
