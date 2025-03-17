// Results from the exploitations
import React from "react";
import NavBar from "../assets/NavBar";
import TableReport from "../assets/tables/TableReport.jsx";
import CustomBtnload from "../assets/CustomBtnload.jsx";

function Report() {
  return (
    <div className="h-screen w-screen bg-white">
      <NavBar />
      <div className="max-w-7xl mx-auto pb-10 pt-28 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Past Scan
          </p>
          {/* Download Button */}
          <CustomBtnload />
        </div>
        <div className="mt-6">
          <TableReport />
        </div>
      </div>
    </div>
  );
}

export default Report;
