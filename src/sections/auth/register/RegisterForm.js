import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection , getDocs , addDoc } from 'firebase/firestore';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import db,{fireapp} from '../../../Apifire'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [telefone, setTelefone] = useState("")
  const [tipo, setTipo] = useState("")
  const [user, setUser] = useState({})
  const useref = collection(db, "usuarios") 

  async function criarDado(data) {
    try {
      if(data.tipo){
        data.login = false
        const user = await addDoc(collection(db, "usuarios"), data );
      }else{
        data.login = false
        data.tipo = 3
        const user = await addDoc(collection(db, "usuarios"), data );
      }
      

      console.log("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(useref);
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [useref]);
  const RegisterSchema = Yup.object().shape({
    nome1: Yup.string().min(2, 'Muito pequena!').max(50, 'Muito Grande!').required('nome e obrigatorio'),
    nome2: Yup.string().min(2, 'Muito pequena!').max(50, 'Muito Grande!').required('nome e obrigatorio'),
    email: Yup.string().email('Precisamos de um email valido').required('o email e obrigatorio'),
    senha: Yup.string().min(6, 'Muito pequena!').max(40, 'Muito Grande!').required('senha necessaria'),
    telefone:  Yup.number('O campo deve ser um numero').integer('O numero deve ser inteiro').required('telefone e obrigatorio')
  });
  
  function create() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.senha)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  const formik = useFormik({
    initialValues: {
      nome1: '',
      nome2: '',
      email: '',
      senha: '',
      telefone:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const data = values
      create();
      criarDado(data);
      navigate('/login', { replace: true });
    },
  });

  const { errors, values , touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Primeiro nome"
              {...getFieldProps('nome1')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Ultimo nome"
              {...getFieldProps('nome2')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Endereço de E-mail"
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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="number"
            type="number"
            label="Telefone"
            value=""
            onChange=""
            {...getFieldProps('telefone')}
            error={Boolean(touched.telefone && errors.telefone)}
            helperText={touched.telefone && errors.telefone}
          >
          <ReactInputMask mask="(00)9xxxxxxxx" maskChar=" " />
          </TextField>  
          
  
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Cadastrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
