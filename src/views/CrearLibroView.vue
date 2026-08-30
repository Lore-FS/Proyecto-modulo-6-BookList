<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['agregar-libro'])

const libro = reactive({
  titulo: '',
  categoria: '',
  autor: '',
  descripcion: ''
})

const mostrarMensaje = ref(false)
const mensajeError = ref('')

const mostrarInfoGuia = ref(false)

const handleSubmit = () => {
  mostrarMensaje.value = false
  mensajeError.value = ''

  if (!libro.titulo.trim() || !libro.categoria || !libro.autor.trim() || !libro.descripcion.trim()) {
    mensajeError.value = '❌ No ha llenado todos los campos. Debe ingresar el título, la categoría, el autor y la descripción.'
    // alert("No ha llenado todos los campos. Debe ingresar título, categoría, autor y descripción.");
    return
  }

  const nuevoLibro = {
    titulo: libro.titulo.trim(),
    categoria: libro.categoria,
    autor: libro.autor.trim(),
    descripcion: libro.descripcion.trim()
  }

  // enviar nuevo libro agregado al padre App.vue
  emit('agregar-libro', nuevoLibro)

  mostrarMensaje.value = true

  libro.titulo = ''
  libro.categoria = ''
  libro.autor = ''
  libro.descripcion = ''
}

const limpiarMensajeError = () => {
  mensajeError.value = ''
}
</script>

<template>
    <section class="crear-view">
        <div class="encabezado-crear">
            <h2>Agregar un libro</h2>
            <p>Complete el formulario para registrar un nuevo libro.</p>
        </div>

        <div class="crear-grid">
            <form class="formulario-libro" @submit.prevent="handleSubmit">
                <div class="titulo-formulario">
                    <h3>Datos del libro</h3>
                    <!-- agregar un boton de info que indique, al hacer click, una sola vez (.once), las instrucciones para agregar un nuevo libro -->
                    <button type="button" class="btn-info" v-if="!mostrarInfoGuia" @click.once="mostrarInfoGuia = true"
                        title="Información">ℹ</button>
                </div>

                <div class="campo">
                    <label for="titulo">Título</label>
                    <!-- @keydown.enter.prevent incluido como evento de teclado para permitir guardar el libro con Enter desde el campo de texto titulo-->
                    <input id="titulo" v-model.trim="libro.titulo" type="text" placeholder="Ingrese el título" @input="limpiarMensajeError"
                        @keydown.enter.prevent="handleSubmit" />
                </div>

                <div class="campo">
                    <label for="categoria">Categoría</label>
                    <select id="categoria" v-model="libro.categoria" @change="limpiarMensajeError">
                        <option disabled value="">Seleccione una categoría</option>
                        <option>Novela</option>
                        <option>Filosofía</option>
                        <option>Tragedia clásica</option>
                        <option>Historia</option>
                        <option>Ciencias</option>
                    </select>
                </div>

                <div class="campo">
                    <label for="autor">Autor</label>
                    <!-- @keydown.enter incluido como evento de teclado para permitir guardar el libro con Enter desde el campo de texto autor-->
                    <input id="autor" v-model.trim="libro.autor" type="text" placeholder="Ingrese el autor" @input="limpiarMensajeError"
                        @keydown.enter.prevent="handleSubmit" />
                </div>

                <div class="campo">
                    <label for="descripcion">Descripción</label>
                    <textarea id="descripcion" v-model.trim="libro.descripcion" rows="5"
                        placeholder="Ingrese una breve descripción" @input="limpiarMensajeError"></textarea>
                </div>

                <p v-if="mensajeError" class="mensaje error">{{ mensajeError }}</p>

                <button type="submit" class="btn-guardar">Guardar libro</button>

                <div class="info">
                    <p v-if="mostrarInfoGuia" class="texto-info">💡 Complete título, categoría, autor y descripción para registrar un
                        libro. Todos los campos son obligatorios.</p>
                </div>

                <div v-show="mostrarMensaje" class="mensaje exito">
                    <p>✅ Libro agregado correctamente.</p>
                    <RouterLink class="link-listado" :to="{ name: 'libros' }">Ir al listado de libros ➡</RouterLink>
                </div>
            </form>

            <section class="vista-previa">
                <h3>📚 Vista previa</h3>
                <div class="datos-previa">
                    <p><span>Título: </span>{{ libro.titulo || "Sin título" }}</p>
                    <p><span>Categoría: </span>{{ libro.categoria || "Sin categoría" }}</p>
                    <p><span>Autor: </span>{{ libro.autor || "Sin autor" }}</p>
                    <div class="descripcion-previa">
                        <span>Descripción: </span>
                        <p class="descripcion-placeholder">{{ libro.descripcion || "Sin descripción..." }}</p>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<style scoped>
.crear-view {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.encabezado-crear {
    margin-bottom: 2rem;
    text-align: center;
}

.encabezado-crear h2 {
    margin: 0 0 0.4rem;
    color: #000022;
    font-size: 2rem;
}

.encabezado-crear p {
    margin: 0;
    color: #475569;
}

.crear-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 1.5rem;
    align-items: start;
}

.titulo-formulario {
    position: relative;
    text-align: center;
    margin-bottom: 1.5rem;
}

.formulario-libro,
.vista-previa {
    padding: 2rem;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
    box-sizing: border-box;
}

.formulario-libro {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.formulario-libro h3,
.vista-previa h3 {
    margin: 0 0 0.5rem;
    color: #000022;
    text-align: center;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: left;
}

.campo label {
    color: #1e293b;
    font-weight: 600;
}

.campo input,
.campo select,
.campo textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background-color: #f8fafc;
    color: #1f2937;
    box-sizing: border-box;
}

.campo textarea {
    resize: vertical;
    min-height: 120px;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
    border-color: #2563eb;
    outline: 2px solid #bfdbfe;
}

.btn-guardar {
    padding: 0.8rem 1.2rem;
    border: 2px solid #2563eb;
    border-radius: 8px;
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.btn-guardar:hover {
    background-color: #000022;
    color: #ffffff;
    font-weight: bold;
}

.info {
    margin-top: 0.5rem;
}

.btn-info {
    position: absolute;
    right: 0;
    top: 50%;
    width: 28px;
    height: 28px;
    font-size: 15px;

    border: 1px solid orange;
    border-radius: 50%;

    background-color: #fff7ed;
    color: orange;
    cursor: pointer;
    transform: translateY(-50%);
    transition: background-color 0.2s ease, color 0.2s ease;
}

.btn-info:hover {
    background-color: orange;
    color: rgb(247, 232, 205);
    font-weight: bold;
}

.texto-info {
    width: 100%;
    margin: 0;
    padding: 0.9rem 1rem;

    border-left: 4px solid orange;
    border-radius: 6px;

    background-color: #fff7ed;
    color: #7c2d12;

    box-sizing: border-box;
    text-align: center;
}

.vista-previa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.icono-libro {
    font-size: 3rem;
    line-height: 1;
}

.datos-previa {
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
    text-align: left;
}

.datos-previa p {
    margin: 0 0 0.8rem;
    color: #6b7280;
    overflow-wrap: anywhere;
}

.datos-previa span {
    color: #1e293b;
    font-weight: 600;
}

.descripcion-previa {
    padding: 1rem;
    border-left: 5px solid #000022;
    border-radius: 6px;
    background-color: #eff6ff;
}

.descripcion-previa p {
    margin: 0.4rem 0 0;
    line-height: 1.6;
    font-style: italic;
}

.mensaje {
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 1rem;
}

.descripcion-placeholder {
    color: #6b7280;
    font-style: italic;
}

.mensaje p {
    margin: 0 0 0.4rem;
}

.error {
    background-color: #fee2e2;
    border-left: 4px solid #991b1b;
    color: #991b1b;
}

.exito {
    background-color: #dcfce7;
    border-left: 4px solid #166534;
    color: #166534;
}

.link-listado {
    color: #166534;
    font-weight: 700;
    text-decoration: none;
}

.link-listado:hover {
    text-decoration: underline;
}

@media (max-width: 750px) {
    .crear-grid {
        grid-template-columns: 1fr;
    }

    .formulario-libro,
    .vista-previa {
        padding: 1.5rem;
    }
}
</style>
