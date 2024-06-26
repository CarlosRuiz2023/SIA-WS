// IMPORTACIÓN DE OBJETOS 'RESPONSE' Y 'REQUEST' DE LA BIBLIOTECA 'EXPRESS'.
const { response, request } = require("express");
// IMPORTACIÓN DEL MODELO DE BASE DE DATOS.
const Tolerancia = require("../../models/modelos/catalogos/tolerancia");

/**
 * OBTIENE LAS TOLERANCIAS CON ESTATUS ACTIVO.
 * @async
 * @function toleranciaGet
 * @param {request} req - OBJETO DE SOLICITUD HTTP.
 * @param {response} res - OBJETO DE RESPUESTA HTTP.
 * @returns {Object} RESPUESTA JSON CON LAS TOLERANCIAS ACTIVAS OBTENIDAS.
 */
const toleranciaGet = async (req = request, res = response) => {
  try {
    // DEFINE EL CRITERIO DE BÚSQUEDA PARA TOLERANCIAS ACTIVAS.
    const query = { estatus: 1 };
    // REALIZA LA CONSULTA A LA BASE DE DATOS PARA OBTENER LAS TOLERANCIAS ACTIVAS.
    const tolerancia = await Tolerancia.findAll({
      where: query,
    });

    // RESPONDE CON UN OBJETO JSON QUE CONTIENE LAS TOLERANCIAS ACTIVAS OBTENIDAS.
    res.status(200).json({
      ok: true,
      results: tolerancia,
    });
  } catch (error) {
    // MANEJO DE ERRORES: IMPRIME EL ERROR EN LA CONSOLA Y RESPONDE CON UN ERROR HTTP 500.
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "HA OCURRIDO UN ERROR, HABLE CON EL ADMINISTRADOR.",
    });
  }
};

// EXPORTA EL MÉTODO PARA SER UTILIZADO EN OTROS ARCHIVOS.
module.exports = {
  toleranciaGet,
};
