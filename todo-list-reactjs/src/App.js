import React, {Component} from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
        };
    }

    onGenerateData = () => {
        var tasks =[
            {
                id: this.generateID(),
                name: 'c#/c++',
                status: true,
            },
            {
                id: this.generateID(),
                name: 'angulare',
                status: false,
            },
            {
                id: this.generateID(),
                name: 'java',
                status: true,
            }
        ];

       this.setState({
           tasks: tasks,
       });

       localStorage.setItem('tasks',JSON.stringify(tasks));
    };

    s4(){
        return Math.floor((1 + Math.random())*0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4()  + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    componentWillMount(){
        if( localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
               tasks: tasks,
            });
        }
    }

    onToggleForm = () =>{
        this.setState({
            isDisplayForm : true,
        });
    };

    onCloseForm = () =>{
        this.setState({
            isDisplayForm : false,
        });
    };

    onTaskFormSubmit = (name, status) =>{
        var task = {
            id: this.generateID(),
            name: name,
            status: status
        };

        var tasks = this.state.tasks.slice();
        tasks.push(task);

        this.setState({
            tasks: tasks,
        });
    };

    onUpdateStatus = (taskId)=>{
        var index = this.findIndexByTaskId(taskId);
        var newTasks = this.state.tasks.slice();
        newTasks[index].status = !newTasks[index].status;
        this.setState({
            tasks: newTasks,
        })
    };

    findIndexByTaskId = (taskId) =>{
        var {tasks} = this.state;
        var res = -1;
        tasks.forEach((task, index) =>{
            if(task.id === taskId){
                res = index;
                return;
            }
        } );

        return res;
    };

    onFilter = (filterName, filterStaus) =>{
        alert(filterName  + ' ---- ' + filterStaus );
    };
    render() {

        var {tasks , isDisplayForm} = this.state;
        var elmTaskForm = isDisplayForm?
            <TaskForm
                onCloseForm = {this.onCloseForm}
                onSubmit = {this.onTaskFormSubmit}

            /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                        {elmTaskForm}
                    </div>
                    <div className={isDisplayForm?  'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5">
                            </span>
                            Thêm Công Việc
                        </button>
                        <br/>

                        {/*<button*/}
                            {/*type="button"*/}
                            {/*className="btn btn-danger"*/}
                            {/*onClick={this.onGenerateData}*/}
                        {/*>*/}
                            {/*<span className="fa fa-plus mr-5">*/}
                            {/*</span>*/}
                            {/*Generate công việc*/}
                        {/*</button>*/}
                        <TaskControl/>
                        <TaskList
                            tasks = {tasks}
                            onUpdateSatus = {this.onUpdateStatus}
                            onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
