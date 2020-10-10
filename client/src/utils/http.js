import config from '../config/host';

const postOrPut = (method, url, data) => {
    return fetch(`${config.API_HOST}${url}`,{
        method: method,
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if(data) {
          return new Promise((resolve, reject) => {
              resolve(data);
          })
        } else {
            return Promise.reject('Empty response from Server!!!')
        }

    })
    .catch(err => Promise.reject(err));
}

const getOrDelete = (method, url, params={}) => {
   if(method === 'GET' && Object.keys(params).length > 0)
   url = buildUrl(url, params);
   return fetch(`${config.API_HOST}${url}`,{
      method: method
   })
   .then(response =>  response.json())
//    .then(data => {
//        return new Promise((resolve, reject) => {
//            resolve(data);
//        })
//    })
   .catch(err => Promise.reject(err))
}

const buildUrl = (url, params = {}) => {
	const query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
	let _url = url;
	if (query.length)
		_url = url + '?' + query;
	return _url;
};

export default {
    postOrPut,
    getOrDelete
}