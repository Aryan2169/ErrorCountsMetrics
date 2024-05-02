import { createContext, useEffect, useState } from "react";

export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [apistartDate, setApistartDate] = useState('');
    const [apiendDate, setApiendDate] = useState('');
    const [selectedApiId, setSelectedApiId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isreq, setIsreq] = useState(false);
    const [loginauth, setLoginauth] = useState('');
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(true);

    
    return (<UserContext.Provider value={{isLoginDialogOpen,setIsLoginDialogOpen,isreq,setIsreq,currentPage,setCurrentPage,startDate,setStartDate,endDate,setEndDate,apistartDate,setApistartDate,apiendDate,setApiendDate,selectedApiId,setSelectedApiId,loginauth,setLoginauth}}>
      {children}
    </UserContext.Provider>)
}