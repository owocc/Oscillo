import type { Component } from 'solid-js'
import { For } from "solid-js"
import { IconPlay } from '../components/icons/play'

/**
* Home Page
*/
const HomePage: Component = () => {
  return (
    <div class='overflow-y-auto h-full'>
      <div class='relative h-max'>
        <div class='bg-gradient-to-b left-0 w-full h-64 absolute mt-0 from-red-500/50 to-transparent flex flex-col gap-3'></div>
        <div class='flex flex-col gap-3 py-3 relative'>


          <div class='flex gap-2 px-6'>
            <div class='rounded-full text-black bg-white px-3 py-1 text-sm'>All</div>
            <div class='rounded-full bg-background-elevated-base px-3 py-1 text-sm'>Server 01</div>
          </div>
          <div class='grid grid-cols-2 gap-2 @4xl:grid-cols-4 px-6'>
            <For each={[
              'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
              'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
              'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
              'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
              'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
              'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
            ]} fallback={<div>Not</div>}>
              {(item) => <div class='rounded-md bg-white/15 overflow-hidden flex items-center gap-2 h-14 @4xl:h-16'>
                <div class="size-14 @4xl:size-16 shadow-lg shadow-black/50">
                  <img src={item} alt="" class='size-full object-cover' />
                </div>
                <div>
                  <span class='text-sm font-medium'>My top tracks playlist</span>
                </div>
                <div class='w-6  h-full'></div>
              </div>}
            </For>

          </div>

          <section class='flex flex-col gap-1'>
            <header class='px-6'>
              <b class='text-xl'>You Like..</b>
            </header>
            <div class='w-full overflow-x-auto lg:overflow-x-auto'>
              <div class='grid grid-rows-1 px-3 w-max grid-flow-col gap-2'>
                <For each={[
                  'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
                  'https://i.scdn.co/image/ab67616d0000e1a36daab4907ea3634ca04520a2',
                  'https://i.scdn.co/image/ab67616d0000e1a342d94b02e2d1e4db7eb40817',
                  'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
                  'https://i.scdn.co/image/ab67616d0000e1a36daab4907ea3634ca04520a2',
                  'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
                  'https://i.scdn.co/image/ab67616d0000e1a36daab4907ea3634ca04520a2',
                  'https://i.scdn.co/image/ab676161000051749abf89574f39f5ed424b968c',
                  'https://i.scdn.co/image/ab67616d0000e1a36daab4907ea3634ca04520a2',
                ]} fallback={<div>Not</div>}>
                  {(item) => <div class='rounded-md p-3 w-44 hover:bg-background-elevated-base flex flex-col gap-2'>
                    <div class='w-full relative group/card overflow-hidden'>
                      <div>
                        <img src={item} alt="" class='w-full rounded-lg object-cover' />
                      </div>
                      <div class='absolute bottom-2 right-2'>
                        <button class='bg-primary p-3 cursor-pointer flex group-hover/card:opacity-100 group-hover/card:translate-0 transition-all ease-in-out duration-300 justify-center opacity-0 translate-y-full items-center  rounded-full shadow-xl shadow-black/25'>
                          <IconPlay class='size-6 text-background' />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span class='text-zinc-500 text-sm'>高木 （CV：高橋李依）Mix</span>
                    </div>
                  </div>}
                </For>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  )
}

export default HomePage
