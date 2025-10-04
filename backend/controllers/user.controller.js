import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, oldPassword, newPassword } = req.body;

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (oldPassword || newPassword) {
      const verifyPassword = await user.comparePassword(oldPassword || "");
      if (!verifyPassword) {
        return res.status(400).json({ message: "The password is incorrect" });
      }
      user.password = newPassword;
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    await user.save().then(res.status(200).json(user));
  } catch (error) {
    console.log("Error in Update user controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
