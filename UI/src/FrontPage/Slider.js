import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Slider({ images1 }) {
  // Assuming your Slider component requires some data items
  
  const [sliderContent, setSliderContent] = useState(null);
  const [slider, setSlider] = useState(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);
  const [cards, setCards] = useState({});
  const [number, setNumber] = useState(0);

  const navigate = useNavigate();
  const inputRef1 = useRef();
  const inputRef = useRef();

  useEffect(() => {
    let container = inputRef1.current;
    let cont = inputRef.current;

    if (container && cont && images1.length > 0) {
      setSliderContent(container);
      setSlider(cont);
    }
  }, [images1]);

  useEffect(() => {
    if (sliderContent && slider) {
      const cardsList = slider.getElementsByTagName('li');
      setCards(cardsList);
      setNumber(3);
      setSliderContainerWidth(sliderContent.clientWidth);
    }
  }, [sliderContent, slider]);

  useEffect(() => {
    setCardWidth(sliderContainerWidth / number);
    if (inputRef.current) {
      inputRef.current.style.width = images1.length * cardWidth + 'px';
      inputRef.current.style.transition = 'margin';
      inputRef.current.style.transitionDuration = '1s';
      for (let i = 0; i < cards.length; i++) {
        inputRef.current.getElementsByTagName('li')[i].style.width = cardWidth + 'px';
      }
    }
  }, [cardWidth, sliderContainerWidth, number, images1, cards]);

  function prev() {
    if (Math.round(+inputRef.current.style.marginLeft.slice(0, -2)) > Math.round(-cardWidth * (cards.length - number))) {
      inputRef.current.style.marginLeft = ((+inputRef.current.style.marginLeft.slice(0, -2)) - cardWidth) + 'px';
    }
  }

  function nxt() {
    if (Math.round(+inputRef.current.style.marginLeft.slice(0, -2)) < 0) {
      inputRef.current.style.marginLeft = ((+inputRef.current.style.marginLeft.slice(0, -2)) + cardWidth) + 'px';
    }
  }

  const handleRedirectedInstruction = (id) => {
    navigate('/Instruction?id=' + id);
  }
  return (
    <div className="transform translate-y-[6vw] mb-[6vw]">
      <section>
        <div className="flex">
            <div className="w-2/12 flex items-center">
                <div className="w-full text-right">
                <button onClick={prev} className="p-[.45vw] rounded-full bg-white border border-gray-100 shadow-lg mr-[1vw]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button></div>
            </div>
            <div ref={inputRef1} id="sliderContainer" className="w-10/12 overflow-hidden">
                <ul ref={inputRef} id="slider" className="flex w-full">
                    {images1.map((imageName, index) => (
                        <li key={index} className="p-[1vw]">
                            <div className="border rounded-lg p-[1vw] h-full">
                            <img className="h-[20vw] w-[20vw] object-cover rounded-md" src={`${imageName[4]}`} alt=""></img>
                            <h2 className="mt-[.3vw] text-[1.3vw] font-semibold text-gray-700">{`${imageName[0]}`}</h2>
                            <p className="mt-[.2vw] text-[.8vw] text-gray-500">
                              {`${imageName[2]}`}
                            </p>
                            <button 
                            className="mt-[.5vw] px-[1vw] py-[.5vw] 
                            rounded-md bg-blue-700 font-semibold text-white text-[.7vw]"
                            onClick={()=>handleRedirectedInstruction(imageName[5])}>Read More</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/12 flex items-center">
                <div className="w-full">
                    <button onClick={nxt} className="p-[.45vw] rounded-full bg-white border border-gray-100 shadow-lg ml-[1vw]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}