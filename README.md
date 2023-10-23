# Challenge
Este es repo da solución al challenge de los estudiantes y la cantidad de horas asistidas a clases.

## How to
Para ejecutar este proyecto hay que tener en cuenta ciertas cosas:
- Preferiblemente utilizar la versión 16.13 o superior de Node.js, acorde a la documentación de [Prisma](https://www.prisma.io/docs/reference/system-requirements).
- Se decidió utilizar [Prisma](https://www.prisma.io/) como ORM y Postgres como motor de base de datos, sin embargo no fue configurado un Dockerfile para poder correr la base de datos, así que sería necesario tener algún contenedor de Docker con una imagen de Postgres para poder ejecutar esta solución. 
- Se maneja un archivo `.env` que maneja las variables de entorno para el puerto y la información de la base de datos. **NOTA**: Prisma por defecto genera una variable llamada `DATABASE_URL` que es usada en el archivo `schema.prisma`, y esa misma variable es la que usa para la instanciación de la clase Prisma.

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

