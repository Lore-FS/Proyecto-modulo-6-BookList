<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  id: { // este id proviene del parámetro dinámico :id de la ruta y VueRouter lo entrega como props gracias a props:true
    type: String,
    required: true
  },
  libros: {
    type: Array,
    required: true
  }
})

const route = useRoute()

const libro = computed(() => {
  return props.libros.find(libro => {
    return libro.id === Number(props.id)
  })
})
</script>

<template>
    <section class="detalle-view">
        <!-- mensaje para caso excepcional, en que el usuario ingresa manualmente en la URL un ID que no corresponde a ningún libro registrado-->
        <div v-if="!libro" class="mensaje-no-encontrado">
            <h2>Libro no encontrado</h2>
            <p>🕵️‍♂️ No existe actualmente un libro registrado en el catálogo con el ID: {{ props.id }}.</p>
            <RouterLink class="link-volver" :to="{ name: 'home' }">⬅ Volver al inicio</RouterLink>
        </div>

        <div v-else>
            <div class="encabezado-detalle">
                <h2>Detalle del libro</h2>
                <p>Información registrada del libro seleccionado.</p>
            </div>

            <article class="tarjeta-detalle">
                <h3 class="titulo-libro">📚 {{ libro.titulo }}</h3>

                <div class="datos-libro">
                    <p><span>Autor: </span>{{ libro.autor }}</p>
                    <p><span>Categoría: </span>{{ libro.categoria }}</p>
                </div>

                <RouterLink v-if="route.name === 'libroDetalle'" class="btn-descripcion" :to="`/libros/${props.id}/descripcion`">Ver descripción</RouterLink>

                <RouterLink v-else-if="route.name === 'libroDescripcion'" class="btn-descripcion" :to="`/libros/${props.id}`">Ocultar descripción</RouterLink>
                <!-- el RouterView enncuentra qué vista hija corresponde (en este caso es DescripcionLibroView), y cuando la renderiza, le entrega el objeto libro como props -->
                <RouterView v-slot="{Component}">
                    <component :is="Component" :libro="libro"/>
                </RouterView>

                <RouterLink class="link-volver" :to="{ name: 'libros' }">⬅ Volver al listado</RouterLink>
            </article>
        </div>
    </section>
</template>

<style scoped>
.detalle-view {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
}

.encabezado-detalle {
    margin-bottom: 2rem;
    text-align: center;
}

.encabezado-detalle h2 {
    margin: 0 0 0.4rem;
    color: #000022;
    font-size: 2rem;
}

.encabezado-detalle p {
    margin: 0;
    color: #475569;
}

.tarjeta-detalle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;

    padding: 2.2rem;

    border: 1px solid #cbd5e1;
    border-radius: 12px;

    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);

    box-sizing: border-box;
}

.titulo-libro {
    margin: 0;
    color: #000022;
    font-size: 1.8rem;
    text-align: center;
}

.datos-libro {
    width: 100%;
    max-width: 430px;

    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    padding: 1rem 0;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;

    text-align: center;
}

.datos-libro p {
    margin: 0;
    color: #475569;
}

.datos-libro span {
    color: #1e293b;
    font-weight: 600;
}

.btn-descripcion {
    padding: 0.8rem 1.2rem;
    border: 1px solid #2563eb;
    border-radius: 8px;

    color: #1d4ed8;
    background-color: #d2dcf5;
    border-color: #1d4ed8;

    font-size: 0.95rem;
    font-weight: 600;

    transition: background-color 0.2s ease, border-color 0.2s ease;
    text-decoration: none;
}

.btn-descripcion:hover {
    background-color: #2563eb;
    color: white;
    font-weight: bold;
}

.link-volver {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
}

.link-volver:hover {
    color: #1d4ed8;
    text-decoration: underline;
    font-weight: bold;
}

.mensaje-no-encontrado {
    max-width: 520px;
    margin: 3rem auto;
    padding: 2rem;

    border: 1px solid #cbd5e1;
    border-radius: 12px;

    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);

    text-align: center;
}

.mensaje-no-encontrado h2 {
    margin-top: 0;
    color: #000022;
}

.mensaje-no-encontrado p {
    color: #475569;
}

@media (max-width: 700px) {
    .tarjeta-detalle {
        padding: 1.5rem;
    }

    .titulo-libro {
        font-size: 1.5rem;
    }
}
</style>
