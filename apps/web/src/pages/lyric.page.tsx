import type { Component } from 'solid-js'
import { MusicLyrics } from '../components/music-lyric/music-lyric'
import { lrc } from '../components/music-lyric/lrc'
import { setAudioStore, audioStore } from "../core/audio/store";

const LyricPage: Component = () => {
    return (
        <div class='flex-1 relative overflow-hidden p-4'>
            <div class='h-full w-full rounded-lg overflow-hidden'>
                <MusicLyrics lrc={lrc} currentTime={audioStore.getCurrentTime} />
            </div>
        </div>
    )
}
export default LyricPage
