import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getTaskById} from '../services/taskService';
import {FullTask} from '../redux/taskSlice';
import styles from '../styles/TaskDetails.module.css';

export default function TaskDetails() {
    const {id} = useParams<{ id: string }>();
    const [task, setTask] = useState<FullTask | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        getTaskById(id)
            .then(setTask)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-4">Loading task...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
    if (!task) return <p className="p-4">Task not found</p>;

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{task.title}</h1>
            <p className={styles.description}>{task.description}</p>
            <p className={styles.status}><strong>Priority:</strong> {task.priority}</p>
            {task.assignedUser && (
                <p className={styles.assignedUser}><strong>Assigned User:</strong> {task.assignedUser}</p>
            )}

            <p className={styles.assignedUser}><strong>Created At:</strong> {task.createdAt}</p>
            <p className={styles.assignedUser}><strong>Updated At:</strong> {task.updatedAt}</p>

        </div>
    );
}
