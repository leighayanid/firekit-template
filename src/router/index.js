import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ '../views/LoginPage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import(
                    /* webpackChunkName: "register" */ '../views/RegisterPage.vue'
                )
        },
        {
            path: '/crud',
            name: 'crud',
            component: () =>
                import(/* webpackChunkName: "feed" */ '../views/CRUDPage.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import(
                    /* webpackChunkName: "feed" */ '../views/ProfilePage.vue'
                ),
            meta: {
                requiresAuth: true
            }
        }
    ]
})

const getCurrentUser = () =>
    new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                resolve(user)
            },
            reject
        )
    })

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            alert("You don't have access to this page")
            next('/')
        }
    } else {
        next()
    }
})

export default router
