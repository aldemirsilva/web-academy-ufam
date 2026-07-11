import { type Request, type Response } from "express"
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  removeProduct,
} from "../services/products"
import Product from "../types/product"

const index = async (req: Request, res: Response) => {
  const products = await getProducts()
  res.render("products/index", {
    products,
  })
}

const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("products/create")
  } else if (req.method === "POST") {
    const product = req.body as Product
    await createProduct(product)
    res.redirect("/products")
  }
}

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string
  const product = await getProduct(id)
  res.render("products/read", {
    product,
  })
}

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (req.method === "GET") {
    const product = await getProduct(id)
    res.render("products/update", {
      product,
    })
  } else if (req.method === "POST") {
    const product = req.body as Product
    await updateProduct(id, product)
    res.redirect("/products")
  }
}

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string
  await removeProduct(id)
  res.redirect("/products")
}

export default { index, create, read, update, remove }
