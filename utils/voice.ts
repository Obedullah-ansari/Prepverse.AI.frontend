// async function generateSpeech(data:string) {
//    const apiKey = import.meta.env.VITE_APP_VOICE
//    console.log(apiKey)
//     try {
//       const response = await fetch("https://api.murf.ai/v1/speech/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "api-key": apiKey
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const result = await response.json();
//       console.log(result);
//       // You will get the audio URL or base64 from result
//     } catch (error) {
//       console.error("Error generating speech:", error);
//     }
//   }
  

//   export default generateSpeech;