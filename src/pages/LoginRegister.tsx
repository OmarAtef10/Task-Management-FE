import {useState, ChangeEvent, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/AuthForm.module.css';
import {login, register} from '../services/authService';

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(prev => !prev);
        setFormData({username: '', password: ''});
        setError('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const res = await login(formData.username, formData.password);
                localStorage.setItem('token', res.token);
                navigate('/dashboard');
            } else {
                await register(formData.username, formData.password);
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1 className={styles.title}>{isLogin ? 'Login' : 'Register'}</h1>

            {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}

            <label className={styles.label} htmlFor="email">Username</label>
            <input
                id="username"
                name="username"
                type="username"
                className={styles.input}
                value={formData.username}
                onChange={handleChange}
                required
            />

            <label className={styles.label} htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit" className={styles.button}>
                {isLogin ? 'Login' : 'Register'}
            </button>

            <p className={styles.toggleText}>
                {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                <button type="button" onClick={toggleForm}>
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </form>
    );
}
