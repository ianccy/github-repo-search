/**
 * @param  { string } apiPath: api pathName
 * @param  { object } fetchOptions: fetch options argument
 */
export const generateFetch = domain => (apiPath, fetchOptions) => {
    return fetch(`${domain}${apiPath}`, fetchOptions)
        .then(decorateHttpStatus)
        .then(({ httpStatus, payload }) => {
            return { httpStatus, payload };
        });
};

function decorateHttpStatus(resp) {
    return resp.json().then(payload => ({ httpStatus: resp.status, payload }));
}

/**
 * @param  { string } apiVersiontag='v3': github api header version
 * @param  { string } method='GET': http request options
 * @param  { object } headers: fetch headers
 * @param  { any } rest: any options to add or cover headers
 */
export function generateFetchOptions({
    apiVersiontag = 'v3',
    method = 'GET',
    headers,
    ...rest
} = {}) {
    return {
        method,
        headers: new Headers({
            Accept: `application/vnd.github.${apiVersiontag}+json`,
            ...headers
        }),
        mode: 'cors',
        ...rest
    };
}