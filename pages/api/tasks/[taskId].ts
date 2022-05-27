import type { NextApiRequest, NextApiResponse } from "next";
import db from "database/db.json";
import fs from "fs";
import moment from "moment";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { tasks } = db;
  const { taskId } = req.query;
  if (req.method === "PATCH") {
    const targetTask = tasks.find(
      (task, index) =>
        task.id.toString().toLowerCase() === taskId.toString().toLowerCase()
    );
    const index = tasks.findIndex(
      (task, index) =>
        task.id.toString().toLowerCase() === taskId.toString().toLowerCase()
    );

    tasks[index] = {
      ...tasks[index],
      ...req.body,
      lastUpdated: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    fs.writeFileSync("database/db.json", JSON.stringify(db, null, 4));

    res.status(200).json({
      success: true,
      oldTask: { ...targetTask },
      updatedTask: { ...tasks[index] },
    });
  }
  if (req.method === "DELETE") {
    const deletedTask = tasks.find(
      (task, index) =>
        task.id.toString().toLowerCase() === taskId.toString().toLowerCase()
    );
    const index = tasks.findIndex(
      (task, index) =>
        task.id.toString().toLowerCase() === taskId.toString().toLowerCase()
    );

    tasks.splice(index, 1);
    fs.writeFileSync("database/db.json", JSON.stringify(db, null, 4));

    res.status(200).json({ success: true, deletedTask });
  }
};
