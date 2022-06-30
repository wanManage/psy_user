import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from './components/page/HelloWorld'
import UserLogin from './components/page/UserLogin'
// import Login from './components/page/Login'
import RegisterPage from './components/page/RegisterPage'
import UserLayout from './components/page/UserLayout'
import BoardView from './components/board/BoardView'
import PostsView from './components/post/PostsView'
import DetailView from './components/post/DetailView'
import IntroView from './components/test/IntroView'
import TestView from './components/test/TestView'
import TalkView from './components/talk/TalkView'
import ProfileView from './components/user/ProfileView'
import UserSecurityView from './components/user/UserSecurityView'
// import UserMessageView from './components/user/UserMessageView'
import MessageView from './components/message/MessageView'
import View404 from './components/exception/View404'
import View500 from './components/exception/View500'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login',
      component: UserLayout,
      children: [
        {
          path: '/board',
          component: BoardView
        },
        {
          path: '/posts',
          component: PostsView
        },
        {
          path: '/post/:id',
          component: DetailView,
          props: true
        },
        {
          path: '/test/:id',
          component: TestView
        },
        {
          path: '/test',
          component: IntroView
        },
        {
          path: 'talk',
          component: TalkView
        },
        {
          path: 'user',
          component: ProfileView
        },
        {
          path: 'user/security',
          component: UserSecurityView
        },
        // {
        //   path: 'user/message',
        //   component: UserMessageView
        // },
        {
          path: 'message/:id',
          component: MessageView
        },
        {
          path: 'error404',
          name: '404',
          component: View404
        },
        {
          path: 'error500',
          name: '500',
          component: View500
        }
      ]
    },
    {
      path: '/login',
      component: UserLogin
    },
    // {
    //   path: '/login2',
    //   // name: 'login',
    //   component: Login
    // },
    {
      path: '/register',
      // name: 'register',
      component: RegisterPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})