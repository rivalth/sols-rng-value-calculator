import React, { useState } from 'react'
import SettingsModal from './SettingsModal';
import { useModal } from '@/contexts/useModal';
export default function SettingsButton() {
  const { openModal } = useModal();

  return (
    <>
        <div className='flex items-center justify-center flex-shrink-0 w-[52px] h-[52px]'>
        <button
        onClick={() => openModal(<SettingsModal />)}
        className={`text-black/60 hover:text-black focus:text-black dark:text-white/60 dark:hover:text-white dark:focus:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 h-full w-full rounded-2xl outline-transparent outline-offset-1 focus:outline-purple-400 transition-all duration-200`}
        >
            <i className="fas fa-cog"></i>
        </button>
        </div>
    </>
  )
}
