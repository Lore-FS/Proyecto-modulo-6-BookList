<script setup>
defineProps({
  usuarioActivo: {
    type: Object,
    default: null
  }
})

</script>

<template>
    <header class="header">
        <div class="header-contenido">
            <div class="marca">
                <img src="../assets/logo4.png" alt="Logo BookList" class="logo-header" />
                <h1>BookList</h1>
            </div>

            <nav aria-label="Navegación principal">
                <p v-if="usuarioActivo && usuarioActivo.invitado" class="usuario-header">Hola invitad@, {{
                    usuarioActivo.nombre }}</p>
                <p v-else-if="usuarioActivo" class="usuario-header">Hola, {{ usuarioActivo.nombre }}</p>

                <ul class="nav-list">
                    <li>
                        <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
                    </li>

                    <li>
                        <RouterLink class="link" :to="{ name: 'libros' }">Libros</RouterLink>
                    </li>

                    <li>
                        <RouterLink class="link" :to="{ name: 'crear' }">Agregar libro</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    width: 100%;
    background-color: #000022;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
}

.header-contenido {
    width: 100%;
    /* max-width: 1126px; */
    min-height: 86px;
    margin: 0 auto;
    padding: 0.8rem 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    box-sizing: border-box;
}

.marca {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.logo-header {
    width: 58px;
    height: 58px;

}

.usuario-header {
    margin: 0 0 1.5rem;
    text-align: right;
    font-size: 0.9rem;
    color: #dbeafe;
}

.marca h1 {
    margin: 0;
    color: #ffffff;
    font-size: 2rem;
    line-height: 1;
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    /* margin: 0;
    padding: 0; */
    list-style: none;
}

.link {
    padding: 0.65rem 1rem;
    color: #ffffff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.link:hover {
    background-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
}

.link.router-link-active {
    background-color: #2563eb;
    color: #ffffff;
}

@media (max-width: 700px) {
    .header-contenido {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        padding: 1rem;
        gap: 1.2rem 1rem;
    }

    .marca {
        grid-column: 1;
        grid-row: 1;
    }

    .marca h1 {
        font-size: 1.6rem;
    }

    .logo-header {
        width: 50px;
        height: 50px;
    }

    nav {
        display: contents;
    }

    .usuario-header{
        grid-column: 2;
        grid-row: 1;
        margin: 0;
        text-align: right;
        font-size: 0.85rem;
    }

    .nav-list {
        grid-column: 1 / -1; /* ocupa las dos columnas, .nav-list empieza en la primera y llega hasta la última */
        grid-row: 2; /* va en la segunda fila */
        display: flex; /* organizar los links en la segunda fila*/
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap; /* todos los links en una fila, no pueden saltar a otra fila */
        gap: 0.5rem;
        margin: 0;
        padding: 0;
    }

    .link {
        padding: 0.6rem 0.8rem;
    }
}
</style>
