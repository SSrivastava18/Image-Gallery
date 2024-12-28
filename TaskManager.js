import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';
function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            //upadte api call
            console.log('update api call');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            console.log('create api call')
            //create api call
            handleAddTask();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } =
                await CreateTask(obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const fetchAllTasks = async () => {
        try {
            const { data } =
                await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }
    useEffect(() => {
        fetchAllTasks()
    }, [])


    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
        <div className='d-flex flex-column align-items-center
        w-50 m-auto mt-5'>
            <h1 className='mb-4'>Image Gallary App</h1>
            {/* Input and Search box */}


            {/* List of Images card */}
            <div className='d-flex flex-column w-100'>

            </div>
        </div>
    )
}

export default TaskManager

