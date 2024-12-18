import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Main.css";

function Main() {
  const navigate = useNavigate();

  // State to store reports data
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from FastAPI
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reports") // Replace with your API URL
      .then((response) => {
        setReports(response.data); // Store reports data in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message); // Store error
        setLoading(false); // Set loading to false
      });
  }, []);

  const handleNavigate = () => {
    navigate("/info");
  };

  const handleCheckboxChange = (index, reportId) => {
    const updatedReceive = !reports[index].receive; // 현재 상태 반전

    // 서버에 PATCH 요청 전송
    axios
      .patch(
        `http://192.168.0.3:8000/reports/${reportId}`,
        { receive: updatedReceive },
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식 명시
          },
        }
      )
      .then((response) => {
        setReports((prevReports) =>
          prevReports.map((report, i) =>
            i === index ? { ...report, receive: response.data.receive } : report
          )
        );
      })
      .catch((error) => {
        console.error("Error updating receive status:", error);
      });
  };

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error state

  return (
    <div className="head">
      <div className="title">
        <h2>신고시스템</h2>
      </div>
      <div className="table">
        <table className="styled-table">
          <colgroup>
            <col style={{ width: "44%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "28%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>주소</th>
              <th>임시 비밀번호</th>
              <th>접수여부</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report.reportId}
                style={{
                  borderBottom: "1px solid #000",
                  textDecoration: report.receive ? "line-through" : "none",
                  color: report.receive ? "#888" : "#000", // Change text color
                }}
              >
                <td
                  onClick={() => navigate(`/info/${report.reportId}`)} // reportId 전달
                  style={{ cursor: "pointer" }}
                >
                  {report.address}
                </td>
                <td
                  onClick={() => navigate(`/info/${report.reportId}`)} // reportId 전달
                  style={{ cursor: "pointer" }}
                >
                  {report.password}
                </td>

                <td>
                  <input
                    type="checkbox"
                    name="accept"
                    onChange={() =>
                      handleCheckboxChange(index, report.reportId)
                    } // reportId 추가
                    checked={report.receive}
                  />
                  접수 완료
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
