import {Link} from 'react-router-dom';
import { members } from '../db/Members';
import { links } from '../db/Routing';

const Homepage = ()=>{

    const mem = members.map(
        (i)=>{
            return <tr>
                    <td>
                        {i['name']}
                    </td>
                    <td>
                        {i['roll']}
                    </td>
            </tr>
        }
    )

    const linksRender = links.map(
        (i)=>{
            return(
                <li className='list-group-item'>
                    <Link to={i['link']}>{i['label']}</Link>
                </li>
            )
        }
    ) 

    return <div>
            <div>
                <h1>Welcome to threader.</h1>
                <h2>A minor project.</h2>
            </div>
            <div className='left border border-success border-left' >
                <ul className='list-group'>    
                 {linksRender}
                </ul>
            </div>
                <div className='topRight'>
                    <h3>Completed By</h3>
                    <table className='table border border-success border-left'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mem}
                        </tbody>
                    </table>
                </div>
        </div>   
}

export default Homepage;