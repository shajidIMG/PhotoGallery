


import * as fs from 'fs';


export default function handler(req, res) {
   

 
  fs.readFile(`data.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: "No such blog found" })

    }

    // console.log(req.query.slug)
    let parsed = JSON.parse(data)
    // parsed = parsed.filter((f)=>{
    //     return f.description.toLowerCase().includes(req.query.query)
    //             })

    let page = Number(req.query.page)
    let per_page = Number(req.query.perPage)
   let offset = (page - 1) * per_page
  
  let  totalPages = Math.ceil(parsed.length / per_page)
  console.log(totalPages,page,offset,per_page)
    let nextPage = (totalPages > page) ? page + 1 : null
    parsed  = parsed.slice(offset).slice(0, per_page)
    res.status(200).json({data:parsed,totalPages,nextPage,page})
  })
}




