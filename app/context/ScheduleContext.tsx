import React, { createContext, useContext, useState } from 'react';

type ScheduleContextType = {
  scheduleData: any[];
  setScheduleData: React.Dispatch<React.SetStateAction<any[]>>;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};

export const ScheduleProvider: React.FC = ({ children }) => {
    const [scheduleData, setScheduleData] = useState<any[]>([]);
  
    return (
      <ScheduleContext.Provider value={{ scheduleData, setScheduleData }}>
        {children}
      </ScheduleContext.Provider>
    );
  };