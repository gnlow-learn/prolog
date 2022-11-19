// @ts-nocheck:
import SWIPL from "./swipl-web.js"

declare global {
    function SWIPL(): any
}
console.log(SWIPL())