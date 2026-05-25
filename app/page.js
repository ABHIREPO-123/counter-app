// import Image from "next/image";

// export default function Home() {
//   return (

//   );
// }

// "use client";

// import { useState } from "react";

// export default function MobileApp() {
//   const [count, setCount] = useState(0);
//   const [isPressed, setIsPressed] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   // Handle Save to Database
//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const response = await fetch("/api/save-count", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ count }),
//       });

//       if (response.ok) {
//         // Show success popup
//         setShowPopup(true);
//         // Automatically hide popup after 2.5 seconds
//         setTimeout(() => setShowPopup(false), 2500);
//       } else {
//         alert("Failed to save data");
//       }
//     } catch (error) {
//       console.error("Error saving count:", error);
//       alert("Something went wrong!");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
//       {/* Mobile Frame Container */}
//       <div className="w-full max-w-md h-[844] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-slate-800 relative flex flex-col justify-between p-6">
//         {/* TOP BAR: Header & Save Button */}
//         <div className="flex justify-between items-center w-full border-b pb-4 pt-2">
//           <h1 className="text-xl font-bold text-slate-800">Counter App</h1>
//           <button
//             onClick={handleSave}
//             disabled={isSaving}
//             className={`px-5 py-2 rounded-full text-white font-medium shadow transition-all active:scale-95 ${
//               isSaving
//                 ? "bg-slate-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isSaving ? "Saving..." : "Save"}
//           </button>
//         </div>

//         {/* CENTER: Count Display */}
//         <div className="flex flex-col items-center justify-center flex-1">
//           <span className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
//             Current Count
//           </span>
//           <span className="text-6xl font-extrabold text-slate-800 transition-all duration-200">
//             {count}
//           </span>
//         </div>

//         {/* BOTTOM BAR: Interactive Circle Button */}
//         <div className="flex justify-center items-center w-full pb-8">
//           <button
//             onMouseDown={() => {
//               setIsPressed(true);
//               setCount((prev) => prev + 1);
//             }}
//             onMouseUp={() => setIsPressed(false)}
//             onMouseLeave={() => setIsPressed(false)}
//             onTouchStart={() => {
//               setIsPressed(true);
//               setCount((prev) => prev + 1);
//             }}
//             onTouchEnd={() => setIsPressed(false)}
//             className={`w-32 h-32 rounded-full shadow-lg border-4 border-white transition-colors duration-200 flex items-center justify-center text-white font-bold text-lg select-none transform active:scale-95 ${
//               isPressed
//                 ? "bg-green-500 shadow-green-200"
//                 : "bg-red-500 shadow-red-200"
//             }`}
//           >
//             {isPressed ? "HELD" : "TAP"}
//           </button>
//         </div>

//         {/* SUCCESS POPUP MODAL */}
//         {showPopup && (
//           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in z-50">
//             <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center max-w-xs text-center border animate-scale-up">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-6 h-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="3"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-slate-900">
//                 Saved Successfully!
//               </h3>
//               <p className="text-sm text-slate-500 mt-1">
//                 Your current count has been securely stored in MongoDB.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function MobileApp() {
  const [count, setCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initial load state
  const [showPopup, setShowPopup] = useState(false);

  // 1. App load hote hi database se latest count lekar aana
  useEffect(() => {
    const fetchLatestCount = async () => {
      try {
        const response = await fetch("/api/get-count");
        const data = await response.json();
        if (response.ok) {
          setCount(data.count);
        } else {
          console.error("Failed to fetch initial count");
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestCount();
  }, []);

  // 2. Handle Save to Database
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/save-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }),
      });

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2500);
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving count:", error);
      alert("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md h-[644] bg-white rounded-[40] shadow-2xl overflow-hidden border-8 border-slate-800 relative flex flex-col justify-between p-6">
        {/* TOP BAR: Header & Save Button */}
        <div className="flex justify-between items-center w-full border-b pb-4 pt-2">
          <h1 className="text-xl font-bold text-slate-800">Counter App</h1>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className={`px-5 py-2 rounded-full text-white font-medium shadow transition-all active:scale-95 ${
              isSaving || isLoading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* CENTER: Count Display */}
        <div className="flex flex-col items-center justify-center flex-1">
          <span className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Current Count
          </span>
          {isLoading ? (
            /* Loading Spinner jab tak db se value na aaye */
            <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          ) : (
            <span className="text-6xl font-extrabold text-slate-800 transition-all duration-200">
              {count}
            </span>
          )}
        </div>

        {/* BOTTOM BAR: Interactive Circle Button */}
        <div className="flex justify-center items-center w-full pb-43">
          {/* <button
            onMouseDown={() => {
              setIsPressed(true);
              setCount((prev) => prev + 1);
            }}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => {
              setIsPressed(true);
              setCount((prev) => prev + 1);
            }}
            onTouchEnd={() => setIsPressed(false)}
            disabled={isLoading}
            className={`w-52 h-52 rounded-full shadow-lg border-4 border-white transition-colors duration-200 flex items-center justify-center text-white font-bold text-lg select-none transform active:scale-95 ${
              isLoading
                ? "bg-slate-300 cursor-not-allowed"
                : isPressed
                  ? "bg-green-500 shadow-green-200"
                  : "bg-red-500 shadow-red-200"
            }`}
          >
            {isLoading ? "..." : isPressed ? "HELD" : "TAP"}
          </button> */}

          <button
            // Mobile touch ke liye (preventDefault se yeh mouse event ko trigger nahi hone dega)
            onTouchStart={(e) => {
              e.preventDefault(); // This is the magic line!
              setIsPressed(true);
              setCount((prev) => prev + 1);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              setIsPressed(false);
            }}
            // Desktop mouse ke liye
            onMouseDown={() => {
              setIsPressed(true);
              setCount((prev) => prev + 1);
            }}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            disabled={isLoading}
            className={`w-32 h-32 rounded-full shadow-lg border-4 border-white transition-colors duration-200 flex items-center justify-center text-white font-bold text-lg select-none transform active:scale-95 ${
              isLoading
                ? "bg-slate-300 cursor-not-allowed"
                : isPressed
                  ? "bg-green-500 shadow-green-200"
                  : "bg-red-500 shadow-red-200"
            }`}
          >
            {isLoading ? "..." : isPressed ? "HELD" : "TAP"}
          </button>
        </div>

        {/* SUCCESS POPUP MODAL */}
        {showPopup && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center max-w-xs text-center border animate-scale-up">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Saved Successfully!
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Your current count has been securely stored in MongoDB.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
