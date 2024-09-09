const express = require("express");
const app = express();
const dbConnect = require("./db/db");
const cors = require("cors");
const urlModel = require("./db/url.models");

dbConnect();

app.use(express.json());
app.use(cors());




app.get("/url", async (req, res) => {
  try {
    const urls = await urlModel.find();
    res.json(urls);
  } catch (error) {
    console.log(error);
  }
});


app.get('/url/:id', async (req, res) => {
  try {
    const { id } = req.params
    const singleUrl = await urlModel.findById(id)
    res.json(singleUrl)
  } catch(error) {
    console.log(error)
  }
})



app.post("/url", async (req, res) => {
  try {
    const {
      url,
      shortCode,
      createdAt,
      updatedAt = "",
      accessCount = 0,
    } = req.body;

    if (!url) throw new Error("Url is required");

    const newUrl = await urlModel.create({
      url,
      shortCode,
      createdAt,
      updatedAt,
      accessCount,
    });
    res.json(newUrl);
  } catch (error) {
    console.log(error);
  }
});



app.delete("/url/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Short Code nod found");
    const deletedUrl = await urlModel.findByIdAndDelete(id);
    res.json(deletedUrl);
  } catch (error) {
    console.log(error);
  }
});


app.put('/url/:urlToUpdateId', async (req, res) => {
  try {
    const { urlToUpdateId } = req.params
    const { urlToUpdate } = req.body
    if(!urlToUpdate) throw new Error("Url is required")
    const updatedUrl = await urlModel.findByIdAndUpdate(urlToUpdateId, urlToUpdate)
    res.json(updatedUrl)
  } catch(error) {
    console.log(error)
  }
})


app.get('/url/redirect/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!id) throw new Error("Short Code nod found");
    const redirectUrl = await urlModel.findById(id)
    redirectUrl.accessCount += 1
    await redirectUrl.save();
    res.json(redirectUrl)
  } catch(error) {
    console.log(error)
  }
})





app.listen(3003, () => {
  console.log("Server is running on port http://localhost:3003");
});
