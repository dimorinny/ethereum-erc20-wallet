import React from 'react';

export default (containerClassName) => ({input, label, type, meta: {error}}) => {

    const getErrorClass = () => error ? 'field error' : '';
    const getErrorLabel = () => {
        if (error) {
            return (
                <div className='ui basic red pointing prompt label transition visible'>
                    {error}
                </div>
            );
        }
    };

    return (
        <div className={`${containerClassName} ${getErrorClass()}`}>
            <div className='ui input'>
                <input {...input} type={type} placeholder={label}/>
            </div>
            {getErrorLabel()}
        </div>
    );
};
