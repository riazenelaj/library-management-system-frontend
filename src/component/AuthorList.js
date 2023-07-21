import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
function AurthorList(){
    const [author, setAuthor] = useState([]);


     const editAuthorClicked=(authorid)=>{
    }
    const deleteAuthorClicked=(authorid)=>{
    }

    return(
        <div className="container">
        <h3>Authors</h3>
        {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name </th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {author.map((testDataata) => 
                                <tr key={author.id}>
                                    <td>{author.name}</td>
                                    <td>{author.surname}</td>
                                    <td><button className="btn btn-warning" onClick={editAuthorClicked()}>Edit</button></td>
                                    <td><button className="btn btn-warning" onClick={deleteAuthorClicked()}>Delete</button></td>
                                </tr>
                        )}
                </tbody>
            </table>
        </div>
    </div>
    )
}
export default AurthorList;