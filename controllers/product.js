const Product = require('../model/product');
const server = require('../server');

/**
 * Fetch all products and send it back
 * @param request
 * @param response
 */
module.exports.index = async function(request, response) {
  const products = await Product.find({}).sort({_id: -1});
  return response.json(products);
};

module.exports.create = async function (request, response) {
  const newProduct = request.body;
  await Product.create({
    ...newProduct,
    isOK: false,
  });
  return response.json("Created!");
};

module.exports.delete = async function (request, response) {
  const {_id} = request.body;
  await Product.findByIdAndDelete(_id);
  return response.json("Deleted!");
};

module.exports.updateCheckStatus = async function (request, response) {
  const {_id, isOK} = request.body;
  const product = await Product.findById(_id);
  product.isOK = isOK;
  await product.save();
  return response.json("Checked!");
};

module.exports.deleteAll = async function (request, response) {
  await Product.deleteMany({});
  return response.json("All deleted");
};

module.exports.uncheckAll = async function (request, response) {
  await Product.updateMany({}, {$set: {isOK: false}});
  return response.json("All unchecked");
};