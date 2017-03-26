import VueRouter from 'vue-router'
import home from '../views/home'

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    }
  ]
});

export default router