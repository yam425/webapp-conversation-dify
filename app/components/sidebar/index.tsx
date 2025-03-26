import React, { useState } from 'react'
import type { FC } from 'react'
import type { ConversationItem } from '@/types/app'
import Link from 'next/link'
import { APP_INFO } from '@/config'
import { Trash2Icon } from 'lucide-react'
import { ConfirmationDialog } from '../base/dialog'
import { useTranslation } from 'react-i18next'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export type ISidebarProps = {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
  isShowSidebar: boolean
  onConversationDelete: (id: string) => void
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
  isShowSidebar,
  onConversationDelete,
}) => {
  const { t } = useTranslation()
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  return (
    <div
      className={`shrink-0 flex flex-col overflow-y-auto bg-white w-[240px] 
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
              key={item.id}
              className={classNames(
                isCurrent
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
              )}
            >
              <span onClick={() => onCurrentIdChange(item.id)} className='flex-1'>
                {item.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onCurrentIdChange
                  setShowConfirmDelete(true);
                  setDeleteId(item.id)
                }}
                className='mobile:opacity-100 pc:opacity-0 mobile:px-2 pc:px-1 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-red-500'
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </nav>
      {showConfirmDelete && (
        <ConfirmationDialog
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={() => {
            setShowConfirmDelete(false)
            onConversationDelete(deleteId)
          }}
          title={t('app.chat.deleteTitle')}
          description={t('app.chat.deleteDescription')}
          confirmText={t('app.chat.deleteButton')}
          cancelText={t('app.chat.cancelButton')}
        />
      )}

      <div className='flex flex-shrink-0 pr-4 pb-4 pl-4'>
        <div className='text-gray-400 font-normal text-xs'>© {copyRight} {(new Date()).getFullYear()}</div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
