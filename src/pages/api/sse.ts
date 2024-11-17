// src/pages/api/sse.ts
import type { APIRoute } from 'astro';
import { createLogger } from './logger.ts';


const PATH ="api/sse"

const LOGGER = createLogger(PATH)
const oM = (...args:any[] | any)=>{
    LOGGER.log(args)
}
const oE = (args:any[] | any)=>{
    LOGGER.error(args)
}

export const GET: APIRoute = async ({ request }) => {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();


    // Function to send data every second
    const sendData = () => {
        let count = 0;

        const intervalId = setInterval(async () => {
            count++;
            const message = `data: ${JSON.stringify({ count })}\n\n`;
            try {
                await writer.write(encoder.encode(message))
                // Clear interval after 10 messages
                if (count >= 10) {
                    clearInterval(intervalId);
                    await writer.close()
                }
            } catch{
                oE("ERROR !!! some error when writing!!!")
                clearInterval(intervalId)
            }
        }, 1000); // Send data every second

        writer.closed.then(( )=>{
            oM("writer.closed - writer was closed")
            clearInterval(intervalId); // Clear interval if the connection is aborted
        }).catch(( )=>{
            oE("writer.closed failed Promise")
            clearInterval(intervalId);
        })

            // Handle connection abort
        request.signal.addEventListener('abort', () => {
            oE("ABORT")
            clearInterval(intervalId); // Clear interval if the connection is aborted
            writer.close(); // Close the writer on abort
        });
    };

    // Start sending data
    sendData();

    return new Response(readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });


};