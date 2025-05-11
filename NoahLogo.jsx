
    import React from 'react';

    const NoahLogo = ({ className = 'h-8 w-auto' }) => {
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-labelledby="noahLogoTitle"
        >
          <title id="noahLogoTitle">Noah.RN Logo</title>
          <defs>
            <filter id="subtleDropShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
              <feOffset dx="0.5" dy="0.5" result="offsetblur"/>
              <feFlood floodColor="rgba(0,0,0,0.2)"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <circle cx="50" cy="50" r="45" fill="none" stroke="#3C5A99" strokeWidth="6" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#F5F5F5" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#3C5A99" strokeWidth="4" />
          <circle cx="50" cy="50" r="33" fill="#D4A017" filter="url(#subtleDropShadow)" />

          <g fill="#A62639" transform="translate(50 50) scale(0.7)">
            <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" transform="translate(-15 -5)" />
            <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" transform="translate(15 5)" />
          </g>
        </svg>
      );
    };

    export default NoahLogo;
  