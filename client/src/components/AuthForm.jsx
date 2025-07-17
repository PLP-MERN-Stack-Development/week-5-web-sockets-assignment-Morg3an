import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthForm = () => {
    const { login, register } = useAuth();

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleMode = () => {
        setIsRegisterMode((prev) => !prev);
        setFormData({ username: '', email: '', password: '' });
        setError('');
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegisterMode) {
                await register(formData.username, formData.email, formData.password);
            } else {
                await login(formData.email, formData.password);
            }
            window.location.href = '/';
        } catch (err) {
            setError(err?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4 text-center">
                {isRegisterMode ? 'Register' : 'Login'}
            </h2>

            {error && (
                <div className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegisterMode && (
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? 'Please wait...' : isRegisterMode ? 'Register' : 'Login'}
                </button>
            </form>

            <p className="mt-4 text-sm text-center">
                {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button onClick={toggleMode} className="text-blue-600 underline">
                    {isRegisterMode ? 'Login' : 'Register'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;