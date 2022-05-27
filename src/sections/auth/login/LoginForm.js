import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2'
import Iconify from '../../../components/Iconify';
import db,{fireapp} from '../../../Apifire';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [props, setProps] = useState("")
  const [user, setUser] = useState([])
  const useref = collection(db, "usuarios")
  
 
  
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    senha: Yup.string().required('Password is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      log();
    },
  });
  function get (id){
    const local = localStorage.getItem('usertemp') ? JSON.parse(localStorage.getItem('usertemp')) : [] 
    return local[id]
}
  const { errors, touched, values, isSubmitting , handleSubmit, getFieldProps } = formik;

  const auth = getAuth(fireapp);

  function sucesso() {
    
    const Toast = Swal.mixin({
     toast: true,
     position: 'top-end',
     showConfirmButton: false,
     timer: 3000,
     timerProgressBar: true,
     didOpen: (toast) => {
       toast.addEventListener('mouseenter', Swal.stopTimer)
       toast.addEventListener('mouseleave', Swal.resumeTimer)
     }
   })
   
   Toast.fire({
     icon: 'success',
     title: 'logado com sucesso'
   })} 
 
 async function pegaemail() {
 
     const { value: email } = await Swal.fire({
       title: 'Coloque o email da conta que deseja recuperar a senha',
       input: 'email',
       inputLabel: 'Your email address',
       inputPlaceholder: 'Coloque seu email aqui'
     })
     
     if (email) {
       Swal.fire({
         title: `Email digitado: ${email}?`,
         text: "Confirme se o seu email esta correto!",
         icon: 'question',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'SIM Enviar email!',
         cancelButtonText: 'NÃO Sair'
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire(
             'Email enviado com sucesso!',
             'Acesse seu email para trocar a senha.',
             'success'
           )
           setProps(email)

         }else{
           Swal.fire(
            'Email não enviado!',
            'Faça o processo novamente.',
            'error'
           )
           }
       })
     }
    }

  function log() {
    
    signInWithEmailAndPassword(auth, values.email, values.senha)
    .then((usuario) => {
      // Signed in
      const user = usuario.user;
       const temp = get(user.uid)
       console.log(temp);
      console.log(user)
       sucesso()
      navigate('/dashboard/app', { replace: true });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('usuario ou senha incorretos')
      navigate('/login', { replace: true });
    });
    
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  
    
    
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Endereço de Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...getFieldProps('senha')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Lembre me"
          />

          <Link component={RouterLink} variant="subtitle2" to=""  underline="hover" onClick={()=>pegaemail()} >
            Esqueceu a senha?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} onClick={onsubmit}>
          Entrar
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}