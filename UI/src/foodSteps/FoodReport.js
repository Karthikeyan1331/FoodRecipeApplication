import React, { useState, useEffect } from 'react'
import './report.css'
import axios from 'axios';
import API_URL from '../config';

const FoodReport = ({ id, heading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idValue, setIdValue] = useState('')
    const [foodName, setFoodName] = useState('')
    const [typeOfReport, setTypeOfReport] = useState('')
    const [complain, setComplain] = useState('');
    let temp = 'auth_code' in localStorage
    const handleReportClick = () => {
        setIsModalOpen(true);
    };
    const onChangeTypeOfReport = (e) => {
        setTypeOfReport(e.target.value)
    }

    const onChangeComplain = (e) => {
        setComplain(e.target.value)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const onSubmitReport = async () => {
        if (temp) {
            console.log(typeOfReport, complain, idValue)
            try {
                const response = await axios.post(`${API_URL}api/sendReport`,
                    {
                        idValue,
                        typeOfReport,
                        foodName,
                        complain,
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                    },
                });
                let tempData = response.data;
                console.log(tempData)
                if (tempData.status) {
                    console.log(tempData.message)
                    setIsModalOpen(false);
                }
                else {
                    console.log(tempData.message)
                }
            }
            catch (error) {
                console.log(error.message)
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setIdValue(id);
            setFoodName(heading)
        };
        if (id && id !== null && heading && heading !== null)
            fetchData();
    }, [id, heading]);
    return (<>
        <div className='Save'
            title="Report"
            onClick={handleReportClick}><i className="bi bi-flag"></i></div>
        {isModalOpen && (
            <div className="report-modal-overlay">
                <div className=' absolute w-[95%] px-3 py-4'>
                    <div className='text-[30px]'>{foodName}</div>
                    <div className='mt-3'>Type Of Report</div>
                    <div className='mt-3'>
                        <select className='border-solid p-1 rounded-lg border-black border-2 w-full'
                            onChange={onChangeTypeOfReport}>
                            <option value=''>~Select~</option>
                            <option value="spam">Spam or misleading</option>
                            <option value="harmful">Harmful or dangerous</option>
                            <option value="Image-Mismatch">Image Mismatch</option>
                            <option value="hate-speech">Hate speech or violence</option>
                            <option value="copyright-infringement">Copyright infringement</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='mt-3'>Complain</div>
                    <textarea onChange={onChangeComplain} className='border-solid p-2 rounded-lg border-black border-2 mt-3 w-full h-[14vw]'>

                    </textarea>
                </div>
                <div className='mt-[30vw] flex absolute'>
                    <button onClick={closeModal}
                        className='bg-gray-300 text-gray-950 px-3 py-2 rounded-full font-bold  ml-[35vw]'>
                        Close
                    </button>
                    <button onClick={onSubmitReport}
                        className='bg-blue-600 text-gray-50 px-3 py-2 rounded-full font-bold  ml-[1vw]'>
                        Report
                    </button>
                </div>

            </div>
        )}
    </>
    )
}

export default FoodReport