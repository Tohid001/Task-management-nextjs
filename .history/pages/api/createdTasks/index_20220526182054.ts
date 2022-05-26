import type { NextApiRequest, NextApiResponse } from "next";
import * as db from "../../../db.json";

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: "John Doe" });
};
