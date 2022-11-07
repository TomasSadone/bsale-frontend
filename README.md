# bsale-frontend

## Explicación del ejercicio:

Este repositorio contiene una aplicación front-end hecha con JavaScript vanilla y SASS para los estilos.
Esta aplicación es un eCommerce, que consume una API la cual devuelve la información sobre productos, con sus precios, imágenes, nombres, y categorías. 

Está desarrollado de una manera 100% responsive para que se vea correctamente en cualquier dispositivo del cual se acceda.

La escritura de los estilos hace uso de la sintaxis CUBE css (https://cube.fyi/principles.html), que en pocas palabras es una manera de organizar los estilos de CSS la cual aprovecha la cascada propia de este lenguaje.

Este diseño responsive toma un approach ‘simpler-first’, el cual prefiero antes de el típico ‘mobile-first’. ¿Qué es este approach? Como su nombre lo indica, es hacer lo más simple primero, y luego mediante media query introducir la complejidad al código. La mayoría de las veces coincide con hacer mobile first, porque los layout de escritorio suelen ser más complejos, pero hay ocasiones como las navbar en los header, donde tenemos que hacer un menú hamburguesa para mobile, y en estos casos hacemos desktop first. ¿Qué ganamos con esto? Al hacer lo simple primero, tenemos menos cosas que sobreescribir con las media query y conseguimos un código más simple y limpio.



### Estructura del proyecto:

- En el root del proyecto tenemos los principales archivos HTML, CSS, SCSS, y JS. Luego tenemos diferentes carpetas para manejar la ruta de error con nuestros archivos también HTML, CSS, y JS.

- La estructura de JS esta dividida en modulos por funcionalidad, para mantener las cosas simples. El index.js inicializa esos modulos para empezar a obtener data y añadir event listeners.

- Los módulos usados son 4:
  - Navbar: Trae data para poblar las categorías de la navbar, y maneja los clicks en cada categoría para que se muestren los productos de la misma.
  - Search: Maneja la barra de búsqueda, envía la petición para traer los nuevos productos.
  - Append Elements: Una serie de funciones que crean y agregan elementos al DOM.
  - HTML Elements: Obtiene todos los elementos HTML necesarios y los exporta, para que puedan ser usados fácilmente en todo el proyecto.
  
## ¿Qué nos da esta página?
Esta web muestra todos los productos de la base de datos que estamos usando, con el nombre del producto, la imagen, el precio, y el descuento si tuviese alguno. 
Estos productos pueden ser mostrados dentro de una categoría, la cual podemos seleccionar a gusto, o usando la barra de búsqueda, para obtener una lista de todos los productos cuyo título coincida (al menos parcialmente) con nuestro texto ingresado.
  
  
## Disfruten la web: 
tsbsalefront.surge.sh

