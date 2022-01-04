const Product = require('../model/product');
const server = require('../server');
const io = server.io;

/**
 * Fetch all products and send it back
 * @param request
 * @param response
 */
module.exports.index = async function(request, response) {
  const products = await Product.find({});
  return response.json(products);
};

module.exports.create = async function (request, response) {
  const newProduct = request.body;
  await Product.create({
    ...newProduct,
    isOK: false,
  });
  io.emit("articles list updated");
  return response.json("Created!");
};

module.exports.delete = async function (request, response) {
  const {_id} = request.body;
  await Product.findByIdAndDelete(_id);
  io.emit("articles list updated");
  return response.json("Deleted!");
};

module.exports.updateCheckStatus = async function (request, response) {
  const {_id, isOK} = request.body;
  const product = await Product.findById(_id);
  product.isOK = isOK;
  await product.save();
  io.emit("articles list updated");
  return response.json("Checked!");
};

module.exports.deleteAll = async function (request, response) {
  await Product.deleteMany({});
  io.emit("articles list updated");
  return response.json("All deleted");
};

module.exports.uncheckAll = async function (request, response) {
  await Product.updateMany({}, {$set: {isOK: false}});
  io.emit("articles list updated");
  return response.json("All unchecked");
};