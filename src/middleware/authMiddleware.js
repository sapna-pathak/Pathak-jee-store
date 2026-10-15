import adminModel from "@/models/admin.model";

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await adminModel.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Attach admin info to request object
    req.user = { id: admin._id, role: "admin" };
    next();

  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};