// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks } from "../../db.json";

export default function handler(req, res) {
  console.log(JSON.stringify(tasks));
  res.status(200).json(tasks);
}
