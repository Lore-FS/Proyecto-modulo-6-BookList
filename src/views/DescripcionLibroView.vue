<script setup>
defineProps({
  libro: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <div class="descripcion-libro">
        <h4>📖 Descripción</h4>
        <p>{{ libro.descripcion }}</p>
    </div>
</template>

<style scoped>

.descripcion-libro {
    margin-top: 1rem;
    width: 100%;

    padding: 1.2rem;

    border-left: 5px solid #000022;
    border-radius: 8px;

    background-color: #eff6ff;

    box-sizing: border-box;
    text-align: left;
}

.descripcion-libro h4 {
    margin: 0 0 0.5rem;
    color: #000022;
}

.descripcion-libro p {
    margin: 0;
    color: #475569;
    line-height: 1.6;
}

@media (max-width: 700px) {
.descripcion-libro {
    padding: 1rem;
}
}
</style>
