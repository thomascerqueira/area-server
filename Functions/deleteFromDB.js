function deleteFromDb(uid, id) {
  console.log(`Deleting ActionReaction ${req.body.id} for user ${decoded.uid}`)
  dropDocument(allDb['ActionReaction'], 'ActionReaction', {
    id: req.body.id,
    uid: decoded.uid
  }).then(() => {
    try {
      deleteField("References", "Surveys", req.body.id)
      res.status(200).send({ 'msg': 'Delete success' })
      console.log(`ActionReaction ${req.body.id} Deleted successfully`)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err)
    })
}

export {
  deleteFromDb
}