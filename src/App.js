import React, {useState, useEffect} from "react";
import {TaskRow} from './components/TaskRow'
import {TaskBanner} from './components/TaskBanner'
import {TaskCreator} from './components/TaskCreator'
import {VisibilityControl} from './components/VisibilityControl'

function App() {
    const [userName, setUserName] = useState('Apadilla');
    const [taskItems, setTaskItems] = useState([]);

    const [showCompleted, setShowCompleted] = useState(true);

    useEffect(() => {
        let data = localStorage.getItem('taskapp.tasks');
        if(data != null){
            setTaskItems(JSON.parse(data));
        } else {
            setUserName('Apadilla Example')
            setTaskItems([
                {name: 'Task One Example', done: false},
                {name: 'Task Two Example', done: false},
                {name: 'Task Three Example', done: true},
                {name: 'Task Four Example', done: false},
            ]);
            setShowCompleted(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('taskapp.tasks', JSON.stringify(taskItems));
    }, [taskItems]);

    const createNewTask = taskName => {
        if (!taskItems.find(t => t.name === taskName)) {
            setTaskItems([...taskItems, {name: taskName, done: false}]);
        } else {
            console.log('ya existe una tarea con ese nombre');
        }
    }

    const toggleTask = task =>
        setTaskItems(taskItems.map(t =>
            (t.name === task.name ? {...t, done: !t.done} : t)
        ));

    const taskTableRows = (doneValue) => taskItems
        .filter(t => t.done === doneValue)
        .map(task => ( <TaskRow task={task} key={task.name} toggleTask={toggleTask}/> )
        );

    return (
        <div className="App">
            <TaskBanner
                userName={userName}
                taskItemsLength={taskItems.filter(t => !t.done).length}
            />
            <TaskCreator
                callback={createNewTask}
            />
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Done</th>
                </tr>
                </thead>
                <tbody>
                {taskTableRows(false)}
                </tbody>
            </table>

            <div className="bg-secondary-text-white text-center p-2">
                <VisibilityControl
                    isChecked={showCompleted}
                    callback={checked => setShowCompleted(checked)}
                />
            </div>

            {
                showCompleted && (
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskTableRows(showCompleted)}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}

export default App;
