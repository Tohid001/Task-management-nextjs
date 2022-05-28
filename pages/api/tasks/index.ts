import type { NextApiRequest, NextApiResponse } from "next";
import db from "database/db.json";
import fs from "fs";
const moment = require("moment");
import { v4 } from "uuid";

export default function Tasks(req: NextApiRequest, res: NextApiResponse) {
  const { tasks } = db;

  if (req.method === "GET") {
    res.status(200).json(db.tasks);
  }
  if (req.method === "POST") {
    const newTask = {
      id: `Task-${tasks.length + 1}`,
      ...req.body,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      lastUpdated: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    db.tasks.push({ ...newTask });
    fs.writeFileSync("database/db.json", JSON.stringify(db, null, 4));
    res.status(200).json({ success: true, newTask: { ...newTask } });
  }
}
