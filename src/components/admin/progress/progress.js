import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import "./progressbar.css";
import ProgressBar from "react-customizable-progressbar";

export default function Progress({ delay, isEnabled, onFinish, reset }) {
  const [value, setValue] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;
    setValue(0);
    setTimeout(() => {
      setIsStarted(true);
    }, delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  useEffect(() => {
    if (isEnabled) {
      return;
    } else {
      setIsStarted(false);
    }
  }, [isEnabled]);

  useEffect(()=>{
    if(reset) {
      return;
    }else{
      setValue(0)
      setIsStarted(false)
      
    }
  },[reset])

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    const interval = setInterval(() => {
      setValue((oldValue) => {
        const newValue = oldValue + 1;

        if (newValue === 100) {
          clearInterval(interval);
          onFinish?.();
        }

        return newValue;
      });
    }, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);



  return (
    <>
      <Container style={{ display: "inline-flex" }}>
        <ProgressBar progress={value} radius={100} strokeColor="#c67649">
          <div className="indicator">
            <div>
              <h2>{value}%</h2>
            </div>
          </div>
        </ProgressBar>
      </Container>
    </>
  );
}

