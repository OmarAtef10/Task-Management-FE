const API_BASE = "http://localhost:8080";

interface User {
    id: number;
    username: string;
}

export async function fetchUsers(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
    const data = await res.json();
    //get usernames of the users only
    let users = []
    for (let i = 0; i < data.length; i++) {
        users.push(data[i].username);
    }

    return users;
}