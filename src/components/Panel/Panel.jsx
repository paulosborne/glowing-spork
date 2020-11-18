import React from 'react';

const Panel = ({ className, children }) => (
  <div
    className={`flex bg-white p-3 text-center border border-grey-400 ${className}`}>
    {children}
  </div>
);

export default Panel;
