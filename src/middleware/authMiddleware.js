export const userMiddleware = (req, res, next) => {
  try
  {

  }
  catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export const adminMiddleware = (req, res, next) => {
  try
  {

  }
  catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}