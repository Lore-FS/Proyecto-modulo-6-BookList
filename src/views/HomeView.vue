<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  usuarios: {
    type: Array,
    required: true
  },
  usuarioActivo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['login-exitoso'])

const contador = ref(0)
const mensaje = ref('')

const credenciales = reactive({
  correo: '',
  password: ''
})

const incrementarContador = () => {
  contador.value++
}

const decrementarContador = () => {
  contador.value--
}

const resetearContador = () => {
  contador.value = 0
}

const handleSubmit = () => {
  // limpiar mensajes antes de validar
  mensaje.value = ''
  mensajeInvitado.value = ''

  const correo = credenciales.correo.trim()
  const password = credenciales.password.trim()

  // validar que los campos no los haya dejado vacíos el usuario
  if (!correo || !password) {
    mensaje.value = '❗ Debe ingresar su correo y contraseña.'
    return
  }

  const encontrado = props.usuarios.find((usuario) => {
    return usuario.correo === correo && usuario.password === password
  })

  if (!encontrado) {
    mensaje.value = '❌ El usuario ingresado no existe o la contraseña es incorrecta.'
    return
  }

  // enviar usuario encontrado al padre App.vue, luego de validarlo
  emit('login-exitoso', encontrado)

  credenciales.correo = ''
  credenciales.password = ''
}

const nombreUsuarioInvitado = ref('')
const mensajeInvitado = ref('')

const ingresarComoInvitado = () => {
  // limpiar mensajes antes de validar
  mensaje.value = ''
  mensajeInvitado.value = ''

  const nombre = nombreUsuarioInvitado.value.trim()

  // validar que los campos no los haya dejado vacíos el invitado
  if (!nombre) {
    mensajeInvitado.value = '❗ Debe ingresar su nombre para poder continuar como invitado.'
    return
  }

  const invitado = {
    nombre: nombre,
    invitado: true
  }

  // enviar usuario invitado al padre App.vue
  emit('login-exitoso', invitado)

  nombreUsuarioInvitado.value = ''
}

const mostrarFormularioInvitado = ref(false)

</script>

<template>
    <section class="home">
        <div class="home-encabezado">
            <img src="../assets/logo4.png" alt="Logo BookList" class="logo">
            <h2>Bienvenido a BookList</h2>
            <p>Inicie sesión o continúe como invitado para acceder al catálogo de libros.</p>
        </div>

        <div class="home-grid">
            <section class="tarjeta login-tarjeta">
                <div v-if="!mostrarFormularioInvitado && (!usuarioActivo || !usuarioActivo.invitado)">
                    <h3>Inicio de sesión</h3>

                    <!-- keydown.enter.prevent cancela el comportamiento normal de Enter para que no se produzca el submit automático del formulario nuevamente, así handleSubmit() se ejecuta una sola vez. -->
                    <form @submit.prevent="handleSubmit" class="form" @keydown.enter.prevent>
                        <div class="campo">
                            <label for="correo">Correo</label>
                            <input id="correo" v-model.trim="credenciales.correo" type="email"
                                placeholder="ejemplo@correo.com" />
                        </div>

                        <div class="campo">
                            <label for="password">Contraseña</label>
                            <input id="password" v-model.trim="credenciales.password" type="password"
                                placeholder="Ingrese su contraseña" />
                        </div>

                        <button type="submit" class="btn-principal">Ingresar</button>
                    </form>

                    <div>
                        <h4 v-if="!usuarioActivo">¿No tiene una cuenta? <a href="#"
                                @click.prevent="mostrarFormularioInvitado = true" class="link-form">Continuar como
                                invitado</a>
                        </h4>
                    </div>

                    <p v-if="mensaje" class="mensaje error">{{ mensaje }}</p>

                    <div v-if="usuarioActivo && !usuarioActivo.invitado" class="mensaje exito mensaje-login-exitoso">
                        <p class="texto-exito">✅ Inicio de sesión exitoso.</p>
                        <p>Sesión iniciada por: <strong>{{ usuarioActivo.nombre }}</strong></p>
                        <RouterLink class="link-libros" :to="{ name: 'libros' }">Ir a la lista de libros ➡</RouterLink>
                    </div>
                </div>

                <div v-else>
                    <h3>Ingreso como invitado</h3>
                    <form @submit.prevent="ingresarComoInvitado" class="form" @keydown.enter.prevent>
                        <div class="campo">
                            <label for="nombreUsuarioInvitado">Nombre </label>
                            <input type="text" id="nombreUsuarioInvitado" placeholder="Ingrese su nombre"
                                v-model.trim="nombreUsuarioInvitado">
                        </div>
                        <button type="submit" class="btn-principal">Continuar como invitado</button>
                    </form>

                    <div>
                        <h4 v-if="!usuarioActivo">¿Ya tiene una cuenta? <a href="#"
                                @click.prevent="mostrarFormularioInvitado = false" class="link-form">Volver al
                                inicio de sesión</a>
                        </h4>
                    </div>

                    <p v-if="mensajeInvitado" class="mensaje error">{{ mensajeInvitado }}</p>

                    <div v-if="usuarioActivo && usuarioActivo.invitado" class="mensaje exito mensaje-login-exitoso">
                        <p class="texto-exito">✅ Ingreso exitoso como invitad@.</p>
                        <p>Sesión iniciada por: <strong>{{ usuarioActivo.nombre }}</strong></p>
                        <RouterLink class="link-libros" :to="{ name: 'libros' }">Ir a la lista de libros ➡</RouterLink>
                    </div>
                </div>

            </section>

            <section class="tarjeta contador-seccion">
                <h3>Contador reactivo</h3>
                <p class="contador-numero">{{ contador }}</p>
                <p class="contador-parrafo">Cantidad de clicks realizados</p>

                <div class="botones-contador">
                    <button type="button" class="btn-secundario" @click="decrementarContador"
                        v-if="contador > 0">Decrementar</button>
                    <button type="button" class="btn-secundario" @click="incrementarContador">Incrementar</button>
                    <button type="button" class="btn-secundario" @click="resetearContador"
                        v-show="contador !== 0">Resetear</button>
                </div>
            </section>
        </div>

    </section>
</template>

<style scoped>
.home {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    color: #1f2937;
}

.logo {
    width: 130px;
    height: auto;
    display: block;
    margin: 0 auto 1rem;
}

.home-encabezado {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.home-encabezado h2 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: #000022;
    /* color: #102a56; */

}

.home-encabezado p {
    margin: 0;
    color: #475569;
}

.home-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 1.5rem;
    align-items: start;
}

.tarjeta {
    display: flex;
    flex-direction: column;

    padding: 2rem;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
    box-sizing: border-box;
}

.invitado-tarjeta {
    grid-column: 1;
}

.tarjeta h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #000022;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: left;
}

.campo label {
    font-weight: 600;
    color: #1e293b;
}

.campo input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #f8fafc;
    color: #1f2937;
    box-sizing: border-box;
}

.campo input:focus {
    outline: 2px solid #60a5fa;
    border-color: #2563eb;
}

.btn-principal,
.btn-secundario {
    display: inline-block;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.btn-principal {
    border: 2px solid #2563eb;
    background-color: #2563eb;
    color: #ffffff;
}

.btn-principal:hover {
    background-color: #000022;
    color: #ffffff;
    font-weight: bold;
}

.btn-secundario {
    background-color: #dbeafe;
    color: #2563eb;
}

.btn-secundario:hover {
    font-weight: bold;
}

.botones-contador {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.link-libros {
    color: #166534;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0;
}

.link-libros:hover {
    text-decoration: underline;
    color: #14532d;
    font-weight: bold;
}

.link-form {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0;
}

.link-form:hover {
    text-decoration: underline;
    /* color: #000022; */
    font-weight: bold;
}

.mensaje {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

.exito {
    background-color: #dcfce7;
    border-left: 4px solid #166534;
    color: #166534;
}

.error {
    background-color: #fee2e2;
    border-left: 4px solid #991b1b;
    color: #991b1b;
}

.mensaje-login-exitoso {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;

    margin-top: 1rem;
    padding: 1rem;
    text-align: left;
}

.mensaje-login-exitoso p {
    margin: 0;
}

.texto-exito {
    color: #166534;
}

.contador-seccion {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
}

.contador-numero {
    margin: 0.5rem 0;
    font-size: 3.5rem;
    font-weight: bold;
    line-height: 1;
    color: #2563eb;
}

.contador-parrafo {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
}

@media (max-width: 700px) {
    .home-grid {
        grid-template-columns: 1fr;
    }

    .tarjeta {
        padding: 1.5rem;
    }
}
</style>
