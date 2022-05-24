import { useEffect, useRef, useState } from 'react';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import db from '../../Apifire'
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';

// ----------------------------------------------------------------------


const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Pedidos',
    icon: 'eva:person-fill',
    linkTo: 'dashboard/pedidos/1',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(null);
  const [usuario, setUsuario] = useState({})
  const [props, setProps] = useState({})
  const [data, setdata] = useState([])
  const useref = collection(db, "usuarios")
  function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  async function getuid() {
      const auth = getAuth();
       auth.onAuthStateChanged((credential)=>{
        if(credential){
          const pega = credential
          
          const data ={id:pega.uid,foto:pega.photoURL,email:pega.email,nome1:pega.displayName}
          setUsuario(data)
          
        }
      })
  }
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
   useEffect(() => {
     getuid();
     const getUsers = async () => {
      const data = await getDocs(useref);
      setdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };
    getUsers();
    for (let i = 0; i < data.length; i += 1) {
     if(data[i].email === usuario.email ){
       data[i].login = true
       const pega = data[i]
       setProps(pega)
     }
     
    }
    
   }, [pathname])
   
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={usuario.foto? usuario.foto:'https://www.prescriptum.com.br/wp-content/uploads/2015/12/placeholder-usuario-500x500.jpg'} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {usuario.nome1}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {usuario.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout()}  sx={{ m: 1 }}>
          <Link className='nav-link' to="/login">Logout</Link>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
