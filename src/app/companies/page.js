"use client";
import Header from "@/components/Header";
import Card from "@/components/Company_card";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    const response = await fetch("/api/companies");
    const FinalData = await response.json();
    setCompanies(FinalData.data);
  };

  useEffect(() => {
    getCompanies();
  });

  return (
    // <div
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     fontSize: "1.5em",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     padding: "32px",
    //     fontWeight: "bold",
    //   }}
    // >
    <>
      {companies.length === 0 && <CircularProgress />}
      <div
        style={{
          margin: "50px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {companies.map((company, index) => {
          return <Card key={index} company={company} />;
        })}
      </div>
    </>
    //</div>
  );
};

export default CompaniesPage;
