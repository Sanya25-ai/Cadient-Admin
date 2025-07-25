import React from "react";
import DonutChart from "./donut-chart";

export default function SmartInsightsTab() {
  return (
    <div className="w-full md:col-span-2 mt-6">
      <div className="flex flex-wrap items-center gap-8 mb-6">
        {/* Main Donut */}
        <div className="flex flex-col items-center">
          <DonutChart value={77} size={100} stroke={8} color="#FFA500" />
          <div className="text-xs text-gray-500 mt-2">Scored</div>
        </div>
        {/* Four small donuts */}
        {[
          { label: "SmartTenure", value: 77, color: "#FFA500" },
          { label: "SmartMatch", value: 39, color: "#FFD600" },
          { label: "SmartHire", value: 54, color: "#4CAF50" },
          { label: "SmartScreen", value: 39, color: "#BDBDBD" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <DonutChart value={item.value} size={50} stroke={6} color={item.color} />
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
      {/* Smart Score Heading */}
      <div className="mb-2">
        <span className="text-lg font-semibold">Smart Score</span>
        <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">High Priority</span>
      </div>
      {/* Overall Assessment */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-red-700">Overall Assessment</span>
          <span className="font-bold text-red-600 text-lg">77%</span>
        </div>
        <div className="text-xs text-gray-700 mt-1">
          This candidate scored in the High priority category with a SmartScore of 82%. The SmartScore is a composite evaluation based on tenure prediction, skills matching, profile analysis, and initial screening results.
        </div>
      </div>
      {/* SmartTenure */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4 rounded">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-orange-700">SmartTenure</span>
          <span className="font-bold text-green-500 text-lg">77%</span>
        </div>
        <div className="text-xs text-gray-700 mt-1">
          More Likely to Have Long Tenure. Based on the SmartTenure results, this person is more likely to stay on the job long-term.
        </div>
      </div>
    </div>
  );
}
