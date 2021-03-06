import db from "../models/index";
import CRUDService from "../sevices/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  res.writeHead(301, { Location: "http://localhost:8080/get-crud" });
  res.end();
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log(data);
  res.render("displayCRUD.ejs", {
    data: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInforById(userId);
    console.log(userData);
    // res.send(`edit user with id : ${userId} `);
    if (userData.length !== 0) {
      return res.render("editCRUD.ejs", {
        user: userData,
      });
    } else {
      return res.send("user not found");
    }
  } else {
    return res.send("user not found url");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUserData(data);
  res.writeHead(301, { Location: "http://localhost:8080/get-crud" });
  res.end();
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  await CRUDService.deleteUserById(id);
  res.writeHead(301, { Location: "http://localhost:8080/get-crud" });
  res.end();
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
