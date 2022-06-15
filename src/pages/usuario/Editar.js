import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { updateProfile, getAuth } from 'firebase/auth';
import { collection , getDocs , addDoc } from 'firebase/firestore';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import db,{fireapp} from '../../Apifire'
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function Editar() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [telefone, setTelefone] = useState("")
  const [tipo, setTipo] = useState("")
  const [user, setUser] = useState({})
  const useref = collection(db, "usuarios") 
  
  async function upusuario(data) {
    updateProfile(auth.currentUser, {
      displayName: data.nome, photoURL: data.foto, phoneNumber: data.telefone , email:data.email
    }).then(() => {
      // Profile updated!
      navigate('/produtos', { replace: true });
      // ...
    }).catch((error) => {
      // An error occurred
      navigate('/editar/usuario', { replace: true });
      // ...
    });
  }


  useEffect(() => {
    
  }, []);
  const RegisterSchema = Yup.object().shape({
    nome: Yup.string().min(2, 'Muito pequena!').max(50, 'Muito Grande!').required('nome e obrigatorio'),
    foto: "",
    email: Yup.string().email('Precisamos de um email valido').required('o email e obrigatorio'),
    senha: Yup.string().min(6, 'Muito pequena!').max(40, 'Muito Grande!').required('senha necessaria'),
    telefone:  Yup.number('O campo deve ser um numero').integer('O numero deve ser inteiro').required('telefone e obrigatorio')
  });
  
  const auth = getAuth(fireapp);

  const formik = useFormik({
    initialValues: {
      nome1: '',
      foto: '',
      email: '',
      senha: '',
      telefone:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      upusuario(values)
      
    },
  });

  const { errors, values , touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off"  onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nome completo"
              {...getFieldProps('nome')}
              error={Boolean(touched.nome1 && errors.nome1)}
              helperText={touched.nome1 && errors.nome1}
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
            autoComplete="number"
            type="number"
            label="Telefone"
            value=""
            mask=""
            onChange=""
            {...getFieldProps('telefone')}
            error={Boolean(touched.telefone && errors.telefone)}
            helperText={touched.telefone && errors.telefone}
          >
          <ReactInputMask mask="(99)99999-9999" maskChar="9" />
          </TextField>  
          <TextField
            fullWidth
            autoComplete=""
            type="file"
            label=""
            value=""
            
            onChange=""
            {...getFieldProps('foto')}
            error={Boolean(touched.foto && errors.foto)}
            helperText={touched.foto && errors.foto}
          />
           
          
  
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} onClick={()=>upusuario(values)} >
            Finalizado
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
