import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <AuthForm mode="register" />
        </div>
    );
};

export default RegisterPage;