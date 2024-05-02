// App.js

import React, { useState } from 'react';
import './index.css';
import ErrorCounts from './components/ErrorCounts.jsx';
import DateRangeInput from './components/DateRangeInput.jsx';
import Pagination from './components/Pagination.jsx';
import {  UserContextProvider } from './context/UserContext'
import { useContext } from "react"
import { UserContext } from "./context/UserContext.jsx"
import { CiLogout } from "react-icons/ci";

const App = () => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const {isreq,startDate,setStartDate,endDate,setEndDate,selectedApiId,setIsLoginDialogOpen,isLoginDialogOpen}=useContext(UserContext)

 

  return (
    <UserContextProvider>
      <div classname="flex flex-col ">
      <div className='flex justify-between items-center'>
      <h1 className='mt-5 ml-10 text-3xl font-bold'>Error Counts Metrics</h1>
      </div>
        <div className='flex'>
        <div className="flex ml-10 mt-5">
        <DateRangeInput/>
      </div>
        </div>
      <div class="mt-5">
        <div class="mr-8 ml-10">
          <ErrorCounts currentPage={currentPage}/>
        </div>

      {/* {isreq?<div>
        <h1 class="mb-4">Request History :</h1>
      </div>:""} */}
   
    </div>
    </div>

    </UserContextProvider>

    
  );
};

export default App;
