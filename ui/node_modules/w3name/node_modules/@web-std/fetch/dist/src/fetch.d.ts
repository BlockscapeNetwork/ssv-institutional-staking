export default fetch;
import Headers from "./headers.js";
import Request from "./request.js";
import Response from "./response.js";
import { ReadableStream } from "./package.js";
import { Blob } from "./package.js";
import { FormData } from "./package.js";
/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {RequestInit} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
export function fetch(url: string | URL | import('./request').default, options_?: RequestInit | undefined): Promise<import('./response').default>;
export { Headers, Request, Response, ReadableStream, Blob, FormData };
//# sourceMappingURL=fetch.d.ts.map