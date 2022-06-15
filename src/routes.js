import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Pedido from './pages/pedidos/Pedido';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Produtos from './pages/produtos/Products';
import DashboardApp from './pages/DashboardApp';
import Editar from './pages/usuario/Editar';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'pedidos', element: <Pedido /> },
        { path: 'produtos', element: <Produtos /> },
        { path: 'blog', element: <Blog /> },
        { path: 'editar/usuario', element: <Editar /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
