"use client";

import React from 'react';

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the animation duration to be applied on the shining border
 * @param color a string or string array to define border color.
 * @param className defines the class name to be applied to the component
 * @param children contains react node elements.
 */

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className = "",
  children,
}) {
  // Convert single color to array for consistency
  const colors = Array.isArray(color) ? color : [color];
  
  // Create gradient string
  const gradientColors = colors.join(', ');
  
  // Create keyframes style
  const keyframesStyle = `
    @keyframes shine {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;

  const containerStyle = {
    position: 'relative',
    padding: borderWidth,
    borderRadius: borderRadius,
    background: `linear-gradient(45deg, ${gradientColors})`,
    backgroundSize: '200% 200%',
    animation: `shine ${duration}s ease infinite`,
  };

  const contentStyle = {
    position: 'relative',
    background: '#ffffff',
    borderRadius: `${borderRadius - borderWidth}px`,
    zIndex: 1,
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={containerStyle} className={className}>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
}

export default ShineBorder;