// src/pages/api/clicked.ts
import type { APIRoute } from 'astro';
// import Product from '../components/Product.astro';

const randomProducts = generateRandomProducts(1000);
export const GET: APIRoute = async (_) => {
    // You can process any data sent in the request here if needed

    const   products = randomProducts

    // Render the Astro component with props
    // const html = await Product.render(props);

    // Return a response with HTML content
    console.log("randomProducts", randomProducts)
    return new Response(
        JSON.stringify({data:randomProducts}),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
};


// Define the Props interface
interface Props {
    id:string;
    name: string;
    desc: string[];
    prices: [number];
    children: Props[]
}

// Function to generate a random string
function getRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate random products
export function generateRandomProducts(count: number): Props[] {
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

// Generate 5000 random products

