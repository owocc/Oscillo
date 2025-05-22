export interface LyricesInfo {
    time: number;
    words: string;
}

export function lyricsParser(lrc: string) {
    const lrcs = lrc
        .split("\n")
        .map((lrc) => {
            const [time, words] = lrc.split("]");
            if (!words) {
                return undefined;
            }
            return {
                time: parseTime(time.substring(1)),
                words: words,
            };
        })
        .filter((e) => e);
    return lrcs as LyricesInfo[];
}

function parseTime(timeStr: string): number {
    const [mm, ss_xx] = timeStr.split(":");
    return parseFloat(mm) * 60 + parseFloat(ss_xx);
}

export function findIndex(currentTime: number, lrcs: LyricesInfo[]) {
    const index = lrcs.findIndex((e) => e.time > currentTime);
    return index == -1 ? lrcs.length - 1 : index > 0 ? index - 1 : index;
}

export function parseOffset(index: number, heightlist: number[]) {
    // console.log(index, heightlist)
    return (
        heightlist.slice(0, index).reduce((a, b) => a + b, 0) +
        heightlist[index] / 2
    );
}
