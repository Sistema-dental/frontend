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
import Iconify from '../../../components/Iconify';
import db,{fireapp} from '../../../Apifire';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [user, setUser] = useState([])
  const useref = collection(db, "usuarios")
  
  useEffect(() => {
    async function data() {
      const data = await getDocs(useref)
      
      const pega = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      
      setUser(pega)
      
    }
    data();
  }, [])
  
  
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
  
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  function log() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.senha)
    .then((usuario) => {
      // Signed in
      const user = usuario;
      console.log(user)
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

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Esqueceu a senha?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onsubmit}>
          Entrar
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
