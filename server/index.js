const express = require("express");
const isUrlValid = require("url-validation");
const { getLinkPreview } = require("link-preview-js");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (isUrlValid(url)) {
    try {
      const metadata = await getLinkPreview(url);
      const finalJSON = {
        title:
          metadata.title || url.replace(/.+\/\/|www.|\..+/g, "").toUpperCase(),
        image:
          metadata.images[0] ||
          metadata.favicons[0] ||
          "https://yourlawnwise.com/wp-content/uploads/2017/08/photo-placeholder.png",
        url: metadata.url,
        description: metadata.description,
      };
      res.status(200).json(finalJSON);
    } catch (err) {
      res.status(404).json({ message: "Error 404 Not Found" });
    }
  } else {
    res.status(400).json({ message: "URL is invalid" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("server started at port", PORT));
