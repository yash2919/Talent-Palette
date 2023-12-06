// // jobData.js
// const jobData = {
//     Artist: [
//       { id: 'a1', title: 'Graphic Designer', description: 'Description for Graphic Designer job...' },
//       { id: 'a2', title: 'Painter', description: 'Description for Painter job...' },
//       { id: 'a3', title: 'Illustrator', description: 'Description for Illustrator job...' },
//     ],



//     Dancer: [
//        { id: 'a1', title: 'Hip Hop', description: 'Description' },
//        { id: 'a2', title: 'Painter', description: 'Description for Painter job...' },
//        { id: 'a3', title: 'Illustrator', description: 'Description for Illustrator job...' },
//       ],
//       Musician: [
//         { id: 'a1', title: 'Soothing Songs', description: 'Description' },
//        { id: 'a2', title: 'Jazz', description: 'Description for Painter job...' },
//        { id: 'a3', title: 'Illustrator', description: 'Description for Illustrator job...' },
       
//       ],
//       'My Applications': [
//         { id: 'a1', title: 'Soothing Songs', description: 'Description' },
//         { id: 'a2', title: 'Jazz', description: 'Description for Painter job...' },
//         { id: 'a3', title: 'Illustrator', description: 'Description for Illustrator job...' },
    
//       ],
//     };


  
//   export default jobData;
const jobData = async () => {

  try {
    const response = await fetch('http://localhost:3000/jobs/getalljobs'); // Replace '/api/jobs' with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
  
    const data = await response.json();
   // console.log(data);

    // Organize data by jobType
    const organizedData = {};

    data.jobs.map(job => {
      if (!organizedData[job.jobType]) {
        organizedData[job.jobType] = [];
      }
      if(job.jobstatus==="open"){
      organizedData[job.jobType].push({
        id: job._id,
        title: job.jobName,
        description: job.jobDesc,
        image:job.jobimgUrl
        // Add other fields as needed
      });}
    });

    return organizedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
};

export default jobData;

  