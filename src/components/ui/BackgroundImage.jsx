import React from 'react'
import backgroundImage from "../../img/background.png";

const BackgroundImage = ({ children }) => {
    return (
        <div className='min-h-screen w-100 bg-contain'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: "repeat-y",
            }}>
            {children}
        </div>
    )
}

export default BackgroundImage
