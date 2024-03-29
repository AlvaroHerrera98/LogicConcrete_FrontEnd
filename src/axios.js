import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    async function (error) {
        const orignalRequest = error.config;

        if (typeof error.response === 'undefined'){
            alert(
                'Hubo problemas con la conexión al sevidor ' +
                    'Puede haber problemas con CORS.' +
                    'Lamentamos los incovenientes arreglaremos el problema pronto.'
            );
            return Promise.reject(error);
        }

        if (error.response.status === 401 && 
            orignalRequest.url === baseURL + 'token/refresh/'){
                window.location.href = '/';
                return Promise.reject(error);
            }
        
        if (error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'){

                const refreshToken = localStorage.getItem('refresh_token');

                if(refreshToken) {
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp)

                    if(tokenParts.exp > now) {
                        return axiosInstance
                        .post('/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            axiosInstance.defaults.headers['Authorization'] =
                                'JWT ' + response.data.access;
                            orignalRequest.headers['Authorization'] = 
                                'JWT' + response.data.access;
                            
                            return axiosInstance(orignalRequest)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else {
                        console.log('Refresh token is expired', tokenParts.exp, now);
                        window.location.href = '/';
                    }
                } else {
                    console.log('Refresh token not available');
                    window.location.href = '/';
                }
            }

            // specific error handling done elsewhere
            return Promise.reject(error)
    }

    

)


export default axiosInstance;