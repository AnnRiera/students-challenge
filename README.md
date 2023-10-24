# Challenge
Este es repo da solución al challenge de los estudiantes y la cantidad de horas asistidas a clases.

## How to
Para ejecutar este proyecto hay que tener en cuenta ciertas cosas:
- Preferiblemente utilizar la versión 16.13 o superior de Node.js, acorde a la documentación de [Prisma](https://www.prisma.io/docs/reference/system-requirements).
- Se decidió utilizar [Prisma](https://www.prisma.io/) como ORM y Postgres como motor de base de datos, sin embargo no fue configurado un Dockerfile para poder correr la base de datos, así que sería necesario tener algún contenedor de Docker con una imagen de Postgres para poder ejecutar esta solución. 
- Se maneja un archivo `.env` que maneja las variables de entorno para el puerto y la información de la base de datos.

**NOTA**: Prisma por defecto genera una variable llamada `DATABASE_URL` que es usada en el archivo `schema.prisma`, y esa misma variable es la que usa para la instanciación de la clase Prisma.

Para instalar las dependencias:

```
npm install
```

Para generar el archivo `schema.prisma` debe ejecutar el siguiente comando:

```
npm run prisma:migrate
```

**NOTA**: a este comando le puede añadir un nombre a la migración o no, es opcional y no generará conflictos, un ejemplo pudiese verse a continuación.

```
npm run prisma:migrate --name init
```

Para ejecutar el proyecto en modo desarrollo es necesario utilizar el siguiente script:

```
npm run dev
```

Para ejecutar los tests solo hace falta ejecutar:

```
npm run test
```

## Considerations

- Se trabajó el ejercicio bajo la premisa que la estructura del archivo no variará, es decir, la entrada que espera el proyecto debe tener esta estructura:

```
Student Marco
Student David
Student Fran
Presence Marco 1 09:02 10:17 R100
Presence Marco 3 10:58 12:05 R205
Presence David 5 14:02 15:46 F505
```

Sin espacios de más ni con orden diferente de la data.

- El archivo cargado es guardado en la carpeta *public* en la ruta `/src/public/` y no es eliminado luego de su uso.
- Para poder cargar el archivo en la carpeta es necesario instalado algún API platform instalado que permita utilizar `form-data` y la cabecera `Content-type: multiform/form-data`.

## Explanation
Empecemos desde el principio. Decidí abordar el ejercicio creando una pequeña REST API construida con Node.js y Typescript, ¿por qué lo hice de esa manera? Puesto que Node.js es un entorno de ejecución con el que estoy familiarizada y ya anteriormente había realizado la carga de un archivo anteriormente en un proyecto laboral, así que consideré apostar por esa opción. Añadí Typescript a la ecuación debido que sentí que podía aportar mayor estructura y manejo del código pese a tener conocimientos no tan profundos del lenguaje.

La estructura que posee el proyecto ese basa en controladores y servicios. Está el servicio base que posee la declaración de la instancia `db` de la clase *singleton* Prisma, la intención de este servicio padre es poder ser utilizado entre los servicios hijos para heredar la instancia de Prisma. Esta estructura no se consideró para los controladores dado a que no tienen alguna instancia en común que puedan heredar.

**NOTA**: decidí crear una clase Singleton de Prisma para evitar crear nuevas conexiones a la base de datos.

**NOTA**: por meramente efectos prácticos (saber exactamente qué archivo se tiene abierto) casi cada archivo creado tiene como nomenclatura:
`name.*.ts`, en donde `name` es el nombre del archivo, el `.*` es lo que representa (`services`, `controller`, `interface`, `middleware`, `error`, `enum`, `routes`, `asset`, `spec`) y el `.t` representa la extensión de typescript.

Adicionalmente a las carpetas `controllers` y `services` añadí la carpeta `enums` para almacenar el archivo enum para `Days`, esto para manejar de mejor manera y dar más estructura a la entrada de días en el archivo que será cargado. También existe la carpeta `errors`, que contiene un error base que hereda de la clase `Error` y tiene un método para serialización del error, y dos clases de los dos errores más comunes (`400` y `500`). La carpeta `interfaces` contiene todas las interfaces que se utilizan a lo largo del ejercicio, y los cree de tal forma en la que se pueda tipar de manera correcta las entradas y salidas de datos.

**NOTA**: las carpetas `interfaces` y `errors` poseen un archivo main.ts que compila todas las interfaces o errores en único archivo, esto con la intención de evitar tener que importar cada archivo por separado.

Adicionalmente también existe la carpeta `middlewares`, que contiene el error handler que es llamado en el archivo `index.ts` para parsear el error; la siguiente carpeta es la `public`, que inicialmente contiene un archivo `.gitkeep` que permite poder subir la carpeta "vacía" al repositorio, la intención de esto es que no se suba el archivo cargado en la carpeta `public` al repositorio (cualquier archivo dentro de la carpeta `public` será ignorando en el `.gitignore`, exceptuando el `.gitkeep`). La siguiente carpeta sería routes, que contiene todas el archivo router en donde se definen todas las rutas del proyecto y sus dos respectivos archivos de subrutas. La carpeta `services` contiene toda la lógica del proyecto, encargándose de la carga del archivo con la librería Formidable (que la elegí por haber trabajado previamente con ella, así como también su estabilidad dado a lo longeva de dicha librería), la lectura de la información con fs, el formateo de la data y su almacenamiento en la base de datos, así como el proceso de lectura y procesamiento para devolver el reporte esperado.

**NOTA**: la intención con delegarle toda la responsabilidad al servicio es para dejar que el controlador solo se encargue de recibir la información y devolverla, como un manager.

Por último dentro de la carpeta `source` se encuentra la carpeta `utility`, que contiene la clase singleton de Prisma, lo hice de esa forma con la intención de tener una carpeta en donde se encuentren todas las utilidades que pueden ser utilizadas por distintos servicios (quizás como algún formateador de texto o una conexión a la base de datos, como es este caso).

Fuera de la carpeta `source` está ubicada la carpeta `tests`, que es donde se alojan los tests que generé para este ejercicio. Debido a que se complejizaba un poco hacer pruebas unitarias sobre las funciones que contienen llamadas a la base de datos o la instanciación de Formidable, decidí hacer los tests más sencillos de las funciones que no implicaran usar stubs o spies , por lo que saqué 8 diferentes tests distribuidos en 3 funciones. La nomenclatura `TC-0X` significa *Test Case - 0X* y fue una buena práctica que aprendí sobre automatización con Cypress y quise trasladarlo a las pruebas unitarias. La carpeta `tests` tiene una subcarpeta llamada `assets`, que es donde se ubican todos los recursos utilizados por los tests (constantes o un archivo falso para ser leído).

Por último y no menos importante está el archivo `constants.ts`, que es donde se alojan todas las constantes que pueden ser utilizadas por la aplicación.

A efectos de ejemplo cree un archivo `.env.example` en donde se aprecian las variables de entorno disponibles en el `.env` real, sin tener la información real.

Quise darle el enfoque explicado anteriormente porque quise entrar en contexto con el trabajo real dentro de Foris, por lo que consideré que sería necesario darle persistencia a la información del estudiante, para poder ser consultada más adelante de una forma más limpia y organizada, adicionalmente que no consideré apropiado utilizar el nombre como identificador pues se puede dar el caso de estudiantes con el mismo nombre y apellido, por lo que una excelente forma de diferenciarlos era utilizando un `id` que pudiera servir para relacionar el estudiante con su record de asistencia (por darle un nombre). A su vez, también tomé el supuesto que el archivo sería cargado por una persona externa a Foris, por lo que el tener que cargar el archivo de forma manual no me pareció viable, por eso decidí hacerlo a través de un endpoint utilizando `form-data` y el header `multipart/form-data` en Postman; como mencioné anteriormente trabajé bajo la premisa que el archivo siempre será cargado con la misma estructura, por lo que si el formato cambia se deberá adaptar el código, esto en la vida real no es escalable, sin embargo a efectos del ejercicio consideré que podía ser una solución para el problema (especialmente al no tener cabeceras que diferenciaran cada columna), adicionalmente también trabajé con el supuesto que el archivo siempre será de la extensión `.txt` (el código no verifica el `mimetype` de este). Decidí usar Prisma porque tiene una documentación bastante completa y porque estoy familiarizada con el ORM. El uso de variables de entorno lo consideré prudente para no exponer data sensible, por eso está el paquete dotenv dentro de las dependencias de desarrollo. Para los tests usé las clásicas Chai y Mocha pues son las librerías más longevas de testing en js, por lo que tienen más mantenimiento y documentación disponible. Formidable como ya mencioné antes es otra de mis viejas confiables, opté esta librería por sobre multer debido a que no quería que el proceso de carga del archivo se diera desde el router, sino desde el servicio.

### Endpoints

La REST API resultante posee únicamente dos endpoints:

```
POST /api/utils/upload-file
GET  /api/students/report
```

Opté por dejar dos endpoints para no hacer crecer más el repositorio.

**NOTA**: El endpoint POST espera un form-data con un archivo cargado en él.