export default interface IPool {
    name: string;
    lastBlock?: number;
    lastBlockHTMLSelector?: string;
    forToken?: string;
    active?: boolean;
}
