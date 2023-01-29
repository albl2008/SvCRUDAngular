import { Request, Response } from "express";
import Product from "../models/product";

export const getProducts = async (req: Request, res: Response) => {
  const listProducts = await Product.findAll();
  res.json(listProducts);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      msg: `No se encontro producto con id ${id}`,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (product) {
    await product.destroy();
    res.json({
      msg: "Se elimino el producto",
    });
  } else {
    res.status(404).json({
      msg: `No se encontro producto con id ${id}`,
    });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Product.create(body);
    res.json({
      msg: "Se agrego el producto",
      body,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Ocurrio un error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (product) {
      await product.update(body);
      res.json({
        msg: "Producto actualizado",
        id,
        body,
      });
    } else {
      res.status(404).json({
        msg: `No se encontro producto con id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Error al actualizar producto",
    });
  }
};
