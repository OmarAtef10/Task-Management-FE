import {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import TaskCard from '../components/TaskCard';
import {loadTasks, Task} from '../redux/taskSlice';
import {RootState, AppDispatch} from '../redux/store';
import styles from '../styles/Dashboard.module.css';
import {ThemeContext} from '../ThemeContext';

export default function Dashboard() {

    const {theme, toggleTheme} = useContext(ThemeContext);

    const dispatch = useDispatch<AppDispatch>();
    const {tasks, loading, error} = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    const low = tasks.filter(t => t.priority === 'LOW');
    const medium = tasks.filter(t => t.priority === 'MEDIUM');
    const high = tasks.filter(t => t.priority === 'HIGH');

    return (
        <div className={styles.dashboardContainer}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Task Dashboard</h1>
                <Link to="/create" className={styles.createButton}>
                    + Create Task
                </Link>
            </div>

            {loading && <p className="text-gray-500">Loading tasks...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className={styles.columns}>
                <div className={styles.column}>
                    <h2 className={styles.columnTitle}>Low</h2>
                    {low.length > 0 ? (
                        low.map(task => <TaskCard key={task.id} task={task}/>)
                    ) : (
                        <p className={styles.emptyMessage}>No low priority tasks.</p>
                    )}
                </div>

                <div className={styles.column}>
                    <h2 className={styles.columnTitle}>Medium</h2>
                    {medium.length > 0 ? (
                        medium.map(task => <TaskCard key={task.id} task={task}/>)
                    ) : (
                        <p className={styles.emptyMessage}>No medium priority tasks.</p>
                    )}
                </div>

                <div className={styles.column}>
                    <h2 className={styles.columnTitle}>High</h2>
                    {high.length > 0 ? (
                        high.map(task => <TaskCard key={task.id} task={task}/>)
                    ) : (
                        <p className={styles.emptyMessage}>No high priority tasks.</p>
                    )}
                </div>
            </div>
            <button onClick={toggleTheme} className={styles.toggleBtn}>
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>


        </div>

    );
}
