import { useGlobalStore } from "@/stores/globalStore";
import apifile from "./HttpRequestFile";

export const parsingDate = (datenya: any) => {
  let rtr = "";
  try {
    // 2023-08-30T15:06:52.000000Z
    let datetimearr = datenya.split("T");
    let date = datetimearr[0];
    let time = datetimearr[1].split(".")[0];
    rtr = `${date} ${time}`;
  } catch (e) {
    rtr = "";
  }
  return rtr;
};
