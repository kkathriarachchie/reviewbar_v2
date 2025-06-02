"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
router.post("/add-review/:upc", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { upc } = req.params;
        const reviewData = req.body;
        let product = yield Product_1.default.findOne({ upc });
        if (!product) {
            product = new Product_1.default({ upc, reviews: [] });
        }
        product.reviews.push(reviewData);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
{
    /*
    router.get("/reviews/:upc", async (req: Request, res: Response) => {
    try {
      const { upc } = req.params;
      const product = await Product.findOne({ upc });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
    
    */
}
exports.default = router;
