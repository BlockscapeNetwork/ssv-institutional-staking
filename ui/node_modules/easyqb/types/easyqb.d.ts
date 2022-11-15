import { SQF } from './sq'

interface Configuration {
    oneCallback(trx: any, tableName: string, userAssociatedRecordsOnly?: boolean): Promise<Record<string, any> | number>;
    allCallback(trx: any, tableName: string, userAssociatedRecordsOnly?: boolean): Promise<Record<string, any>[] | number[]>;
    tableName?: string;
    userAssociatedRecordsOnly?: boolean;
}

/**
* Creates and returns a query builder with the given configuration
*/
export declare function easyqb(config?: Configuration): SQF