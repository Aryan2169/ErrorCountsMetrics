import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from "react"
import { UserContext } from "../context/UserContext.jsx"
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
import LoginDialog from './LoginDialog.jsx';
import { CiLogout } from "react-icons/ci";


const ErrorCounts = () => {
  const [errorData, setErrorData] = useState([]);
  const [reqHistData, setReqHistData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [historyData2, setHistoryData2] = useState([]);
  const [req, setReq] = useState(false);
  const [req2, setReq2] = useState(false);
  const [isunderlined, setIsunderlined] = useState("");
  const [isunderlined2, setIsunderlined2] = useState(false);
  const [isunderlinedreq, setIsunderlinedreq] = useState("");
  const [isunderlined2req, setIsunderlined2req] = useState(false);
  const [reqtitle, setReqtitle] = useState("");
  const [reqgrptitle, setReqgrptitle] = useState("");
  const [isErrorChecked, setIsErrorChecked] = useState(false);
  const [isErrorChecked2, setIsErrorChecked2] = useState(false);
  const [apigroupId, setApigroupId] = useState("");
  const [apiId, setApiId] = useState("");
  const [isAscendingname, setIsAscendingname] = useState(true);
  const [isAscendinggrpname, setIsAscendinggrpname] = useState(true);
  const [isAscendingerror, setIsAscendingerror] = useState(true);
  const [afterUEname, setAfterUEname] = useState(true);
  const [afterUEgrp, setAfterUEgrp] = useState(true);
  const [afterUEerror, setAfterUEerror] = useState(true);
  const [reqhist, setReqhist] = useState(true);
  const [apireqname, setApireqname] = useState("");
  const [apireqID, setApireqID] = useState("");
  const [apireqgrpname, setApireqgrpname] = useState("");
  const [apireqgrpID, setApireqgrpID] = useState("");
  const {currentPage,setIsreq,isreq,apistartDate,apiendDate,isLoginDialogOpen,setIsLoginDialogOpen,loginauth}=useContext(UserContext)
  // console.log(apistartDate)
  // console.log(apiendDate)
  const logincred=localStorage.getItem('logincred')

  // const handleItemNameClick = (apiId) => {
  //   setSelectedApiId(apiId);
  // };

  const fetchreqhistoryData = async (id,name) => {
    if(apireqname===name){
      setReq(!req)
      setIsunderlined2(!isunderlined2)
    }else{
      setReq(true)
      setIsunderlined2(true)
    }
    // setIsreq(!isreq)
    setIsunderlined(name)
    setApireqname(name)
    setApireqID(id)
    setApiId(id)
    setIsErrorChecked(false)
    setReqhist(false)
    // console.log(isErrorChecked2)
    try {
      let requrl=`http://43.204.63.158:8000/get_request_history/${id}`
      if (apistartDate && apiendDate){
        requrl+=`?start_datetime=${apistartDate}&end_datetime=${apiendDate}&page=${currentPage}&per_page=25&show_errors=${isErrorChecked? 'true' : 'false'}`
      }
      const response = await axios.get(requrl, {
        headers: {
          'Authorization': `Basic ${btoa(`${logincred}`)}`
        }});
      const data = await response.data;
      console.log(data.length)
      setHistoryData(data);
      setReqtitle(name)
    } catch (error) {
      console.error('Error fetching request history:', error);
    }
  };
  
  
  const fetchreqhistoryDatagroup = async (id,name) => {
    // setIsErrorChecked(false)
    if(apireqgrpname===name){
      setReq2(!req2)
      setIsunderlined2req(!isunderlined2req)
    }else{
      setReq2(true)
      setIsunderlined2req(true)
    }
    setIsErrorChecked2(false)
    setApireqgrpname(name)
    setApireqgrpID(id)
    // setIsreq(!isreq)
    setIsunderlinedreq(name)
    setApigroupId(id)
    setReqhist(false)
    console.log(isErrorChecked2)
    try {
      let requrl2=`http://43.204.63.158:8000/get_request_history/by_group/${id}?page=${currentPage}&per_page=25&show_errors=${isErrorChecked2 ? 'true' : 'false'}`
      if (apistartDate && apiendDate){
        requrl2+=`&start_datetime=${apistartDate}&end_datetime=${apiendDate}&page=${currentPage}`
      }
      const response = await axios.get(requrl2, {
        headers: {
          'Authorization': `Basic ${btoa(`${logincred}`)}`
        }});
      const data = await response.data;
      console.log(data.length)
      setHistoryData2(data);
      setReqgrptitle(name)
    } catch (error) {
      console.error('Error fetching request history:', error);
    }
  };

  const handleCheckboxChange = async () => {
    // setIsErrorChecked(!isErrorChecked); // Toggle the checked state
    const updatedIsErrorChecked = !isErrorChecked;
    // console.log(!isErrorChecked)
    if (req) {
      setIsErrorChecked(updatedIsErrorChecked)
      // Call the API with the updated isErrorChecked state
      try {
        let requrl=`http://43.204.63.158:8000/get_request_history/${apiId}?page=${currentPage}&per_page=25&show_errors=${updatedIsErrorChecked ? 'true' : 'false'}`
      if (apistartDate && apiendDate){
        requrl +=`&start_datetime=${apistartDate}&end_datetime=${apiendDate}`
      }
        const response = await axios.get(requrl, {
          headers: {
            'Authorization': `Basic ${btoa(`${logincred}`)}`
          }});
        const data = await response.data;
        console.log(updatedIsErrorChecked)
        setHistoryData(data);
        // setReqgrptitle(name)
      } catch (error) {
        console.error('Error fetching request history:', error);
      }
    }
  };

  const handleCheckboxChange2 = async () => {
    // setIsErrorChecked(!isErrorChecked); // Toggle the checked state
    const updatedIsErrorChecked2 = !isErrorChecked2;
    // console.log(!isErrorChecked)
    if (req2) {
      setIsErrorChecked2(updatedIsErrorChecked2)
      // Call the API with the updated isErrorChecked state
      try {
        let requrl2=`http://43.204.63.158:8000/get_request_history/by_group/${apigroupId}?page=${currentPage}&per_page=25&show_errors=${updatedIsErrorChecked2 ? 'true' : 'false'}`
        if (apistartDate && apiendDate){
          requrl2+=`&start_datetime=${apistartDate}&end_datetime=${apiendDate}`
        }
        const response = await axios.get(requrl2, {
          headers: {
            'Authorization': `Basic ${btoa(`${logincred}`)}`
          }});
        const data = await response.data;
        console.log(updatedIsErrorChecked2)
        setHistoryData2(data);
        // setReqgrptitle(name)
      } catch (error) {
        console.error('Error fetching request history:', error);
      }
    }
  };
  

  useEffect(() => {
    // Fetch error counts data from API using startDate and endDate

     // Check if the user is already logged in by checking browser storage
     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
     const logincred=localStorage.getItem('logincred')
     setIsLoginDialogOpen(!isLoggedIn); // If logged in, close the dialog

    if(afterUEname && afterUEerror && afterUEgrp){
      const fetcherrorData = async () => {
        try {
          let url='http://43.204.63.158:8000/get_error_counts';
          if (apistartDate && apiendDate){
            url+=`?start_datetime=${apistartDate}&end_datetime=${apiendDate}`
          }
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Basic ${btoa(`${logincred}`)}`
            }});
          const data = await response.data;
          console.log(data)
          setErrorData(data);
        } catch (error) {
          console.error('Error fetching error counts:', error);
        }
      };
      fetcherrorData();
    }
    

    const fetchreqhistData=async()=>{
      try {
        let url2=`http://43.204.63.158:8000/get_request_history?page=${currentPage}&per_page=25`;
        if (apistartDate && apiendDate){
          url2+=`&start_datetime=${apistartDate}&end_datetime=${apiendDate}`
        }
        const response = await axios.get(url2, {
          headers: {
            'Authorization': `Basic ${btoa(`${logincred}`)}`
          }});
        const data2 = await response.data;
        setReqHistData(data2);
        
      } catch (error) {
        console.error('Error fetching request history counts:', error);
      }
    }

    const fetchreqhistDataue=async(id,name)=>{
      try {
        let requrl=`http://43.204.63.158:8000/get_request_history/${id}`
        if (apistartDate && apiendDate){
          requrl+=`?start_datetime=${apistartDate}&end_datetime=${apiendDate}&page=${currentPage}&per_page=25&show_errors=${isErrorChecked? 'true' : 'false'}`
        }
        const response = await axios.get(requrl, {
          headers: {
            'Authorization': `Basic ${btoa(`${logincred}`)}`
          }});
        const data = await response.data;
        console.log(data.length)
        setHistoryData(data);
        setReqtitle(name)
      } catch (error) {
        console.error('Error fetching request history:', error);
      }
    }

    const fetchreqhistoryDatagroupue=async(id,name)=>{
      try {
        let requrl2=`http://43.204.63.158:8000/get_request_history/by_group/${id}?page=${currentPage}&per_page=25&show_errors=${isErrorChecked2 ? 'true' : 'false'}`
        if (apistartDate && apiendDate){
          requrl2+=`&start_datetime=${apistartDate}&end_datetime=${apiendDate}&page=${currentPage}`
        }
        const response = await axios.get(requrl2, {
          headers: {
            'Authorization': `Basic ${btoa(`${logincred}`)}`
          }});
        const data = await response.data;
        console.log(data.length)
        setHistoryData2(data);
        setReqgrptitle(name)
      } catch (error) {
        console.error('Error fetching request history:', error);
      }
    }
    fetchreqhistDataue(apireqID,apireqname)
    fetchreqhistoryDatagroupue(apireqgrpID,apireqgrpname)
    
    fetchreqhistData();
  }, [apistartDate,apiendDate,currentPage,isLoginDialogOpen]);

  const handlesortdata = () => {
    setAfterUEname(false)
    setAfterUEerror(true)
    setAfterUEgrp(true)
    const sortedData = [...errorData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return isAscendingname ? -1 : 1; // Sort ascending or descending
      }
      if (nameA > nameB) {
        return isAscendingname ? 1 : -1; // Sort ascending or descending
      }
      return 0;
    });
    setErrorData(sortedData);
    setIsAscendingname(!isAscendingname); // Toggle sorting order
  };
  
  const handlesortdatagrpname = () => {
    setAfterUEgrp(false)
    setAfterUEerror(true)
    setAfterUEname(true)
    const sortedData = [...errorData].sort((a, b) => {
      const nameA = a.api_group_name.toUpperCase();
      const nameB = b.api_group_name.toUpperCase();

      if (nameA < nameB) {
        return isAscendinggrpname ? -1 : 1; // Sort ascending or descending
      }
      if (nameA > nameB) {
        return isAscendinggrpname ? 1 : -1; // Sort ascending or descending
      }
      return 0;
    });
    setErrorData(sortedData);
    setIsAscendinggrpname(!isAscendinggrpname); // Toggle sorting order
  };

  const handleSortDataErrorCount = () => {
    setAfterUEerror(false);
    setAfterUEgrp(true)
    setAfterUEname(true)
    const sortedData = [...errorData].sort((a, b) => {
      const errorCountA = a.error_count;
      const errorCountB = b.error_count;
  
      return isAscendingerror ? errorCountA - errorCountB : errorCountB - errorCountA;
    });
  
    setErrorData(sortedData);
    setIsAscendingerror(!isAscendingerror); // Toggle sorting order
  };

  const handleLogout = () => {
    try {
      // Clear the login credentials and logout state
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.setItem('logincred', null);
      setErrorData(null)
      setReqhist(null)
      setHistoryData(null)
      setHistoryData2(null)
      // Optionally, you might want to clear any other user-related data or state
      // Clearing the login dialog state to show it again when the user logs out
      setIsLoginDialogOpen(!isLoginDialogOpen);
      window.location.reload();
      // window.location.href = window.location.href;
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
 
  

  return (
    <div>
      {isLoginDialogOpen && <LoginDialog />}
    <div className='flex'>
   <div className=''>
    <div className='flex '>
    {isLoginDialogOpen? "":<CiLogout className='mr-2 mt-1' onClick={handleLogout}/>}
    <h2 className="text-base font-semibold cursor-pointer" onClick={()=>{window.location.reload()}}>Error Counts:</h2> 
    </div>
    <table className="border-collapse border border-black w-full text-sm mt-2">
  <thead className="bg-gray-200">
    <tr className="border-b">
      <th className="py-1 px-3 text-left font-medium border border-black"><div className='flex' ><h1 className='cursor-pointer' onClick={()=>{window.location.reload()}}>API Name</h1> { afterUEname?<FaSort className='mt-1.5 ml-1 text-xs' onClick={handlesortdata} />:isAscendingname ?  <FaCaretUp className='mt-1 ml-1 text-xs' onClick={handlesortdata} />:<FaCaretDown className='mt-2 ml-1 text-xs' onClick={handlesortdata} />}</div></th>
      <th className="py-1 px-3 font-medium border border-black"><div className='flex' ><h1 className='cursor-pointer' onClick={()=>{window.location.reload()}}>API Group</h1>{ afterUEgrp?<FaSort className='mt-1.5 ml-1 text-xs' onClick={handlesortdatagrpname} />:isAscendinggrpname ?  <FaCaretUp className='mt-1 ml-1 text-xs' onClick={handlesortdatagrpname} />:<FaCaretDown className='mt-2 ml-1 text-xs' onClick={handlesortdatagrpname} />}</div></th>
      <th className="py-1 px-3 font-medium border border-black"><div className='flex' ><h1 className='cursor-pointer' onClick={()=>{window.location.reload()}}>Errors</h1>{ afterUEerror?<FaSort className='mt-1.5 ml-1 text-xs' onClick={handleSortDataErrorCount} />:isAscendingerror ?  <FaCaretUp className='mt-1 ml-1 text-xs' onClick={handleSortDataErrorCount} />:<FaCaretDown className='mt-2 ml-1 text-xs' onClick={handleSortDataErrorCount} />}</div></th>
      <th className="py-1 px-3 font-medium border border-black">Avg Response Time</th>
    </tr>
  </thead>
  <tbody>
    {errorData?.map((item, index) => (
      <tr key={item.api_id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
        <td
          onClick={() => fetchreqhistoryData(item.api_id, item.name)}
          className={`py-1 px-3 cursor-pointer ${
            isunderlined === item.name ? (isunderlined2 ? 'underline' : '') : ''
          }  whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]`}
        >
          {item.name}
        </td>
        <td
          onClick={() => fetchreqhistoryDatagroup(item.api_group_id, item.api_group_name)}
          className={`py-1 px-3 cursor-pointer ${
            isunderlinedreq === item.api_group_name ? (isunderlined2req ? 'underline' : '') : ''
          }`}
        >
          {item.api_group_name}
        </td>
        <td className="py-1 px-3">{item.error_count}</td>
        <td className="py-1 px-3">{item.avg_duration.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>

</div>


{reqhist?<div className='ml-10 '>
    <div className=''>
      <h2 className='text-base font-semibold'>Request History:</h2>
      <table className='border border-black w-full border-collapse mt-2'>
  <thead className='bg-gray-200'>
    <tr className='border-b'>
      <th className='py-1 px-3 text-sm text-left font-medium border border-black'>Created At</th>
      <th className='py-1 px-3 text-sm text-left font-medium border border-black'>API ID</th>
      <th className='py-1 px-3 text-sm text-left font-medium border border-black'>Status</th>
      <th className='py-1 px-3 text-sm text-left font-medium border border-black'>Duration</th>
    </tr>
  </thead>
  <tbody>
    {reqHistData?.map((item, index) => (
      <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b last:border-b-0`}>
        <td className='py-1 px-3 text-sm'>{item.created_at}</td>
        <td className='py-1 px-3 text-sm'>{item.api_id}</td>
        <td className='py-1 px-3 text-sm'>{item.status}</td>
        <td className='py-1 px-3 text-sm'>{item.duration.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  </div>:req?
  <div className='ml-10'>
    <div className=''>
      <h1 className='text-lg font-semibold'>Request History by Api: {reqtitle} </h1>
      <div className='flex items-center mt-1'>
        <input
          type="checkbox"
          id="errorCheckbox"
          checked={isErrorChecked}
          onChange={handleCheckboxChange}
          className='ml-2 text-xs'
        />
        <label className='ml-1 text-xs' htmlFor="errorCheckbox">Show Errors</label>
      </div>
      <table className='mt-2 border border-black w-full border-collapse'>
  <thead className='bg-gray-200'>
    <tr className='border-b'>
      <th className='py-1 px-1 text-sm font-medium border border-black'>Created At</th>
      <th className='py-1 px-1 text-sm font-medium border border-black'>API ID</th>
      <th className='py-1 px-1 text-sm font-medium border border-black'>Status</th>
      <th className='py-1 px-1 text-sm font-medium border border-black'>Duration</th>
    </tr>
  </thead>
  <tbody>
    {historyData?.map((item, index) => (
      <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50 border-b last:border-b-0' : 'border-b last:border-b-0'}>
        <td className='py-1 px-1 text-sm'>{item.created_at}</td>
        <td className='py-1 px-1 text-sm'>{item.api_id}</td>
        <td className='py-1 px-1 text-sm'>{item.status}</td>
        <td className='py-1 px-1 text-sm'>{item.duration.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  </div>  : ""}



  {req2 ?
  <div className='ml-10'>
    <div className=''>
      <h1 className='text-lg font-semibold'>Request History by Api Group: {reqgrptitle}</h1>
      <div className='flex items-center mt-1'>
        <input
          type="checkbox"
          id="errorCheckbox2"
          checked={isErrorChecked2}
          onChange={handleCheckboxChange2}
          className='ml-2 text-xs'
        />
        <label className='ml-1 text-xs' htmlFor="errorCheckbox2">Show Errors</label>
      </div>
      <table className='mt-2 border border-black w-full border-collapse'>
  <thead className='bg-gray-200'>
    <tr className='border-b'>
      <th className='py-1 px-1 text-sm font-medium border border-black'>Created At</th>
      <th className='py-1 px-1 text-sm font-medium border border-black'>API ID</th>
      <th className='py-1 px-1 text-sm font-medium border border-black'>Status</th>
      <th className='py-1 px-1 text-sm font-medium border border-black'>Duration</th>
    </tr>
  </thead>
  <tbody>
    {historyData2?.map((item, index) => (
      <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50 border-b last:border-b-0' : 'border-b last:border-b-0'}>
        <td className='py-1 px-1 text-sm'>{item.created_at}</td>
        <td className='py-1 px-1 text-sm'>{item.api_id}</td>
        <td className='py-1 px-1 text-sm'>{item.status}</td>
        <td className='py-1 px-1 text-sm'>{item.duration.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  </div> : ""}

    </div>
    </div>
  );
};

export default ErrorCounts;
