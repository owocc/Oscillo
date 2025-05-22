import { createStore } from "solid-js/store"

export const [audioStore, setAudioStore] = createStore({
    // 是否暂停播放
    paused: true,
    //当前播放时间
    currentTime: 0,
    musicInfo: {
        source: '/DOES - 修羅 (修罗).flac',
        cover:'',
        duration:0
    },
    get getCurrentTime() {
        return this.currentTime
    }
});
