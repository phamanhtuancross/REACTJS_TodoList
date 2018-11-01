import React, { Component } from 'react';

class TaskItem extends Component {

    constructor(props) {
        super(props);

    }

    onUpdateStatus = ()=>{
        this.props.onUpdateStatus(this.props.task.id);
    };
    render() {

        var {task,index} = this.props;
        return (
            <tr>
                <td>
                    {index}
                </td>
                <td>{task.name}</td>
                <td className="text-center ">
                    <span
                        className={task.status? 'label label-danger' : 'label label-success'}
                        onClick={this.onUpdateStatus}
                    >
                        {this.props.task.status? 'Kích hoạt' : 'Ẩn'}</span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                    >
                        <span className="fa fa-pencil mr-5">
                        </span>Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5">
                        </span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
