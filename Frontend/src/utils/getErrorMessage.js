export function getErrorMessage(error, fallback = "Ocurrió un error") {
  return (
    error?.response?.data?.mensaje ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}
