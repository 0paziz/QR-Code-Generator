import React, { useRef, useState } from 'react'
import { FaFileDownload } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { QRCodeCanvas } from 'qrcode.react';
import { SketchPicker } from 'react-color';
import ShareButtons from './BTN';

export default function QRGenerator() {
  const canvasRef = useRef();

  const [UserbgColor, setbgColor] = useState('#4A4A4A')
  const [UserfgColor, setfgColor] = useState('#FFFF')
  const [UserURL, setURL] = useState('');
  const [Error, setError] = useState(false);

  const [bgColorPicker, SetbgColorPicker] = useState(false)
  const [fgColorPicker, SetfgColorPicker] = useState(false)

  const showbgColorPicker = () => { SetbgColorPicker(!bgColorPicker) }
  const showfgColorPicker = () => { SetfgColorPicker(!fgColorPicker) }

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const [fileInfo, setFileInfo] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      if (!isChecked) {
        setFileInfo({
          name: file.name,
          url: objectUrl,
          src: objectUrl,
        });
      }
    } else {
      alert("Please select an image file");
    }
  };

  const downloadPNG = () => {
    if (!UserURL) {
      setError(true);
    } else {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      link.click();
    }
  };

  const handleChange = (e) => {
    setURL(e.target.value);
  }

  return (
    <main className="bg-gray-200 min-h-screen">
      <section className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
        <p
          style={{ fontFamily: "cursive" }}
          className="py-4 mb-10 font-semibold text-3xl text-center text-gray-600"
        >
          QR Code Generator
        </p>

        {/* Responsive flex container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side form */}
          <div className="w-full lg:w-1/2 relative">
            <label className="block p-1 text-gray-500">Enter Your URL</label>
            <input
              name="UserURL"
              value={UserURL}
              onChange={handleChange}
              className={`w-full mb-5 py-3 px-3 rounded-xl bg-white shadow-lg ${Error ? 'border border-red-500' : "border border-white"
                }`}
              type="text"
              placeholder="Add URL here"
            />

            {/* FG color */}
            <div className="flex items-center space-x-2 mb-5">
              <div
                onClick={() => showfgColorPicker()}
                style={{ background: UserfgColor }}
                className="w-14 h-6 rounded-2xl shadow-lg cursor-pointer"
              ></div>
              <p className="text-gray-500">Choose QR Color</p>
              {fgColorPicker && (
                <SketchPicker
                  color={UserfgColor}
                  onChangeComplete={(color) => setfgColor(color.hex)}
                  width={170}
                  className="absolute z-10 top-34 left-0"
                />
              )}
            </div>

            {/* BG color */}
            <div className="flex items-center space-x-2 mb-5">
              <div
                onClick={() => showbgColorPicker()}
                style={{ background: UserbgColor }}
                className="w-14 h-6 rounded-2xl shadow-lg cursor-pointer"
              ></div>
              <p className="text-gray-500">Choose background</p>
              {bgColorPicker && (
                <SketchPicker
                  width={170}
                  color={UserbgColor}
                  onChangeComplete={(color) => setbgColor(color.hex)}
                  className="absolute z-10 top-45 left-0"
                />
              )}
            </div>

            {/* File upload */}
            <label className="block p-1 text-gray-500">Upload custom image</label>
            <div className="w-full flex items-center bg-white px-4 py-3 rounded-xl shadow-lg">
              <label>
                <span
                  className={`border bg-gray-200 cursor-pointer text-sm px-2 ${!isChecked ? 'text-gray-800' : 'text-gray-400'
                    }`}
                >
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isChecked}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {fileInfo ? (
                <div className="text-sm text-center text-gray-700 px-2 rounded">
                  <p>{fileInfo.name}</p>
                </div>
              ) : (
                <span className="text-sm px-2 text-gray-500">No file chosen</span>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2 py-2 mt-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="text-gray-500">Without image</label>
            </div>

            {/* Download button */}
            <button
              onClick={downloadPNG}
              className="w-full mt-5 shadow-lg text-xl cursor-pointer text-center px-2 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Now
            </button>
          </div>

          {/* Right side QR preview */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-2xl p-6 pb-14">
            <div style={{ background: UserbgColor }} className="p-2 rounded-2xl w-full flex justify-center">
              <QRCodeCanvas
                bgColor={UserbgColor}
                fgColor={UserfgColor}
                value={UserURL}
                includeMargin={true}
                ref={canvasRef}
                level="H"
                imageSettings={{
                  src: `${!isChecked ? `${fileInfo.src}` : ''}`,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
                size={250}
              />
            </div>

            <div className="text-center mt-1 break-words">
              <p className="text-gray-700">{UserURL}</p>
            </div>

            {<ShareButtons Shareurl={UserURL} />}
          </div>
        </div>

           <p

          className=" mt-11 text-sm  text-center text-gray-400"
        >
          Built With ❤️ by <a href='https://github.com/0paziz' className='underline'>Aziz</a>
        </p>
      </section>
    </main>
  )
}
