---
title: 'Cómo Reemplazar el Router Movistar RTF8115VW'
tags: ['redes', 'internet', 'tutorial']
description: '¿Estás buscando mejorar la velocidad y estabilidad de tu conexión a internet? En este video te enseño paso a paso cómo cambiar el router genérico de Movistar (modelo RTF8115VW) que se entrega en Colombia durante la instalación, por un router superior: el TP-Link AX1800 con Wi-Fi 6. Este router ofrece mayor velocidad, mejor cobertura y funcionalidades avanzadas como VPN, VLANs y más opciones de configuración para tu red.'
types: ['guia-escrita', 'guia-video']
pubDate: '2024-11-10'
thumbnail: '/images/reemplazar-router-movistar.jpg'

videoDescription: 'Esta publicación tiene un video tutorial que lo acompaña. Si lo prefieres puedes seguir las instrucciones en el video y apoyarte del material escrito o puedes directamente seguir unicamente con el tutorial escrito acontinuación.'
videoId: 'HtcsSEJBQ7Y'
---

## Introducción

Primero,  es importante aclarar que vivo en Colombia y mi proveedor de servicio es Movistar, por lo que las instrucciones que te voy a mostrar son específicas para este proveedor. Sin embargo, esto no significa que todo lo que te mostrare no te servira, al contrario, te invito a que revises los pasos y trates de adaptarlos a tu caso. 

Las instrucciones en las secciones donde se ven las configuraciones de movistar muy seguramente seran diferentes si usas Claro, Tigo, ETB u otro proveedor, pero la idea general de lo necesario se mantiene en todos los casos asi que leelo completo para comprender.

Si necesitas asistencia para configurar Claro, Tigo u otro proveedor, por favor déjalo en los comentarios. Si veo que muchas personas necesitan ayuda, estaré encantado de buscar el equipo necesario y hacer un video con instrucciones específicas para ese proveedor.

## Requisitos

1. El router de Movistar. Este es el que actualmente están entregando en Movistar en el año 2024. El modelo es RTF8115VW.
1. Un buen router que reemplazará al del proveedor. En mi caso, estoy usando el TP-Link AX1800, también conocido como AX23.
1. Cable RJ45 (Ethernet), típico para conectar a una computadora. Necesitarás dos cables RJ45, así que asegúrate de tenerlos a mano.

## Aclaraciones antes de empezar

Estas instrucciones te van a servir en los siguientes casos:

1. Tienes mucha domótica en casa.
1. Quieres tener más control sobre tu red. La configuración que te voy a mostrar es un primer paso hacia una configuración avanzada.
1. **Ten en cuenta**: Estas instrucciones no aumentarán la velocidad contratada que tienes con tu proveedor.

Con esta configuración tendrás mucho más control porque utilizarás tu propio equipo y las configuraciones dependerán del router que compres. En mi caso, el TP-Link ofrece muchas más opciones que el router por defecto que te entrega la compañía de servicio.

## Paso 1: Configurar el router de Movistar en modo puente

Asegurate de estar conectado a tu router movistar en el puerto ETH 1. En este tutorial usaremos el EHT 1 para la conexion a nuestro computador y usaremos el ETH 4 para ponerlo en modo puente.

1. Ingresa la dirección https://192.168.1.1:8000 e ingresa tus credenciales. Todos estos datos se encuentran en el sticker debajo de tu router en la seccion 'Datos acceso al Router' 
1. (Opcional) Una vez dentro, desactiva la red WiFi del router Movistar para evitar conflictos.
    - Desactiva tanto la red de 2.4 GHz como la de 5 GHz.
1. Una vez adentro agregamos ```/avanzada.asp``` a la url para acceder a la configuración avanzada real del router - https://192.168.1.1:8000/avanzada.asp.
1. Ingresa al link que dice 'WAN Interface' debajo de WAN Settings. En la tabla identifica la fila que contiene la palabra PPPoE, en mi caso es la fila 1 (Index 0)
1. Le damos click al 0 y se nos presenta una nueva ventana donde vamos a anotar los siguientes datos:
    1. MTU
    1. Vlan ID
    1. Username
    1. Password (Para ver la contraseña en texto plano, utiliza las herramientas de desarrollador de tu explorador y cambia el tipo de input de la casilla a 'text' - [Mirar como en el video](https://youtu.be/HtcsSEJBQ7Y?t=746))
1. Ahora nos dirigimos a 'Filtering' debajo de Bridging Setup. 
    - Aqui podemos identificar en las primeras filas la interface rg0. Esta interfaz tiene un 'VLAN ID' (100) y un 'Accepted Type' (Tagged Only) que vamos a tener en cuenta en el siguiente cambio.
    - Tambien identificamos la fila del eth0.4 (el puerto que colocaremos en modo puente) debajo de la columna 'Interface' y le damos click al numero que esta en la columna 'Index', en mi caso es el numero 10. 
1. En esta ventana cambiamos el 'Associated Bridge' por el valor de '1(Internet)' y debajo de 'Classification' activamos 'Tagged Only' y VLAN ID por 100 - *Estos valores son los mismos que vimos en la interfaz rg0 previamente.*
1. Ahora nos dirigimos a 'Marking' debajo de Bridging Setup.
    - Nuevamente identificamos la fila de la interfaz rg0 con el valor 1(Internet) en 'Associated Bridge'. Vemos que tiene un valor de Tagged, -1 y 0 en las columnas 'Egress Packet', 'VLAN Re-Mark' y 'Priority Re-Mark' respectivamente.
    - Le damos click al numero debajo de la columna 'Index' correspondiente al eth0.4.
1. En esta nueva ventana cambiamos el 'Associated Bridge' por 1(Internet), activamos 'Tagged' y activamos 'VLAN ID Re-Mark' con un valor de -1 y tambien activamos con el 'priority Re-Mark' con un valor de 0.

Una vez terminado los pasos anteriores ya tenemos el puerto 4 del router movistar en modo puente.


## Paso 2: Configurar tu router TP-Link

Asegurate ahora de conectar tu nuevo router, en mi caso el TP-Link, al computador.

1. Conecta el router de movistar desde el puerto 4, que es nuestro puerto en modo puente, al router de TP-Link al puerto que dice WAN.
1. Usa un cable Ethernet para conectar tu computador al puerto LAN 1 del router TP-Link 
1. Accede a la configuración del TP-Link ingresando la dirección https://192.168.0.1 en tu navegador.
1. Sigue los pasos para establecer una contrasena y cuando llegue la opcion selecciona que quieres establecer un tipo de conexion PPPoE.
1. Ingresa el usuario y la contraseña PPPoE que obtuviste del router Movistar.
    - Activa opciones personalizadas para tu ISP, y colocamos el Internet VLAN ID en 100.
1. Termina de configurar tu router con las opciones que desees

Ya con esto podemos empezar a utilizar nuestro nuevo router.


## Paso 3: Opcional - Restaurar tu configuración si algo falla

Si cometes un error o quieres revertir los cambios:

1. Asegurate de tener conectado tu router de movistar completamente conectado. Es decir, conectado a la corriente y conectado a la fibra. 
1. Resetea el router de Movistar manteniendo presionado el botón de reset durante 10 segundos hasta que las luces parpadeen.
1. Espera unos minutos y Movistar automaticamente restaurara tu router con las configuraciones necesarias para conectarte a internet. (Valido para Colombia en el 2024)


Espero que este tutorial te haya sido útil. 
Si te ha gustado, por favor suscríbete a mi canal de [youtube](https://www.youtube.com/@rialdev?sub_confirmation=1) para más contenido similar. Deja cualquier pregunta en los comentarios y estaré revisando todos.

¡Saludos!


