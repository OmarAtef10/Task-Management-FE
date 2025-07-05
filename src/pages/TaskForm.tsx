import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {addTask, editTask, Task} from '../redux/taskSlice';
import {RootState} from '../redux/store';
import {fetchUsers} from '../services/userService';
import styles from '../styles/TaskForm.module.css';
import {useLocation} from 'react-router-dom';
import {createTask, updateTask} from "../services/taskService";


export default function TaskForm() {
    const location = useLocation();
    const stateTask = location.state?.task as Task | undefined;

    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state: RootState) => state.tasks);
    const existingTask = stateTask;

    const [users, setUsers] = useState<string[]>([]);
    const [formData, setFormData] = useState<Omit<Task, 'id'>>({
        title: '',
        description: '',
        priority: 'LOW',
        assignedUser: ''
    });

    useEffect(() => {
        if (existingTask) {
            const {id, ...rest} = existingTask;
            setFormData(rest);
        }
    }, [existingTask]);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch(err => console.error('Failed to load users:', err));
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (existingTask && id) {
                // Update via API
                const updated = await updateTask(id, formData);
                dispatch(editTask(updated)); // Save to Redux
            } else {
                // Create via API
                const created = await createTask(formData);
                dispatch(addTask(created)); // Save to Redux
            }
            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1 className={styles.title}>{existingTask ? 'Edit Task' : 'Create Task'}</h1>

            <label className={styles.label}>Title</label>
            <input
                name="title"
                className={styles.input}
                value={formData.title}
                onChange={handleChange}
                required
            />

            <label className={styles.label}>Description</label>
            <textarea
                name="description"
                className={styles.textarea}
                value={formData.description}
                onChange={handleChange}
            />

            <label className={styles.label}>Priority</label>
            <select
                name="priority"
                className={styles.select}
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <label className={styles.label}>Assigned User</label>
            <select
                name="assignedUser"
                className={styles.select}
                value={formData.assignedUser}
                onChange={handleChange}

            >
                <option value="">Unassigned</option>
                {users.map(user => (
                    <option key={user} value={user}>
                        {user}
                    </option>
                ))}
            </select>

            <button type="submit" className={styles.button}>Save</button>
        </form>

    );
}
