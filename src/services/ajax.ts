//环境变量替代硬编码
const HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

async function handleResponse<T>(res: Response): Promise<T> {
    const data = await res.json();
    //请求失败时抛出错误
    if (!res.ok) {
        throw new Error(data?.msg || `请求失败: ${res.status}`);
    }
    return data;
}

//此处使用unknown比使用any更安全
//any不会进行类型检查，因此会在编译器阶段通过，但可能在运行时崩溃
//unknown会进行类型检查，在编辑器阶段即可检测出类型问题，从而避免在运行时崩溃
export async function get<T = unknown>(url: string): Promise<T> {
    const res = await fetch(`${HOST}${url}`);
    return handleResponse<T>(res);
}

export async function post<T = unknown>(url: string, body: unknown): Promise<T> {
    const res = await fetch(`${HOST}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
}
