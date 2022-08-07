import React from "react";

export const Card = ({ img, link, title, description }) => {
  return (
    <a
      href={link}
      className="card rounded-lg overflow-hidden w-full md:w-[32rem] max-h-[26rem] drop-shadow border border-slate-200 flex flex-col"
    >
      <div className="overflow-hidden ">
        <img
          src={img}
          alt="url thumbnail"
          width={"100%"}
          height={"100%"}
          className="object-contain block"
        />
      </div>
      <div className="text-container p-3">
        <span className="text-slate-700 text-xs  md:text-sm">{link}</span>
        <h3 className="md:text-lg text-slate-900 font-semibold">{title}</h3>
        <p className="text-slate-600 text-sm md:text-base">{description}</p>
      </div>
    </a>
  );
};
