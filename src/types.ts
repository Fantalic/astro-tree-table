export interface INode{
    id:string
    name: string;
    desc: string[];
    prices: number[];
    children: INode[]
}