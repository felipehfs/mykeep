import React from 'react'
import './TaskList.css'

export default props => (
    <table className="table table-bordered">
        <thead>
            <tr>
                <th></th>
                <th>Tarefa</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {
                props.rows.map((el, index) => <tr key={index}>
                    <td><input type="checkbox" checked={el.done} 
                        onChange={e => props.onChangeCheck(index)} 
                        value={el.done}/></td>
                    <td className={el.done? "finished": ""}>{el.title}</td>
                    <td>
                        <a href="" className="btn btn-warning mr-2" onClick={e => {
                            e.preventDefault()
                            props.onUpdateButton(index)}}>
                            <i className="fa fa-pencil"></i>
                        </a>
                        <a href="" className="btn btn-danger" onClick={e => {
                        e.preventDefault()
                        props.onRemoveButton(index) 
                    }}><i className="fa fa-trash"></i></a>
                    </td>
                </tr>)
            }
        </tbody>
    </table>
)