import React, { useState, useRef } from 'react'
import * as htmlToImage from 'html-to-image';
import API_URL from '../config';

const InstructionDownloadPNG = () => {
    const printOutData = useRef();
    const [hideAbovePic, setHideAbovePic] = useState(false);
    const handleDownloadPNG = ({ data }) => {
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
        <div className='Save' title="Download" onClick={handleDownloadPNG}>
            <i className="bi bi-download"></i>
        </div>
    )
}

export default InstructionDownloadPNG