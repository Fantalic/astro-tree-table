export const get = (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) =>{
    let getThingToLog = Alpine.evaluateLater(el,expression)

    effect(() => {
        getThingToLog((thingToLog) => {
            el.setAttribute("hx-get", expression)
            el.click()
        })
    })

    cleanup(() => {

    })
}