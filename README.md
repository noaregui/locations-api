<div align="center">
	<h1 align="center">🗃️ Desarrollando una API</h1>
</div>
<p>En este repositorio veremos cómo desarollar una API con Node.js, Express y TypeScript de la forma más simple posible.</p>
<div align="center">
	<img src="https://media0.giphy.com/media/BoQiOO2AzHjUvLGRes/200.webp?cid=ecf05e471evjunlcc3htu9hql7qvb3lgyzj74c4v45rkrasl&ep=v1_gifs_search&rid=200.webp&ct=g"></img>
</div>

## 🌐 ¿Qué es una API?
<p>La clave es siempre empezar por el principio. Una API (Interfaz de Programación de Aplicaciones) permite a diferentes aplicaciones comunicarse entre sí. En términos sencillos, es como un mensajero que toma solicitudes, les dice a otras aplicaciones lo que necesitas y luego te devuelve la respuesta. Es como un menú en un restaurante. El menú te dice qué platos puedes pedir y cómo estarán preparados. Cuando haces tu pedido, la cocina (el sistema) lo prepara y te lo sirve. No necesitas saber cómo se cocina la comida, solo haces el pedido y recibes lo que pediste.

Ejemplos de APIs:

- 🗺️ API de Google Maps: Permite a las aplicaciones integrar mapas y funciones de localización. Por ejemplo, una app de delivery puede mostrarte tu ubicación y la ruta del repartidor en tiempo real.

- 🐦 API de Twitter: Permite a las aplicaciones publicar tweets, leer perfiles y obtener datos de trending topics. Por ejemplo, una herramienta de gestión de redes sociales puede programar y publicar tweets automáticamente.

- 💵 API de PayPal: Permite a las aplicaciones procesar pagos. Por ejemplo, una tienda online puede usar esta API para permitir a sus clientes pagar con PayPal.

- 🌩️ API de OpenWeather: Permite a las aplicaciones obtener información meteorológica. Por ejemplo, una app de clima puede mostrar el pronóstico del tiempo usando los datos de esta API.

Las APIs son esenciales porque permiten a los desarrolladores construir aplicaciones más ricas y funcionales sin tener que construir todo desde cero.</p>

## 👩🏽‍💻Instalación
<p>Empecemos viendo las instalaciones que tenemos que hacer para poder utilzar Node.js, Express y TypeScript.</p>
<div align="center">
	<img src="https://media4.giphy.com/media/h3u7w8BR07IHDsnzQw/200.webp?cid=ecf05e47nt0kec0kmyt0mvi6a5gc80vhdzpopye2rls5vog0&ep=v1_gifs_search&rid=200.webp&ct=g"></img>
</div>

### 🟩 Node.js
En cualquier proyecto de Node.js lo primero será crear el archivo 📄 **package.json**. Este es un archivo crucial en los proyectos de Node.js que actúa como el "centro de configuración" para el proyecto.

1. Crear package.json:

```
$ npm init -y
```

Cuando ejecutas este comando, npm genera un archivo package.json con valores predeterminados, sin solicitarte información adicional. Será un archivo parecido a este:
<div align="center">
  <img width="600" alt="image" src="https://github.com/user-attachments/assets/6f53b5c8-3922-49ff-bc0c-cb4bf5fe0c8e" />
</div>
Aquí tienes la opción de añadir keywords, nombre del autor y pequeña descripción del proyecto, ¡recomendado!

### 🟨 Express
Express es un framework web muy popular para Node.js que simplifica la creación y gestión de aplicaciones web y servicios API. 

2. Instalación de express:
```
$ npm install express
```
En este momento:
- Se añade a express la **sección de dependencias** al archivo package.json:
  <div align="center">
      <img width="600" alt="image" src="https://github.com/user-attachments/assets/f97fae59-a6f0-4868-9855-11a702bed515" />
  </div>
- Se crea una carpeta de 🗂️ **node_modules**.
- Se crea un archivo de 📄 **package-lock.json**. Este archivo recoge las dependencias que se necesitan teniendo en cuenta las configuraciones principales que tiene package.json.

### 🟦 Typescript
Ahora instalaremos los paquetes necesarios para trabajar con typescript:

3. Instalación de paquetes necesarios para trabajar con Typescript en Node.js:
```
$ npm install --save-dev typescript ts-node @types/node @types/express
```


<p>Tendremos un archivo base llamado locations.ts que tendrá un array de objetos donde tendremos un listado de diferentes datos de ciudades, distritos y número de pisos alquilados.</p>
