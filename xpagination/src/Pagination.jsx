import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const parPageView = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch data')
    }
  };

  const IndexOfLastRow = currentPage * parPageView;
  const indexOfFirstRow = IndexOfLastRow - parPageView;
  const currentRows = data.slice(indexOfFirstRow, IndexOfLastRow);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / parPageView)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pagination">
      <h2>Employee Data Table</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="start">Name</TableCell>
              <TableCell align="start">Email</TableCell>
              <TableCell align="start">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="start">{item.name}</TableCell>
                <TableCell align="start">{item.email}</TableCell>
                <TableCell align="start">{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='paginationControl'>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={handleNext}
          disabled={currentPage >= Math.ceil(data.length / parPageView)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
