import ProductService from '../daos/index.js'

const productServicePromise = ProductService()
const productosDao = new (await productServicePromise)

export const getProducts = async (_req, res, next) => {
  try {
    const listaProductos = await productosDao.read();
    return res.status(200).send({ data: listaProductos})
  } catch (err) {
    next(err)
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoById = await productosDao.getById(parseInt(id));
    productoById
      ? res.json(productoById)
      : res.json({ error: "Producto no encontrado" });
  } catch (err) {
    next(err);
  }
};

export const postProduct = async (req, res, next) => {
  try {
    if (process.env.ADMIN) {
      const idProduct = await productosDao.create(req.body);
      res.status(200).json(idProduct);
    } else {
      res.json({
        error: -1,
        description: "Ruta api/productos, Método POST, No autorizado"
      });
    }
  } catch (err) {
    next(err);
  }
};

export const putProduct = async (req, res, next) => {
  try {
    if (process.env.ADMIN) {
      const { id } = req.params;
      const changes = req.body
      const respuesta = await productosDao.update((id), changes);
      res.json(respuesta);
    } else {
      res.json({
        error: -1,
        description: "Ruta api/productos/id, Método PUT, No autorizado"
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    if (process.env.ADMIN) {
      const { id } = req.params;
      await productosDao.delete((id));
      console.info(`Item with id ${id} has been deleted`)
      res.send(200).json({ data: `Item with id ${id} has been deleted`})
    } else {
      res.json({
        error: -1,
        description: "Ruta api/productos/id, Método DELETE, No autorizado"
      });
    }
  } catch (err) {
    next(err);
  }
};
