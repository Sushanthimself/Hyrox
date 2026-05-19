import * as SecureStore from 'expo-secure-store';

/** SecureStore value limit on iOS — chunk large Supabase session payloads. */
const CHUNK_SIZE = 1800;

async function getChunkCount(key: string): Promise<number> {
  const raw = await SecureStore.getItemAsync(`${key}_chunks`);
  if (!raw) {
    return 0;
  }

  const count = Number.parseInt(raw, 10);
  return Number.isFinite(count) ? count : 0;
}

export const secureAuthStorage = {
  async getItem(key: string): Promise<string | null> {
    const chunkCount = await getChunkCount(key);

    if (chunkCount === 0) {
      return SecureStore.getItemAsync(key);
    }

    const parts: string[] = [];
    for (let index = 0; index < chunkCount; index += 1) {
      const part = await SecureStore.getItemAsync(`${key}_${index}`);
      if (part === null) {
        return null;
      }
      parts.push(part);
    }

    return parts.join('');
  },

  async setItem(key: string, value: string): Promise<void> {
    if (value.length <= CHUNK_SIZE) {
      await SecureStore.deleteItemAsync(`${key}_chunks`).catch(() => undefined);
      await SecureStore.setItemAsync(key, value);
      return;
    }

    const chunkCount = Math.ceil(value.length / CHUNK_SIZE);
    await SecureStore.setItemAsync(`${key}_chunks`, String(chunkCount));

    for (let index = 0; index < chunkCount; index += 1) {
      const chunk = value.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);
      await SecureStore.setItemAsync(`${key}_${index}`, chunk);
    }

    await SecureStore.deleteItemAsync(key).catch(() => undefined);
  },

  async removeItem(key: string): Promise<void> {
    const chunkCount = await getChunkCount(key);

    await SecureStore.deleteItemAsync(key).catch(() => undefined);
    await SecureStore.deleteItemAsync(`${key}_chunks`).catch(() => undefined);

    for (let index = 0; index < chunkCount; index += 1) {
      await SecureStore.deleteItemAsync(`${key}_${index}`).catch(() => undefined);
    }
  }
};

export const secureAppStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key)
};
