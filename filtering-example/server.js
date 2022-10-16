"use strict";
var express = require("express"),
  fs = require("fs"),
  app = express(),
  customers = JSON.parse(fs.readFileSync("data/customers.json", "utf-8")),
  inContainer = process.env.CONTAINER,
  inAzure = process.env.WEBSITE_RESOURCE_GROUP,
  port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, X-InlineCount, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

//The dist folder has our static resources (index.html, css, images)
if (!inContainer) {
  app.use(express.static(__dirname + "/dist/filtering-example"));
  console.log(__dirname);
}

app.get("/api/customers", (req, res) => {
  const currentPage = req.query["Metadata.CurrentPage"];
  const pageSize = req.query["Metadata.PageSize"];
  const filterQ = req.query["Filtering"];

  const firstNameFilter = filterQ?.firstName;

  console.log(req.query);
  console.dir('filtering: ' + filterQ?.firstName);
  console.log('firstNAme: ' + firstNameFilter);

  let data = customers;
  console.log("start from :" + (currentPage - 1) * pageSize);



  if (firstNameFilter) {
    data = data.filter(x => x.firstName.indexOf(firstNameFilter) > -1);

  }
  const totalCount = data.length;

  data = data.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);

  const meta = new MetaPagination(totalCount, pageSize, currentPage);

  res.json({ metadata: meta, items: data });
});

if (!inContainer) {
  // redirect all others to the index (HTML5 history)
  app.all("/*", function (req, res) {
    res.sendFile(__dirname + "/dist/filtering-example/index.html");
  });
}

app.listen(port);

console.log("Express listening on port " + port);


class MetaPagination {
  constructor(totalCount, pageSize, currentPage) {
    this.totalCount = totalCount;
    this.pageSize = +pageSize;
    this.currentPage = +currentPage;

    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.hasNext = this.currentPage < this.totalPages;
    this.hasPrevious = this.currentPage > 1;
  }
}
