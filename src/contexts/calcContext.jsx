import React from 'react';
import $ from 'jquery';

const CalcContext = React.createContext({});

export const useCalc = () => React.useContext(CalcContext);

export default function CalcProvider ({ children }) {
    const [gpa, setGpa] = React.useState(4.00);
    
    const value = {
        gpa,
        setGpa
    }

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
};
