import Alpine from "alpinejs"

export const split = ((el, {}, { cleanup })=>{
    function resize(event,idx ){
        el.children[idx+1].onmouseleave = null
        let startPos = event.clientX

        document.onmousemove = (event)=>{
            const e = el.children[idx]
            const width = e.clientWidth
            const diff = event.clientX - startPos
            e.style.width = `${width + diff }px`
            startPos = event.clientX - diff
        }
        document.onmouseup = ()=>{
            el.children[idx+1].style.width = "6px"
            document.onmousemove = null
        }
    }


    function init(idx:number, el:any){
        el.onmousedown = (event)=> resize(event,idx)

    }

    Alpine.nextTick(()=>{
        let idx = 0
        let len = el.children.length
        while(idx < len-1){
            const child = el.children[idx]
            if(child.tagName === "TEMPLATE"){
                idx++
                continue
            }
            const newE = document.createElement('div'); // Create your new element
            newE.textContent = " "; // Set content for the new element
            const eSplitter = newE.cloneNode(true)
            eSplitter.style.width = "6px"
            el.children[idx+1].before(eSplitter)

            const i = idx
            el.children[idx+1].onmouseover = (event) => {
                el.children[i+1].style.width = "20px"
                init(i, eSplitter)
                el.children[i+1].onmouseleave = ()=> el.children[i+1].style.width = "6px"
            }
            el.onmouseleave = null

            idx++
            len++
            idx++

        }
    })

    cleanup(() => {
        el.onmouseleave = null
        el.onmousedown = null
        document.onmousemove = null
        document.onmouseup = null
    })
})