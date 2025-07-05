import { Link } from 'react-router-dom';
import { Task } from '../redux/taskSlice';
import styles from '../styles/TaskCard.module.css';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/taskSlice'; // we'll add this if not there yet
import { deleteTaskByID } from '../services/taskService'; // your API function

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTaskByID(task.id);
        dispatch(deleteTask(task.id));
      } catch (err: any) {
        alert(err.message || 'Delete failed.');
      }
    }
  };

  return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{task.title}</h2>
          <span className={`${styles.statusTag} ${getStatusStyle(task.priority)}`}>
          {task.priority}
        </span>
        </div>


        <p className={styles.cardDescription}>{task.description}</p>

        {task.assignedUser && (
            <p className={styles.cardAssignedUser}>
              <strong>Assigned User:</strong> {task.assignedUser}
            </p>
        )}

          <div className={styles.cardLinks}>
              <Link to={`/edit/${task.id}`} state={{task}}>Edit</Link>
              <Link to={`/task/${task.id}`}>Details</Link>
              <button className={styles.deleteButton} onClick={handleDelete} title="Delete task">🗑️</button>
          </div>
      </div>
  );
}

function getStatusStyle(status: string): string {
    switch (status) {
        case 'LOW':
      return styles.statusLow;
    case 'MEDIUM':
      return styles.statusMedium;
    case 'HIGH':
      return styles.statusHigh;
    default:
      return '';
  }
}
