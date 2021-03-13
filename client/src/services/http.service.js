import Axios from 'axios';

const BASE_URL =
    process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/';

var axios = Axios.create({
    withCredentials: true,
});

export const httpService = {
    get(endpoint, data, params = null) {
        return ajax(endpoint, 'GET', data, params);
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data);
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    },
};

async function ajax(endpoint, method = 'get', data = null, params = null) {
    console.log(
        '🚀 ~ file: http.service.js ~ line 28 ~ ajax ~ endpoint',
        endpoint
    );
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log(' ~ file: http.service.js ', {
            url,
            method,
            data,
        });
        const res = await axios({
            url,
            method,
            data,
            params,
        });
        return res.data;
    } catch (err) {
        console.log(
            `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
            data
        );
        console.dir(err);
        if (err.response && err.response.status === 401) {
            window.location.assign('/#/login');
        }
        if (err.response.data) {
            throw err.response.data;
        }
        throw err;
    }
}
