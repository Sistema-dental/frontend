import { useContext } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';


import 'sweetalert2/src/sweetalert2.scss'


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
