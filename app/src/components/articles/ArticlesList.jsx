import React from 'react'
import './articlesList.css'
import { Link } from 'react-router-dom'

export default props => (
    <div className="articles">
        {
            props.rows.map((el,index) => <div key={index}><Link className="link"to={{ pathname: `/articles/${el._id}`}}>{el.title}</Link></div>)
        }
    </div>
)