import React from 'react'
import Header from '../template/Header'
import TaskList from './TaskList'
import axios from 'axios'
import { connect} from 'react-redux'

class Task extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            _id: null,
            task: '',
            rows: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.refresh = this.refresh.bind(this)
        this.setId = this.setId.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this.onChangeCheck = this.onChangeCheck.bind(this)
    }

    componentDidMount() {
        if(this.props.userData.user){
            axios.defaults.headers.common['authorization'] = `Bearer ${this.props.userData.user.token}`
            this.refresh()
        } else {
            this.props.history.push("/login")
        }
    }

    refresh() {
        axios.get('http://localhost:3003/api/tasks')
            .then(resp => this.setState({ ...this.state, rows: resp.data }))
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isUpdateMode() {
        return this.state._id !== null
    }

    onSubmit(e) {
        e.preventDefault()
        if (!this.isUpdateMode()) {
            if(this.state.task.length < 0){
                return
            }
            axios.post("http://localhost:3003/api/tasks", { title: this.state.task })
                .then(resp => {
                    this.setState({ ...this.state, task: '' })
                }).then(() => this.refresh())
        } else {
            axios.put(`http://localhost:3003/api/tasks/${this.state._id}`, { title: this.state.task })
                .then(resp => this.setState({ ...this.state, task: '', _id: null }))
                .then(() => this.refresh())
        }
    }

    onChangeCheck(index) {
        const { state } = this
        state.rows[index].done = !state.rows[index].done
        const row = state.rows[index]
        axios.put(`http://localhost:3003/api/tasks/${row._id}`, { title: row.title, done: row.done })
            .then(resp => this.refresh())
        this.setState(state)
    }

    removeTask(index) {
        const { state } = this
        const row = state.rows[index]
        axios.delete(`http://localhost:3003/api/tasks/${row._id}`).then(resp => this.refresh())
    }

    setId(id) {
        const row = this.state.rows[id]
        this.setState({ ...this.state, _id: row._id, task: row.title })
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="row mt-4">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={this.onSubmit}>
                            <input type="hidden" value={this.state._id? this.state._id: ''} />
                            <div className="form-group">
                                <label>Tarefa</label>
                                <input type="text" name="task" className="form-control"
                                    onChange={this.onChange}
                                    value={this.state.task} />
                            </div>
                            <button className={this.isUpdateMode()? "btn btn-secondary" :"btn btn-primary"}>{ this.isUpdateMode()? "Save":"Create"}</button>
                        </form>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-8 offset-md-2">
                        <TaskList rows={this.state.rows}
                            onRemoveButton={this.removeTask}
                            onUpdateButton={this.setId}
                            onChangeCheck={this.onChangeCheck} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userData: state.userReducer
})

export default connect(mapStateToProps)(Task)