const fs = require("fs");
class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const getJSON= JSON.parse(products);
                return getJSON;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    async addProducts(title, description, price, thumbnail, code, stock) {
        const products = await this.getProducts();
        const prod = {
            id: this.getId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        products.push(prod);
    }
    async getId() {
        const products = await this.getProducts();
        let prodId = 0;
        products.map((prod) => {
            if (prod.id > prodId) prodId = prod.id;
        });
        return prodId;
    }


    async getProductById(productId) {
        try{
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(product) {
        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('Nuevo producto agregado')
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProduct() {
        try {
            const products = await this.getProducts();
            const product = products.splice(this.path);
            await fs.promises.writeFile(path, JSON.stringify(product));
            console.log("El producto fue eliminado");
        } catch (error) {
            console.log(error);
        }
       

    }
}


const prodManager = new ProductManager("./products.json")
const prod1 = {
    id: 1,
    title: "Lapicera Bic Round Stic Azul x12u",
    description: "Caja por 12 unidades de lapiceras Bic línea Round Stic, color azul, trazo grueso.",
    price: 3945,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera1_l3pehr.png",
    code: "1",
    stock: 10
};

const prod2 = {
    id: 2,
    title: "Lapiceras Bic Colores Cristal x10u",
    description: "Lapiceras Bic línea Cristal por 10 dolores surtidos, trazo grueso.",
    price: 7600,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera2_k7isxg.png",
    code: "2",
    stock: 10
};

const test = async () => {

    console.log(await prodManager.getProducts());
    prodManager.addProducts(prod1);
    prodManager.addProducts(prod2);
    console.log(await prodManager.getProducts());
    console.log(await prodManager.getProductById(1));
    console.log(await prodManager.getProductById(6));
    await prodManager.updateProduct(2, "stock", 2);
    //await prodManager.deleteProduct(1);
}

test();