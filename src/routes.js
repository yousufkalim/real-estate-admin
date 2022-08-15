/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useTranslation } from 'react-i18next';

import Index from 'views/Index.js';
import Users from 'views/users/Users';
import News from 'views/news/News';
import Projects from 'views/projects/Projects';
import Register from 'views/Register.js';
import Login from 'views/Login.js';
// const { i18n, t } = useTranslation();
// const { language } = i18n;
const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-red',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'All  Investors',
    icon: 'ni ni-single-02 text-primary',
    component: Users,
    layout: '/admin',
  },
  {
    path: '/projects',
    name: 'All Projects',
    icon: 'ni ni-shop text-green',
    component: Projects,
    layout: '/admin',
  },
  {
    path: '/news',
    name: 'All News',
    icon: 'ni ni-collection text-teal',
    component: News,
    layout: '/admin',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-key-25 text-info',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-pink',
    component: Login,
    layout: '/auth',
  },
];

export default routes;
