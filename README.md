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

4. Crear archivo tsconfig.json
El archivo tsconfig.json es una parte fundamental de cualquier proyecto TypeScript. Define la configuración para el compilador TypeScript (tsc) y permite controlar cómo se debe compilar el código TypeScript.
<div align="center">
	<img width="400" alt="image" src="https://github.com/user-attachments/assets/5f8fdd85-46d3-46ed-96ef-f4affa9b5053" />
</div>

### Ⓜ️ Makefile
Por último, tendremos que crear un archivo 📄 **Makefile**. Un Makefile es un archivo de configuración que define un conjunto de reglas para automatizar tareas en proyectos de software. En el contexto de Node.js y TypeScript, se usa para simplificar la instalación, compilación y ejecución de aplicaciones. La estructura que sigue el Makefile que he creado es la siguiente:
<div align="center">
	<img width="400" alt="image" src="https://github.com/user-attachments/assets/a2eca418-565a-40f3-8523-4d0cd3456225" />
</div>

Una vez tengamos el archivo Makefile creado utilizaremos los siguientes comandos:

5. Instalación de dependencias y configuración inicial
   
Este comando generalmente se utiliza para instalar todas las dependencias necesarias para el proyecto. Esto puede incluir la instalación de paquetes, bibliotecas y herramientas necesarias para que el proyecto funcione correctamente.

```
$ make install
```

6. Configuración del entorno de desarrollo
   
Este comando generalmente configura el entorno de desarrollo para que puedas trabajar en el proyecto de manera eficiente. Puede iniciar servidores de desarrollo, herramientas de vigilancia de cambios, o cualquier otro servicio necesario durante el desarrollo.

```
$ make dev
```

7. Inicia la aplicación
   
Este comando suele usarse para iniciar la aplicación en un entorno de producción o en un estado de ejecución normal. A menudo configura la aplicación para que esté lista para recibir tráfico o solicitudes de usuarios.

```
$ make start
```

⚠️ En este caso tendremos un archivo base de ejemplo llamado locations.ts que tendrá un array de objetos donde tendremos un listado de diferentes datos de ciudades, distritos y número de pisos alquilados.

<div align="center">
	<h2>Ahora sí...</h2>
	<p>Te recomiendo que mires los diferentes archivos y vayas creando tu propia API para ir practicando su funcionamiento 👍🏽</p>
	<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3B0eHFpZG50aDdmcXU2dXp6ejlxNjZvaTNvOW1sMWs1bGkzZ3RvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/25UxpWoNBu8nOtURm9/giphy.webp"></img>
</div>
