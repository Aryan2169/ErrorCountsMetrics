import React, { useState } from 'react';
import { useContext } from "react"
import { UserContext } from "../context/UserContext.jsx"
import Pagination from './Pagination.jsx';
const DateRangeInput = () => {
  const {startDate,setStartDate,endDate,setEndDate,apistartDate,setApistartDate,apiendDate,setApiendDate}=useContext(UserContext)
  const[timezone,setTimezone]=useState('Asia/Kolkata');
  const[active,setActive]=useState('');
  const handleStartDateChange = (e) => {
    // const formattedDate = convertToDateTime(e.target.value);
    // setStartnewDate(formattedDate);
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    // const formattedDate = convertToDateTime(e.target.value);
    // setEndnewDate(formattedDate);
    setEndDate(e.target.value);
  };

  const handleDateRangeChange = (start, end) => {
    // setStartDate(start);
    // setEndDate(end);
    setApistartDate(start)
    setApiendDate(end)
    // setCurrentPage(1); // Reset pagination when date range changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDateRangeChange(startDate, endDate);
    // setStartDate("")
    // setEndDate("")
    // console.log(startnewDate);
    // console.log(endnewDate);
  };
  const handle24HoursClick = () => {
    const currentDate = new Date();
    const startnewDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // Subtracting 24 hours
    setApistartDate(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone })));
    setApiendDate(formatDate( currentDate.toLocaleString('en-GB', { timeZone: timezone })));
    setStartDate(formatDate2(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone }))))
    setEndDate(formatDate2(formatDate(currentDate.toLocaleString('en-GB', { timeZone: timezone }))))
    if(active==='24'){
      setActive("")
    }else{
      setActive("24")
    }
    console.log(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone })));
    console.log(formatDate( currentDate.toLocaleString('en-GB', { timeZone: timezone })));
};

  // Function to handle button click for 7 days
  const handle7DaysClick = () => {
    const currentDate = new Date();
    const startnewDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtracting 7 days
    setApistartDate(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone })));
    setApiendDate(formatDate( currentDate.toLocaleString('en-GB', { timeZone: timezone })));
    setStartDate(formatDate2(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone }))))
    setEndDate(formatDate2(formatDate(currentDate.toLocaleString('en-GB', { timeZone: timezone }))))
    if(active==='7'){
      setActive("")
    }else{
      setActive("7")
    }
    console.log(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone })));
    console.log(formatDate( currentDate.toLocaleString('en-GB', { timeZone: timezone })));
  };

  // Function to handle button click for 30 days
  const handle30DaysClick = () => {
    const currentDate = new Date();
    const startnewDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Subtracting 30 days
    setApistartDate(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone })));
    setApiendDate(formatDate( currentDate.toLocaleString('en-GB', { timeZone: timezone })));
    setStartDate(formatDate2(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone }))))
    setEndDate(formatDate2(formatDate(currentDate.toLocaleString('en-GB', { timeZone: timezone }))))
    if(active==='30'){
      setActive("")
    }else{
      setActive("30")
    }
    console.log(formatDate(startnewDate.toLocaleString('en-GB', { timeZone: timezone })));
    console.log(formatDate( currentDate.toLocaleString('en-GB', { timeZone: timezone })));
  };

  const handleSyncdate=()=>{

  }

  const formatDate = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split(/[\s,-]+/);
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};
const formatDate2 = (dateTimeString) => {
  const dateObj = new Date(dateTimeString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
  <div className="flex items-center mb-2">
    <label className="mr-2">From:</label>
    <input
      type="date"
      className="text-sm border border-gray-300 rounded-md px-2 py-1 mr-2"
      value={startDate}
      onChange={handleStartDateChange}
    />
    <label className="ml-4">To:</label>
    <input
      type="date"
      className="text-sm border border-gray-300 rounded-md px-2 py-1 ml-2"
      value={endDate}
      onChange={handleEndDateChange}
    />
    <button className="ml-4 bg-blue-500 rounded-md text-sm text-white px-4 py-1" type="submit">
      Submit
    </button>
    <div className=" ml-6">
        <Pagination  />
      </div>
  </div>
  <div className="flex items-center mt-4">
  <label className="">Timezone:</label>
    <select
      value={timezone}
      onChange={handleTimezoneChange}
      className="text-sm border border-gray-300 rounded-md ml-4 px-2 py-1"
    >
      <option value="Asia/Kolkata">Indian Time</option>
      <option value="America/New_York">Eastern Time</option>
      <option value="Europe/Berlin">Central European Time</option>
      <option value="America/Los_Angeles">Pacific Standard Time</option>
    </select>
  <h1 className="ml-4">Preset:</h1>
    <button className={`rounded-md text-sm  px-2 py-1 ml-2 ${active==="24"?`bg-blue-600 text-white `:"bg-blue-300 text-white "}`} onClick={handle24HoursClick}>
      24 hours
    </button>
    <button className={`rounded-md text-sm  px-2 py-1 ml-2 ${active==="30"?`bg-blue-600 text-white `:"bg-blue-300 text-white "}`} onClick={handle30DaysClick}>
      30 days
    </button>
    <button className={`rounded-md text-sm  px-2 py-1 ml-2 ${active==="7"?`bg-blue-600 text-white `:"bg-blue-300 text-white "}`} onClick={handle7DaysClick}>
      7 days
    </button>
      <button className='ml-9 bg-blue-500 rounded-md text-sm text-white px-4 py-1'onClick={handleSyncdate}>Sync</button>
  </div>
</form>


  );
};

export default DateRangeInput;
