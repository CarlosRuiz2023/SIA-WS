/* 
    ITSMARTS
    Autor: Adrián Hernández (BackEnd)
    Fecha:27/11/2023
    Sistema: SIA
*/

// Importa las bibliotecas necesarias
const express = require('express'); // Biblioteca para crear el servidor web
const cors = require('cors'); // Middleware para manejar CORS (Cross-Origin Resource Sharing)

// Importa la configuración de la base de datos PostgreSQL desde otro archivo
const pool = require('../database/config');

const {InicioSesionRuta} = require('../routes/autenticacion/inicio-sesion');

const {EmpleadosRuta} = require('../routes/catalogos/empleado');

// const corsOptions = {
//     origin: 'http://localhost:4200', // Cambia esto según el dominio de tu aplicación Angular
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     Headers:'Access-Control-Allow-Origin'
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   };
  
  
 
  

// Clase que representa el servidor
class Server {

    // Constructor de la clase
    constructor(){
        // Crea una instancia de Express para manejar el servidor
        this.app = express();

        // Configura el puerto del servidor, utiliza el puerto especificado en las variables de entorno o el puerto 3000 por defecto
        this.port = process.env.PORT || 3000;

        // Ruta base para las rutas relacionadas con la autenticación
        this.autenticacionPath = {
            catalogoAutenticacion: "/api/usuario",
        };
        this.catalogosPath = {
            catalogoEmpleado: "/api/empleado",
        };

        // Conexión a la base de datos de PostgreSQL
        this.conectarDB();

        // Configuración de middlewares
        this.middlewares();

        // Configuración de rutas del sistema 
        this.routes();
    }

    // Función para realizar la conexión a la base de datos de PostgreSQL
    async conectarDB(){
        await pool;
    }

    // Configuración de los middlewares del servidor
    middlewares() {
        // Middleware para manejar CORS
        this.app.use(cors({
            origin: ['http://localhost:4200'],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            headers: '*',
            preflightContinue: false,
            optionsSuccessStatus: 204,
          }));
    
        // Middleware para manejar solicitudes y respuestas en formato JSON
        this.app.use(express.json());
    
        // Middleware para servir archivos estáticos desde la carpeta 'public'
        this.app.use(express.static('public'));
    }
    
    
    // Configuración de las rutas del sistema (actualmente comentada)
    routes(){
        this.app.use(this.autenticacionPath.catalogoAutenticacion,require('../routes/autenticacion/inicio-sesion'));
        this.app.use(this.catalogosPath.catalogoEmpleado,require('../routes/catalogos/empleado'));
    }

    // Función para iniciar el servidor y escuchar en el puerto especificado
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}

// Exporta la clase Server para poder utilizarla en otros archivos
module.exports = Server;

