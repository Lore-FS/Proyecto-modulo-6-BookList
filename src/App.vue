<script setup>
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()

// LIBROS predefinidos
const libros = ref([
  { id: 1, titulo: 'Meditaciones', categoria: 'Filosofía', autor: 'Marco Aurelio', descripcion: 'Reflexiones sobre la vida y la virtud.' },
  { id: 2, titulo: 'Orgullo y Prejuicio', categoria: 'Novela', autor: 'Jane Austen', descripcion: 'Novela sobre relaciones, prejuicios y sociedad.' },
  { id: 3, titulo: 'Inés del Alma Mía', categoria: 'Novela', autor: 'Isabel Allende', descripcion: 'Novela histórica ambientada en la conquista de Chile.' },
  { id: 4, titulo: 'La casa de los espíritus', categoria: 'Novela', autor: 'Isabel Allende', descripcion: 'Narra la historia de cuatro generaciones de la familia Trueba en Chile, mezclando el realismo mágico con los cambios políticos y sociales del siglo XX.' }
])

const ultimoId = Math.max(...libros.value.map(libro => libro.id))

const siguienteId = ref(ultimoId)

const addLibro = (libro) => {
  libro.id = ++siguienteId.value
  libros.value.push(libro)
}

const deleteLibro = (id) => {
  const indiceLibro = libros.value.findIndex((libro) => {
    return libro.id === id
  })

  if (indiceLibro === -1) {
    return
  }

  libros.value.splice(indiceLibro, 1)
}

// USUARIOS predefinidos
const usuarios = ref([
  { nombre: 'Ximena Cáceres', correo: 'ximena.caceres@gmail.com', password: '1234', invitado: false },
  { nombre: 'Juan Rodríguez', correo: 'juan.rodriguez@hotmail.com', password: '5678', invitado: false },
  { nombre: 'Laura González', correo: 'laura.gonzalez@yahoo.es', password: '9321', invitado: false }
])

const usuarioActivo = ref(null)

const iniciarSesion = (usuario) => {
  usuarioActivo.value = usuario
}

</script>

<template>
  <!-- HeaderComponent aparecerá en todas las vistas menos en Home y en NotFound-->
  <HeaderComponent v-if="route.name !== 'home' && route.name !== 'not-found'" :usuarioActivo="usuarioActivo" />

  <main class="contenido-principal">
    <!-- RouterView determina qué vista corresponde mostrar según la ruta actual. Con v-slot se obtiene esa vista en la variable Component y luego con :is="Component" se  renderiza dinámicamente, permitiendo asignarle diferentes props, eventos o KeepAlive según corresponda.-->
    <RouterView v-slot="{ Component }">

       <!-- se usa KeepAlive sólo en Home para conservar el estado del contador al cambiar de ruta (al navegar por la aplicación) -->
      <KeepAlive>
        <component :is="Component" v-if="route.name === 'home'" :usuarios="usuarios" :usuarioActivo="usuarioActivo"
          @login-exitoso="iniciarSesion" />
      </KeepAlive>

      <!-- renderiza LibrosView y le entrega el arreglo de libros. También escucha el evento emitido para eliminar un libro. -->
      <component :is="Component" v-if="route.name === 'libros'" :libros="libros" @eliminar-libro="deleteLibro" />

      <!-- renderiza DetalleLibroView tanto en la tuta de detalle como en su ruta hija de descripción, entregándole el arreglo de libros para buscar el libro por ID.-->
      <component :is="Component" v-else-if="route.name === 'libroDetalle' || route.name === 'libroDescripcion'" :libros="libros"/>

      <!-- renderiza CrearLibroView y escucha el evento con el nuevo libro para agregarlo al arreglo de libros. -->
      <component :is="Component" v-else-if="route.name === 'crear'" @agregar-libro="addLibro" />

      <!-- renderiza NotFoundView, que no requiere recibir props desde App.vue ni emitir eventos, y que corresponde al caso en que la ruta es inexistente -->
      <component :is="Component" v-else-if="route.name === 'not-found'" />

    </RouterView>
  </main>

  <FooterComponent />
</template>

<style scoped>
.contenido-principal {
  width: 100%;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
  box-sizing: border-box;

}
</style>
