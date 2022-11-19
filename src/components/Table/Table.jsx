import React from 'react';
import './Table.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

const Table = () => {
    const [data, setData] = useState([])
    // console.log(data)

    // GETINIG DATA FORM THE URL 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get('https://jsonplaceholder.typicode.com/users')
                setData(data.data)
                // console.log(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    // sorting funtions
    const [order, setOrder] = useState("ASC")
    const sorting = (col) => {
        const name = [...data]
        console.log('name', name.name)

        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                a.name.localeCompare(b.name))
            // a[col].localeCompare() > b[col].localeCompare() ? 1 : -1);
            setData(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) =>
                a[col].localeCompare() < b[col].localeCompare() ? 1 : -1);
            setData(sorted)
            setOrder("ASC")
        }

    }

    // search filters
    const [searchData, setSearch] = useState('')
    // const search = (e) => {
    //     const Sdata = data.filter((user) => user.localeCompare().includes(e.target.value.toLowerCase))
    //     setData(Sdata)
    //     setSearch(e.target.value)
    // }
    return (
        <div className="container mt-5 pt-2 mb-5">
            <div className="searchBox">
                <form className="d-flex w-50 ">
                    <input className="form-control me-2 shadow" type="text"
                        placeholder="Search an item"
                        aria-label="Search"
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                </form>
            </div>
            <table className="table border shadow rounded">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="dropdown">
                                <button className="btn fw-bold dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    ID
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => sorting("ID")}><a className="dropdown-item" href="#">By ID</a></li>
                                </ul>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="dropdown">
                                <button className="btn fw-bold dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Name
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => sorting("name")}><a className="dropdown-item" href="#">By Asending</a></li>
                                    <li onClick={() => sorting("name")}><a className="dropdown-item" href="#">By Descending</a></li>
                                </ul>
                            </div>
                        </th>
                        <th scope="col">
                            username
                        </th>
                        <th scope="col">
                            phone
                        </th>
                        <th scope="col">
                            webite
                        </th>
                    </tr>
                </thead>
                {
                    data.filter((value) =>{
                        if(searchData == ""){
                            return value;
                        } else if(value.name.toLowerCase().includes(searchData.toLowerCase())){
                            return value;
                        } else if (value.username.toLowerCase().includes(searchData.toLowerCase())){
                            return value;
                        } else if (value.phone.toLowerCase().includes(searchData.toLowerCase())){
                            return value;
                        } else if(value.website.toLowerCase().includes(searchData.toLowerCase())){
                            return value;
                        }
                    }).map((item, index) => (
                        <tbody key={index}>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.phone}</td>
                                <td>{item.website}</td>
                            </tr>

                        </tbody>
                    ))
                }
            </table>
        </div>
    )
}

export default Table