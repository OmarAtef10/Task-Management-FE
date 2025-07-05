const API_BASE = "http://localhost:8080/auth";

interface AuthResponse {
    token: string;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    const body = await res.text();
    if (!res.ok) {
        throw new Error(body);

    }
    try {
        const data = JSON.parse(body);
        console.log(data)
        localStorage.setItem("token", data.token);
        return data as AuthResponse;
    } catch {
        throw new Error('Invalid response from server.');
    }
}

export async function register(username: string, password: string): Promise<void> {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
}
