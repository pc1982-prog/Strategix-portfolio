import React from 'react';
import CountUp from 'react-countup';
import RevealOnScroll from './RevealOnScroll';

export default function StatCount({ end = 100, suffix = '', duration = 2 }) {
  return (
    <RevealOnScroll>
      <div className="text-center p-6 rounded-lg bg-[#071028] border border-slate-800">
        <div className="text-4xl font-bold"><CountUp end={end} duration={duration} preserveValue />{suffix}</div>
      </div>
    </RevealOnScroll>
  )
}
