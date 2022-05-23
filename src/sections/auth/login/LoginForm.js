import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { collection, getDocs } from 'firebase/firestore';
import Iconify from '../../../components/Iconify';
import db from '../../../Apifire';
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
  
  function log() {
    for (let i = 0; i < user.length; i += 1) {
      console.log(values.email)
      console.log(user[i].email)
      console.log(values.senha)
      console.log(user[i].email)
     if(user[i].email === values.email && user[i].senha === values.senha){
       user[i].login = true
       return (navigate('/dashboard/app', { replace: true }))
     }
    }
    return alert('usuario ou senha incorretos')
    
  }
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
