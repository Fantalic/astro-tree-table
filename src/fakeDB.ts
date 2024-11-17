import type { INode } from "./types"
import { generateRandomProducts } from "./utils"

const rootNode = generateRandomProducts(1)[0]

export interface IState{
    nodes:Record<string,INode>
}

console.log("!!! INIT FAKE DB!!!")
const root = {
    name:"Root",
    id:"root",
    desc:[],
    prices:[0],
    loaded:true,
    children: generateRandomProducts(500),
}
const STATE:IState = {
    nodes:{root},
}
for (const child of root.children) {
    child.children = generateRandomProducts(Math.random()*10 - 1)

    for (let  c of child.children) {
        STATE.nodes[c.id] = c
    }

    STATE.nodes[child.id] = child

}

export function getFakeDB(){
    return STATE
}


let count = 0

export function getNode(id:string){
    // console.log(id)
    // //@ts-ignore
    // if(!STATE.nodes[id] && count < 6){
    //     console.log("create children "+ id)
    //     count++
    //     const children = generateRandomProducts(10)
    //     for (const child of children) {
    //         STATE.nodes[child.id] = child
    //     }
    //     const extNode = {
    //         name:id,
    //         id,
    //         desc:[],
    //         prices:[0],
    //         loaded:true,
    //         children,
    //     }
    //     STATE.nodes[id] = extNode
    // }
    return STATE.nodes[id]
}