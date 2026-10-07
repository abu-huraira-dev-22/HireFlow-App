const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");

const signupController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      role,
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
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User Not Found",
      });
      return
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password",password)
    console.log("User Password",user.password)
    console.log('Match',isMatch)
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: true,
      message: "User Login Successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { signupController, loginController };
