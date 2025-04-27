import { Env } from "./types";

export const env: Env = {
    backend_api: 
        import.meta.env.DEV ? 
        import.meta.env.VITE_DEV_BACKEND : 
        import.meta.env.VITE_PROD_BACKEND
}