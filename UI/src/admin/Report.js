import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar'
import Foot from '../FrontPage/foot'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Report from './login'
import Approve from './Approve';
const AdminDashBoard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex-grow">
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Approve" className='justify-center align-middle'>
                        < Approve />
                    </Tab>
                    <Tab eventKey="profile" title="Report" className='justify-center align-middle'>
                        <Report />
                    </Tab>
                </Tabs>
            </div>
            <div className="flex-none">
                <Foot />
            </div>
        </div>
    )
}
export default AdminDashBoard;