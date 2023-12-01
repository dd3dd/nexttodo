'use client';
import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
    const [showComplete, setShowComplete] = useState(true);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    return (
        <Context.Provider value={{
            showComplete, setShowComplete, newName, setNewName, newDescription, setNewDescription,
        }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;