import type { AstroIntegration } from 'astro';

const app = (): AstroIntegration => {
    return {
        name: 'app',
        hooks: {
            'astro:config:setup': ({injectScript}) => {
                console.log('Custom integration setup!');
                // Modify config if needed
            },
            // Add more hooks as needed
        },
    };
};

export default app;