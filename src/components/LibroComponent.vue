<script setup>
import { useRouter } from 'vue-router'

// Libros.vue pasa los datos de cada libro al componente hijo LibroComponent mediante props
const props = defineProps({
  libro: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const verDetalle = () => {
  router.push({
    path: `/libros/${props.libro.id}`
  })
}

// se declara el evento personalizado eliminar, que le avisará al componenete padre, Libros.vue, cuando el usuario haga click en el boton para eliminar un libro
const emit = defineEmits(['eliminar-libro'])
</script>

<template>
    <li class="tarjeta-libro">
        <div class="contenido-libro">
            <h3 class="titulo-libro">📚 {{ props.libro.titulo }}</h3>

            <div class="datos-libro">
                <p><span>Autor: </span>{{ props.libro.autor }}</p>
                <p><span>Categoría: </span>{{ props.libro.categoria }}</p>
            </div>
        </div>

        <div class="acciones-libro">
            <button type="button" class="btn-detalle" @click="verDetalle">Ver Detalle libro</button>
            <!-- cuando el usuario solicita eliminar un libro, LibroComponent emite el evento personalizado "eliminar" al compoenete padre Libros.vue -->
            <button type="button" class="btn-eliminar" @click="emit('eliminar-libro')">Eliminar libro</button>
        </div>

    </li>
</template>

<style scoped>
.tarjeta-libro {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    align-items: center;

    min-height: 190px;
    padding: 1.8rem;

    border: 1px solid #cbd5e1;
    border-radius: 12px;

    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);

    box-sizing: border-box;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tarjeta-libro:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(30, 64, 175, 0.18);
}

.contenido-libro {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.acciones-libro {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.titulo-libro {
    color: #000022;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
}

.datos-libro {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    text-align: center;

    /* para que quede una linea divisora */
    padding: 1rem 0;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
}

.datos-libro p {
    margin: 0;
    color: #475569;
}

.datos-libro span {
    color: #1e293b;
    font-weight: 600;
}

.btn-eliminar {
    align-self: auto;
    padding: 0.8rem 1.2rem;
    border: 1px solid #991b1b;
    border-radius: 8px;

    background-color: #fee2e2;
    color: #991b1b;

    font-size: 0.95rem;
    font-weight: 600;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.btn-eliminar:hover {
    background-color: #991b1b;
    color: #ffffff;
    font-weight: bold;

}

.btn-detalle {
    align-self: auto;
    padding: 0.8rem 1.2rem;
    border: 1px solid #2563eb;
    border-radius: 8px;

    background-color: #d2dcf5;
    color: #1d4ed8;

    font-size: 0.95rem;
    font-weight: 600;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.btn-detalle:hover {
    background-color: #1d4ed8;;
    color: #ffffff;
    font-weight: bold;
}

@media (max-width: 700px) {

    .tarjeta-libro {
        min-height: auto;
    }
}
</style>
