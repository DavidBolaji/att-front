import React, { useState } from "react";
import QRCode from "qrcode.react";

function QRCodeGenerator() {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const generateQR = () => {
    // axios.get('/user')
    const user = JSON.parse(localStorage.getItem("user"));
    const link = `https://checkuser.com?id=${user._id}&email=${user?.email}`;
    setText(link);
  };

  return (
    <div>
      {/* <h1>Generate QR Code</h1> */}
      <button
        onClick={generateQR}
        className="bg-green-600 text-white px-5 py-1 rounded-lg mb-5"
      >
        GenerateQR
      </button>
      <div>
        <input
          type="text"
          id="text-input"
          value={text}
          onChange={handleTextChange}
          hidden
        />
      </div>
      {text && <QRCode value={text} />}
    </div>
  );
}

export default QRCodeGenerator;
