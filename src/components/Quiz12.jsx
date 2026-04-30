

// import React, { useEffect, useState } from "react";
// import DarkToggle from "./DarkToggle";

// export default function Quiz12() {
//   const [features, setFeatures] = useState([]);
//   const [dark, setDark] = useState(false);
//   const [started, setStarted] = useState(true); // directly start quiz
//   const [selected, setSelected] = useState([]);
//   const [finished, setFinished] = useState(false);
//   const [careerLinks, setCareerLinks] = useState([]);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     fetch("/quiz12Features.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setFeatures(data);
//         setSelected(Array(data.length).fill(0));
//       });

//     fetch("/coursesLinks.json")
//       .then((res) => res.json())
//       .then((data) => setCareerLinks(data))
//       .catch(() => console.error("Could not load coursesLinks.json"));
//   }, []);

//   const toggleCard = (idx) => {
//     setSelected((prev) =>
//       prev.map((v, i) => (i === idx ? (v ? 0 : 1) : v))
//     );
//   };

//   const progress = selected.filter((v) => v === 1).length;
//   const progressPct = features.length ? (progress / features.length) * 100 : 0;

//   const normalize = (str) =>
//     str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

//   const submitQuiz = async (e) => {
//     e.preventDefault();

//     if (!selected.includes(1)) {
//       alert("Please select at least one interest!");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ answers: selected }), // removed username & email
//       });

//       const data = await res.json();
//       if (!data.career) {
//         alert("Server error: " + (data.error || "Try again"));
//         return;
//       }

//       const normalizedCareer = normalize(data.career);

//       const keywordMap = {
//         computer: "B.Tech - Computer Science and Engineering",
//         software: "B.Tech - Computer Science and Engineering",
//         it: "B.Sc. - Information Technology",
//         civil: "B.Tech - Civil Engineering",
//         mechanical: "B.Tech - Mechanical Engineering",
//         electrical: "B.Tech - Electrical and Electronics Engineering",
//         electronics: "B.Tech - Electronics and Communication Engineering",
//         law: "Integrated Law Course - BA + LL.B",
//         journalism: "BJMC - Bachelor of Journalism and Mass Communication",
//         masscommunication: "BJMC - Bachelor of Journalism and Mass Communication",
//         fashion: "BFD - Bachelor of Fashion Designing",
//         design: "BVA - Bachelor of Visual Arts",
//         business: "BBA - Bachelor of Business Administration",
//         commerce: "B.Com - Bachelor of Commerce",
//         account: "CA - Chartered Accountancy",
//         companysecretary: "CS - Company Secretary",
//         architecture: "B.Arch - Bachelor of Architecture",
//         travel: "BTTM - Bachelor of Travel and Tourism Management",
//         history: "BA in History",
//         english: "BA in English",
//         hindi: "BA in Hindi",
//         economics: "BA in Economics",
//         education: "B.Ed.",
//         geology: "B.Sc - Applied Geology",
//         physics: "B.Sc - Physics",
//         chemistry: "B.Sc - Chemistry",
//         mathematics: "B.Sc - Mathematics",
//         pharma: "BPharma - Bachelor of Pharmacy",
//         dentist: "BDS - Bachelor of Dental Surgery",
//         doctor: "MBBS",
//         medical: "MBBS",
//         civilservice: "Civil Services",
//         event: "BEM - Bachelor of Event Management",
//         animation: "Animation, Graphics and Multimedia",
//       };

//       let matchedDegree = null;
//       for (const [keyword, degreeName] of Object.entries(keywordMap)) {
//         if (normalizedCareer.includes(keyword)) {
//           matchedDegree = degreeName;
//           break;
//         }
//       }

//       let match = null;
//       if (matchedDegree) {
//         match = careerLinks.find(
//           (item) => normalize(item.degree) === normalize(matchedDegree)
//         );
//       } else {
//         match = careerLinks.find((item) => {
//           const normalizedDegree = normalize(item.degree);
//           return (
//             normalizedCareer.includes(normalizedDegree) ||
//             normalizedDegree.includes(normalizedCareer)
//           );
//         });
//       }

//       const link =
//         match?.link ||
//         "https://alison.com/?utm_source=bing&utm_medium=cpc&utm_campaign=530823303";

//       // Save result (without user info)
//       const attempts =
//         JSON.parse(localStorage.getItem("careerAttempts")) || [];
//       attempts.push({
//         career: data.career,
//         link,
//         date: new Date().toLocaleString(),
//       });
//       localStorage.setItem("careerAttempts", JSON.stringify(attempts));

//       setResult({
//         career: data.career,
//         link,
//       });

//       setFinished(true);
//     } catch (error) {
//       console.error(error);
//       alert("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className={dark ? "dark bg-gray-200" : ""}>
//       <DarkToggle dark={dark} setDark={setDark} />
//       <div className="relative min-h-screen flex items-center justify-center p-6">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20 blur-sm -z-10" />

//         {/* Quiz Section */}
//         {started && !finished && (
//           <div className="max-w-4xl w-full p-6 rounded-2xl shadow-2xl transition bg-gradient-to-br from-[#50e5ac] to-[#1158b0] hover:from-[#168bcf] hover:to-[#dc569e]">
//             <h2 className="text-center text-white text-xl font-bold mb-4">
//               Select what you love!
//             </h2>

//             <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
//               <div
//                 className="bg-gray-900 h-3 rounded-full transition-all"
//                 style={{ width: `${progressPct}%` }}
//               />
//             </div>

//             <form
//               onSubmit={submitQuiz}
//               className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4"
//             >
//               {features.map((feat, i) => (
//                 <div
//                   key={i}
//                   onClick={() => toggleCard(i)}
//                   className={`cursor-pointer p-3 text-center font-semibold border-2 rounded-lg transition ${
//                     selected[i]
//                       ? "bg-blue-500 text-white border-white"
//                       : "bg-white text-black border-pink-100 hover:bg-blue-100"
//                   }`}
//                 >
//                   {i + 1}. {feat}
//                 </div>
//               ))}

//               <button
//                 type="submit"
//                 className="col-span-full mt-6 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-gray-700 to-purple-700 hover:from-blue-200 hover:to-blue-800 hover:text-black text-white"
//               >
//                 Submit Answers
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Result */}
//         {finished && result && (
//           <div className="max-w-xl w-full p-8 text-center rounded-2xl shadow-2xl bg-gradient-to-br from-[#50e5ac] to-[#1158b0]">
//             <h1 className="text-3xl text-white font-bold mb-2">
//               🎉 Your Result
//             </h1>

//             <p className="text-white text-lg mb-4">
//               Recommended Career:{" "}
//               <b className="text-yellow-300">{result.career}</b>
//             </p>

//             <a
//               href={result.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block mt-2 py-2 px-6 rounded-md bg-white text-blue-700 font-semibold hover:bg-yellow-100 transition"
//             >
//               Courses Link
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import DarkToggle from "./DarkToggle";

export default function Quiz12() {
  const [features, setFeatures] = useState([]);
  const [dark, setDark] = useState(false);
  const [started, setStarted] = useState(true);
  const [selected, setSelected] = useState([]);
  const [finished, setFinished] = useState(false);
  const [careerLinks, setCareerLinks] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/quiz12Features.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data);
        setSelected(Array(data.length).fill(0));
      });

    fetch("/coursesLinks.json")
      .then((res) => res.json())
      .then((data) => setCareerLinks(data))
      .catch(() => console.error("Could not load coursesLinks.json"));
  }, []);

  const toggleCard = (idx) => {
    setSelected((prev) =>
      prev.map((v, i) => (i === idx ? (v ? 0 : 1) : v))
    );
  };

  const progress = selected.filter((v) => v === 1).length;
  const progressPct = features.length ? (progress / features.length) * 100 : 0;

  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  const submitQuiz = async (e) => {
    e.preventDefault();

    if (!selected.includes(1)) {
      alert("Please select at least one interest!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: selected }),
      });

      const data = await res.json();
      if (!data.career) {
        alert("Server error: " + (data.error || "Try again"));
        return;
      }

      const normalizedCareer = normalize(data.career);

      const keywordMap = {
        computer: "B.Tech - Computer Science and Engineering",
        software: "B.Tech - Computer Science and Engineering",
        it: "B.Sc. - Information Technology",
        civil: "B.Tech - Civil Engineering",
        mechanical: "B.Tech - Mechanical Engineering",
        electrical: "B.Tech - Electrical and Electronics Engineering",
        electronics: "B.Tech - Electronics and Communication Engineering",
        law: "Integrated Law Course - BA + LL.B",
        journalism: "BJMC - Bachelor of Journalism and Mass Communication",
        masscommunication: "BJMC - Bachelor of Journalism and Mass Communication",
        fashion: "BFD - Bachelor of Fashion Designing",
        design: "BVA - Bachelor of Visual Arts",
        business: "BBA - Bachelor of Business Administration",
        commerce: "B.Com - Bachelor of Commerce",
        account: "CA - Chartered Accountancy",
        companysecretary: "CS - Company Secretary",
        architecture: "B.Arch - Bachelor of Architecture",
        travel: "BTTM - Bachelor of Travel and Tourism Management",
        history: "BA in History",
        english: "BA in English",
        hindi: "BA in Hindi",
        economics: "BA in Economics",
        education: "B.Ed.",
        geology: "B.Sc - Applied Geology",
        physics: "B.Sc - Physics",
        chemistry: "B.Sc - Chemistry",
        mathematics: "B.Sc - Mathematics",
        pharma: "BPharma - Bachelor of Pharmacy",
        dentist: "BDS - Bachelor of Dental Surgery",
        doctor: "MBBS",
        medical: "MBBS",
        civilservice: "Civil Services",
        event: "BEM - Bachelor of Event Management",
        animation: "Animation, Graphics and Multimedia",
      };

      let matchedDegree = null;
      for (const [keyword, degreeName] of Object.entries(keywordMap)) {
        if (normalizedCareer.includes(keyword)) {
          matchedDegree = degreeName;
          break;
        }
      }

      let match = null;
      if (matchedDegree) {
        match = careerLinks.find(
          (item) => normalize(item.degree) === normalize(matchedDegree)
        );
      } else {
        match = careerLinks.find((item) => {
          const normalizedDegree = normalize(item.degree);
          return (
            normalizedCareer.includes(normalizedDegree) ||
            normalizedDegree.includes(normalizedCareer)
          );
        });
      }

      const link =
        match?.link ||
        "https://alison.com/?utm_source=bing&utm_medium=cpc&utm_campaign=530823303";

      const attempts =
        JSON.parse(localStorage.getItem("careerAttempts")) || [];
      attempts.push({
        career: data.career,
        link,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("careerAttempts", JSON.stringify(attempts));

      setResult({
        career: data.career,
        link,
      });

      setFinished(true);
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className={dark ? "dark bg-gray-200" : ""}>
      <DarkToggle dark={dark} setDark={setDark} />

      <div className="relative min-h-screen flex items-center justify-center p-6">

        {/* Removed noisy background image → clean UI */}

        {started && !finished && (
          <div className="max-w-4xl w-full p-8 rounded-2xl shadow-xl
                          bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#dbeafe]">

            <h2 className="text-center text-gray-800 text-2xl font-bold mb-6">
              Select what you love!
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <form
              onSubmit={submitQuiz}
              className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4"
            >
              {features.map((feat, i) => (
                <div
                  key={i}
                  onClick={() => toggleCard(i)}
                  className={`cursor-pointer p-3 text-center font-semibold border rounded-lg transition ${
                    selected[i]
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-800 border-gray-200 hover:bg-blue-100"
                  }`}
                >
                  {i + 1}. {feat}
                </div>
              ))}

              <button
                type="submit"
                className="col-span-full mt-6 py-3 rounded-md text-lg font-semibold 
                           bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Submit Answers
              </button>
            </form>
          </div>
        )}

        {/* Result */}
        {finished && result && (
          <div className="max-w-xl w-full p-8 text-center rounded-2xl shadow-xl
                          bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#dbeafe]">

            <h1 className="text-3xl text-gray-800 font-bold mb-3">
              🎉 Your Result
            </h1>

            <p className="text-gray-700 text-lg mb-4">
              Recommended Career:{" "}
              <b className="text-blue-600">{result.career}</b>
            </p>

            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 py-2 px-6 rounded-md 
                         bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Courses Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}