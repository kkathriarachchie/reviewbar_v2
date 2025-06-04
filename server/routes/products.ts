//router/products.ts
import express, { Request, Response } from "express";
import Product, { IReview } from "../models/Product";

const router = express.Router();

interface AddReviewRequest extends Request {
  body: IReview;
  params: {
    upc: string;
  };
}

router.post(
  "/add-review/:upc",
  async (req: AddReviewRequest, res: Response) => {
    try {
      const { upc } = req.params;
      const reviewData: IReview = req.body;

      let product = await Product.findOne({ upc });
      if (!product) {
        product = new Product({ upc, reviews: [] });
      }

      product.reviews.push(reviewData);
      await product.save();

      res.status(201).json(product);
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

router.get(
  "/reviews/:upc",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { upc } = req.params;
      const product = await Product.findOne({ upc });

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.json(product.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
