import React, { useEffect, useState } from "react";
import "./Info.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function Info() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/reportInfo/${reportId}`)
      .then((response) => {
        setReport(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [reportId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "yyyy년 MM월 dd일 HH시 mm분 ss초");
  };

  return (
    <div className="head">
      <div className="title" style={{ width: "95%" }}>
        <h2>상세 신고 내용</h2>
        <hr></hr>
      </div>
      <div className="info">
        <ul>
          <li>신고자 이름: {report.name}씨</li>
          <li>신고날짜: {formatDateTime(report.date)}</li>
          <li>신고 위치: {report.address}</li>
          <li>임시 비밀번호: {report.password}</li>
        </ul>
      </div>
      <div className="des">
        <p>긴급신고시스템이 적용된 AI 모델의 신고 입니다.</p>
        <p>현재 {report.name}씨가 쓰러져 움직이지 못하는 상황입니다.</p>
      </div>
      <div>
        <button onClick={handleNavigate}>목록으로</button>
      </div>
    </div>
  );
}

export default Info;
