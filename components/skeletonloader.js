import React from "react";
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/**
 * Main function of the Skeleton loader
 * @param {component props} props 
 */
function SkeletonLoader({
  count,
  width,
  height,
}) {
  const elements = [];
  for (let i = 0; i < count; i++) {
    let style = {};

    if (width !== null) {
      style.width = width;
    }

    if (height !== null) {
      style.height = height;
    }

    elements.push(
      <SkeletonWrapper
        key={i}
        style={{
          ...style,
        }}
      >
        &zwnj;
      </SkeletonWrapper>
		);
  }

  return (
    <span>
      {elements.length !== 0 && elements.map((element, i) => (
				<div key={i}>
					{element}
					&zwnj;
				</div>
			))}
    </span>
  );
}

export default SkeletonLoader;

const skeletonKeyframes = keyframes`
	0% {
		background-position: -200px 0;
	}
	100% {
		background-position: calc(200px + 100%) 0;
	}
`;

const SkeletonWrapper = styled.div`
	background-color: #eee;
	background-image: linear-gradient(
		90deg,
		#eee,
		#f5f5f5,
		#eee
	);
	background-size: 200px 100%;
	background-repeat: no-repeat;
	border-radius: 4px;
	display: inline-block;
	line-height: 1;
	width: 100%;  
	animation: ${skeletonKeyframes} 1s ease-in-out infinite;
`;