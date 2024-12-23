import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const registerUser = asyncHandler(async (req, res) => {
  // todo
  const { fullName, email, username, password } = req.body

  // validation
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(202, "All fields are required")

  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists.")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing.")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  let coverImage = "";
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath)
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user.")
  }

  return res
    .status(201)
    .res.json(new ApiResponse(200, createdUser, "User Registered Successfully"))
})

export {
  registerUser
}