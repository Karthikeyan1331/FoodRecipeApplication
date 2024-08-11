import React, { useState, useEffect } from 'react';
import TopBar from '../component/TopBar';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
import Foot from '../FrontPage/foot';
const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState(''); // Change this to set the number of items per page
    const maxPagesToShow = 3;

    function timeStrapConvertion(timestamp) {
        console.log(timestamp);

        // Extract year, month, day, hours, minutes, seconds, and milliseconds from the timestamp
        const [year, month, day, hours, minutes, seconds, milliseconds] = timestamp.split(/[-T:.Z]/);
        console.log(year, month, day, hours, minutes, seconds, milliseconds)
        // Create a Date object with the extracted values in IST
        let formattedTime = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        return formattedTime.toDateString()
        // console.log(formattedTime); // Converts the timestamp to a Date object in GMT
        // console.log(formattedTime)
        // let currentTime = new Date(); // Gets the current time in GMT; // Converts timestamp to IST
        // console.log(formattedTime, currentTime)
        // const timeDifference = currentTime.getTime() - formattedTime.getTime(); // Calculates time difference in milliseconds
        // const secondsDifference = Math.floor(timeDifference / 1000); // Converts time difference to seconds

        // if (secondsDifference < 60) {
        //     return `${secondsDifference} seconds ago`;
        // } else if (secondsDifference < 3600) {
        //     const minutesDifference = Math.floor(secondsDifference / 60);
        //     return `${minutesDifference} minutes ago`;
        // } else if (secondsDifference < 86400) {
        //     const hoursDifference = Math.floor(secondsDifference / 3600);
        //     return `${hoursDifference} hours ago`;
        // } else if (secondsDifference < 2592000) { // One month: 30 days * 24 hours * 3600 seconds
        //     const daysDifference = Math.floor(secondsDifference / 86400);
        //     return `${daysDifference} days ago`;
        // } else if (secondsDifference < 31536000) { // One year: 365 days * 24 hours * 3600 seconds
        //     const monthsDifference = Math.floor(secondsDifference / 2592000);
        //     return `${monthsDifference} months ago`;
        // } else {
        //     const yearsDifference = Math.floor(secondsDifference / 31536000);
        //     return `${yearsDifference} years ago`;
        // }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_URL}api/myFood`, { id: "love" }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                    },
                });
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("There is no data");
                }
            } catch (error) {
                console.log('Error fetching data:', error);
                navigate('/Search');
            }
        };
        fetchData();
    }, [navigate]);



    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data
        .filter(item =>
            item.TranslatedRecipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Course.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate page numbers to display
    const totalPageCount = Math.ceil(data.length / itemsPerPage);
    let startPage, endPage;
    if (totalPageCount <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPageCount;
    } else {
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        if (currentPage <= halfMaxPagesToShow) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + halfMaxPagesToShow >= totalPageCount) {
            startPage = totalPageCount - maxPagesToShow + 1;
            endPage = totalPageCount;
        } else {
            startPage = currentPage - halfMaxPagesToShow;
            endPage = currentPage + halfMaxPagesToShow;
        }
    }
    const redirectToNextPage = (data) => {
        navigate('/Instruction?id=' + data["_id"]);
    };
    const handleOnclickBtn = (e) => {
        if (e === 'Add')
            navigate('/AddFood')
        else
            navigate('/EditFood?_id=' + e)
    }
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset current page when search query changes
    };
    const deleteFunctionFile = async (e, food) => {
        const isConfirmed = window.confirm(`Do you want to delete the ${food}?`);
        if (isConfirmed) {
            try {
                const response = await axios.post(`${API_URL}Delete_Food`, { _id:e }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                    },
                });
                if (response.status === 200) {
                    window.location.reload()
                } else {
                    console.log("Shit")
                    console.log("There is no data");
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        else{
            console.log("Not deleted")
        }
    }
    return (
        <div>
            <TopBar />

            <div className='mt-6 w-full'>
                <div className='btn btn-primary ml-[90vw]' onClick={() => handleOnclickBtn("Add")}>Add Food</div>
            </div>
            <div className='mt-6 w-[50%] ml-[15%] p-2'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>
            <div className='flex justify-center items-center mt-3'>

                <div className='w-[70%]'>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className='w-[5%]'>#</th>
                                <th className='w-[20%]'>Recipe Name</th>
                                <th className='w-[10%]'>Cuisine</th>
                                <th className='w-[15%]'>Course</th>
                                <th className='w-[20%]'>Created On</th>
                                <th className='w-[20%]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render rows for currentItems */}
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{item.TranslatedRecipeName}</td>
                                    <td>{item.Cuisine}</td>
                                    <td>{item.Course}</td>
                                    <td>{timeStrapConvertion(item.created_on)}</td>
                                    <td className=''>
                                        <div className='btn btn-danger' onClick={() => deleteFunctionFile(item._id, item.TranslatedRecipeName)}><i className="bi bi-trash-fill"></i></div>
                                        <div className=' ml-2 btn btn-dark' onClick={() => handleOnclickBtn(item._id)}><i className="bi bi-pencil-fill"></i></div>
                                        <div className='ml-4 mr-0 btn btn-info' onClick={() => redirectToNextPage(item)}>View</div>
                                        {item.approve === 0 && <div title="Waiting" className='p-0 ml-3 btn'><i className="text-yellow-500 p-0 text-[30px] bi bi-hourglass-split"></i></div>}
                                        {item.approve === 2 && <div title="Rejected" className='p-0 ml-3 btn'><i className="text-red-500 p-0 text-[30px] bi bi-x-octagon-fill"></i></div>}
                                        {item.approve === 1 && <div title="Approved" className='p-0 ml-3 btn'><i className="text-blue-500 p-0 text-[30px] bi bi-patch-check-fill"></i></div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Pagination */}
                    <div className='pagination justify-center items-center'>
                        {startPage !== 1 && (
                            <button className="btn ml-2 btn-secondary" onClick={() => paginate(1)}>1</button>
                        )}
                        {startPage > 2 && (
                            <span className='mx-1 btn btn-light'>...</span>
                        )}
                        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                            <button
                                key={startPage + index}
                                onClick={() => paginate(startPage + index)}
                                className={`btn ml-2 ${currentPage === startPage + index ? "btn-primary" : "btn-secondary"}`}
                            >
                                {startPage + index}
                            </button>
                        ))}
                        {endPage < totalPageCount - 1 && (
                            <span className='mx-1 btn btn-light'>...</span>
                        )}
                        {endPage !== totalPageCount && (
                            <button className="btn ml-2 btn-secondary" onClick={() => paginate(totalPageCount)}>{totalPageCount}</button>
                        )}
                    </div>

                </div>
            </div>
            <div>
                <Foot />
            </div>
        </div>
    );
};

export default Dashboard;
