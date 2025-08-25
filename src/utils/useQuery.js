import { useLocation } from "react-router-dom";

/**
 * Custom hook to get URL query parameters
 * Example: /products?search=laptop
 * const query = useQuery();
 * const search = query.get("search"); // "laptop"
 */
export default function useQuery() {
    return new URLSearchParams(useLocation().search);
}