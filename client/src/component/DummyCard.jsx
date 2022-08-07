import React from "react";

export const DummyCard = () => {
  return (
    <div className="card rounded-lg overflow-hidden block w-full md:w-[32rem] h-[26rem] drop-shadow border border-slate-200">
      <div className="w-full h-2/3 p-2">
        <div className="bg-slate-200 rounded-lg w-full h-full"></div>
      </div>
      <div className="text-container px-3">
        <span className="bg-slate-200 h-3 w-1/3 block rounded-lg mb-2"></span>
        <span className="bg-slate-200 h-3 w-2/3 block rounded-lg mb-3"></span>
        <span className="bg-slate-200 h-3 w-full block rounded-lg mb-2"></span>
        <span className="bg-slate-200 h-3 w-full block rounded-lg mb-2"></span>
        <span className="bg-slate-200 h-3 w-full block rounded-lg mb-2"></span>
        <span className="bg-slate-200 h-3 w-1/2 block rounded-lg mb-1"></span>
        <p className="text-slate-600"></p>
      </div>
    </div>
  );
};
