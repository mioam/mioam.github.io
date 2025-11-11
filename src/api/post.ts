import axios from 'axios';
const api = axios.create({
    baseURL: './blog',
    // baseURL: 'http://mioam.github.io/blog',
    timeout: 5000,
});

export async function getPost(filename: string) {
    const { data } = await api.get(`/${filename}`);
    return data;
}
export async function getList() {
    const { data } = await api.get(`/file_list.json`);
    console.log(data);
    return data;
}