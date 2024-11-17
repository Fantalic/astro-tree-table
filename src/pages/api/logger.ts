
export function createLogger(route:string){
    return {
        route,
        prepareOutput(args:any[]){
            let message:string
 
            if(!Array.isArray(args)){
                message = args
            }
            else {
                message = args.map(arg => {
                    // Check if the argument is an array
                    if (Array.isArray(arg)) {
                        return  JSON.stringify(arg) ; // Convert array to string
                    }
                    return typeof arg === 'object' ? JSON.stringify(arg) : String(arg); // Convert objects and other types to string
                }).join(''); // Join all parts with a space
            }
            
            const now = new Date();
            const datetime = now.getTime()
            const out = `<[${datetime}]: <TYPE> ${this.route}: ${message} >`
            return out
        },
        log(args:any[]) {
            const out = this.prepareOutput(args)
            console.log(out.replace("<TYPE>",""))
        },
        error(args:any[]) {
            const out = this.prepareOutput(args)
            console.log(out.replace("<TYPE>","ERROR:"))
        },
    }
}
