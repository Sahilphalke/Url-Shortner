const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Note: For now, we'll use a placeholder for the auth token.
// In a real app, this would be managed by a login state/context.
const getAuthHeaders = () => {
    const token = localStorage.getItem('token') || '';
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const api = {
    async getStats() {
        const res = await fetch(`${API_BASE_URL}/url/stats?t=${Date.now()}`, {
            headers: getAuthHeaders(),
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
    },

    async getUrls() {
        const res = await fetch(`${API_BASE_URL}/url/list?t=${Date.now()}`, {
            headers: getAuthHeaders(),
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch URLs');
        return res.json();
    },

    async createUrl(data) {
        const res = await fetch(`${API_BASE_URL}/url/create`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to create URL');
        return result;
    },

    async clearUrls() {
        const res = await fetch(`${API_BASE_URL}/url/clear`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error('Failed to clear URLs');
        return res.json();
    },

    async login(email, password) {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Login failed');
        return result;
    },

    async register(name, email, password) {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Registration failed');
        return result;
    }
};
