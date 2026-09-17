import React, { useState } from 'react';
import './InfoTooltip.css';

const InfoTooltip = ({
    content,
    disabled = false,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    if (disabled) return null;

    return (
        <span
            className="info-tooltip"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
            tabIndex={0}
        >
            <span className="info-tooltip--icon">i</span>

            {isVisible && (
                <span className="info-tooltip--content">
                    {content}
                </span>
            )}
        </span>
    );
};

export default InfoTooltip;