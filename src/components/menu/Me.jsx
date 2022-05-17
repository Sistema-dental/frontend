import React from 'react'
import{ Nav,NavDropdown,Navbar,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./menu.css"
import { Box, Button, CloseButton, Collapse,  useDisclosure } from '@chakra-ui/react'

const Menuu = ({black}) => {
  
  return (
  <div>
 
    <div className="flex-column sidebar" >

        <Button variant="primary">Dashboard</Button>
        <br/>
        <Button variant="primary">Dashboard</Button>
        <br/>
        <Button variant="primary">Dashboard</Button>
        <br/>
        <Button variant="primary">Dashboard</Button>
        <br/>
        <Button variant="primary">Dashboard</Button>
        <br/>
        <Button variant="primary">Dashboard</Button>
        <br/>
        
      
    </div>
     
  </div>
  )
}

export default Menuu