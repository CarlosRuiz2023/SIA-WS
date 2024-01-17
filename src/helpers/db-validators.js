const Usuario = require("../models/modelos/usuario");
const Empleado = require("../models/modelos/catalogos/empleado");
const Cliente = require("../models/modelos/catalogos/cliente");
const Dias = require("../models/modelos/catalogos/dias");
const EntradaSalida = require("../models/modelos/catalogos/entradaSalida");
const Eventos = require("../models/modelos/catalogos/eventos");

const emailExiste = async (correo = "") => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  if (usuario) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const emailExistente = async (correo = "") => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  if (!usuario) {
    throw new Error(`El correo ${correo} no se encuentra registrado`);
  }
};

const usuarioActivo = async (correo = "") => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  // VERIFICA SI EL USUARIO ESTÁ ACTIVO.
  if (usuario.estatus != 1) {
    //RETORNAMOS MENSAJE DE ERROR
    return res.status(400).json({
      ok: false,
      msg: "Usuario Inactivo",
    });
  }
};

const emailInexiste = async (correo = "", id_cat_usuario = 0) => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });
  if (usuario) {
    if (usuario.dataValues.id_cat_usuario != `${id_cat_usuario}`) {
      throw new Error(
        `El correo ${correo} ya está registrado con otro usuario`
      );
    }
  }
};

const existeEmpleadoPorId = async (id_cat_empleado) => {
  // Verificar si el candidato existe por su ID
  const empleado = await Empleado.findByPk(id_cat_empleado);
  if (!empleado) {
    throw new Error(`El empleado con ID ${id_cat_empleado} no existe`);
  }
};

const existeClientePorId = async (id_cat_cliente) => {
  // Verificar si la visita existe por su ID
  const cliente = await Cliente.findByPk(id_cat_cliente);
  if (!cliente) {
    throw new Error(`El cliente con ID ${id_cat_cliente} no existe`);
  }
};

const existeDiaPorId = async (id_cat_dias) => {
  // Verificar si la visita existe por su ID
  const dia = await Dias.findByPk(id_cat_dias);
  if (!dia) {
    throw new Error(`El dia con ID ${id_cat_dias} no existe`);
  }
};

const existeEntradaSalidaPorId = async (id_cat_entrada_salida) => {
  // Verificar si la visita existe por su ID
  const entradaSalida = await EntradaSalida.findByPk(id_cat_entrada_salida);
  if (!entradaSalida) {
    throw new Error(`La ES con ID ${id_cat_entrada_salida} no existe`);
  }
};

const existeEventoPorId = async (id_cat_eventos) => {
  // Verificar si la visita existe por su ID
  const evento = await Eventos.findByPk(id_cat_eventos);
  if (!evento) {
    throw new Error(`El evento con ID ${id_cat_eventos} no existe`);
  }
};

module.exports = {
  emailInexiste,
  emailExiste,
  emailExistente,
  existeEmpleadoPorId,
  existeClientePorId,
  usuarioActivo,
  existeDiaPorId,
  existeEntradaSalidaPorId,
  existeEventoPorId,
};
