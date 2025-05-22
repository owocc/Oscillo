import type { Component, ParentProps, JSX } from 'solid-js';
import { IconHome } from '../icons/home'
import { children, Show } from 'solid-js'
import { IconSearch } from '../icons/search'
import { IconLibrary } from '../icons/library';
import { IconServer } from '../icons/server';
import { A } from '@solidjs/router'
import { ApplicationBar } from './header';
import Resizable from '@corvu/resizable'
import { IconDocument } from '../icons/document';
import { IconPlay } from '../icons/play';
import { Tooltip, TooltipTrigger } from '../ui/tooltip';
import { audioController } from '../../core/audio/controller'
import { audioStore, setAudioStore } from '../../core/audio/store';
import { IconPauseFill } from '../icons/pause';
import { IconPreviousFill } from '../icons/previous';
import { IconNextFill } from '../icons/next';
import { ApplicationMain } from './app-main';
import { MobildNavigationBar } from './navigation-bar';

interface ApplicationLayoutProps {
  /**
   * Main Content View
   */
  children: JSX.Element
  footerContent?: JSX.Element
}

const numToTime=(num:number):string=>{
  // 120 / 60  ==> 2:00
  const m = Math.floor(num/60)
  const s = Math.floor(num%60)
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Application Layout
 * @param props
 * @returns
 */
export const ApplicationLayout: Component<ApplicationLayoutProps> = (props) => {
  const routeView = children(() => props.children)
  const { play, paused } = audioController
  return (
    <div class='min-h-screen h-screen overflow-hidden bg-background text-content select-none  flex flex-col bg-base-100'>
      <ApplicationBar />

      <ApplicationMain
        leftPanelContent={<div>Hello</div>}
        mainPanelContent={routeView()}
      />

      <footer class='fixed bottom-0 w-full lg:bottom-auto lg:relative z-50'>
        <div class='px-3 relative py-2 flex w-full lg:grid-cols-3'>
          <div class='w-full lg:w-1/3 transition-all ease-in-out delay-100 bg-primary lg:bg-transparent rounded-lg p-2 flex gap-2 relative select-none'>
            <div>
              <img src="https://i.scdn.co/image/ab67616100005174774ac8933df7e2c8060fd1a2" class='size-10 lg:size-14 rounded-md' />
            </div>
            <div class='flex flex-col lg:justify-center'>
              <span class='text-sm'>言わないけどね。</span>
              <span class='text-xs text-white/80'>Web Player</span>
            </div>
          </div>

          {/* player */}
          <div class='flex flex-col  gap-2 items-center justify-center h-full flex-1'>
            <div class='hidden lg:flex items-center gap-2'>
              <Tooltip content='Prev'>
                <div onclick={() => setAudioStore('musicInfo', (pre) => {
                  return {
                    ...pre,
                    source: '/DOES - 修羅 (修罗).flac'
                  }
                })} class='hidden p-2 text-white/50 rounded-full lg:flex justify-center items-center w-full'>
                  <IconPreviousFill class='size-6' />
                </div>
              </Tooltip>


              <Tooltip content='Play'>
                <div onclick={() => {
                  audioStore.paused ? play() : paused()
                }} class='hidden p-2 bg-white text-black rounded-full lg:flex justify-center items-center w-full'>
                  <Show when={audioStore.paused} fallback={<IconPauseFill class='size-4' />}>
                    <IconPlay class='size-4' />
                  </Show>
                </div>
              </Tooltip>

              <Tooltip content='Next'>
                <div onclick={() => setAudioStore('musicInfo', (pre) => {
                  return {
                    ...pre,
                    source: '/门没锁.flac'
                  }
                })} class='hidden p-2 text-white/50 rounded-full lg:flex justify-center items-center w-full'>
                  <IconNextFill class='size-6' />
                </div>
              </Tooltip>
            </div>
            <div class='flex w-full items-center gap-2'>
              <span class='text-sm hidden lg:inline text-zinc-500'>{ numToTime(audioStore.currentTime) }</span>
              <div class='absolute bottom-2 lg:static px-4 lg:px-0 h-0.5 w-full grid lg:h-1 rounded-full overflow-hidden left-0'>
                <div class='h-full bg-white/50 w-full col-[1] row-[1]'></div>
                <div class='h-full bg-white col-[1] row-[1] w-full origin-left'
                  style={{
                    transform:`scaleX(${(audioStore.currentTime/ audioStore.musicInfo.duration || 0) * 100}%)`
                  }}
                ></div>
              </div>

              <span class='text-sm hidden lg:inline text-zinc-500'>{numToTime( audioStore.musicInfo.duration) }</span>
            </div>
          </div>




          <div class='w-1/3 hidden lg:flex items-center justify-end gap-2'>
            <A activeClass='!text-primary' href='/lyric' class='inline-flex cursor-pointer hover:text-white  hover:scale-105 transition-all text-white/50 justify-center items-center flex-col gap-2'>
              <IconDocument class='size-5' />
              <div class='size-1 bg-primary hidden rounded-full' />
            </A>
          </div>
        </div>
        <MobildNavigationBar/>
      </footer>
    </div>
  )
}
