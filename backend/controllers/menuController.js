
import Menu from "../models/Menu.js";

// 1. Add New Menu Item
export const addMenu = async (req, res) => {
  try {
    const { name, category, description, price, image, available } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category and price are required",
      });
    }

    const menu = await Menu.create({
      name,
      category,
      description,
      price,
      image,
      available,
    });

    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: menu,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// 2. Get All Menu Items
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 3. Update Menu Item
export const updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedMenu,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// 4. Delete Menu Item
export const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
