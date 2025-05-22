import type { Component,JSX } from 'solid-js'
import { children } from 'solid-js'
import Resizable from '@corvu/resizable'

interface ApplicationMainProps{
  leftPanelContent?:JSX.Element
  mainPanelContent?:JSX.Element
  rightPanelContent?:JSX.Element
}

export const ApplicationMain = (props:ApplicationMainProps) => {

    const leftPanelContent = children(()=>props.leftPanelContent)
    const mainPanelContent = children(()=>props.mainPanelContent)
    const rightPanelContent = children(()=>props.rightPanelContent)

    return (
        <Resizable as='main' orientation="horizontal" class='flex-1 overflow-hidden lg:p-2'>
          <Resizable.Panel initialSize={0.2} minSize={0.05} maxSize={0.3} class='hidden lg:block overflow-hidden bg-background-base rounded-2xl'>
            {leftPanelContent()}
          </Resizable.Panel>
          <Resizable.Handle
            aria-label="Resize Handle"
            class="group basis-2 px-0.75 hidden lg:block"
          >
            <div class="size-full rounded-full transition-colors group-data-active:bg-white/30 group-data-dragging:bg-white" />
          </Resizable.Handle>

          <Resizable.Panel initialSize={0.5} minSize={0.3} class='lg:rounded-2xl flex-1 lg:flex-auto overflow-hidden'>
            <div class='h-full overflow-hidden bg-background-base @container relative w-full pb-bottom-navigation lg:pb-0 flex'>
              {mainPanelContent()}
            </div>
          </Resizable.Panel>

          <Resizable.Handle
            aria-label="Resize Handle"
            class="group basis-2 px-0.75 hidden lg:block"
          >
            <div class="size-full rounded-full transition-colors group-data-active:bg-white/30 group-data-dragging:bg-white" />
          </Resizable.Handle>
          <Resizable.Panel initialSize={0.3} minSize={0.2} maxSize={0.3} class='hidden lg:block overflow-hidden bg-background-base rounded-2xl'>
            {rightPanelContent()}
          </Resizable.Panel>
        </Resizable>
    )
}
