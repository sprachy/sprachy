import Router from 'vue-router'
import _ from 'lodash'
import LoginPage from './LoginPage.vue'

export function makeRouter() {
    const router = new Router({
        mode: 'history',
        routes: [
            {
                path: "/login",
                name: "login",
                component: LoginPage
            },
            // {
            //     path: '*',
            //     component: PageNotFound
            // }
        ]
    })

    return router
}
