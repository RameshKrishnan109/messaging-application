const apiBaseUrl = "http://localhost:4000";

export const apiRequest = {

    async get(url: string){
        const res = await fetch(`${apiBaseUrl}${url}`);
        const data = await res.json();
        return data;
    },

    async post<T>(url: string, body: {}) {
        const res = await fetch(`${apiBaseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const data = await res.json() as T;
        return data;
    }
}