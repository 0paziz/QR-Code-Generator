import React, { useState,useEffect } from "react";
import { FiCopy, FiShare2 } from "react-icons/fi";

const ShareButtons = ({Shareurl}) => {

    const[url,setURL]=useState(Shareurl)
     useEffect(() => {
    if (Shareurl) {
      setURL(Shareurl);
    }
  }, [Shareurl]);
 

  // Copy URL function
  const handleCopy = () => {
    if(!url){
        alert("URL is Empty, Please Enter URL");
    }
    else{
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");}
  };

  // Share function
   const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Share not supported in this browser.");
    }
  };

  return (
    <div className="flex gap-2 mt-8 items-center justify-center">
      {/* Copy URL Button */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        <FiCopy />
        Copy URL
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        <FiShare2 />
        Share
      </button>
    </div>
  );
};

export default ShareButtons;
