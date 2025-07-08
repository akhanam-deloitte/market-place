import { Request, Response } from "express";
import { Item } from "../models";
import { Op } from "sequelize";

export const addItem = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  try {
    const newItem = await Item.create({
      name,
      description,
      price: Number(price),
      image: req.file?.filename,
      userId: (req as any)?.user.id
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to add item", error });
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      sortBy = 'createdAt',
      order = 'desc',
      minPrice,
      maxPrice
    } = req.query;

    // Build where clause
    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    const items = await Item.findAll({
      where,
      order: [[String(sortBy), String(order).toUpperCase()]]
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to filter items', error: err });
  }
};
