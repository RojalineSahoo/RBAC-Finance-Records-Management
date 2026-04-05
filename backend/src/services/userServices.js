import User from '../models/user.js';

const getAllUserService = async (requesterId) => {
  const requester = await User.findById(requesterId);

  if (!requester) {
    throw new Error("No user is present with that Id");
  }

  const role = requester.role;

  if (role === "viewer" || role === "analyst") {
    throw new Error(`Cannot access users' information since you are ${role}.`);
  }

  if (role === "admin") {
    const allUsers = await User.find();

    if (allUsers.length === 0) {
      throw new Error("No users found");
    }

    return allUsers;
  }

  throw new Error("Invalid role");
};

const createNewUserService = async (data) => {
    const {name, email, role, activityStatus} = data;

    if (!name || name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
    }

    if (!email) {
        throw new Error("Email is required");
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    const validRoles = ["admin", "analyst", "viewer"];
    if (role && !validRoles.includes(role)) {
        throw new Error("Invalid role");
    }

    const validStatus = ["active", "inactive", "suspended"];
    if (activityStatus && !validStatus.includes(activityStatus)) {
        throw new Error("Invalid activity status");
    }
        const alreadyExistingUser = await User.findOne({email});

    if(alreadyExistingUser) {
        throw new Error("User already exists in the database.");
    }

    const newUser = await User.create({name,
        email,
        role,
        activityStatus
    });

    return newUser;
};

export { getAllUserService, createNewUserService};