import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'database/db.json';
import fs from 'fs';
const moment = require('moment');
import { v4 } from 'uuid';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { timeRegistries } = db;
  const params = req.query.params;
  console.log(params);

  if (req.method === 'GET' && params.length === 2) {
    const filteredRegistry = timeRegistries.filter((registry, index) => {
      return registry.registeredAt === params[1];
    });
    res.status(200).json(filteredRegistry);
  }
  if (req.method === 'POST') {
    const newRegistry = {
      id: v4(),
      ...req.body,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    timeRegistries.push({ ...newRegistry });
    fs.writeFileSync('database/db.json', JSON.stringify(db, null, 4));
    res.status(200).json({ success: true, newRegistry: { ...newRegistry } });
  }

  if (req.method === 'PATCH' && params.length === 1) {
    const targetRegistry = timeRegistries.find(
      (task, index) =>
        task.id.toString().toLowerCase() === params[0].toString().toLowerCase()
    );
    const index = timeRegistries.findIndex(
      (task, index) =>
        task.id.toString().toLowerCase() === params[0].toString().toLowerCase()
    );

    timeRegistries[index] = {
      ...timeRegistries[index],
      ...req.body,
      lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    fs.writeFileSync('database/db.json', JSON.stringify(db, null, 4));

    res.status(200).json({
      success: true,
      oldRegistry: { ...targetRegistry },
      updatedRegistry: { ...timeRegistries[index] },
    });
  }

  // res.status(200).json(params);
};
