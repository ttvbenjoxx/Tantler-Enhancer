import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Timer as TimerType } from '../types';

export function Timer() {
  const [timer, setTimer] = useState<TimerType>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    type: 'work',
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.isRunning) {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            // Timer completed
            const newType = timer.type === 'work' ? 'break' : 'work';
            setTimer({
              minutes: newType === 'work' ? 25 : 5,
              seconds: 0,
              isRunning: false,
              type: newType,
            });
            return;
          }
          setTimer((prev) => ({
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          }));
        } else {
          setTimer((prev) => ({
            ...prev,
            seconds: prev.seconds - 1,
          }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, timer.minutes, timer.seconds]);

  const toggleTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimer({
      minutes: 25,
      seconds: 0,
      isRunning: false,
      type: 'work',
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-6xl font-mono">
        {String(timer.minutes).padStart(2, '0')}:
        {String(timer.seconds).padStart(2, '0')}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {timer.isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <RefreshCw className="h-6 w-6" />
        </button>
      </div>
      <p className="text-lg font-medium">
        {timer.type === 'work' ? 'Work Time' : 'Break Time'}
      </p>
    </div>
  );
}