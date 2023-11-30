'use client';
import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
    const [showComplete, setShowComplete] = useState(true);
    return (
        <Context.Provider value={{
            showComplete, setShowComplete
        }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;