// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db, { fireapp } from '../../Apifire';

// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const [usuario, setUsuario] = useState({})
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const useref = collection(db, "usuarios")
  const auth = getAuth(fireapp);
   const loggugu= async () =>{
   signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    async function confere() {
      const oi = await getDocs(useref);
    setData(oi)}
    console.log(user)
    const pega = user
    const dat ={id:pega.uid,foto:pega.photoURL,email:pega.email,nome1:pega.displayName}
    confere();
    setUsuario(dat);
    const brabo = data.find(da => da.email === pega.email)
    console.log(brabo)
    
         
      
      
      
     
    // criarDado(usuario);
    
    // navigate('/dashboard/products', { replace: true });
    
    
    
    
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
        
      
}

 

  
  async function criarDado(data) {
    try {
        data.login = false
        data.tipo = 3
        const user = await addDoc(collection(db, "usuarios"), data );
    
      

      console.log("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  
 
  
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={loggugu} >
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OU
        </Typography>
      </Divider>
    </>
  );
}
