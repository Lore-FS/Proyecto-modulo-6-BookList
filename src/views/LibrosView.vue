<script setup>
import LibroComponent from '../components/LibroComponent.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  libros: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['eliminar-libro'])

// obtener todos los autores existentes, sin repetirlso, según el arreglo de libros
const autores = computed(() => {
  const autoresLibros = props.libros.map(libro => libro.autor)
  return autoresLibros.filter((autor, indice) => {
    return autoresLibros.indexOf(autor) === indice
  })
})

// obtener todos las categorias existentes, sin repetirlas, según el arreglo de libros usando funcion computada
const categorias = computed(() => {
  const categoriasLibros = props.libros.map(libro => libro.categoria)

  return categoriasLibros.filter((categoria, indice) => {
    return categoriasLibros.indexOf(categoria) === indice
  })
})

const autorSeleccionado = ref('')
const categoriaSeleccionada = ref('')

// filtrar la lista de libros segun lo que seleccione usuario, usando funcion computada
const librosFiltrados = computed(() => {
  return props.libros.filter(libro => {
    const cumpleAutor = !autorSeleccionado.value || libro.autor === autorSeleccionado.value
    const cumpleCategoria = !categoriaSeleccionada.value || libro.categoria === categoriaSeleccionada.value
    return cumpleAutor && cumpleCategoria
  })
})
</script>

<template>
    <section class="libros-view">
        <div class="encabezado-libros">
            <h2>Listado de libros</h2>
            <p>Consulte los libros registrados y acceda a sus detalles.</p>
        </div>

        <!-- mostrar los filtros sólo cuando existen libros usando v-show-->
        <div v-show="libros.length > 0" class="filtros-busqueda-libros">
            <h3>🔍 Selección personalizada con filtros</h3>

            <div class="filtros-grid">
                <div class="campo-filtro">
                    <label for="autor">Autor</label>

                    <select v-model="autorSeleccionado" id="autor">
                        <option value="">Todos los autores</option>

                        <option v-for="autor in autores" :key="autor" :value="autor">
                            {{ autor }}
                        </option>
                    </select>
                </div>

                <div class="campo-filtro">
                    <label for="categoria">Categoría</label>

                    <select v-model="categoriaSeleccionada" id="categoria">
                        <option value="">Todas las categorías</option>

                        <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                            {{ categoria }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- mostrar mensaje cuando no hay libros (el catálogo está vacío) -->
        <div v-if="libros.length === 0" class="mensaje-vacio">
            <h3>📂 No existen libros registrados</h3>
            <RouterLink class="link-agregar" :to="{ name: 'crear' }">Agregar nuevo libro ➡</RouterLink>
        </div>

        <!-- mostar mensaje cuando hay libros, pero el filtro no encuentra resultados-->
        <div v-else-if="libros.length > 0 && librosFiltrados.length === 0" class="mensaje-vacio">
            <h3>🕵️‍♂️ No existen libros que coincidan con los filtros seleccionados.</h3>
        </div>

        <!-- se renderiza el listado con LibroComponent cuando sí hay resultados -->
        <ul v-else class="lista-libros">
            <LibroComponent v-for="libro in librosFiltrados" :key="libro.id" :libro="libro"
                @eliminar-libro="emit('eliminar-libro', libro.id)">
            </LibroComponent>
            <!-- Libros.vue (padre) escucha el evento personalizado "eliminar-libro" emitido desde LibroComponent (hijo) y luego lo emite y envia el id del libro a App.vue (padre principal), quien finalmente ejecuta la funcion deleteLibro con el id recibido -->
        </ul>
    </section>
</template>

<style scoped>
.libros-view {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.encabezado-libros {
    margin-bottom: 2rem;
    text-align: center;
}

.encabezado-libros h2 {
    margin: 0 0 0.4rem;
    color: #000022;
    font-size: 2rem;
}

.encabezado-libros p {
    margin: 0;
    color: #475569;
}

.filtros-busqueda-libros {
    margin-bottom: 2rem;
    padding: 1.5rem;

    border: 1px solid #cbd5e1;
    border-radius: 12px;

    background-color: #ffffff;
    box-shadow: 0 6px 16px rgba(30, 64, 175, 0.1);

    text-align: left;
}

.filtros-busqueda-libros h3 {
    margin: 0 0 1.2rem;

    color: #000022;
    font-size: 1.1rem;
    text-align: center;
}

.filtros-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
}

.campo-filtro {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.campo-filtro label {
    color: #1e293b;
    font-weight: 600;
}

.campo-filtro select {
    width: 100%;
    padding: 0.75rem;

    border: 1px solid #cbd5e1;
    border-radius: 7px;

    background-color: #f8fafc;
    color: #1f2937;

    box-sizing: border-box;
}

.campo-filtro select:focus {
    border-color: #2563eb;
    outline: 2px solid #bfdbfe;
}

.lista-libros {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;

    margin: 0;
    padding: 0;
    list-style: none;
}

.mensaje-vacio {
    max-width: 500px;
    margin: 3rem auto;
    padding: 2rem;

    border: 1px solid #cbd5e1;
    border-radius: 12px;

    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
}

.mensaje-vacio h3 {
    margin-top: 0;
    color: #000022;
}

.link-agregar {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
}

.link-agregar:hover {
    color: #1d4ed8;
    text-decoration: underline;
}

@media (max-width: 700px) {
    .lista-libros {
        grid-template-columns: 1fr;
    }

    .filtros-grid {
        grid-template-columns: 1fr;
    }

}
</style>
