import * as fs from 'fs';

export default function handler(req, res) {

    // res.json({data:req.body})

  fs.readFile(`data.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: "No such blog found" })

    }
    // console.log(req.query.slug)
    // res.status(200).json(JSON.parse(data))
    let d = JSON.parse(data)

    d.push(req.body)
    // console.log(d);
    d = JSON.stringify(d)
    fs.writeFile("data.json", d, 'utf8', function (err) {
        if (err) {
            // console.log("An error occured while writing JSON Object to File.");
            return res.json({success:false,message:err})
        }
     
        res.json({success:true,message:"Image is uploaded successfully"})  
    });
  })
}