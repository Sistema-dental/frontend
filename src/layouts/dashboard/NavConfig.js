// component
import { useEffect } from 'react';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Pedidos',
    path: '/dashboard/pedidos',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Produtos',
    path: '/dashboard/produtos',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Feed',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Teste',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
