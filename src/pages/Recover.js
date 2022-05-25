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
import Iconify from '../components/Iconify';
import db,{fireapp} from '../Apifire'

// ----------------------------------------------------------------------

export default function Recover() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [telefone, setTelefone] = useState("")
  const [tipo, setTipo] = useState("")
  const [user, setUser] = useState({})
  const useref = collection(db, "usuarios") 

  
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
  
  const auth = getAuth(fireapp);

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
      navigate('/products', { replace: true });
    },
  });
  function recoverPassword() {
    if(values.email){
    auth.sendPasswordResetEmail(values.email).then(() => {
        
        alert('Email enviado com sucesso');
    }).catch(error => {
        alert('tente novamente');
    });}else{
      alert('preencha o campo de email no formulario')
    }
}
  const { errors, values , touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Endereço de E-mail"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Enviar
          </LoadingButton>
        
      </Form>
    </FormikProvider>
  );
}
