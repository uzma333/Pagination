import React, { useEffect, useState } from 'react'
import styles from "./pagination.module.css"
import axios from "axios";


function Pagination() {
    const[tableData,setTableData]=useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const rowsPerPage=10;

const fetchData=async()=>{
    try{
        const res=await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
       // console.log(res.data);
       setTableData(res.data);
        

    }catch(err){
console.log(err)
    }
   
}
useEffect(()=>{
    fetchData()
},[])

const indexOfLastRow=currentPage*rowsPerPage;
const indexOfFirstRow=indexOfLastRow-rowsPerPage;
const currentRows=tableData.slice(indexOfFirstRow,indexOfLastRow)

 const paginate=(pagenumber)=>setCurrentPage(pagenumber);

const handlePrevious=()=>{
    if(currentPage>1){
        setCurrentPage(currentPage-1)
    }
    }
    
    const handleNext=()=>{
        if(currentPage<Math.ceil(tableData.length/rowsPerPage))
            setCurrentPage(currentPage+1)
    }
    





  return (
    <div>
    <div className={styles.heading}>
        <h1>Employee Data Table</h1>
        </div>
        <div className={styles.paginationTable}>
            <center>
            <table className={styles.table}>
                <thead style={{marginRight:"20px"}}>
                    <tr style={{backgroundColor: "#32a875"}} >
                    <th >ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                
                <center>
                <tbody>
                    {currentRows.map((row)=>(
                        <tr key={row.id}>
                            
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.role}</td>
                            
                        </tr>
                    ))}
                </tbody>
                </center>
             
               
            </table>
            </center>
        
        </div>
        <div className={styles.button}>
        <button onClick={handlePrevious} disabled={currentPage===1} style={{backgroundColor:"#32a875",color:"white", borderRadius:"3px",height:"30px"}}>Previous</button>
        <button key={ 1} onClick={() => paginate()} style={{backgroundColor:"#32a875",color:"white",borderRadius:"3px",height:"30px"}}> {currentPage+0}</button>
        <button onClick={handleNext} disabled={currentPage===Math.ceil(tableData.length/rowsPerPage)} style={{backgroundColor:"#32a875",color:"white",borderRadius:"3px",height:"30px",}}>Next</button>
        </div>
        </div>
   
  )
}

export default Pagination;