import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import About from '../views/About';
import Toys from '../views/Toys';
import Chat from '../views/Chat';
import ToyDetails from '../views/Toy-Details';
import ToyEdit from '../views/Toy-Edit';
import Login from '../views/Login';
import Signup from '../views/Signup';
import { userService } from '../services/user.service';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/details/:toyId',
        name: 'Details',
        component: ToyDetails,
    },
    {
        path: '/edit/:toyId',
        name: 'Edit',
        component: ToyEdit,
    },
    {
        path: '/chat/:type/:id',
        name: 'Chat',
        component: Chat,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/toys',
        name: 'Toys',
        component: Toys,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register', '/', '/toys', '/edit'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = userService.checkStoredUser();

    if (authRequired && !loggedIn) {
        console.error('NOT LOGGED...redirecting by route guard');
        return next('/login');
    }
    next();
});

export default router;
