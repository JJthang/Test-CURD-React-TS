import { useNavigate, useLocation } from 'react-router-dom';

type QueryParams = Record<string, string | number | undefined>;

export const useSetQuery = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const setQuery = (params: QueryParams, replace = true) => {

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.set(key, value.toString());
            } else {
                queryParams.delete(key);
            }
        });

        navigate(`?${queryParams.toString()}`, { replace });
    };
    const getQuery = (key: string): string | null => {
        return queryParams.get(key);
    };

    const getAllQuery = (): Record<string, string> => {
        const entries: Record<string, string> = {};
        queryParams.forEach((value, key) => {
            entries[key] = value;
        });
        return entries;
    };

    return { setQuery, getQuery, getAllQuery };
};
