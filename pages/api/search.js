


import * as fs from 'fs';


export default function handler(req, res) {
   

 
  fs.readFile(`data.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: "No such blog found" })

    }

    // console.log(req.query.slug)
    let parsed = JSON.parse(data)
    parsed = parsed.filter((f)=>{
        return f.description.toLowerCase().includes(req.query.query)
                })
    res.status(200).json({data:parsed})
  })
}




