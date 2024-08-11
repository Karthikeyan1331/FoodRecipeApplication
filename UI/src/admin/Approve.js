import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
const Approve = () => {
    const [approve, setApprove] = useState([]);
    const navigate = useNavigate();
    function timeStrapConvertion(timestamp) {
        console.log(timestamp);

        // Extract year, month, day, hours, minutes, seconds, and milliseconds from the timestamp
        const [year, month, day, hours, minutes, seconds, milliseconds] = timestamp.split(/[-T:.Z]/);
        console.log(year, month, day, hours, minutes, seconds, milliseconds)
        // Create a Date object with the extracted values in IST
        let formattedTime = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        return formattedTime.toDateString()

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make the POST request with the token and fetch data
                const response = await axios.post(`${API_URL}api/FetchAllFoodWaiting`, { get: "love" }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                    },
                });
                if (response.status === 200) {
                    // Set the response data to the approve state
                    setApprove(response.data);
                }
                else {
                    console.log(response)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function on component mount
    }, []);
    const redirectToNextPage = (data) => {
        navigate('/Instruction?id=' + data["_id"]);
    };
    const ApproveReject = async (_id, t) => {
        let c = "Reject", api = "Reject"
        if (t === "A") {
            c = "Approve"
            api = "Approve"
        }
        const isConfirmed = window.confirm(`Do you want to ${c} this Food?`);
        if (isConfirmed) {
            try {
                // Make the POST request with the token and fetch data
                const response = await axios.post(`${API_URL}api/${api}`, { _id }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                    },
                });
                if (response.status === 200) {
                    // Set the response data to the approve state
                    window.location.reload()
                }
                else {
                    console.log(response)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    return (
        <div className='w-[80%] mx-auto'>
            <Table striped bordered hover>
                <thead>
                    <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                        <th className='w-1/12'>Food Name</th> {/* 20% width */}
                        <th className="w-[2%]">Created By</th> {/* 25% width */}
                        <th className='w-1/12'>Cuisine</th>
                        <th className='w-1/12'>Course</th> {/* 10% width */}
                        <th className='w-[2%]'>Time</th> {/* 10% width */}
                        <th className='w-1/12'>Created Date</th> {/* 10% width */}
                        <th className='w-1/6'>Action</th> {/* 20% width */}
                    </tr>
                </thead>
                <tbody>
                    {approve.map(report => (
                        <tr key={report._id}>
                            <td>{report.TranslatedRecipeName}</td>
                            <td className="overflow-hidden break-words">{report.email}</td>
                            <td>{report.Cuisine}</td>
                            <td>{report.Course}</td>
                            <td>{report.TotalTimeInMins}</td>
                            <td>{timeStrapConvertion(report.created_on)}</td>
                            <td className=''>
                                <div className='ml-2 btn btn-success' onClick={()=>ApproveReject(report._id,"A")}>Approve</div>
                                <div className='ml-2 btn btn-danger'onClick={()=>ApproveReject(report._id,"R")}>Reject</div>
                                <div className='ml-2 mr-0 btn btn-info' onClick={() => redirectToNextPage(report)}>View</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default Approve;