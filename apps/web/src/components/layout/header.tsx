import { Component } from 'solid-js'
import { AppLogo } from '../icons/logo'
import { IconHome } from '../icons/home'
import { IconWiFi } from '../icons/wifi'
import { A } from '@solidjs/router'

export const ApplicationBar: Component = () => {
    return (
        <header class='pt-2 px-4  items-center gap-2 hidden lg:flex'>
            <div class='flex-1 flex items-center gap-2 px-2'>
                <div class='p-1.5 bg-white rounded-full'>
                    <AppLogo class="size-6 text-black" />
                </div>
                {/* <span class='text-xl font-bold'>Oscillo</span> */}
            </div>
            <div class='gap-2 hidden lg:flex'>
                <A href='/' class='p-3 rounded-full  text-white/50 hover:text-white bg-background-elevated-base hover:bg-background-elevated-highlight hover:scale-105 transition-transform'>
                    <IconHome class='size-6' />
                </A>
                <div class='flex-1 h-full '>
                    <div class='rounded-full bg-background-elevated-base border-gray-200 h-12 w-md '>
                        <input type='text' placeholder='What do you want to play?' class='w-full h-full px-4 outline-none' />
                    </div>
                </div>
            </div>


            <div class='flex-1 flex justify-end gap-2'>
                <A href='/discover-servers' class='p-3 rounded-full text-zinc-700 hover:text-white transition-colors'>
                    <IconWiFi class='size-6' />
                </A>
            </div>
        </header>
    )
}
