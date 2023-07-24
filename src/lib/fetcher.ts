const BASE_URL = 'http://localhost:8080';

export const fetcher = (info: RequestInfo, init: RequestInit) => fetch(`${BASE_URL}${info}`, init).then(res => res.json());