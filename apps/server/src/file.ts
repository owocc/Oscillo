import { createHash } from "node:crypto";
import { file } from "bun";
import { join } from "node:path";
import { getFolderMusics } from "./folder";
import { MusicFolder } from "./lib/env";
export async function getFileHex(filePath: string) {
  const _file = file(filePath);
  if (!(await _file.exists())) {
    return "null";
  }
  const buffer = await _file.arrayBuffer();

  //读取文件前 255 个字节 和后 255 个字节,以及中间的 255个字节
  const start = buffer.slice(0, 255);
  const end = buffer.slice(buffer.byteLength - 255);
  const centerStart = Math.floor(buffer.byteLength / 2) - 255;
  const center = buffer.slice(centerStart, centerStart + 255);

  const combinedLength = start.byteLength + center.byteLength + end.byteLength;
  const combined = new Uint8Array(combinedLength);
  combined.set(new Uint8Array(start), 0);
  combined.set(new Uint8Array(center), start.byteLength);
  combined.set(new Uint8Array(end), start.byteLength + center.byteLength);
  const hex = createHash("sha256").update(combined).digest().toHex();
  return hex;
}

export async function getMusicFile(id: string) {
  const data = await getFolderMusics();
  const item = data.find((item) => item.id === id);
  if (!item) {
    return null;
  }
  const path= join(MusicFolder, item.path)
  const musicFile = file(path);
  if (!(await musicFile.exists())) {
    return null;
  }
  return {
    path,
    musicFile
  };
}
