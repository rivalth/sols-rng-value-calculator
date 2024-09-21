import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PageResultsContextProps {
    results: any[];
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
    auraData: any[];
}

const PageResultsContext = createContext<PageResultsContextProps | undefined>(undefined);

export const PageResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [results, setResults] = useState<any[]>([]);
    const [auraData, setAuraData] = useState<any[]>([]);

    const fetchAuraData = async () => {
        const fetchResults = await fetch('/auradata.json').then((res) => res.json());
        setAuraData(fetchResults);
    }

    useEffect(() => {
        fetchAuraData();
    }, []);

    return (
        <PageResultsContext.Provider value={{ results, setResults, auraData }}>
            {children}
        </PageResultsContext.Provider>
    );
};

export const usePageResults = (): PageResultsContextProps => {
    const context = useContext(PageResultsContext);
    if (!context) {
        throw new Error('usePageResults must be used within a PageResultsProvider');
    }
    return context;
};