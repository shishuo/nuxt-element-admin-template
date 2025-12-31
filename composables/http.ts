//定义ts变量类型接口
export const http = {
    get: (url: string, query: any, project?: string) => {
        return callback(url, 'GET', query, project);
    },
    post: (url: string, query: any, project?: string) => {
        return callback(url, 'POST', query, project);
    }
}

function callback(url: string, method: string, query: any, project?: string) {
    const headers = useRequestHeaders();
    const {public: {BASE_DOMAIN}} = useRuntimeConfig()
    return new Promise<void>((resolve, reject) => {
        $fetch(url, {
            baseURL: project ? "https://" + project + "." + BASE_DOMAIN : "https://school." + BASE_DOMAIN,
            mode: 'cors',
            credentials: 'include',
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(query)
        }).then((res: any) => {
            if (res.auth) {
                if (res.result) {
                    if (res.t) {
                        resolve(res.t)
                    } else if (res.data) {
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                } else {
                    reject(res)
                }
            } else {
                // window.location.href = 'https://www.' + BASE_DOMAIN
            }
        }).catch((res) => {
            reject(res)
        })
    })
}