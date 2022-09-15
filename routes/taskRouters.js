const router =  require("express").Router()
const controller = require("../controller/taskcontroller")

router.route("/task/:id").get(controller.getSingleTask).patch(controller.updateTask).delete(controller.deleteTask).put(controller.updateUsingPut)
router.route("/task").get(controller.gettask).post(controller.createTask)

module.exports =  router