import { createSignal, createRoot, createEffect, onMount } from 'solid-js'
import { audioStore, setAudioStore } from './store'

/**
 * 音乐播放控制
 */
export const createAudioController = () => {
    const audio = new Audio()

    /**
     * 播放音乐
     */
    const play = () => {
        if (!audioStore.musicInfo.source) return
        setAudioStore('paused', () => false)
        audio.play()
        setAudioStore('musicInfo',(info)=>({
          ...info,
          duration:audio?.duration || 0
        }))
    }

    /**
     * 暂停音乐
     */
    const paused = () => {
        if (!audioStore.musicInfo.source) return
        setAudioStore('paused', () => true)
        audio.pause()
    }

    createEffect(() => {
        audio.src = audioStore.musicInfo.source
    })

    createEffect(() => {
        if (audioStore.musicInfo.source && !audioStore.paused) {
            play()
        }
    })

    audio.addEventListener('timeupdate', () => {
        setAudioStore('currentTime', () => audio.currentTime)
    })

    return {
        play,
        paused,
    }
}

// 创建共享实例

export const audioController = createRoot(() => createAudioController())
