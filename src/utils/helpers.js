import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { format, formatISO, parseISO } from "date-fns";

const getTimeFromDateStr = (dateStr) => {
  const dateObj = new Date(dateStr);
  const time = format(dateObj, "h:mm a");
  return time;
};

const timeToWord = (isoDate) => {
  if (typeof isoDate === "undefined") {
    return "5";
  }
  const parsedDate = parseISO(isoDate);
  const dateWithoutTime = formatISO(parsedDate, { representation: "date" });
  const dateToWord = format(new Date(dateWithoutTime), "do MMM',' yyyy");
  return dateToWord;
};

const latest = (date, arrays) => {
  const empty = [];
  arrays.forEach((array) => {
    const attendanceObject = {};
    attendanceObject["_id"] = array._id;
    attendanceObject["firstName"] = array.firstName;
    attendanceObject["lastName"] = array.lastName;
    attendanceObject["email"] = array.email;
    attendanceObject["phone"] = array.phone;
    attendanceObject["gender"] = array.gender;
    attendanceObject["DOB"] = array.DOB;
    attendanceObject["month"] = array.month;
    attendanceObject["role"] =
      typeof array.role[0] === "undefined"
        ? "_"
        : array.role[0] === "Admin"
        ? "Worker"
        : array.role[0];
    attendanceObject["occupation"] = array.occupation;
    attendanceObject["address"] = array.address;
    attendanceObject["nbusStop"] = array.nbusStop;
    attendanceObject["addressGroup"] = array.addressGroup;

    date.forEach((date) => {
      const attendanceRecord = array?.attendance?.find(
        (record) => timeToWord(record?.createdAt) === date
      );
      attendanceObject[date] = attendanceRecord
        ? getTimeFromDateStr(attendanceRecord?.createdAt)
        : "_";
    });

    empty.push(attendanceObject);
  });
  return empty;
};

function iterateObjectsWithDates(objArray, dateArray) {
  return objArray
    .map((obj) => {
      return dateArray.map((date, ind) => {
        return {
          ...obj,
          [date]: obj.attendance.some((e) => timeToWord(e.createdAt) === date)
            ? obj.attendance.map((e) => getTimeFromDateStr(e.createdAt))
            : "_",
        };
      });
    })
    .flat();
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
  let count = 4;

  ite.forEach((el) => {
    resultHeader.push(el.title);
  });

  for (let v = 3; v < resultHeader.length; v++) {
    dates.push(resultHeader[v]);
  }

  const dataToExport1 = latest(dates, newCol);

  const dataToExport = mergeUsers(dataToExport1);
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const excelBlob = new Blob([excelBuffer], { type: fileType });
  saveAs(excelBlob, fileName);
};
