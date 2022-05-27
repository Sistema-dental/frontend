import { useContext } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';





// Import the functions you need from the SDKs you need

// ----------------------------------------------------------------------
export default function App() {
  
  
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      
      
      
     
    </ThemeProvider>
  );
}
