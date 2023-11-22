import React from 'react';
import '../styles/loading.scss';

type LodingBtnType = {
  loading: boolean;
  value?: string;
  onClick: (e: any) => void;
  children?: any;
  style?: any;
};

const LoadingButton = ({
  loading,
  value,
  onClick,
  children,
  style
}: LodingBtnType) => {
  return (
    <>
      <button style={style} className="btn btn-secondary" onClick={onClick}>
        {loading ? (
          <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : value ? (
          value
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default LoadingButton;
