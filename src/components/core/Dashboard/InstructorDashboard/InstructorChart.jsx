import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

function InstructorChart({ courses }) {

    const [currChart, setCurrChart] = useState("Students");

    const getRandomColors = (numColor) => {
        const colors = [];

        for (let i = 0; i < numColor; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for students

    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    // create data for income
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    // create option
    const option = {
        plugins: {
            legend: {
                position: 'right',
                align: 'start',
                labels: {
                    boxWidth: 20,
                    padding: 10,
                    margin: 20,
                },
            },
        },
        layout: {
            padding: {
                right: 30,
            },
        },
    };

    return <div className="m-3 my-5 flex flex-col flex-1 rounded-md bg-richblack-800 p-6">

        <div className="flex gap-x-5">

            <p className="text-xl">Visualize</p>

            <div className="flex justify-end gap-x-5 w-full">
                <button className={`${currChart === "Students" ? "bg-richblack-900 text-yellow-100" : " bg-richblack-800 text-richblack-100"} px-2 py-2 rounded-md`}
                    onClick={() => setCurrChart("Students")}>
                    Student
                </button>
                <button className={`${currChart === "Income" ? "bg-richblack-900 text-yellow-100" : " bg-richblack-800 text-richblack-100"} px-2 py-2 rounded-md`}
                    onClick={() => setCurrChart("Income")}>
                    Income
                </button>
            </div>
        </div>

        <div className="" style={{ display: 'flex', flexDirection: 'row', height: '500px' }}>
            <Pie
                height={"h-full"}
                width={"w-full"}
                data={currChart === "Students" ? chartDataForStudents : chartDataForIncome}
                options={option}
            />
        </div>

    </div>;
}

export default InstructorChart;

/**
 import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function App() {
  return <Pie data={data} />;
}

 */