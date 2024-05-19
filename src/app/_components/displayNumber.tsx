import { url } from "inspector";
import moment from "moment";
import React from "react";

function DisplayNumber({ time }: { time: number }) {
  if (time < 0 || time > 999) time = 0;
  return (
    <div className="flex">
      <img
        draggable={false}
        className="h-[46px] w-[26px] bg-contain"
        src={"time/" + Math.floor(time / 100) + ".PNG"}
      />
      <img
        draggable={false}
        className="h-[46px] w-[26px] bg-contain"
        src={"time/" + Math.floor((time % 100) / 10) + ".PNG"}
      />
      <img
        draggable={false}
        className="h-[46px] w-[26px] bg-contain"
        src={"time/" + (time % 10) + ".PNG"}
      />
    </div>
  );
}

export default DisplayNumber;
