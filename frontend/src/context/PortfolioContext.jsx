import { createContext, useContext, useState } from 'react';

/**
 * Portfolio Context
 * Manages portfolio state across pages
 */
const PortfolioContext = createContext();

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContext must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioBlob, setPortfolioBlob] = useState(null);
  const [filename, setFilename] = useState('portfolio_website.zip');
  const [resumeFile, setResumeFile] = useState(null);
  const [portfolioId, setPortfolioId] = useState(null);

  const clearPortfolio = () => {
    setPortfolioBlob(null);
    setFilename('portfolio_website.zip');
    setResumeFile(null);
    setPortfolioId(null);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioBlob,
        setPortfolioBlob,
        filename,
        setFilename,
        resumeFile,
        setResumeFile,
        portfolioId,
        setPortfolioId,
        clearPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
