
import { A } from '@solidjs/router'
import {Component} from 'solid-js'
import { IconHome } from '../icons/home'
import { IconSearch } from '../icons/search'
import { IconLibrary } from '../icons/library'
import { IconServer } from '../icons/server'

export const MobildNavigationBar:Component = ()=>{
  return (
    <div class='p-1 lg:hidden h-bottom-navigation bg-gradient-to-b to-75% from-black/5 to-black flex items-center justify-around'>
      <A href='/' class='flex-col h-full w-full flex justify-center items-center active:scale-95 transition-transform'>
        <IconHome class='size-6' />
        <span class='text-xs'>Home</span>
      </A>

      <A href='/search' class='flex-col h-full w-full flex justify-center items-center active:scale-95 transition-transform'>
        <IconSearch class='size-6' />
        <span class='text-xs'>Search</span>
      </A>


      <button class='flex-col h-full w-full flex justify-center items-center active:scale-95 transition-transform'>
        <IconLibrary class='size-6' />
        <span class='text-xs'>Library</span>
      </button>
      <button class='flex-col h-full w-full flex justify-center items-center active:scale-95 transition-transform'>
        <IconServer class='size-6' />
        <span class='text-xs'>Services</span>
      </button>
    </div>
  )
}
