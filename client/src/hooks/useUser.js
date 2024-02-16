import { json } from "react-router-dom"

const useUser = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        sign: async (callback, credentials) => {
            try {
                const resp = await fetch(url + 'auth/sign', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(credentials)
                })
                const data = await resp.json()
                if (resp.ok) {
                    callback(data)
                } else {
                    //console.log(data.error);
                    if (data.error.code === 17) {
                        callback(undefined, 'No existe el usuario')
                    }
                    if (data.error.code === 14) {
                        callback(undefined, 'Contraseña incorrecta')
                    }
                }

            } catch (error) {
                callback(undefined, error.message)
            }
        },
        create: async (callback, userData) => {
            console.log(userData);
            try {
                const resp = await fetch(url + 'user', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    callback(data)
                } else {
                    console.log(data);
                    if (data.error.code === 10) {
                        return callback(undefined, `El ${data.error.message} ya esta en uso`)
                    }
                    callback(undefined, data.error.details)

                }

            } catch (error) {
                callback(undefined, error.message)
            }
        }

    }
}

export default useUser