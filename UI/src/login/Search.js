import React, { useEffect, useState } from 'react';
import './sear.css';
import Foot from '../FrontPage/foot'
import { useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar'
const SearchPage = () => {
    let perPage = 20;
    const [response, setResponse] = useState('');
    const [arr, setArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(10)
    const [paginationArray, setPaginationArray] = useState([])
    function paginationRendered(paginationN, totalPage) {
        console.log(paginationN, totalPage);
        let arr = [];
        if (totalPage < 10) {
            for (let i = 1; i <= totalPage; i++) {
                arr.push(i);
            }
        }
        else if (paginationN <= 4) {
            for (let i = 1; i <= paginationN + 2; i++) {
                arr.push(i);
            }
            arr.push("...");
            arr.push(totalPage);
        } else if (paginationN > 3 && totalPage - 3 > paginationN) {
            arr.push(1);
            arr.push("...");
            for (let i = paginationN - 2; i <= paginationN + 2; i++) {
                arr.push(i);
            }
            arr.push("...");
            arr.push(totalPage);
        } else {
            arr.push(1);
            arr.push("...");
            for (
                let i = paginationN - 2;
                i <= totalPage;
                i++
            ) {
                arr.push(i);
            }
        }
        setPaginationArray(arr)
    }

    async function SearchD(data) {
        console.log(data);

        setArr(
            data.map((item) => [
                item['TranslatedRecipeName'],
                item['Cuisine'],
                item['Diet'],
                item['Course'],
                item['Image'],
                item['TranslatedIngredients'],
                item['TotalTimeInMins'],
                item['Servings'],
                item['TranslatedInstructions'],
                item['_id']
            ])
        );
    }

    const DefSearch = async (currentPage) => {
        try {
            const response = await fetch('http://localhost:8000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'search', currentPage: currentPage, perPage: perPage }),
            });

            const data = await response.json();
            setResponse(data.response);
            SearchD(data.datavalue);
            let totPage = Math.ceil(Number(data.totalCount) / perPage);
            setTotalPage(totPage)
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    useEffect(() => {
        DefSearch(currentPage);
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        console.log("hello")
        paginationRendered(currentPage, totalPage);
        if(searchQuery!=='')
            handleSearch(currentPage)
        else
            DefSearch(currentPage)
    }, [totalPage, currentPage]);
    
    const handleSearch = async (currentPage) => {
        try {
            console.log(searchQuery)
            let response = await fetch('http://localhost:8000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: searchQuery, currentPage: currentPage, perPage: perPage }),
            });

            const data = await response.json();
            setResponse(data.response);
            SearchD(data.datavalue);
            let totPage = Math.ceil(Number(data.totalCount) / perPage);
            setTotalPage(totPage)
        } catch (error) {
            console.error('Error sending search query:', error);
        }
    };



    const navigate = useNavigate();

    const redirectToNextPage = (data) => {
        // Redirect to '/Instruction' when the component is clicked
        console.log(data[0])
        navigate('/Instruction?id='+data[9], { state: data });
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(1);setCurrentPage(1)
        }
    };
    const handlePageItemClick = (e) => {
        const targetClassName = e.target.className;
        if (targetClassName.includes('page-item')) {
            setCurrentPage(Number(e.target.innerText))
            
        }
    };
    const handlePreviousNext = (e)=>{
        if(e.target.innerText==='Previous')
            setCurrentPage((currentPage-1>0)?currentPage-1:currentPage)
        else if(e.target.innerText==='Next')
            setCurrentPage((currentPage+1<=totalPage)?currentPage+1:currentPage)
    }
    return (
        <div className='SearchP'>
            <TopBar />

            <section id="SearchPmiddle">
                <div className="SearchPinput1 absolute ml-20">
                    <input className='SearchTextField'
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress} />
                    <input className='SearchPSubmit'
                        type="submit"
                        value="Search"
                        onClick={()=>{handleSearch(1);setCurrentPage(1)}} />
                </div>
            </section>

            <section id="SearchPsearch-results">
                {/* Sample Recipe Card */}
                {arr.map((item, index) => (
                    <div className="SearchPrecipe-card h-auto" key={index}>
                        <img src={item[4]} alt={item[0]} />
                        <div className="px-1">
                            <h2>{item[0]}</h2>
                            <h3>{item[1]}</h3>
                            <button onClick={() => redirectToNextPage(item)}
                                className='ml-1 mb-3 text-gray-100 font-bold px-3 py-2 w-auto bg-blue-500 rounded-lg hover:bg-blue-600'>
                                Get Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <div
                id="pagination-container"
                className="text-center d-flex justify-content-between align-items-center mb-4"
            >
                <button id="prev-btn" className="btn btn-primary ml-20" onClick={handlePreviousNext}>Previous</button>

                <ul className="pagination" onClick={handlePageItemClick}>
                    {paginationArray.map((item, index) => { 
                        return (
                            <li key={index} className={`${item === '...' ? 'NoDot' : 'page-item'} ${
                                currentPage === item ? 'page-item-active' : ''
                              }`}>{item}</li>
                        );
                    })}
                </ul>
                <button id="next-btn" className="btn btn-primary mr-20" onClick={handlePreviousNext}>Next</button>
            </div>
            <div>
                <Foot />
            </div>
        </div>
    );
};

export default SearchPage;
