"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

const mockData = [
  { id: 1, name: "Tony Reichert", wpm15: 85, wpm30: 90 },
  { id: 2, name: "Zoey Lang", wpm15: 92, wpm30: 70 },
  { id: 3, name: "Jane Fisher", wpm15: 78, wpm30: 80 },
  { id: 4, name: "William Howard", wpm15: 88, wpm30: 50 },
  { id: 5, name: "Emma Johnson", wpm15: 95, wpm30: 100 },
];

const LeaderBoard = () => {
  const [sortedData, setSortedData] = useState(mockData);
  const [selectedColor, setSelectedColor] = React.useState("default");

  const sortData = (key: string) => {
    const sorted = [...sortedData].sort((a, b) => b[key] - a[key]);
    setSortedData(sorted);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Table
          aria-label="Example static collection table"
          selectionMode="single"
        >
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn onClick={() => sortData("wpm30")}>
              30 Sec WPM{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 inline-block cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </TableColumn>
            <TableColumn onClick={() => sortData("wpm15")}>
              15 Sec WPM
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 inline-block cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </TableColumn>
          </TableHeader>
          <TableBody>
            {sortedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.wpm30}</TableCell>
                <TableCell>{user.wpm15}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderBoard;
