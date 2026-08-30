<script setup>
</script>

<template>
    <section class="error-view">
        <div class="mensaje-error">
            <h2>Error 404: Página no encontrada</h2>
            <p>🚧 No fue posible encontrar la ruta especificada.</p>
            <RouterLink class="link-volver" :to="{ name: 'home' }">⬅ Volver al inicio</RouterLink>
        </div>
    </section>
</template>

<style scoped>
.error-view {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
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

.mensaje-error {
    max-width: 520px;
    margin: 3rem auto;
    padding: 2rem;

    border: 1px solid #cbd5e1;
    border-radius: 12px;

    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);

    text-align: center;
}

.mensaje-error h2 {
    margin-top: 0;
    color: #000022;
}

.mensaje-error p {
    color: #475569;
}

</style>
