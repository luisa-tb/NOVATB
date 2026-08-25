import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { getJson, setJson } from "../utils/storage.js";
import { useCallback, useState } from "react";

export function useWishlist() {
  const [ids, setIds] = useState(() =>
    getJson(STORAGE_KEYS.WISHLIST, []),
  );

  const persist = useCallback((next) => {
    setIds(next);
    setJson(STORAGE_KEYS.WISHLIST, next);
  }, []);

  const toggle = (idProducto) => {
    const key = String(idProducto);
    if (ids.includes(key)) {
      persist(ids.filter((id) => id !== key));
    } else {
      persist([...ids, key]);
    }
  };

  const has = (idProducto) => ids.includes(String(idProducto));

  return { ids, toggle, has };
}
