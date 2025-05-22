import { Component, For, createSignal, createEffect, createMemo, onMount } from 'solid-js'
import type { JSX, Ref } from 'solid-js'
import { LyricesInfo, lyricsParser, findIndex, parseOffset } from './core'
import { cn } from '../../lib/utils/ui'

/**
* Music Line
* @param props
*/
export const MusicLyricLine: Component<
    JSX.IntrinsicElements['li'] & LyricesInfo & { isActive: boolean, }
> = (props) => {
    return (
        <li class={
            cn('text-2xl p-2 hover:bg-background-elevated-highlight rounded-lg transition-all ease-in-out duration-300 ',
                props.isActive ? 'text-white font-bold blur-none' : 'text-white/50 blur-[2px]',
                props.class)
        } data-time={props.time} {...props} data-active={props.isActive}> {props.words}</li >
    )
}

export const MusicLyrics: Component<{ lrc: string, currentTime: number }> = (props) => {
    const lrcs = createMemo(() => lyricsParser(props.lrc), [])
    let container: HTMLUListElement
    let wrapper: HTMLDivElement

    const [currentIndex, setCurrentIndex] = createSignal(-1)

    const [listHeights, setListHeights] = createSignal<number[]>([])

    const [wrapperHeight, setWrapperheight] = createSignal(0)

    onMount(() => {
        if (wrapper!) {
            setWrapperheight(wrapper!.clientHeight)
        }
        createEffect(() => {
            lrcs()
            if (!container!) return []
            const list = Array.from(container!.childNodes).map((e) => {
                const el = e as HTMLLIElement;
                return el.clientHeight;
            });
            setListHeights(list)
        })
    })


    createEffect(() => {
        const index = findIndex(props.currentTime, lrcs())
        setCurrentIndex(index)
        const _offset = parseOffset(currentIndex(), listHeights()) - wrapperHeight() / 2
        const offset = _offset < 0 ? 0 : _offset;
        wrapper!.scrollTo(0, offset)
    })


    // const resizeObserver = new ResizeObserver(entries => {
    //     for (let entry of entries) {
    //         const { width, height } = entry.contentRect;
    //         lrcs()
    //         if (!container!) return []
    //         const list = Array.from(container!.childNodes).map((e) => {
    //             const el = e as HTMLLIElement;
    //             return el.clientHeight;
    //         });
    //         setListHeights(list)
    //     }
    // });

    // onMount(() => {
    //     resizeObserver.observe(wrapper!)
    // })
    return (
        <div class="overflow-auto scroll-smooth h-full w-full" on:resize={() => {
            console.log('resize')
        }} ref={wrapper!} >
            <ul ref={container!} class="flex  overflow-hidden flex-col p-2 justify-center items-center" >
                <For each={lrcs()} fallback={<div>Faild</div>}>
                    {(item, index) =>
                        <MusicLyricLine  {...item} isActive={index() <= currentIndex()} />
                    }
                </For>
            </ul>
        </div>
    )
}
