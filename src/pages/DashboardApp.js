import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import db, { fireapp } from '../Apifire'
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({})
  const [props, setProps] = useState({tipo:'admin'})
  const [data, setdata] = useState([])
  const useref = collection(db, "usuarios")
  const auth = getAuth(fireapp);
  async function getuid() {
     onAuthStateChanged((credential)=>{
      if(credential){
        const pega = credential
        
        const data ={id:pega.uid,foto:pega.photoURL,email:pega.email}
        console.log(data)
        setUsuario(data)
        
      }
    })
}

 useEffect(() => {
 /* getuid();
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
   
  } */
  
 }, [data,usuario.email,useref])
 
 
  return (
    <Page title="Dashboard">
      
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
         Bem vindo a Dental brasil {props.nome1}{' '}{props.nome2}
        </Typography>
        { props.tipo === 'normal' && navigate('/dashboard/products', { replace: true })}
        {(props.tipo === 'admin' ) && <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Vendas totais" total={12345} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Novos usuarios" total={54321} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pedidos em ordem" total={12345} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={54321} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="grafico estilo 1 datas"
              subheader="Sub header facil para qualquer coisa"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="grafico de pizza dados visitas"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Grafico de rank de valores"
              subheader="de noovo essa legenda facil pra qualquer coisa"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1234 },
                { label: 'United Kingdom', value: 12 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="grafico de materias como habilidades"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="grafico de usuarios com propiedades"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="grafico Timeline estilo localizações"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="exemplo de cards de acesso as redes"
              list={[
                {
                  name: 'FaceBook',
                  value: 12,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 21,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 31,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 13,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tarefas a ser feitas"
              list={[
                { id: '1', label: 'Fazer informações' },
                { id: '2', label: 'Fazer as paginas adicionais' },
                { id: '3', label: 'Fazer backend' },
                { id: '4', label: 'Pegar e testa as parada' },
                { id: '5', label: 'Fase de testes' },
              ]}
            />
          </Grid>
        </Grid>}
      </Container>
    </Page>
  );
}
