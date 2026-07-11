import getEnv from "../utils/getEnv"
import type Product from "../types/product"

const env = getEnv()

export const getProducts = async () => {
  const response = await fetch(env.API_PATH)
  return response.json()
}

export const createProduct = async (product: Product) => {
  const response = await fetch(env.API_PATH, {
    method: "POST",
    body: JSON.stringify(product),
  })
  return response.json
}

export const getProduct = async (id: string) => {
  const response = await fetch(`${env.API_PATH}/${id}`)
  return response.json()
}

export const updateProduct = async (id: string, product: Product) => {
  const response = await fetch(`${env.API_PATH}/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  })
  return response.json()
}

export const removeProduct = async (id: string) => {
  const response = await fetch(`${env.API_PATH}/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
