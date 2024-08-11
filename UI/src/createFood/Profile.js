import React, { useState, useEffect, useRef } from 'react'
import TopBar from '../component/TopBar'
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Foot from '../FrontPage/foot';
const Profile = () => {
  const fileInputRef = useRef(null);
  const [formElements, setFormElements] = useState({})

  const handleOnSave = async () => {
    console.log("hello")
    const response = await axios.post('/EditUserData',
      { ...formElements },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
        },
      });
    if (response.status === 200) {
      console.log(response.data.data)
      window.location.reload();
      window.location.reload();
    }
    else {
      console.log(response)
    }
  }
  const handleFileInputChange = async (event) => {
    // Handle the file upload here
    const selectedFile = event.target.files[0];
    console.log('Uploaded file:', selectedFile);
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('_id', formElements._id);
    try {
      const response = await axios.post('http://localhost:8000/Editprofile', formData);
      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();

        }, 2000);
        window.location.reload();
      } // Send the file to the server
      console.log('File uploaded successfully:', response.data);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  const [profilePic, setProfilePic] = useState(null)
  let temp = localStorage.getItem("useData")
  useEffect(() => {

    if (temp) {
      let temp = JSON.parse(localStorage.getItem("useData"))
      setFormElements({
        ...temp,
        'dob': new Date(temp['dob']).toISOString().slice(0, 10)
      })
      setProfilePic(temp.profile)
    }
  }, [temp])
  const formData = (data) => {
    console.log(data.target.name, data.target.value)
    setFormElements({
      ...formElements,
      [data.target.name]: data.target.value
    })
  }
  return (
    <div>
      <TopBar />
      <div className='flex mt-10 px-[5vw]'>
        <div className='w-[20vw] h-[80vh] mr-[3vw] bg-gray-100 justify-center items-center shadow-sm rounded-lg'>
          <div className='text-center mt-4'>
            <label htmlFor="avatarInput">
              <img src={profilePic || "/img/slider-01.png"} className='block mx-auto border-2 border-black cursor-pointer w-[15vw] h-[15vw] rounded-full' alt='' />
              <div className='text-[1.5vw] mt-3 font-bold text-blue-500 cursor-pointer hover:underline'> Change Avatar</div>
            </label>
            {/* Hidden file input to trigger file upload */}
            <input
              type="file"
              id="avatarInput"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>
        </div>
        <div className='h-[80vh] w-[65vw] px-5 py-5 bg-gray-100 shadow-sm rounded-lg'>
          <Row className="g-5">
            <Col md>
              <FloatingLabel controlId="firstname" label="first name">
                <Form.Control type="text" name="firstName" placeholder="ex:Arul"
                  value={formElements['firstName'] || ''}
                  onChange={event => formData(event)} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="lastname" label="last name">
                <Form.Control type="text" name="lastName" placeholder="ex:Cooper"
                  value={formElements['lastName'] || ''}
                  onChange={event => formData(event)} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className='g-5 mt-3'>
            <Col md="8">
              <FloatingLabel controlId="email" label="email">
                <Form.Control type="email" name="email" placeholder="name@example.com"
                  value={formElements['email'] || ''}
                  disabled={true}
                />
              </FloatingLabel>
            </Col>
            <Col md="4">
              <FloatingLabel
                controlId="gender"
                label="Gender"

              >
                <Form.Select aria-label="Floating label select example"
                  name="gender"
                  value={formElements['gender'] || ''}
                  onChange={event => formData(event)}>
                  <option value={null}>Not Mention</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className='mt-3 g-5'>
            <Col md>
              <FloatingLabel controlId="country" label="Country">
                <Form.Control name="country" type="text" placeholder="ex:India"
                  value={formElements['country'] || ''}
                  onChange={event => formData(event)}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="state" label="State">
                <Form.Control type="text" name="state" placeholder="ex:Tamil Nadu" value={formElements['state'] || ''}
                  onChange={event => formData(event)} />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="dob" label="Date of Brith">
                <Form.Control type="date" name="dob" placeholder="" value={formElements['dob'] || ''}
                  onChange={event => formData(event)}
                  max={new Date().toISOString().slice(0, 10)} />
              </FloatingLabel>
            </Col>
          </Row>
          <Button type="button" onClick={handleOnSave} className='mt-4 float-right w-[10vw] px-2 bold fs-4'>Save</Button>
        </div>
      </div>
      <div>
        <Foot />
      </div>
    </div >
  )
}

export default Profile