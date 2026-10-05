const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
    );
    // res.cookie('token',token)
    res.status(200).json({
      status: true,
      message: "User Signup Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
