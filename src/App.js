import React from "react";
import Navbar from "./Navbar";
import MainBody from "./MainBody";
import symptomsort from "./datasort";
import symptomunsort from "./dataunsort";
import { useState, useEffect } from "react";

function App() {
  const mlClick = async () => {
    let count = 0;
    if (symptom1 === "") count++;
    if (symptom2 === "") count++;
    if (symptom3 === "") count++;
    if (symptom4 === "") count++;
    if (symptom5 === "") count++;

    if (count >= 3) setPrediction("Please give atleast 3 symptoms");
    else {
      const inputdata = [];
      for (let i = 0; i < symptomunsort.length; i++) {
        inputdata[i] = 0;
        if (
          symptom1 === symptomunsort[i] ||
          symptom2 === symptomunsort[i] ||
          symptom3 === symptomunsort[i] ||
          symptom4 === symptomunsort[i] ||
          symptom5 === symptomunsort[i]
        ) {
          inputdata[i] = 1;
        }
      }

      for (let i = 0; i < inputdata.length; i++) {
        console.log(inputdata);
      }

      const res = fetch("/predict", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          input: [inputdata],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((message) => {
          const prediction = message;
          setPrediction(prediction["disease"]);
          console.log(prediction["disease"]);
          console.log(typeof prediction);
        });
    }
  };

  const [symptom1, setSymptom1] = useState("");
  const [symptom2, setSymptom2] = useState("");
  const [symptom3, setSymptom3] = useState("");
  const [symptom4, setSymptom4] = useState("");
  const [symptom5, setSymptom5] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleCallback1 = (childData) => {
    setSymptom1(childData);
  };

  const handleCallback2 = (childData) => {
    setSymptom2(childData);
  };

  const handleCallback3 = (childData) => {
    setSymptom3(childData);
  };

  const handleCallback4 = (childData) => {
    setSymptom4(childData);
  };

  const handleCallback5 = (childData) => {
    setSymptom5(childData);
  };

  return (
    <>
      <div className="mainContainer">
        <Navbar />

        <MainBody parentCallback={handleCallback1} data={symptomsort} />
        <MainBody parentCallback={handleCallback2} data={symptomsort} />
        <MainBody parentCallback={handleCallback3} data={symptomsort} />
        <MainBody parentCallback={handleCallback4} data={symptomsort} />
        <MainBody parentCallback={handleCallback5} data={symptomsort} />
        <button type="button" onClick={() => mlClick()}>
          Submit
        </button>
        <h1>{prediction}</h1>
      </div>
    </>
  );
}

export default App;
