// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }


import * as fs from 'fs';

export default function handler(req, res) {

  fs.readFile(`data.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: "No such blog found" })

    }
    // console.log(req.query.slug)
    res.status(200).json(JSON.parse(data))
  })
}




