import axios from "axios";
let url = import.meta.env.VITE_LOCAL_URL;
if(import.meta.env.VITE_ENV === 'prod') {
    url = import.meta.env.VITE_PROD_URL
}

const Axios = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
})

export default Axios;
