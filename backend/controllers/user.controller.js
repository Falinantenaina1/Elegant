import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, oldPassword, newPassword } = req.body;

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (oldPassword || newPassword) {
      const verifyPassword = await user.comparePassword(oldPassword || "");
      console.log(verifyPassword, oldPassword, newPassword);
      if (verifyPassword) {
        user.password = newPassword;
      }

      return res.status(400).json({ message: "The password is incorrect" });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    await user.save().then(
      res.status(200).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      })
    );
  } catch (error) {
    console.log("Error in Update user controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const id = req.user._id;
    const { street, city, postalCode, country } = req.body;

    if (!street | !city | !postalCode | !country) {
      return res
        .status(400)
        .json({ message: "There is a missing required information" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in Update user controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
