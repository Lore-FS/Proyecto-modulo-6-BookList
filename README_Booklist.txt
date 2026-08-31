======================================================================================================================================
BookList - Sistema de Gestión de Libros
======================================================================================================================================

DESCRIPCIÓN GENERAL

BookList es una aplicación SPA (Single Page Application) desarrollada con Vue 3 que permite gestionar una colección de libros mediante una interfaz simple e intuitiva.

La aplicación permite:

- Iniciar sesión mediante un usuario previamente registrado.
- Ingresar como invitado mediante un nombre de usuario.
- Validar el ingreso tanto de usuarios registrados como de invitados.
- Identificar en el encabezado al usuario activo, diferenciando entre usuario registrado e invitado.
- Visualizar un listado reactivo de libros.
- Filtrar los libros por autor y categoría.
- Consultar el detalle de cada libro mediante una ruta dinámica.
- Acceder a la descripción del libro mediante una ruta anidada.
- Agregar nuevos libros.
- Validar los campos obligatorios del formulario y mostrar mensajes de error, ayuda y confirmación durante el proceso de registro.
- Eliminar libros existentes.
- Visualizar una vista previa en tiempo real antes de registrar un libro.
- Mostrar mensajes específicos para catálogo vacío y filtros sin resultados.
- Detectar cuando el ID solicitado no corresponde a un libro actualmente registrado.
- Manejar rutas inexistentes mediante una vista de error 404.
- Visualizar mensajes informativos según el estado de la aplicación.


TECNOLOGÍAS UTILIZADAS
- Vue 3
- Composition API
- Vue Router
- HTML5
- CSS3
- JavaScript ES6


ESTRUCTURA DEL PROYECTO

public/
└── index.html

src/
│
├── assets/
│   ├── maqueta/
│   ├── logo1
│   ├── logo2
│   ├── logo3
│   ├── logo4
│   └── main.css
│
├── components/
│   ├── FooterComponent.vue
│   ├── HeaderComponent.vue
│   └── LibroComponent.vue
│
├── router/
│   └── index.js
│
├── views/
│   ├── CrearLibroView.vue
│   ├── DescripcionLibroView.vue
│   ├── DetalleLibroView.vue
│   ├── HomeView.vue
│   ├── LibrosView.vue
│   └── NotFoundView.vue
│
├── App.vue
└── main.js

README_Booklist.txt
descripciones_libros.txt
Informe Proyecto Módulo 6.pdf


ESTRUCTURA PRINCIPAL DE COMPONENTES

App.vue
│
├── HeaderComponent.vue
│
├── RouterView
│   │
│   ├── HomeView.vue
│   │
│   ├── LibrosView.vue
│   │   │
│   │   └── LibroComponent.vue
│   │
│   ├── DetalleLibroView.vue
│   │   │
│   │   └── RouterView
│   │       │
│   │       └── DescripcionLibroView.vue
│   │
│   ├── CrearLibroView.vue
│   │
│   └── NotFoundView.vue
│
└── FooterComponent.vue

RouterView determina la vista correspondiente a la ruta actual. En App.vue se utiliza RouterView con v-slot y <component :is="Component"> para controlar el renderizado de las vistas y poder asignarles las props, eventos o KeepAlive que corresponden.

DetalleLibroView contiene un segundo RouterView anidado, utilizado para renderizar DescripcionLibroView cuando el usuario accede a la ruta hija de descripción.


DESCRIPCIÓN DE CADA VISTA

HOME VIEW

Corresponde a la pantalla inicial de la aplicación.

Permite:
- Iniciar sesión mediante correo electrónico y contraseña para usuarios registrados.
- Validar las credenciales ingresadas.
- Cambiar entre el formulario de inicio de sesión y el formulario de ingreso como invitado.
- Ingresar como invitado mediante un nombre de usuario.
- Validar el nombre ingresado por el invitado.
- Mostrar mensajes de éxito o error según corresponda.
- Limpieza del mensaje de error cuando el usuario comienza a corregir o completar los campos faltantes en inicio de sesión o ingreso como invitado, utilizando @input asociado a una función que elimina los mensajes de error.
- Mostrar un acceso directo al listado de libros cuando el ingreso es exitoso.
- Utilizar un contador reactivo con opciones para incrementar, decrementar y resetear su valor. Los botones Decrementar y Resetear sólo se muestran cuando el contador es distinto de cero, y el contador no puede disminuir a valores negativos.
- El estado local de Home se conserva mediante KeepAlive, permitiendo mantener el valor del contador reactivo al navegar hacia otras vistas y posteriormente regresar a Home.

Una vez realizado un ingreso exitoso, los datos del usuario registrado o invitado quedan disponibles como usuario activo para ser utilizados por otros componentes de la aplicación.

LIBROS VIEW

Muestra el catálogo completo o lista de libros registrados.

Funcionalidades:
- Mostrar todos los libros registrados.
- Navegar al detalle de cada libro.
- Eliminar libros.
- Filtrar el listado por autor.
- Filtrar el listado por categoría.
- Mostrar los filtros mediante v-show solamente cuando existen libros registrados.
- Representar cada libro mediante LibroComponent.vue.

Los filtros se implementan mediante propiedades computadas (computed). También se generan dinámicamente las opciones de autores y categorías a partir del arreglo de libros, evitando valores repetidos. Una propiedad computada adicional obtiene los libros que cumplen simultáneamente con los filtros seleccionados.

La vista contempla tres escenarios distintos:
1. No existen libros registrados.
2. Existen libros, pero ningún resultado coincide con los filtros.
3. Existen libros que cumplen los criterios de búsqueda.

DETALLE LIBRO VIEW

Recibe el identificador del libro como prop desde el parámetro dinámico de la ruta /libros/:id, mediante la configuración props:true de Vue Router. También recibe desde el padre App.vue el arreglo actualizado de libros.

Utiliza una propiedad computada (computed) para buscar dentro del arreglo el libro cuyo id corresponde al parámetro recibido en la ruta y también obtener directamente del objeto encontrado en dicho arreglo las propiedades que se mostrarán en el detalle, que son:
- Título
- Categoría
- Autor

Si el ID recibido no corresponde actualmente a ningún libro registrado, se muestra el mensaje "Libro no encontrado", junto con un enlace para volver al inicio.

Cuando el libro existe, se puede acceder a su descripción mediante la ruta anidada /libros/:id/descripcion.

DetalleLibroView utiliza useRoute() para identifcar si la ruta actual corresponde al detalle principal o a la ruta hija y mostrar "Ver descripción" u "Ocultar descripción" según corresponda mediante un botón.

La descripción se renderiza mediante un RouterView anidado.

DESCRIPCION LIBRO VIEW

Corresponde a una vista hija de DetalleLibroView.

- Se renderiza cuando el usuario accede a la ruta anidada /libros/:id/descripcion.
- DescripcionLibroView recibe mediante props el objeto libro que DetalleLibroView encontró previamente utilizando el id de la ruta.
- Su responsabilidad es mostrar la descripción registrada del libro. De esta forma, la descripción utiliza el mismo objeto del arreglo principal y permanece asociada al libro identificado por el parámetro de la ruta.

CREAR LIBRO VIEW

Permite registrar un nuevo libro.

Incluye:
- Validación de los cuatro campos obligatorios: título, categoría, autor y descripción del libro.
- Vista previa en tiempo real mediante v-model.
- Mensaje de error cuando se intenta registrar un libro sin completar los cuatro campos obligatorios.
- Limpieza del mensaje de error cuando el usuario comienza a a corregir o completar los campos faltantes, utilizando @input y @change.
- Botón de ayuda contextual que utiliza el modificador .once para ejecutarse una sola vez.
- Mensaje de ayuda con indicaciones para completar correctamente el formulario, mostrado mediante el botón informativo.
- Después de registrar correctamente un libro, se limpian los campos del formulario, se muestra un mensaje de confirmación y un enlace para acceder directamente al listado de libros.
- Registro del libro en el estado principal administrado desde App.vue.
- Generación automática de ID consecutivo para cada nuevo libro.
- Uso de @submit.prevent para controlar el envío del formulario mediante handleSubmit() y evitar la recarga predeterminada de la página por el navegador.
- Uso de @keydown.enter.prevent en los campos de Título y Autor para permitir ejecutar el registro del libro mediante la tecla Enter, llamando a handleSubmit(). Si todos los campos del formulario están completos (son todos obligatorios), el libro se registra, y, en caso contrario, se muestran los mensajes de validación correspondientes. No se usa @keydown.enter.prevent en el campo de Descripción, porque, al ser un textarea, la tecla Enter normalmente se emplea para realizar un salto de línea, por lo que @keydown.enter.prevent impediría escribir descripciones de varias líneas. Tampoco se usa en el campo de Categoría, porque corresponde a un select, donde la tecla Enter puede utilizarse para confirmar una opción. Aplicar @keydown.enter.prevent podría impedir ese comportamiento normal y ejecutar handleSubmit() antes de que la selección se confirme de la forma habitual.

NOT FOUND VIEW

Corresponde a la vista utilizada para manejar rutas inexistentes.

- Se renderiza mediante la ruta comodín /:pathMatch(.*)*
- Muestra un mensaje de Error 404: Página no encontrada, e incluye un enlace para volver al inicio.
- Este caso es diferente al de "Libro no encontrado":
    - Libro no encontrado: la ruta /libros/:id sí existe, pero el ID solicitado no corresponde actualmente a ningún libro registrado.
    - Error 404: la dirección ingresada no coincide con ninguna ruta definida en la aplicación.


COMPONENTES

HeaderComponent: Contiene lo siguiente:
- Logo de la aplicación.
- Navegación principal.
- Identificación del usuario activo, diferenciando entre usuario registrado e invitado.

FooterComponent: Muestra el pie de página común para toda la aplicación.

LibroComponent: Componente reutilizable encargado de representar visualmente un libro dentro del listado. 

Incluye:
- Información principal.
- Acceso al detalle.
- Eliminación del libro.

Este componente recibe los datos mediante props.

Para acceder al detalle utiliza useRouter() y realiza una navegación programática hacia /libros/:id, enviando únicamente el identificador del libro en la ruta. Los demás datos del libro no se trasnportan mediante query params, ya que DetalleLibroView los obtiene posteriormente desde el arreglo principal utilizando el ID recibido.

Cuando se solicita eliminar un libro, LibroComponent emite el evento personalizado eliminar-libro hacia LibrosView.vue, que posteriormente lo propaga hasta App.vue para ejecutar la eliminación.


COMPOSITION API Y ESTADO REACTIVO

La aplicación utiliza Composition API para administrar el estado reactivo.

El estado principal se mantiene en App.vue, donde se encuentran:
- El arreglo reactivo de libros.
- El arreglo de usuarios.
- El usuario activo.
- La variable utilizada para generar identificadores consecutivos.
- Las funciones para agregar y eliminar libros.
- La funcion para establecer el usuario activo después de un ingreso exitoso.

Los datos se distribuyen hacia las vistas y componentes mediante props y las acciones realizadas en componentes hijos se comunican hacia los componentes padres mediante eventos personalizados utilizando emit y defineEmits.

HomeView se encarga de validar al usuario registrado o crear el objeto correspondiente al usuario invitado. Luego emite login-exitoso hacia App.vue, donde se actualiza el usuarioActivo.

VUE ROUTER

Se configuraron las siguientes rutas:

/                          Home o pantalla de inicio.

/libros                    Catálogo o Listado general.

/libros/:id                Detalle del libro.
                           Corresponde a una ruta dinámica configurada con props:true, permitiendo que el parámetro id sea recibido como prop por DetalleLibroView.vue

/libros/:id/descripcion    Descripción del libro.
                           Corresponde a una ruta hija o anidada de /libros/:id y renderiza DescripcionLibroView.

/crear                     Formulario para registrar   
                           nuevos libros.

/:pathMatch(.*)*           Ruta comodín. Captura cualquier  
                           ruta no definida y renderiza NotFoundView.vue con un mensaje de error 404.


DIRECTIVAS Y CARACTERÍSTICAS DE VUE UTILIZADAS

Durante el desarrollo se utilizaron:
- Composition API
- ref()
- reactive()
- computed()
- defineProps()
- defineEmits()
- Vue Router
- createRouter()
- createWebHistory()
- useRoute()
- useRouter()
- RouterLink
- RouterView normal, anidado, con v-slot
- Renderizado dinámico de componentes mediante <component :is>
- KeepAlive para conservar el estado de Home al navegar entre vistas
- Rutas dinámicas y paramétros de ruta
- Rutas anidadas mediante children
- Ruta comodín para manejo de Error 404
- Props
- Eventos personalizados mediante emit
- Modificadores de eventos .prevent y .once
- v-model
- v-for
- v-show
- v-if
- v-else-if
- v-else
- v-bind
- Eventos @click, @submit, @keydown, @change, @input


DECISIONES DE DESARROLLO

Durante el desarrollo se tomaron las siguientes decisiones:
- Se centralizó el estado principal de la aplicación en App.vue y se distribuyeron los datos hacia las vistas y compoenentes mediante props.
- El contador reactivo se mantiene como estado local de HomeView.vue. Se utiliza KeepAlive en App.vue, aplicado únicamente a Home, para conservar la instancia de esta vista y mantener el valor del contador cuando se navega hacia otras vistas y posteriormente se regresa a Home.
- Se utilizaron eventos personalizados para comunicar acciones desde componentes hijos hacia componentes padres.
- Se creó LibroComponent.vue como componente reutilizable para representar cada libro del catálogo o lista.
- Se implementó el usuario activo como estado reactivo, permitiendo representar tanto a un usuario registrado como a un invitado. Esta información se utiliza en HeaderComponent para mantener visible la identificación del usuario que ingresó a la aplicación y diferenciar el tipo de acceso.
- Se utilizaron propiedades computadas para generar los filtros de autor y categoría y actualizar automáticamente el listado filtrado.
- Se diferenciaron los mensajes mostrados cuando no existen libros registrados y cuando una búsqueda mediante filtros no produce resultados.
- Para DetalleLibroView.vue se utilizó una ruta dinámica /libros/:id configurada con props:true.
- Se decidió  utilizar el ID de la ruta como referencia para localizar el libro dentro del arreglo principal, manteniendo una única fuente de datos y evitando transportar título, autor, categoría y descripción mediante query params.
- Se agregó DescripcionLibroView como vista hija de DetalleLibroView y se implementó la ruta anidada /libros/:id/descripcion para mostrar la descripción.
- DetalleLibroView contiene un RouterView anidado que entrega el objeto libro mediante props a DescripcionLibroView.
- Se diferenciarion dos situaciones de navegación excepcionales: una ruta válida con un ID de libro inexistente y una ruta completamente inexistente (error 404).
- Los ID de libros inexistentes son manejados directamente por DetalleLibroView, mientras que las rutas inexistentes son capturadas mediante una ruta comodín y renderizadas en NotFoundView.
- Se utiliza RouterView con v-slot y <component :is="Component"> tanto en App.vue como en DetalleLibroView.vue. En App.vue se utiliza para controlar el renderizado de las distintas vistas principales y asignarles las props, eventos o KeepAlive correspondientes. En DetalleLibroView.vue se utiliza un RouterView anidado para renderizar la vista hija DescripcionLibroView.vue y pasarle mediante props el objeto libro correspondiente.
- Se incorporó una vista previa en tiempo real antes de registrar un nuevo libro en el catálogo.
- Se implementó la generación automática de identificadores consecutivos para los libros nuevos.
- Se utilizaron modificadores de eventos como .prevent y .once para controlar el comportamiento de determinados eventos.
- Se mantuvo una interfaz uniforme utilizando la misma paleta de colores, estilos de tarjetas y componentes reutilizables en toda la aplicación.