import React from 'react';

export type StatusUpdateType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  allStatus: string[];
  status: string;
  handleStatusChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StatusUpdate = ({
  open,
  setOpen,
  allStatus,
  status,
  handleStatusChange
}: StatusUpdateType) => {
  return (
    <div className="card-actions">
      <button
        data-status={status?.toLowerCase()}
        className="btn-toggle"
        onClick={() => setOpen(!open)}
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
