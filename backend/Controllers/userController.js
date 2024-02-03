const userSchema = require('../models/userSchema');
const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');

const updateUserData = async (req, res) => {
  try {
    console.log(req.body);
    const updatedUser = await userSchema.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(200).json({ message: 'Information Updated Successfully!' })
  } catch (error) {
    console.log(error);
  }
}
const downloadFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads/', req.params.filePath);
    console.log(filePath);
    res.download(filePath);
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: 'File not found on the server' });
  }
}
const previewFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads/', req.params.filePath);
    console.log(filePath);
    res.set({
      'Content-Type': mimeTypes.contentType(filePath)
    });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: 'File not found on the server' });
  }
}

const uploadFiles = async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.params.userId);
    const dirPath = path.join(__dirname, '../');
    const userData = await userSchema.findById(req.params.userId);
    if (req.files['adharCard']) {
      fs.unlink(dirPath + userData?.adharCard, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.adharCard = req.files['adharCard'][0].path;
    }
    if (req.files['panCard']) {
      fs.unlink(dirPath + userData?.panCard, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.panCard = req.files['panCard'][0].path;
    }
    if (req.files['drivingLicense']) {
      fs.unlink(dirPath + userData?.drivingLicense, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.drivingLicense = req.files['drivingLicense'][0].path;
    }
    if (req.files['voterID']) {
      fs.unlink(dirPath + userData?.voterID, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.voterID = req.files['voterID'][0].path;
    }
    if (req.files['pasport']) {
      fs.unlink(dirPath + userData?.passport, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.passport = req.files['passport'][0].path;
    }
    if (req.files['photo']) {
      fs.unlink(dirPath + userData?.photo, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.photo = req.files['photo'][0].path;
    }
    if (req.files['signature']) {
      fs.unlink(dirPath + userData?.signature, (err) => {
        if (err) {
          console.error(err); // Handle any errors
        } else {
          console.log('File deleted successfully!');
        }
      })
      userData.signature = req.files['signature'][0].path;
    }
    console.log(userData);
    await userData.save();
    res.status(200).json({ message: 'Files saved!' })
  } catch (error) {
    console.log(error);
  }
}

const RegisterPostRequest = async (req, res) => {
  try {
    if (!req.body.data) {
      const { firstName, lastName, email, phoneNo, password, rollSelect } =
        req.body;
      const existEmail = await userSchema.findOne({ email: email });
      if (existEmail) {
        res.status(200).json({
          message: 'user is already exists',
          existEmail: { existEmail },
          User: {
            firstName: existEmail.firstName,
            lastName: existEmail.lastName,
            email: existEmail.email,
            rollSelect: existEmail.rollSelect,
            _id: existEmail._id,
          },
        });
      } else if (existEmail === null) {
        const user = await userSchema({
          firstName,
          lastName: lastName,
          email: email,
          phoneNo: phoneNo,
          password: password,
          rollSelect: rollSelect,
        });
        res.status(200).json({
          message: 'You are Registered Successfully',
          User: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rollSelect: user.rollSelect,
            _id: user._id,
          },
        });

        await user.save();
      }
    } else {
      const email = await userSchema.findOne({ email: req.body.data });
      res.status(200).json({
        result: 'true',
        message: 'user already exists',
        User: {
          firstName: email.firstName,
          lastName: email.lastName,
          email: email.email,
          rollSelect: email.rollSelect,
          _id: email._id,
        },
      });
    }
  } catch (error) {
    res.status(404).json('Invalid Credentials');
  }
};

const SignInPostRequest = async (req, res) => {
  try {
    const loginUser = await userSchema.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(loginUser);
    if (loginUser) {
      res
        .status(200)
        .json({ message: 'Login Successfully', User: loginUser });
    } else {
      res.status(404).json({ message: 'Invalid Credentials' });
    }

  } catch (error) {
    console.log(error);
    res.status(404).json('invalid Credentials');
  }
};
const verifyEmail = async (req, res) => {
  try {
    const email = await userSchema.findOne({ email: req.body.email });
    if (email) {
      res.status(200).json('Your Email IS Verified');
    } else {
      res.status(404).json('Your Email is not Exists');
    }
  } catch (error) {
    res.status(404).json('Your Email is not exists');
  }
};
const newPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const id = req.params.id;
    const updatedData = await userSchema.findOneAndUpdate(
      { email: email },
      {
        email: email,
        password: password,
      }
    );
    if (updatedData) {
      res.status(200).json(updatedData);
    }
  } catch (error) {
    res.status(400).json('not Updated');
  }
};
const getExistEmail = async (req, res) => {
  try {
    const email = await userSchema.findOne({ email: req.body.data });
  } catch (error) { }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find({});
    res.json({ users })
  } catch (error) {
    console.log("error")
  }
};
const getEditors = async (req, res) => {
  try {
    const editors = await userSchema.find({ rollSelect: 'Editor' });
    res.json({ editors })
    console.log('gone');
  } catch (error) {
    console.log("error")
  }
};


module.exports = {
  RegisterPostRequest,
  SignInPostRequest,
  verifyEmail,
  newPassword,
  getExistEmail,
  getAllUsers,
  getEditors,
  uploadFiles,
  downloadFile,
  previewFile,
  updateUserData
};
