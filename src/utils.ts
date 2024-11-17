export function generateRandomProducts(count: number): Props[] {
    function getRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const products: Props[] = [];
    for (let i = 0; i < count; i++) {
        const name = getRandomString(10)
        const product: Props = {
            id: name+(i+1).toString(),
            name, // Random name of length 10
            desc: [
                getRandomString(20), // Random description string of length 20
                getRandomString(30), // Another random description string of length 30
            ],
            prices: [parseFloat((Math.random() * 100).toFixed(2))], // Random price between 0 and 100
            children:[]
        };
        products.push(product);
    }

    return products;
}