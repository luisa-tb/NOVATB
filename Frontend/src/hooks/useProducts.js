import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../services/productService.js";
import { getErrorMessage } from "../utils/getErrorMessage.js";

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(params);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [params.nombre, params.categoria]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, reload: load };
}
