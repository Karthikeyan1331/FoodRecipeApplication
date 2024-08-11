import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../config';
const InstructionLikes = ({ id }) => {
    const [foodLike, setFoodLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    let temp = 'auth_code' in localStorage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_URL}api/getAboutLike`,
                    { id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                        },
                    });
                setLikeCount(response.data.count)
                setFoodLike(response.data.existed)
                // Handle the response from the backend as needed
            } catch (error) {
                console.error('Error fetching data from the backend:', error.message);
                // Handle errors if needed
            }
        };
        if (id && id !== null && temp)
            fetchData();
    }, [id, temp]);
    async function userClickHeartBtn() {
        if (temp) {
            try {
                const response = await axios.post(`${API_URL}api/UserLiked`,
                    { id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                        },
                    });
                if (response.data.existed) {
                    setFoodLike(response.data.existed)
                    setLikeCount(likeCount + 1)
                }
                else {
                    setLikeCount(likeCount - 1)
                    setFoodLike(response.data.existed)
                }
                // Handle the response from the backend as needed
            } catch (error) {
                console.error('Error fetching data from the backend:', error);
                // Handle errors if needed
            }
        }
    }
    return (
        <div className='Save' title='Like'>
            <div className='flex m-0 p-0'>
                <i onClick={userClickHeartBtn} className={`m-0 bi bi-heart${foodLike ? '-fill text-red-600' : ''}`}></i>
                <div className='ml-2'>{likeCount}</div>
            </div>
        </div>
    )
}

export default InstructionLikes