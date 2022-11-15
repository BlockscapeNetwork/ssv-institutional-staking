import fetch from 'cross-fetch';

export { default as EasybaseProvider } from "./EasybaseProvider/EasybaseProvider";

const generateBareUrl = (type, integrationID) => `https://api.easybase.io/${type}/${integrationID}`;
const isBadInt = (my_int) => my_int !== undefined && my_int !== null && Math.floor(my_int) !== my_int;
const isBadString = (my_string) => my_string !== undefined && my_string !== null && typeof my_string !== "string";
const isBadIntegrationID = (my_string) => my_string === undefined || my_string === null || typeof my_string !== "string";
const isBadObject = (my_obj) => my_obj !== undefined && my_obj !== null && typeof my_obj !== "object";
const isBadBool = (my_bool) => my_bool !== undefined && my_bool !== null && typeof my_bool !== "boolean";

interface GetOptions {
    /** Easybase integration ID. Can be found by expanding the integration menu. This id is automatically generated.  */
    integrationID: string;
    /** Edit starting index from which records will be retrieved from. Useful for paging. */
    offset?: number;
    /** Limit the amount of records to be retrieved. Can be used in combination with offset. */
    limit?: number;
    /** Custom authentication string. Can be set in integration menu. If it is set, it is required to access integration. This acts as an extra layer of security and extensibility. */
    authentication?: string;
    /** This object can be set to overwrite the query values as set in the integration menu. If your query is setup to find records where 'age' >= 0, passing in { age: 50 } will query where 'age' >= 50. */
    customQuery?: Record<string, unknown>;
}

/**
 * 
 * @param {GetOptions} options GetOptions.
 * @returns {Promise<Array>} Array of records.
 * 
 */
export function get(options: GetOptions): Promise<Array<Record<string, unknown>>> {

    const defaultOptions: GetOptions = {
        integrationID: "",
        offset: undefined,
        limit: undefined,
        authentication: undefined,
        customQuery: undefined
    }
    const { integrationID, offset, limit, authentication, customQuery } = { ...defaultOptions, ...options };

    if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
    if (isBadInt(offset)) throw new Error("offset must be an integer");
    if (isBadInt(limit)) throw new Error("limit must be an integer");
    if (isBadString(authentication)) throw new Error("authentication must be a string or null");
    if (isBadObject(customQuery)) throw new Error("customQuery must be an object or null");

    return new Promise((resolve, reject) => {
        try {
            let fetch_body: any = {};
            if (typeof customQuery === "object") fetch_body = { ...customQuery };
            if (offset !== undefined) fetch_body.offset = offset;
            if (limit !== undefined) fetch_body.limit = limit;
            if (authentication !== undefined) fetch_body.authentication = authentication;

            fetch(generateBareUrl('get', integrationID), {
                method: "POST",
                body: JSON.stringify(fetch_body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resData => {
                    if ({}.hasOwnProperty.call(resData, 'ErrorCode')) {
                        console.error(resData.message);
                        resolve([resData.message]);
                    } else resolve(resData);
                });
        }
        catch (err) { reject(err); }
    });
}



interface PostOptions {
    /** Easybase integration ID. Can be found by expanding the integration menu. This id is automatically generated.  */
    integrationID: string;
    /** Values to post to Easybase collection. Format is { column name: value } */
    newRecord: Record<string, unknown>;
    /** Custom authentication string. Can be set in integration menu. If it is set, it is required to access integration. This acts as an extra layer of security and extensibility. */
    authentication?: string;
    /** If true, record will be inserted at the end of the collection rather than the front. */
    insertAtEnd?: boolean;
}

/**
 * 
 * @param {PostOptions} options PostOptions
 * @returns {Promise<String>} Post status.
 * 
 */
export function post(options: PostOptions): Promise<string> {

    const defaultValues: PostOptions = {
        integrationID: "",
        newRecord: {},
        authentication: undefined,
        insertAtEnd: undefined
    }

    const { integrationID, newRecord, authentication, insertAtEnd } = { ...defaultValues, ...options };

    if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
    if (isBadObject(newRecord)) throw new Error("newRecord is required and must be a string");
    if (isBadString(authentication)) throw new Error("authentication must be a string or null");
    if (isBadBool(insertAtEnd)) throw new Error("insertAtEnd must be a boolean or null");

    return new Promise((resolve, reject) => {
        try {
            const fetch_body: any = { ...newRecord };
            if (authentication !== undefined) fetch_body.authentication = authentication;
            if (insertAtEnd !== undefined) fetch_body.insertAtEnd = insertAtEnd;

            fetch(generateBareUrl('post', integrationID), {
                method: "POST",
                body: JSON.stringify(fetch_body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resData => {
                    if ({}.hasOwnProperty.call(resData, 'ErrorCode')) console.error(resData.message);
                    resolve(resData);
                });
        }
        catch (err) { reject(err); }
    });
}


interface UpdateOptions {
    /** Easybase integration ID. Can be found by expanding the integration menu. This id is automatically generated.  */
    integrationID: string;
    /** Values to update records with. Format is { column_name: new value } */
    updateValues: Record<string, unknown>;
    /** Custom authentication string. Can be set in integration menu. If it is set, it is required to access integration. This acts as an extra layer of security and extensibility. */
    authentication?: string;
    /** This object can be set to overwrite the query values as set in the integration menu. If your query is setup to find records where 'age' >= 0, passing in { age: 50 } will query where 'age' >= 50. */
    customQuery?: Record<string, unknown>;
}

/**
 * 
 * @param {UpdateOptions} options UpdateOptions
 * @returns {Promise<String>} Update status.
 */
export function update(options: UpdateOptions): Promise<string> {
    const defaultValues: UpdateOptions = {
        integrationID: "",
        updateValues: {},
        authentication: undefined,
        customQuery: undefined
    }

    const { integrationID, updateValues, authentication, customQuery } = { ...defaultValues, ...options };

    if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
    if (isBadObject(updateValues) || updateValues === undefined) throw new Error("updateValues is required and must be a string");
    if (isBadString(authentication)) throw new Error("authentication must be a string or null");
    if (isBadObject(customQuery)) throw new Error("customQuery must be an object or null");

    return new Promise((resolve, reject) => {
        try {
            const fetch_body: any = { updateValues, ...customQuery };
            if (authentication !== undefined) fetch_body.authentication = authentication;

            fetch(generateBareUrl('update', integrationID), {
                method: "POST",
                body: JSON.stringify(fetch_body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resData => {
                    if ({}.hasOwnProperty.call(resData, 'ErrorCode')) console.error(resData.message);
                    resolve(resData.message);
                });
        }
        catch (err) { reject(err); }
    });
}

interface DeleteOptions {
    /** Easybase integration ID. Can be found by expanding the integration menu. This id is automatically generated.  */
    integrationID: string;
    /** Custom authentication string. Can be set in integration menu. If it is set, it is required to access integration. This acts as an extra layer of security and extensibility. */
    authentication?: string;
    /** This object can be set to overwrite the query values as set in the integration menu. If your query is setup to find records where 'age' >= 0, passing in { age: 50 } will query where 'age' >= 50. */
    customQuery?: Record<string, unknown>;
}


/**
 * 
 * @param {DeleteOptions} options DeleteOptions
 * @return {Promise<String>} Delete status.
 */
export function Delete(options: DeleteOptions): Promise<string> {

    const defaultValues: DeleteOptions = {
        integrationID: "",
        authentication: undefined,
        customQuery: undefined
    }

    const { integrationID, authentication, customQuery } = { ...defaultValues, ...options };

    if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
    if (isBadString(authentication)) throw new Error("authentication must be a string or null");
    if (isBadObject(customQuery)) throw new Error("customQuery must be an object or null");

    return new Promise((resolve, reject) => {
        try {
            const fetch_body: any = { ...customQuery };
            if (authentication !== undefined) fetch_body.authentication = authentication;

            fetch(generateBareUrl('delete', integrationID), {
                method: "POST",
                body: JSON.stringify(fetch_body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resData => {
                    if ({}.hasOwnProperty.call(resData, 'ErrorCode')) console.error(resData.message);
                    resolve(resData.message);
                });
        }
        catch (err) { reject(err); }
    });
}

/**
 * @async
 * Call a cloud function, created in Easybase interface.
 * @param {string} route Route as detailed in Easybase. Found under 'Deploy'. Will be in the form of ####...####-function-name.
 * @param {Record<string, any>} postBody Optional object to pass as the body of the POST request. This object will available in your cloud function's event.body.
 * @return {Promise<string>} Response from your cloud function. Detailed with a call to 'return context.succeed("RESPONSE")'.
 */
export async function callFunction(route: string, postBody?: Record<string, any>): Promise<string> {

    const res = await fetch(generateBareUrl('function', route.split("/").pop()), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody) || ""
    });

    const rawDataText = await res.text();
    return rawDataText;
}