import React, { useContext, useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { udata, setUdata } = useContext(adddata);
    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
    })

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval, [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();
        const { name} = inpval;


        if (name === "") {
            alert("name is required")
        } else {
            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");
            } else {
                history.push("/")
                setUdata(data)
                console.log("data added");
            }
        }
    }

    return (
        <div className="container">
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 edit_input">
                        <input placeholder='Name' type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" onClick={addinpdata} className="btn btn-success edit_input">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
