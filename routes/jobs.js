const { Router } = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

const router = Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").patch(updateJob).get(getJob).delete(deleteJob);

module.exports = router;
