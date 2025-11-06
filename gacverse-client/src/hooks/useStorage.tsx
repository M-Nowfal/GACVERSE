import { toast } from "sonner";

interface Storage {
  storage: {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
    remove: (key: string) => void;
    clear: () => void;
  }
}

const useStorage = (storageType: "localStorage" | "sessionStorage"): Storage => {
  const storage = {
    get: (key: string): any => {
      try {
        const item = window[storageType].getItem(key);
        return item ? JSON.parse(item) : null
      } catch (err: unknown) {
        toast.warning(`Failed to parse item "${key}"`);
        return null;
      }
    },
    set: (key: string, value: any): void => {
      try {
        const jsonValue = JSON.stringify(value);
        window[storageType].setItem(key, jsonValue);
      } catch (err: unknown) {
        toast.warning(`Failed to save item "${key}"`);
      }
    },
    remove: (key: string): void => {
      window[storageType].removeItem(key);
    },
    clear: (): void => {
      window[storageType].clear();
    }
  };

  return { storage };
}

export default useStorage;
