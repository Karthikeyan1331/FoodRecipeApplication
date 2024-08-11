import React, { useEffect, useState, useRef } from 'react'
import TopBar from '../component/TopBar';
import Foot from '../FrontPage/foot';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { cuisine, course, diet } from './foodVariables';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import API_URL from '../config';
const EditFood = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null)
    const fileInputRef = useRef(null);
    const [formElements, setFormElements] = useState({})
    let [selectedFile, setSelectedFile] = useState(null)
    let cntI = 0
    const currentURL = window.location.href;

    // Function to extract the value of 'id' from the URL
    function extractIdFromURL(url) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const idValue = urlParams.get('_id');
        return idValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data...");
            try {
                const idValue = extractIdFromURL(currentURL);
                console.log(idValue)
                const responseInstruction = await axios.post(`${API_URL}EditFoodGetData`,
                    { id: idValue },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
                        },
                    });
                if (responseInstruction.status === 200) {
                    console.log("Hello", responseInstruction.data)
                    setFormElements(responseInstruction.data);
                    setProfilePic(responseInstruction.data.Image)
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        if (cntI === 0) {
            cntI++
            fetchData();
        }
    }, [currentURL, navigate]);
    const handleOnSubmitForm = async (e) => {
        e.preventDefault();
        console.log("kdsgakhgjhg")
        const formData = new FormData();
        let notIn = ['Image', 'URL', 'approve', 'created_by', 'created_on', '__v', '_id']
        for (let key in formElements) {
            if (!notIn.includes(key)) {
                console.log(formElements[key],key)
                if (!formElements[key] || formElements[key] === '')
                    return
                formData.append(key, formElements[key]);
               
            }
        }
        if (selectedFile) {
            console.log(selectedFile)
            formData.append('file', selectedFile)
        }
        const idValue = extractIdFromURL(currentURL);
        formData.append("food_id", idValue)
        try {
            const response = await axios.post(`${API_URL}AddEditFood`, formData);
            if (response.status === 200) {
                navigate('/Create');
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }

    }
    const handleFileInputChange = async (event) => {
        // Handle the file upload here
        console.log(event.target.files);
        setProfilePic(URL.createObjectURL(event.target.files[0]));
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
        console.log('Uploaded file:', selectedFile);
        if (!selectedFile) {
            console.log('No file selected.');
            return;
        }
    }
    const formData = (data) => {
        console.log(data.target.name, data.target.value)
        setFormElements({
            ...formElements,
            [data.target.name]: data.target.value
        })
    }
    return (
        <>
            <TopBar />
            <div className="text-[2vw] mx-5 my-4 font-bold text-gray-400">Edit Food</div>
            <div className='mt-5 w-full flex justify-center items-center'>
                <form className='w-[90%] mb-5'>
                    <div className='flex flex-col items-center'>
                        <label htmlFor="avatarInput" className='text-center'>
                            <img src={profilePic || "/img/slider-01.png"} className='block mx-auto cursor-pointer w-full h-[15vw]' alt='' />
                            <div className='text-[1.5vw] mt-3 font-bold text-blue-500 cursor-pointer hover:underline'>Add Picture</div>
                        </label>
                        <input
                            type="file"
                            id="avatarInput"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                    </div>

                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="RecipeName" label="RecipeName">
                                <Form.Control type="text" name="TranslatedRecipeName" placeholder="name@example.com"

                                    value={formElements['TranslatedRecipeName'] || ''}
                                    onChange={event => formData(event)}
                                    required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2 mt-4">
                        <Col md>
                            <FloatingLabel controlId="Ingredients" label="Ingredients">
                                <Form.Control
                                    name="TranslatedIngredients"
                                    as="textarea"
                                    placeholder="ex: Gralic"
                                    value={formElements['TranslatedIngredients'] || ''}
                                    onChange={event => formData(event)}
                                    style={{ height: '20vh' }}
                                    required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2 mt-4">
                        <Col md>
                            <FloatingLabel controlId="Instructions" label="Instructions">
                                <Form.Control
                                    name="TranslatedInstructions"
                                    as="textarea"
                                    placeholder="ex: Boiling the water at 100 deg Celsius"
                                    value={formElements['TranslatedInstructions'] || ''}
                                    onChange={event => formData(event)}
                                    style={{ height: '20vh' }}
                                    required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2 mt-4">

                        <Col md>
                            <FloatingLabel
                                controlId="Cuisine"
                                label="Cuisine"
                            >
                                <Form.Select aria-label="Cuisine" name='Cuisine'
                                    value={formElements['Cuisine'] || ''}
                                    onChange={event => formData(event)}
                                    required >
                                    <option>~SELECT~</option>
                                    {cuisine.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel
                                controlId="Course"
                                label="Course"
                            >
                                <Form.Select aria-label="Course" name='Course'
                                    value={formElements['Course'] || ''}
                                    onChange={event => formData(event)}
                                    required >
                                    <option>~SELECT~</option>
                                    {course.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel
                                controlId="Diet"
                                label="Diet"
                            >
                                <Form.Select aria-label="Diet" name='Diet'
                                    value={formElements['Diet'] || ''}
                                    onChange={event => formData(event)}
                                    required >
                                    <option>~SELECT~</option>
                                    {diet.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2 mt-4">
                        <Col md>
                            <FloatingLabel controlId="PrepTimeInMins" label="Preperation Time(Min)">
                                <Form.Control type="Number" name="PrepTimeInMins" placeholder="Preperation Time"
                                    value={formElements['PrepTimeInMins'] || ''}
                                    onChange={event => formData(event)}
                                    required />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="CookTimeInMins" label="Cooking Time(Min)">
                                <Form.Control type="Number" name="CookTimeInMins" placeholder="Cooking Time"
                                    value={formElements['CookTimeInMins'] || ''}
                                    onChange={event => formData(event)}
                                    required />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="Servings" label="No of people Server(num)">
                                <Form.Control type="Number" name="Servings" placeholder="People Count"
                                    value={formElements['Servings'] || ''}
                                    onChange={event => formData(event)}
                                    required />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <input type="submit" className='btn btn-primary mr-8 mt-5 float-right' onClick={(e) => handleOnSubmitForm(e)} value="Add Food"></input>
                </form>

            </div >
            <div>
                <Foot />
            </div>
        </>
    )
}

export default EditFood