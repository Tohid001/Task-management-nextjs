// import React, { useState } from "react";
// import useCalender from "../../Hooks/useCalender";
// import Row from "../../Components/timeRegistry/Row";
// import Action from "../../Components/timeRegistry/Action";

// function Index() {
//   const { calender, previousMonth, nextMonth } = useCalender();

//   return (
//     <>
//       <Action {...{ previousMonth, nextMonth }} />

//       <table>
//         <caption>Time Registry</caption>
//         <thead>
//           <tr>
//             <th rowSpan={2}>Date</th>
//             <th colSpan={3}>Registry Info</th>
//           </tr>
//           <tr>
//             <th>Task Id</th>
//             <th>Action</th>
//             <th>Actual Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {calender.map((date, index) => {
//             return (
//               <>
//                 <Row key={index} date={date} registryInfoColSpan={3} />
//                 <tr></tr>
//               </>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Index;
