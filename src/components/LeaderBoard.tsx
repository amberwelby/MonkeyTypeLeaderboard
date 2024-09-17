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
  Input,
} from "@nextui-org/react";
import axios from "axios";
const mockData: string[] = [];

const LeaderBoard = () => {
  const [sortedData, setSortedData] = useState(mockData);
  const [userName, setUserName] = useState("");
  const retrieve = async () => {
    const existingArray =
      JSON.parse(localStorage.getItem("usernames") || "null") || [];
    const data = [];
    for (let i = 0; i < existingArray.length; i++) {
      const res = await axios.get(
        "https://api.monkeytype.com/users/" + existingArray[i] + "/profile"
      );
      data.push({
        name: existingArray[i],
        wpm15: res.data.data.personalBests.time["15"]["0"]["wpm"],
        wpm30: res.data.data.personalBests.time["30"]["0"]["wpm"],
      });
    }
    setSortedData(data);
  };
  const addEntry = async () => {
    const res = await axios.get(
      "https://api.monkeytype.com/users/" + userName + "/profile"
    );

    const existingArray =
      JSON.parse(localStorage.getItem("usernames") || "null") || [];

    existingArray.push(userName);

    localStorage.setItem("usernames", JSON.stringify(existingArray));

    const newEntry = {
      name: userName,
      wpm15: res.data.data.personalBests.time["15"]["0"]["wpm"],
      wpm30: res.data.data.personalBests.time["30"]["0"]["wpm"],
    };
    setSortedData([...sortedData, newEntry]);
  };

  const sortData = (key: string) => {
    const sorted = [...sortedData].sort((a, b) => b[key] - a[key]);
    setSortedData(sorted);
  };
  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="User Name" onChange={getUserName} />
      </div>
      <Button color="primary" onClick={addEntry}>
        Add Player
      </Button>
      <Button color="primary" onClick={retrieve}>
        Retrieve
      </Button>
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
