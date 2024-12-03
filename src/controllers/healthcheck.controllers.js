import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
/*
// async function requestHandler(req, res) {
//   return res
//     .status(200)
//     .json(new ApiResponse(200, "OK", "Health check passed"))
// }

// const healthcheck = asyncHandler(requestHandler)
*/

const healthcheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "OK", "Health check passed"))
})

export { healthcheck }
