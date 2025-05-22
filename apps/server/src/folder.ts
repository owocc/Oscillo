// 读取目录歌曲
import { MusicFolder } from "./lib/env";
import { readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { getFileHex } from "./file";
import type { MusicInfo } from "../types";
import { cache, type CacheData } from "./cache";

export const Music_Cache_Key = "musics";
const Music_Cache_Time = 5000;
export async function getFolderMusics(): Promise<MusicInfo[]> {
  //读取缓存内容

  if (cache.has(Music_Cache_Key)) {
    const cacheData = cache.get(Music_Cache_Key) as CacheData<MusicInfo[]>;
    if (Date.now() - cacheData.time < Music_Cache_Time) return cacheData.data;
  }

  const files = await readdir(MusicFolder);
  const dir = await Promise.all(
    files.map(async (item) => {
      const fullPath = join(MusicFolder, item);
      return {
        name: basename(item, extname(item)),
        id: await getFileHex(fullPath),
        path: item,
      };
    }),
  );

  //设置缓存
  cache.set(Music_Cache_Key, {
    time: Date.now(),
    data: dir,
  });
  return dir as MusicInfo[];
}
