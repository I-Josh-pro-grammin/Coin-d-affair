
/**
 * centralized API configuration
 * SINGLE SOURCE OF TRUTH for API URL
 */

const getApiUrl = () => {
    const url = import.meta.env.VITE_API_URL;

    if (!url) {
        console.error(
            "%cCRITICAL ERROR: VITE_API_URL is missing in environment variables!",
            "background: red; color: white; padding: 4px; font-weight: bold;"
        );
        // Fallback allowed ONLY for development if explicitly needed, 
        // but better to force config to be correct.
        return "https://coin-d-affair-backend.onrender.com";
    }
    return url;
};

export const API_BASE_URL = getApiUrl();

export const apiConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
};
