import { env } from "bun";

// 和 env 文件对应
export const MusicFolder: string = env.MUSIC_FOLDER || "";
export const ServerPort: number = parseInt(env.SERVER_PORT || "8080", 10);

// 检查必选env是否正确配置
