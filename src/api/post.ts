import axios from 'axios';

const api = axios.create({
    baseURL: './blog',
    timeout: 5000,
});

export async function getPost(filename: string) {
    const { data } = await api.get(`/${filename}`);
    return data;
}