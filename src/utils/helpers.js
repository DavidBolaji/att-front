import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { format, formatISO, parseISO } from "date-fns";

const timeToWord = (isoDate) => {
  const parsedDate = parseISO(isoDate);
  const dateWithoutTime = formatISO(parsedDate, { representation: "date" });
  const dateToWord = format(new Date(dateWithoutTime), "do MMM',' yyyy");
  return dateToWord;
};


function iterateObjectsWithDates(objArray, dateArray) {
  return objArray.map((obj) => {
    return dateArray.map((date) => {
      return { ...obj, [date]: obj.attendance.some(e => timeToWord(e.createdAt) === date) ? 'present' : 'absent' };
    });
  }).flat();
}

function mergeUsers(users) {
  const mergedUsers = users.reduce((acc, user) => {
    const { _id, ...rest } = user;
    if (acc[_id]) {
      Object.assign(acc[_id], rest);
    } else {
      acc[_id] = { _id, ...rest };
    }
    return acc;
  }, {});

  return Object.values(mergedUsers);
}

export const exportToExcel = (ite, newCol) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = "data.xlsx";
  const resultHeader = [];
  const dates = [];
  let count = 4

  ite.forEach(el => {
    resultHeader.push(el.title);
  });

  for(let v = 4; v < resultHeader.length; v++) {
    dates.push(resultHeader[v])
  }
  
  const dataToExport1 = iterateObjectsWithDates(newCol, dates).map(({ attendance, _v, ...rest }) => rest);
  const dataToExport = mergeUsers(dataToExport1).map(({ attendance, _v, _id, ...rest }) => rest);  
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const excelBlob = new Blob([excelBuffer], { type: fileType });
  saveAs(excelBlob, fileName);
};
