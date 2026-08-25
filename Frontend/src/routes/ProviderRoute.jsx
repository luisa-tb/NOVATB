import ProviderRoute from "./ProtectedRoute.jsx";
import { ROLES } from "../constants/roles.js";

export default function ProviderRouteWrapper() {
  return <ProviderRoute roles={[ROLES.PROVIDER]} />;
}
