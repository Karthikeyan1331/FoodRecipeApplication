import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
    const { data } = props;
    const navigate = useNavigate();
    const redirectToNextPage = () => {
        navigate('/Instruction?id=' + data["Food_id"]);
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Report
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{data.TypeReport}</h4>
                <h6>{data.Food_name}</h6>
                <p>
                    {data.Problem}
                </p>
                <p className='float-right mr-4'>-By {data.User_email_id}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='ml-2 mr-0 btn btn-warning' onClick={() => redirectToNextPage()}>View Food</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
const Report = () => {
    const [approve, setApprove] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [dataToShow, setDataToShow] = useState('Some data');
    function onClickToViewData(report) {
        setModalShow(true)
        setDataToShow(report)
    }
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
                const response = await axios.post('/api/FetchAllRport', { get: "love" }, {
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
    return (
        <div className='w-[80%] mx-auto'>
            <Table striped bordered hover>
                <thead>
                    <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                        <th className='w-1/6'>Food Name</th> {/* 20% width */}
                        <th className="w-1/12">User Email ID</th> {/* 25% width */}
                        <th className='w-1/12'>Type of Report</th>
                        <th className='w-1/12'>Created Date</th> {/* 10% width */}
                        <th className='w-1/6'>Action</th> {/* 20% width */}
                    </tr>
                </thead>
                <tbody>
                    {approve.map(report => (
                        <tr key={report._id}>
                            <td>{report.Food_name}</td>
                            <td className="overflow-hidden break-words">{report.User_email_id}</td>
                            <td>{report.TypeReport}</td>
                            <td>{timeStrapConvertion(report.created_date)}</td>
                            <td className=''>
                                <Button variant="primary" className='ml-4 mr-0 btn btn-info' onClick={() => onClickToViewData(report)}>
                                    View
                                </Button>
                                <div title='Mail' className='ml-2 mr-0 btn btn-secondary'>Send Mail&nbsp;<i class="bi bi-envelope-at-fill"></i></div>
                                <div title='close' className='ml-2 mr-0 btn btn-light'><i class="bi bi-x-lg"></i></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={dataToShow}
            />
        </div>
    )
};

export default Report;
