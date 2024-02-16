
const useTags = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        get: async (callback) => {
            try {
                const resp = await fetch(url + '/post/tags')
                const data = await resp.json()
                if (resp.ok) {
                    callback(data.tags)
                }
            } catch (e) {
                callback(undefined, e)
            }

        }

    }
}


export default useTags