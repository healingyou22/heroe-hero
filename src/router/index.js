import { createRouter, createWebHistory } from 'vue-router'
import Home2View from '../views/Home2View.vue'
import GalleryView from '../views/GalleryView.vue'
import OrderView from '../views/OrderView/OrderView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import OrderListView from '../views/OrderView/OrderListView.vue'
import PricingView from '../views/PricingView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import InvoiceView from '../components/Invoice.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: Home2View
    }, {
        path: '/home',
        name: 'home2',
        component: Home2View
    }, {
        path: '/pricing',
        name: 'pricing',
        component: PricingView,
    }, {
        path: '/gallery',
        name: 'gallery',
        component: GalleryView
    }, {
        path: '/order',
        name: 'order',
        component: OrderView,
        meta: { requiresAuth: true }
    }, {
        path: '/order/list',
        name: 'order.list',
        component: OrderListView,
        meta: { requiresAuth: true }
    }, {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guest: true }
    }, {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { guest: true }
    }, {
        path: '/aboutus',
        name: 'aboutus',
        component: AboutUsView,
    }, {
        path: '/invoice/:id',
        name: 'invoice',
        component: InvoiceView,
        meta: { requiresAuth: true }
    }]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token') == null;

    // window.localStorage.clear();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (token) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (!token) {
            next({ name: 'home' })

        } else {
            next()
        }
    } else {
        next()
    }
})

export default router