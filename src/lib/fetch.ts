import axios from "axios";

import Cookies from "js-cookie";

interface FetchProps {
    path: string,
    method?: string,
    data?: { [key: string]: any }
}

const FetchWithToken = async ({ path, method, data }: FetchProps) => {

    console.log(Cookies.get('user.token'));

    return await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`,
        method: method || "POST",
        data: data || {},
        headers: {
            Authorization: `Bearer ${Cookies.get('user.token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export { FetchWithToken }