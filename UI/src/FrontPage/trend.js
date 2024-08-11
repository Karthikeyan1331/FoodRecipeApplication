import React, { useEffect, useState } from 'react';
import Slide from './Slider'
import Foot from './foot'
export default function Trending() {
  // Assuming your Slider component requires some data items

  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);

  useEffect(() => {
    // Fetch data and update state for each Slider instance
    const fetchSliderData = async (searchQuery, setCurrentArr) => {
      try {
        const response = await fetch('http://localhost:8000/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: searchQuery, currentPage: 1, perPage: 20 }),
        });

        const data = await response.json();
        setCurrentArr(data.datavalue.map((item) => [
          item['TranslatedRecipeName'],
          item['Cuisine'],
          item['Diet'],
          item['Course'],
          item['Image'],
          item['_id']
        ]));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSliderData("Dinner Breakfast", setArr1);
    fetchSliderData("Lunch", setArr2);
    fetchSliderData("meat Dinner chicken", setArr3);
  }, []);

  return (

    <div className='Search'>

      <div className='Recommed'>
        TRENDING RECIPE
      </div>
      <Slide images1={arr1} />
      <div className='Recommed'>
        Cuisines
      </div>
      <div className='absolute left-1/2 transform -translate-x-1/2'>
        <div className='flex w-full mt-[4vw] text-gray-100 text-[1vw] font-semibold'>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Dinner</div>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Breakfast</div>
          <div className='p-2 mr-4 border border-grey-100 bg-red-400 rounded-full'>Lunch</div>
          <div className='p-2 border border-grey-100 bg-blue-400 rounded-full'>Non-Veg</div>
        </div>
      </div>
      <div className='mt-[4vw]'>
        <Slide images1={arr2} />
      </div>
      <div className='Recommed'>
        Cursins
      </div>
      <div className='absolute left-1/2 transform -translate-x-1/2'>
        <div className='flex w-full mt-[4vw] text-gray-100 text-[1vw] font-semibold'>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Dinner</div>
          <div className='p-2 mr-4 border border-grey-100 bg-red-400 rounded-full'>Breakfast</div>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Lunch</div>
          <div className='p-2 border border-grey-100 bg-blue-400 rounded-full'>Non-Veg</div>
        </div>
      </div>
      <div className='mt-[4vw]'>
        <Slide images1={arr3} />
      </div>
      <br />

      <div>
        <Foot />
      </div>
    </div>
  );
}