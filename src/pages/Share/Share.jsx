import React from 'react';
import {Button} from 'react-bootstrap';
import step1 from '../../figures/step1.jpg';
import step2 from '../../figures/step2.jpg';
import step3 from '../../figures/step3.jpg';


const Share = () => {

const endpoint = 'https://overwatchpr.netlify.app/';

const handleShareClick = () => {
    const url = endpoint;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied');
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

    return (
        <div className="d-flex flex-column text-center align-items-center justify-content-center mt-2 pb-5">
            <p className='fs-4 m-5'>To copy the url and share, click the button below</p>
            <Button size="lg" style={{ color: 'black', backgroundColor: '#F99B12', border: 'none', minWidth:"150px" }} onClick={handleShareClick}>Share</Button>
            <br/>
            <p className='mt-5 ms-5 me-5 fs-4'>How to download the app on your phone:</p>
            <p className='ms-5 me-5'><b>1)</b> First, click the bottom icon of a square with an arrow pointing up.</p>
            <img
                alt='step1'
                src={step1}
                height='500'
                style={{ border: '2px solid black' }}
            />
            <br/>
            <p className='ms-5 me-5'><b>2)</b> Then, pull up the menu and click the 'Add to home Screen' option.</p>
            <img
                alt='step2'
                src={step2}
                height='500'
                style={{ border: '2px solid black' }}
            />
            <br/>
            <p className='ms-5 me-5'><b>3)</b> Lastly, click the blue 'Add' option in the top right and the app will be added to your Home Screen.</p>
            <img
                alt='step3'
                src={step3}
                height='500'
                style={{ border: '2px solid black' }}
            />
        </div>
    )
};

export default Share;