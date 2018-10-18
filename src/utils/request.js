import fetch from 'dva/fetch';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, postData) {
    const apiBase = process.env.NODE_ENV == 'online' ? '' : '/apis';

    return fetch(apiBase + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    }).then(checkStatus)
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(err => ({ err }));
}
