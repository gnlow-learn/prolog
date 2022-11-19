import { serve } from "https://deno.land/std@0.90.0/http/server.ts"

const server = serve({ port: 8000 })
console.log("Corsi - port: 8000")

for await (const req of server) {
    console.log(req.url.substring(1))
    try {
        const body = await Deno.readFile(req.url.substring(1))

        const contentType = {
            ".wasm": "application/wasm"
        }[req.url.match(/\..*$/)![0]] || "*"

        req.respond({
            status: 200,
            body,
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                "Content-Type": contentType,
            })
        })    
    } catch {/* */}
}