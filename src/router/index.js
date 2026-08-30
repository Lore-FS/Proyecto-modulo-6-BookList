import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Libros from '../views/LibrosView.vue'
import CrearLibro from '../views/CrearLibroView.vue'
import DetalleLibro from '../views/DetalleLibroView.vue'
import NotFound from '../views/NotFoundView.vue'
import DescripcionLibro from '../views/DescripcionLibroView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/libros',
      name: 'libros',
      component: Libros
    },
    {
      path: '/libros/:id',
      name: 'libroDetalle',
      component: DetalleLibro,
      props: true,
      children: [
        {
          path: 'descripcion',
          name: 'libroDescripcion',
          component: DescripcionLibro
        }
      ]
    },
    {
      path: '/crear',
      name: 'crear',
      component: CrearLibro
    },
    // ruta comodin para capturar cualquier ruta no definida y redirigir a vista con error 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
