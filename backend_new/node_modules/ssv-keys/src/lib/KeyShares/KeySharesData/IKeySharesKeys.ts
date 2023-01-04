export interface IKeySharesKeys {
  publicKeys: string[] | undefined;
  encryptedKeys: string[] | undefined;
  setData(data: any): any;
  validate(): Promise<any>;
}
