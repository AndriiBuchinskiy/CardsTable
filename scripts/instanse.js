const axiosInstance = axios.create({
    baseURL:'https://dummyjson.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;