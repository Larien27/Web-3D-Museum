import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const hideLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            {children}
            {isLoading && (
                <div className='loading-screen'>
                    <div className='loader'>Loading...</div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
