import React from 'react';

const StatusUpdate = ({
  open,
  setOpen,
  allStatus,
  status,
  handleStatusChange
}: any) => {
  return (
    <div className="card-actions">
      <button
        data-status={status}
        className="btn-toggle"
        onClick={() => setOpen(!open)}
        data-statuss={status}
      >
        {status}
        <img src="/icons/arrow-down.png" alt="" />
      </button>
      {open && (
        <div onBlur={() => setOpen(false)} className="status-switch">
          {allStatus.map((s: string) => (
            <button
              key={s}
              className={
                'btn-status btn-secondary ' + (s === status ? 'active' : '')
              }
              onClick={handleStatusChange}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusUpdate;