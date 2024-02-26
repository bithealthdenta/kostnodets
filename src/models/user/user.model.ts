import { userDatabase } from "./user.mongoo";
import mongoose from "mongoose";

const DEFAULT_USERID = 1;

const user = {
  _id: new Object("64c94d2d6518620708ae4ab2"),
  nik: "4413086743967349",
  username: "SuperAdmin",
  password: "password1!",
  first_name: "Super",
  last_name: "Admin",
  phone: "087838961010",
  email: "denta.marcellus@gmail.com",
  account_number: "443071",
  bank: "BCA",
  join_date: new Date("December 11, 2022").toISOString(),
  birth_date: new Date("December 12, 1996").toISOString(),
  birth_place: "Jakarta",
  created_date: new Date("July 1, 2023").toISOString(),
  update_date: new Date("July 1, 2023").toISOString(),
  status: "Aktif",
  role: Object("64c94d2e6518620708ae4ab3"),
  kost: [Object("64c9310bf6db5212645775d7")],
};
saveUser(user);
//////////////////////////////////////////
async function saveUser(user) {
  await userDatabase
    .findOneAndUpdate(
      {
        _id: user._id,
      },
      user,
      {
        upsert: true,
      }
    )
    .populate("role")
    .populate("kost");
}

export async function getAllUser(skip, limit) {
  return await userDatabase
    .find(
      {},
      {
        __v: 0,
      }
    )
    .populate("role")
    .populate("kost")
    .skip(skip)
    .limit(limit);
}

export async function getUserWithFilter(param) {
  console.log(param);
  return await userDatabase.find(
    {
      role: param,
    },
    {
      __v: 0,
    }
  );
}

async function getLatestUser() {
  const latestUser = await userDatabase.findOne().sort("-userid");
  if (!latestUser) {
    return DEFAULT_USERID;
  }
  return latestUser._id;
}

export async function setNewUser(user) {
  if (user._id != undefined) {
    console.log("ke update");
    const newUser = Object.assign(user, {});
    await saveUser(newUser);
  } else {
    const newUser = Object.assign(user, {
      _id: new mongoose.Types.ObjectId(),
    });
    await saveUser(newUser);
  }
}

export async function existUserWithId(userId) {
  console.log(userId);
  return await userDatabase.find({
    _id: userId,
  });
}

export async function deleteUserWithId(userId) {
  const abort = await userDatabase.deleteOne({
    _id: userId,
  });
  return abort.deletedCount === 1;
}

export async function getUserWithId(userId) {
  const user = await userDatabase
    .find({
      _id: userId,
    })
    .populate("role")
    .populate("kost");
  return user;
}
