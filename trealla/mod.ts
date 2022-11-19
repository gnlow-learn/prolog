import { FORMATS, load, Prolog } from "https://esm.sh/trealla";

await load()

const pl = new Prolog({
    library: "/lib"
})

pl.fs.createDir("/lib")
pl.fs.open(
    "/lib/clpz.pl", { write: true, create: true }
).writeString(await Deno.readTextFile("lib/clpz.pl"))

await pl.consult("/lib/clpz.pl")

pl.fs.open(
    "/main.pl", { write: true, create: true }
).writeString(`
    :- use_module(library(clpz)).

    n_factorial(0, 1).
    n_factorial(N, F) :-
            N #> 0,
            N1 #= N - 1,
            F #= N * F1,
            n_factorial(N1, F1).
`)

await pl.consult("/main.pl")
console.log(await pl.queryOnce(`
    use_module(library(clpz)).
`, {format: "prolog"}))
console.log(await pl.queryOnce(`
    n_factorial(3, X).
`, {format: "prolog"}))