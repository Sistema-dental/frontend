// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db, { fireapp } from '../../Apifire';

// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const [usuario, setUsuario] = useState({})
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const useref = collection(db, "usuarios")
  const auth = getAuth(fireapp);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(useref);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    
  }, [useref]);
  
   const loggugu= async () =>{
   signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    console.log(user)
    const pega = user
    const dat ={id:pega.uid,foto:pega.photoURL,email:pega.email,nome1:pega.displayName}
    console.log(dat)
   
    console.log(users)
    const brabo = users.find(d => d.email === dat.email)
    if(brabo){
       navigate('/dashboard/products', { replace: true });
    }else{
      criarDado(usuario);
      return navigate('/dashboard/products', { replace: true });
    }
     
    
    
    
    
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
