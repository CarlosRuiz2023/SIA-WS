// IMPORTACIÓN DE OBJETOS 'RESPONSE' Y 'REQUEST' DE LA BIBLIOTECA 'EXPRESS'.
const { response, request } = require("express");
// IMPORTACIÓN DEL MODELO DE BASE DE DATOS.
const PuestoTrabajo = require("../../models/modelos/catalogos/puestoTrabajo");

/**
 * OBTIENE TODOS LOS PUESTOS DE TRABAJO CON ESTATUS ACTIVO.
 * @async
 * @function puestoTrabajoGet
 * @param {request} req - OBJETO DE SOLICITUD HTTP.
 * @param {response} res - OBJETO DE RESPUESTA HTTP.
 * @returns {Object} RESPUESTA JSON CON LOS PUESTOS DE TRABAJO OBTENIDOS.
 */
const puestoTrabajoGet = async (req = request, res = response) => {
  try {
    // DEFINE EL CRITERIO DE BÚSQUEDA PARA PUESTOS DE TRABAJO ACTIVOS.
    const query = { estatus: 1 };
    // REALIZA LA CONSULTA A LA BASE DE DATOS PARA OBTENER LOS PUESTOS DE TRABAJO ACTIVOS.
    const puestoTrabajo = await PuestoTrabajo.findAll({
      where: query,
    });

    // RESPONDE CON UN OBJETO JSON QUE CONTIENE LOS PUESTOS DE TRABAJO OBTENIDOS.
    res.status(200).json({
      ok: true,
      results: puestoTrabajo,
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
  puestoTrabajoGet,
};
