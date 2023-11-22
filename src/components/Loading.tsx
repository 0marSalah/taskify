import React from 'react';
import '../styles/loading.scss';

type LodingBtnType = {
  loading: boolean;
  value: string;
  onClick: (e: any) => void;
};

const LoadingButton = ({ loading, value, onClick }: LodingBtnType) => {
  return (
    <>
      <button className="btn btn-secondary" onClick={onClick}>
        {loading ? (
          <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
          value
        )}
      </button>
    </>
  );
};

export default LoadingButton;
