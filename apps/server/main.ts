import { serve, env } from "bun";
import { ServerPort } from "./src/lib/env";
import { getFolderMusics } from "./src/folder";
import { getMusicFile } from "./src/file";
import {parseFile,selectCover} from 'music-metadata'
// shared header
const global_header = new Headers();
global_header.set("Access-Control-Allow-Origin", "*");

const resultHeader = new Headers();
resultHeader.append("Content-Type", "application/json");

function Result<T extends object>(data: T, init: ResponseInit = {}): Response {
  const header = new Headers(resultHeader);
  const { headers, ..._init } = init;

  if (init.headers) {
    const initHeaders = new Headers(init.headers);
    initHeaders.forEach((value, key) => {
      header.set(key, value);
    });
  }
  return new Response(JSON.stringify(data), {
    ..._init,
    headers: header,
  });
}

async function init() {
  console.log("初始化程序中...");
  await getFolderMusics();
}

await init();

serve({
  idleTimeout: 10,
  routes: {
    // 解析歌词信息
    "/parse": () => {
      return new Response("Ok", {
        headers: global_header,
      });
    },
    "/list": async () => {
      return Result(
        (await getFolderMusics()).map((e) => ({
          name: e.name,
          id: e.id,
        })),
      );
    },
    "/detail/:id": async (req) => {
      const id = req.params.id;

      if (!id) {
        return Result({
          code: 0,
          msg: "错误的ID",
        });
      }
      const file = await getMusicFile(id);
      if (!file?.musicFile) {
        return Result({
          code: 0,
          msg: "错误的ID",
        });
      }

      return Result({
        url: `http://localhost:${ServerPort}/music/${id}`,
        name: file.musicFile.name,
      });
    },
    "/music/:id": async (req) => {
      const id = req.params.id;
      const file = await getMusicFile(id);
      if (!file) return new Response(null);
      const {common} = await parseFile(file.path);
      const cover = selectCover(common.picture);

      return new Response(cover?.data, {
        headers: {
          "Content-Type": cover.type,
          // "Accept-Ranges": "bytes",
        },
      });
    },
  },
  port: ServerPort,
});

console.log("Server Runing...");
console.log(`http://localhost:${env.SERVER_PORT}`);
