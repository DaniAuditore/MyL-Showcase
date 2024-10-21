# Proyecto: MyL-Showcase

# Descripción del proyecto
La página presentada a continuación plantea una herramienta de comodidad para el jugador promedio del TCG (trading card game) mitos y leyendas, la página cuenta con una biblioteca de las cartas en formato dando la opción de abrir una colección personal a modo de check list, un apartado para construcción de barajas con su respectivo inventario, un foro de consultas para que el jugador pueda preguntar sobre interacciones que desconoce y una zona con los conceptos y reglas del juego.

Cabe mencionar que toda esta página tiene ligado internamente un mercado donde los jugadores pueden comprar, vender e intercambiar cartas.

# Link del prototipo en Figma
https://www.figma.com/proto/vPIwCS4UVkBSA0jyPAZ2ST/MyL-Showcase?node-id=320-7430&t=PNCwAIvAz9hMquiE-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=320%3A7430&show-proto-sidebar=1

# Integrantes del equipo y funcionalidades

# Daniel Opazo:

 Biblioteca cartas en formato

 Reglas formato

 Creador de barajas

# Cristóbal Cariqueo:

 Inventario de barajas

 Colección personal

 Foro de interacciones

# Julio Contreras

 Glosario de conceptos de juego

 Perfil de usuario

 Mercado




# Features

# Biblioteca cartas en formato:
Colección de cartas donde se puede filtrar por Edición, Coste, Fuerza, Tipo, Raza , Frecuencia y buscar cartas por su nombre. Además se mostrarán datos útiles sobre el mercado respecto a esta carta.

# Requerimientos del sistema
El sistema debe mostrar las cartas de forma gráfica y ordenada.
El sistema permitirá filtrar las cartas por edición, coste, fuerza, tipo, raza, frecuencia.
El sistema permitirá buscar cartas a través de una barra de búsqueda  por nombre.
El sistema mostrará los datos de la carta en una nueva pestaña al ser seleccionada (nombre, edición, coste, fuerza, tipo, raza, frecuencia).
El sistema mostrará en una nueva pestaña los datos económicos de la carta (en un apartado distinto al de los datos de la carta) al seleccionar una carta.
El sistema permitirá la opción de editar las características de las cartas al rol de administrador.

# Creador de barajas: La funcionalidad de crear una baraja de 50 cartas

# Requerimientos del sistema
El sistema mostrará en forma de lista hacia abajo las cartas (con resumen de datos de la carta).
El sistema permitirá buscar cartas a través de una barra de búsqueda  por nombre.
El sistema permitirá filtrar las cartas por edición, coste, fuerza, tipo, raza, frecuencia.
El sistema permitirá añadir cartas de la lista a la baraja con un botón.
El sistema permitirá darle un nombre a la baraja en un campo de texto vacío.
El sistema permitirá guardar la baraja con un botón. (Debe tener nombre)


# Inventario de barajas: Una pantalla con el inventario de barajas creadas con la opción de modificar cartas dentro de la baraja a seleccionar. También se podrá actualizar a gusto del creador y generar copias de la misma para posteriormente modificarlas.

# Requerimientos del sistema
El sistema mostrará en forma de lista hacia abajo las barajas guardadas.
El sistema permitirá filtrar las cartas por edición, coste, fuerza, tipo, raza, frecuencia.
El sistema permitirá editar la baraja con un botón que llevará a la pestaña de Creador de barajas.
El sistema permitirá duplicar la baraja con un botón.
El sistema mostrará si la baraja es compatible con los formatos de juego existentes. (Imperio y VCR).

# Perfil de usuario: En esta pantalla se pueden ver los post que ha realizado el usuario y su inventario de cartas disponibles para venta o cambio.

# Requerimientos del sistema
El usuario podrá iniciar sesión con sus credenciales.
El sistema mostrará una pestaña (Botón) que al ser presionada mostrará los posts del usuario.
El sistema mostrará una pestaña que al ser presionada mostrará de forma ordenada una lista con las cartas que el usuario tiene para vender y cambiar.
El usuario con rol de administrador podrá borrar un perfil.

# Foro de interacciones:
Aquí el usuario podrá subir dudas sobre interacciones de cartas subiendo un post en el cual se le dará la opción de seleccionar N cantidad de cartas para formular una duda sobre la interacción de las mismas, este modelo de post puede ser respondido por cualquier usuario y cuando sea respondido por un usuario con el rol de juez este comentario quedara arriba del resto.

# Requerimientos del sistema

# Apartado de navegación entre post:
El sistema mostrará listado hacia abajo los post de los usuarios
El usuario podrá valorar los post de forma negativa o positiva con un botón.
El usuario podrá responder los post con una caja de texto vacía bajo el post.
El usuario podrá valorar las respuestas a los post de forma negativa o positiva con un botón.
El sistema mostrará las respuestas de los usuarios con el rol de juez fija en el post.
El usuario con rol de administrador podrá borrar post o respuestas.

# Apartado de creación de post:
El sistema mostrará en forma de lista hacia abajo las cartas (con resumen de datos de la carta).
El sistema permitirá buscar cartas a través de una barra de búsqueda  por nombre.
El sistema permitirá filtrar las cartas por edición, coste, fuerza, tipo, raza, frecuencia.
El usuario podrá añadir cartas de la lista al post con un botón.
El usuario podrá escribir el título del post en un cuadro de texto vacío
El usuario podrá escribir el contenido del post en un cuadro de texto vacío.
El usuario podrá subir el post con un botón.



# Mercado:
Esta función está integrada en toda la aplicación ya que está presente dentro dentro de las secciones Biblioteca cartas en formato y Perfil de usuario creando un sistema de comercio de cartas.

# Requerimientos del sistema
El usuario podrá comprar la carta seleccionada por el valor establecido por el vendedor o ofertar un valor por la carta.
El usuario podrá ofertar cartas de su inventario como pago para comprar la carta. (Un intercambio)
El usuario podrá ofertar un valor y adicionalmente añadir cartas de su inventario como parte del pago. (Es decir se puede pagar con cartas y un valor al mismo tiempo)
El sistema validará que el trato sea aceptado por ambas partes.

# Colección personal:
Esta pantalla mostrará la edición a elección del usuario y funcionara como una check list de que cartas posee el individuo. Lo que también fomenta el mercado ya que se puede revisar cual falta y lleva a la pestaña descrita en Biblioteca cartas en formato (El sistema mostrará en una nueva pestaña los datos económicos de la carta)

# Requerimientos del sistema
El sistema mostrará un filtro para escoger la edición a mostrar.
El sistema mostrará las cartas de forma gráfica y ordenada.
El sistema mostrará si se posee esa carta o no.
El sistema permitirá marcar si se posee esa carta o no.
Al seleccionar una carta se mostrará de la misma forma que en Biblioteca cartas en formato.


# Reglas formato:
Una página que contenga de forma actualizada las cartas baneadas, erratas (de forma gráfica) y enlace al documento oficial de reglas.

# Requerimientos del sistema
El sistema mostrará de forma gráfica y ordenada las cartas baneadas y limitadas
El sistema mostrará de forma gráfica y ordenada en lista las cartas que poseen una errata.

# Glosario de conceptos de juego: 
Una página que posea los conceptos del juego explicados de forma breve para hacerlo más accesible a los jugadores.

# Requerimientos del sistema
El sistema mostrará en párrafos de texto los conceptos de juego con sus definiciones.