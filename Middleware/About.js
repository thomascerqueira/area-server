import fs from "fs";

function about(req, res) {
  let o = {}
  const file = JSON.parse(fs.readFileSync('./service.json').toString())
  const host = req.socket.remoteAddress
  const currentTime = Math.floor(new Date().getTime() / 1000)

  o['client'] = ({'host': host})
  o['server'] = ({'current_time': currentTime, 'services': file})

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(o, null, 3));
}

export {
  about
}
