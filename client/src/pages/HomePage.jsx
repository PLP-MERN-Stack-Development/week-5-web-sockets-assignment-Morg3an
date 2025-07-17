import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">ChatApp</h1>
                <div className="space-x-4">
                    {!user ? (
                        <>
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/chat" className="text-blue-600 hover:underline">
                                Chat
                            </Link>
                            <button
                                onClick={logout}
                                className="text-red-600 hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-8 text-center">
                {!user ? (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Welcome to ChatApp</h2>
                        <p className="text-gray-600">
                            Please <Link to="/login" className="text-blue-600 underline">Login</Link> or <Link to="/register" className="text-blue-600 underline">Register</Link> to start chatting.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Welcome back, {user.username}!</h2>
                        <p className="text-gray-600">
                            Head over to the <Link to="/chat" className="text-blue-600 underline">Chat Room</Link> to join the conversation.
                        </p>
                    </>
                )}
            </main>
        </div>
    );
};

export default HomePage;