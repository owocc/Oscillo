// 将数据临时存储在内存中,如果遇到了找不到的,尝试一次更新索引,如果更新索引后还未找到,则返回空

export interface CacheData<T = any> {
  time: number;
  data: T;
}
export const cache = new Map<string, CacheData>();
