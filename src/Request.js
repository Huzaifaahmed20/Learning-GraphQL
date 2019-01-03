import axios from 'axios'

export function request(method, api, query, variables={}) {
    return new Promise((resolve, reject) => {
        if (method === 'GET' || method === 'get') {

            axios.get(api, {
                query,
                headers: {
                    'Content-Type': 'application/graphql'
                },
                variables
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        } else if (method === 'POST' || method === 'post') {
            axios.post(api, {
                query,
                headers: {
                    'Content-Type': 'application/graphql'
                },
                variables
            }).then(res => {
                return resolve(res)
            }).catch(err => {
                return reject(err)
            })

        }
    })
}