/**
 * Jest Unit Testing
 * @author Zhufeng Qiu
 */

const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");
let db

let appRequest;
beforeAll(async () => {
  appRequest = request(app);
  await mongoose.disconnect();
  await mongoose.connect("mongodb+srv://zhufqiu:SmMep5trr6HbF9kJ@cluster0.ro356aj.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
  db = mongoose.connection;
  await db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

beforeAll(async () => {
  // await db.collection("beverage_review").deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("home page router", () => {
  test("get /", async () => {
    await appRequest.get('/').expect(200).then(res => {
      result = res.text;
      expect(result).toEqual(expect.stringContaining("head"));
      expect(result).toEqual(expect.stringContaining("body"));
      expect(result).toEqual(expect.stringContaining("onload"));
      expect(result).toEqual(expect.stringContaining("input_area"));
      expect(result).toEqual(expect.stringContaining("type_selector"));
      expect(result).toEqual(expect.stringContaining("write_button"));
      expect(result).toEqual(expect.stringContaining("total_rating"));
      expect(result).toEqual(expect.stringContaining("display_area"));
      expect(result).toEqual(expect.stringContaining("script"));
    }).catch((err) => {
      console.log(err);
    });
  });
  test("all type; post /", async () => {
    let data = {
      beverage_type: "all"
    };
    await appRequest.post("/").send(data).expect(200).then(res => {
      result = res.text;
      expect(result).toEqual(expect.stringContaining("input_area"));
      expect(result).toEqual(expect.stringContaining("type_selector"));
    });
  });
  test("milk type filter; post /", async () => {
    let data = {
      beverage_type: "Milk Tea"
    };
    await appRequest.post("/").send(data).expect(200).then(res => {
      result = res.text;
      expect(result).toEqual(expect.stringContaining("input_area"));
      expect(result).toEqual(expect.stringContaining("type_selector"));
    });
  });
});

describe("edit page router", () => {
  test("get /edit", async () => {
    await appRequest.get('/edit').expect(200).then(res => {
      result = res.text;
      expect(result).toEqual(expect.stringContaining("head"));
      expect(result).toEqual(expect.stringContaining("body"));
      expect(result).toEqual(expect.stringContaining("onload"));
      expect(result).toEqual(expect.stringContaining("form"));
      expect(result).toEqual(expect.stringContaining("mydiv"));
      expect(result).toEqual(expect.stringContaining("edit_form"));
      expect(result).toEqual(expect.stringContaining("beverage_name"));
      expect(result).toEqual(expect.stringContaining("beverage_type"));
      expect(result).toEqual(expect.stringContaining("beverage_rate"));
      expect(result).toEqual(expect.stringContaining("beverage_img"));
      expect(result).toEqual(expect.stringContaining("image_preview"));
      expect(result).toEqual(expect.stringContaining("review_text"));
      expect(result).toEqual(expect.stringContaining("input-fields"));
      expect(result).toEqual(expect.stringContaining("review_text"));
      expect(result).toEqual(expect.stringContaining("submit"));
    }).catch((err) => {
      console.log(err);
    });
  });
  test("post /edit", async () => {
    let data = {
      user_name: "test_user",
      user_email: "test_email@test.com",
      beverage_name: "Boba Milk Tea",
      beverage_type: "Milk Tea",
      beverage_img: "",
      beverage_rate: 3,
      review_text: "--",
      review_id: 1
    };
    await appRequest.post("/edit").send(data).expect(302).then(res => {
      result = res.text;
      expect(result).toEqual("Found. Redirecting to /");
    });
  });
});

describe("display page router", () => {
  test("post /display", async () => {
    let data = {
      current_user_name: "test_user",
      current_user_email: "test@test.com",
      user_name: "test_user",
      user_email: "test@test.com",
      review_id: "1",
      beverage_name: "Boba Milk Tea",
      beverage_type: "Milk Tea",
      beverage_img: "",
      beverage_rate: 5,
      beverage_text: "--"
    }
    await appRequest.post('/display').send(data).expect(200).then(res => {
      result = res.text;
      expect(result).toEqual(expect.stringContaining("head"));
      expect(result).toEqual(expect.stringContaining("body"));
      expect(result).toEqual(expect.stringContaining("onload"));
      expect(result).toEqual(expect.stringContaining("form"));
      expect(result).toEqual(expect.stringContaining("display_card"));
      expect(result).toEqual(expect.stringContaining("edit_check"));
    }).catch((err) => {
      console.log(err);
    });
  });
  test("post /modify", async () => {
    let data = {
      user_name: "test_user",
      user_email: "test_email@test.com",
      beverage_name: "Boba Milk Tea",
      beverage_type: "Milk Tea",
      beverage_img: "",
      beverage_rate: 3,
      review_text: "--",
      review_id: "65518fa2e073cbb54368522d"
    };
    await appRequest.post("/modify").send(data).expect(302).then(res => {
      result = res.text;
      expect(result).toEqual("Found. Redirecting to /");
    });
  });
});