import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
const BookmarkCollections = () => {
    const [arr, setArr] = useState([]);
    const navigate = useNavigate();
    let i = 0;
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                console.log(localStorage.getItem('auth_code'))
                const response = await axios.post(`${API_URL}api/HistoryBookmaks`, { id: "love" },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                        },
                    });
                if (response.status === 200) {
                    console.log(response)
                    setArr(response.data.data);
                } else {
                    console.error('Failed to fetch bookmarks');
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
                // Handle error as needed, e.g., redirect to login page
            }
        };
        if (i === 0) {
            i++
            fetchBookmarks()
        }
    }, []);
    const redirectToNextPage = (item) => {
        let data = [item['TranslatedRecipeName'],
        item['Cuisine'],
        item['Diet'],
        item['Course'],
        item['Image'],
        item['TranslatedIngredients'],
        item['TotalTimeInMins'],
        item['Servings'],
        item['TranslatedInstructions'],
        item['_id']]
        navigate('/Instruction?id=' + item._id, { state: data });
    };
    return (
        <>
            <div className="text-[2.5vw] mx-5 my-4 font-bold text-gray-400">Bookmarks</div>
            <section id="SearchPsearch-results">
                {/* Sample Recipe Card */}
                {arr.map((item, index) => (
                    // Check if item is not null before rendering
                    item && (
                        <div className="SearchPrecipe-card h-auto" key={index}>
                            <img src={item.Image} alt={item.TranslatedRecipeName} />
                            <div className="px-1">
                                <h2>{item.TranslatedRecipeName}</h2>
                                <h3>{item.Cuisine}</h3>
                                <button
                                    onClick={() => redirectToNextPage(item)}
                                    className="ml-1 mb-3 text-gray-100 font-bold px-3 py-2 w-auto bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Get Recipe
                                </button>
                            </div>
                        </div>
                    )
                ))}
            </section>
        </>
    );
};

export default BookmarkCollections;
