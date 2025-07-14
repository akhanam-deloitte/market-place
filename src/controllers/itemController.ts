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
      userId: (req as any)?.user?.id
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
      maxPrice,
      userId
    } = req.query;

    const where: any = {};
    if(userId) {
      where.userId = userId;
    }

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

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const item = await Item.findByPk(id);

    if (!item) res.status(404).json({ message: 'Item not found' });

    if ((item as any)?.userId !== req.user?.id) {
      res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedFields: any = { name, description, price };
    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    await item?.update(updatedFields);

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err });
  }
};

// controllers/itemController.ts
export const deleteItem = async (req: Request, res: Response) : Promise<void> =>  {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) res.status(404).json({ message: 'Item not found' });

    if ((item as any)?.userId !== req.user?.id) {
      res.status(403).json({ message: 'Unauthorized' });
    }

    await item?.destroy();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err });
  }
};

