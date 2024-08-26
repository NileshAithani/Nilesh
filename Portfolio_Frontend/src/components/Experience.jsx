import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const Experience = () => {
  const data = [
    { name: "Facebook", value: 1000000 },
    { name: "Instagram", value: 2000000 },
    { name: "Twitter", value: 3000000 },
    { name: "Youtube", value: 4000000 },
  ];

  const data2 = [
    { name: "Facebook", value: 1000 },
    { name: "Instagram", value: 200 },
    { name: "Twitter", value: 3000 },
    { name: "Youtube", value: 4000 },
  ];

  return (
    <div className="w-full min-h-screen pt-6 md:pt-2 md:px-10 bg-[#020c1b]">
      {/* Make the chart responsive using ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          {/* First Pie */}
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          {/* Second Pie for comparison */}
          {/* <Pie
            dataKey="value"
            data={data2}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          /> */}
          {/* Customized Tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: "white", color: "#fff" }}
            cursor={{ fill: "rgba(255, 255, 255, 0.2)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Experience;
