import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar'
import Foot from '../FrontPage/foot'
import './Instruction.css'
import axios from 'axios';
import CookS from './CookSymbol'
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import * as htmlToImage from 'html-to-image';
import FoodLikes from './InstructionLikes';
import FoodBookmark from './InstructionBookmark';
import FoodComments from './InstructionComments';
import API_URL from '../config';
import FoodReport from './FoodReport';
const FoodInstruction = () => {
  const printOutData = useRef();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isSpeechEnded, setIsSpeechEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();
  let temp = 'auth_code' in localStorage
    const [validate, setvalidate] = useState(temp)
  const currentURL = window.location.href;

  // Function to extract the value of 'id' from the URL
  function extractIdFromURL(url) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const idValue = urlParams.get('id');
    return idValue;
  }
  let cntI = 0
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        if (location.state) {
          setData(location.state);
          if(temp)
          await handleFoodViews(location.state[9]);
        } else {
          const idValue = extractIdFromURL(currentURL);
          const responseInstruction = await axios.post(`${API_URL}api/FoodInstruction`, { id: idValue });
          setData(responseInstruction.data);
          console.log(temp)
          if(temp)
          await handleFoodViews(idValue);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
        
      }
    };

    const handleFoodViews = async (idValue) => {
      try {
        const responseViews = await axios.post(`${API_URL}api/FoodViews`, { id: idValue }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
          },
        });

        if (responseViews.status === 200) {
          console.log("User viewed this food successfully: " + idValue);
        } else {
          console.log("User view failed");
        }
      } catch (error) {
        console.log('Error handling food views:', error);
      }
    };
    if (cntI === 0) {
      cntI++
      fetchData();
    }
  }, [location.state, currentURL, navigate, temp, cntI]);

  const toggleIcon = useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }, []);

  const DestroyVoice = useCallback(() => {
    if (!isPlaying) {
      setIsSpeechEnded(prevIsPlaying => !prevIsPlaying);
      toggleIcon();
    }
  }, [isPlaying, setIsSpeechEnded, toggleIcon]);
  useEffect(() => {
    if (data.length > 0) {
      setIngredients(data[5]?.split(',') || []);
      setDirections(data[8]?.split('.').filter(direction => direction.trim() !== '') || []);
    }
  }, [data]);



  useEffect(() => {

    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        toggleIcon();
      }
      if (event.ctrlKey && event.key === 'e') {
        DestroyVoice();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };

  }, [toggleIcon, DestroyVoice]);


  useEffect(() => {
    if (!isPlaying && !isSpeechEnded) {
      let text = directions.join(". ");
      let speech = new SpeechSynthesisUtterance();
      let voice = window.speechSynthesis.getVoices();
      speech.voice = voice[3];
      speech.text = text;

      window.speechSynthesis.speak(speech);
      setIsSpeechEnded(true);
      speech.onend = () => {
        setIsSpeechEnded(false);
        setIsPlaying(true);
      };
    } else if (isSpeechEnded && isPlaying) {
      window.speechSynthesis.pause();
    } else if (isSpeechEnded && !isPlaying) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.cancel();
    }
  }, [isPlaying, isSpeechEnded, directions]);




  const printDiv = useReactToPrint({
    content: () => printOutData.current,
    pageStyle: '@page { size:legal portrait; }',
  });
  const [hideAbovePic, setHideAbovePic] = useState(false);

  const handleDownloadPNG = () => {
    setHideAbovePic(true); // Hide AbovePic section
    if (printOutData.current) {
      htmlToImage.toPng(printOutData.current, {
        width: printOutData.current.offsetWidth + 100,
        height: printOutData.current.offsetHeight + 100
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = data[0] + '.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error converting to PNG:', error);
        })
        .finally(() => {
          setHideAbovePic(false); // Show AbovePic section again
        });
    }
  };

  return (
    <div className=''>
      <TopBar />
      <div className='Recipe' ref={printOutData}>
        <div className='RecipeName'>
          {data[0]}
        </div>
        <div className='Rating'>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
          <i className="bi bi-star"></i>
          <div className='mt-[.2vw] ml-[.2vw]'>(999)</div>
          <div className='mt-[.2vw] ml-[.5vw] font-bold'>{data[1]}</div>
        </div>
        {!hideAbovePic && (
          <div className='AbovePic w-[60vw]'>
            <FoodBookmark id={data[9]} />
            <div className='Save' title="Download" onClick={handleDownloadPNG}><i className="bi bi-download"></i></div>
            <div className='Save' title="Print" onClick={printDiv}><i className="bi bi-printer"></i></div>
            <FoodLikes id={data[9]} />
            <FoodReport id={data[9]} heading={data[0]} />
            <div className='IMadeThis' title='Photo'><i className="bi bi-camera"></i>&nbsp;I Made This</div>
          </div>
        )}
        <div className='mt-[1vw] bg-blue-100'>
          <img src={data[4]} alt='' id="Content_Image" />
        </div>
        <div className='mt-[3vw] border-b border-dashed border-black'>
          <div className='flex foodIcon'>
            <div><i className="bi bi-clock-history text-stock text-[1.5vw]"></i></div>
            <div>Duration:</div>
            <div>{data[6]}min</div>
          </div>
          <div className='flex mt-[1.5vw] foodIcon'>
            <CookS needI='ingredient' />

            <div>Ingredients:</div>
            <div>{ingredients.length}</div>
          </div>
          <div className='flex transform translate-x-[40vw] translate-y-[-3.2vw] foodIcon'>
            <CookS needI='cook' />
            <div>Serves:</div>
            <div>{data[7]}</div>
          </div>
        </div>
        <div className='flex text-[2vw] mt-[2vw]'>
          <div className='w-[33vw]'>
            <div className='flex'>
              <div className='mr-[.5vw]'>DIRECTIONS</div>
              {isPlaying === true ? (
                // If isPlaying is true, display the voice icon
                <i className="bi bi-play-fill Voice" title='Press "K" to read' onClick={toggleIcon}></i>
              ) : (
                // If isPlaying is false, display the pause icon and the end icon
                <div>
                  <i className="bi bi-pause-circle Pause" title='Press "K" to pause' onClick={toggleIcon}></i>
                  <i className="bi bi-circle-fill Ennd" title='Press "E" to begin' onClick={DestroyVoice}></i>
                </div>
              )}
            </div>
            <ol className='list-decimal ml-[1.5vw] text-base md:text-[1.1vw] StepsDirections'>
              {directions.map((item, index) => (
                <li key={index}>{item}.</li>
              ))}
            </ol>
          </div>
          <div className='ml-[3vw] w-[25vw]'>
            <div>INGREDIENTS</div>
            {ingredients.map((item, index) => (
              <div
                className='flex text-base md:text-[1.1vw] mt-[1vw] StepsDirections'
                key={index}>{item}</div>
            ))}
          </div>

        </div>
      </div>
      <FoodComments id={data[9]} />
      <div>
        <Foot />
      </div>
    </div>
  )
}

export default FoodInstruction