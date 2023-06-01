import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {
    const { updata, setUPdata } = useContext(updatedata)
    const history = useHistory("");
    const [inpval, setINP] = useState({ name: "" })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const { id } = useParams("");

    const getdata = async () => {
        const result = await fetch(`/induser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data = await result.json();
        console.log(data);
        if (result.status === 422 || !data) {
            console.log("error ");
        } else {
            setINP(data[0])
        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async (e) => {
        e.preventDefault();
        const { name } = inpval;
        const res2 = await fetch(`/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });
        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            history.push("/")
            setUPdata(data2);
        }
    }

    return (
        <div className="container">
            <NavLink to="/">HOME</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mt-3 mb-3 edit_input" >
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <NavLink to={'/'}><button type="submit" onClick={updateuser} className="btn btn-primary submit edit_input1">Submit</button></NavLink>
                </div>
            </form>
        </div>
    )
}

export default Edit;


