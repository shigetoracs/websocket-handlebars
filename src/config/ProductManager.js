import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path //./products.json
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return prods
    }

    async getProductById(id) {
        try {
            const prods = await this.getProducts();
            const prod = prods.find(producto => producto.id == id);  // Cambié === por ==
                return prod;
           
        } catch (error) {
            console.error('Error al buscar producto por ID:', error);
            throw new Error('Error al buscar producto por ID');
        }
    }
    

    async addProduct(newProduct) {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    
            if (newProduct.code && newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.stock) {
                const indice = prods.findIndex(prod => prod.code === newProduct.code);
    
                if (indice === -1) {
                    prods.push(newProduct);
                    await fs.writeFile(this.path, JSON.stringify(prods, null, 2));
                    return 'Producto creado correctamente';
                } else {
                    return 'Producto ya existe en este array';
                }
            } else {
                return 'Debe ingresar un producto con todas las propiedades';
            }
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw new Error('Error al agregar producto');
        }
    }

    async updateProduct(id, nuevoProducto) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = prods.findIndex(producto => producto.id === id)
        if (indice != -1) {
            prods[indice].stock = nuevoProducto.stock
            prods[indice].price = nuevoProducto.price
            prods[indice].title = nuevoProducto.title
            prods[indice].thumbnail = nuevoProducto.thumbnail
            prods[indice].description = nuevoProducto.description
            prods[indice].code = nuevoProducto.code
            await fs.writeFile(this.path, JSON.stringify(prods))
            return 'Producto actualizado correctamente'
        } else {
            return 'Producto no existe'
        }

    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = prods.findIndex(producto => producto.id === id)
        if (indice != -1) {
            const prodsFiltrados = prods.filter(prod => prod.id != id)
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return 'Producto eliminado correctamente'
        } else {
            return 'Producto no existe'
        }

    }


}