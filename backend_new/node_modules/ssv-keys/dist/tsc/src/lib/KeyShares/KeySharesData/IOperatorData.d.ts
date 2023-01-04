export interface IOperatorData {
    id: number | undefined;
    publicKey: string | undefined;
    setData(data: any): any;
    validate(): Promise<any>;
}
