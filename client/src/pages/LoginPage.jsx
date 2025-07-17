import AuthForm from '../components/AuthForm';

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <AuthForm mode="login" />
        </div>
    );
};

export default LoginPage;