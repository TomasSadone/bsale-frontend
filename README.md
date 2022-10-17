# bsale-frontend

Este repositorio contiene una aplicacion front-end hecha con JavaScript vanilla y SASS para los estilos.
Esta aplicacion es un eCommerce, que consume una API la cual devuelve la información sobre productos, con sus precios, imagenes, nombres, y categorías. 

Está desarrollado de una manera 100% responsive para que se vea correctamente en cualquier dispositivo del cual se acceda.

La escritura de los estilos hace uso de la sintaxis CUBE css (https://cube.fyi/principles.html), que en pocas palabras es una manera de organizar los estilos de CSS la cual aprovecha la cascada propia de este lenguaje.

Este diseño responsive toma un approach ‘simpler-first’, el cual prefiero antes de el típico ‘mobile-first’. ¿Qué es este approach? Como su nombre lo indica, es hacer lo más simple primero, y luego mediante media query introducir la complejidad al código. La mayoría de las veces coincide con hacer mobile first, porque los layout de escritorio suelen ser más complejos, pero hay ocasiones como las navbar en los header, donde tenemos que hacer un menú hamburguesa para mobile, y en estos casos hacemos desktop first. ¿Qué ganamos con esto? Al hacer lo simple primero, tenemos menos cosas que sobreescribir con las media query y conseguimos un código más simple y limpio.

Disfruten la web: tsbsalefront.surge.sh


