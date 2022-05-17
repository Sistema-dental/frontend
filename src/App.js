// import hooks react
import { useEffect, useState } from 'react';
// import TAGS
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// imports components criados


import Menuu from './components/menu/Me';
// import pages criadas
import Home from './pages/Home';
import { Col, Row } from 'react-bootstrap';


function App() {
  const [blackHeader, setblackHeader]= useState(false);
  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setblackHeader(true);
        }else{
          setblackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  return (
    <ChakraProvider>
       <BrowserRouter>
        <Row>
          <Col className='mb-4' >
        <Menuu/>
          </Col>
          <Col> 
        <Routes>
            <Route path="" element={<Home/>}/>
                
               
            
        
        </Routes>
          </Col>
        </Row>
        
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
