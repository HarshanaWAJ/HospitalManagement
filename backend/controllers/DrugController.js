const Drug = require('../models/Drug');

// Add Drugs
exports.addDrugDetails = async (req, res) => {
    const {
        commercial_name,
        generic_name,
        brand,
        ingredients,
        form,
        description,
        amount,
        cost_per_unit,
        sell_price_per_unit,
        manufacture_date,
        expiry_date,
        supplier_id
    } = req.body;

    try {
        let drug = await Drug.findOne({
            commercial_name,
            supplier_id
        });

        if (drug) return res.status(400).json({ msg: 'Drug already exists with the same commercial name and supplier' });

        // Create a new drug object and save it
        drug = new Drug({
            commercial_name,
            generic_name,
            brand,
            ingredients,
            form,
            description,
            amount,
            cost_per_unit,
            sell_price_per_unit,
            manufacture_date,
            expiry_date,
            supplier_id
        });
        await drug.save();
        return res.status(200).json({ msg: "Drug Added Successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

//Get Drugs List
exports.getAllDrugs = async (req, res) => {
    try {
      const users = await Drug.find();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Cannot Get Drug List. Internal Server error!');
    }
  };

  //Get Drug Details by ID
exports.getDrugDetails = async (req, res) => {
    try {
      const user = await Drug.findById(req.params.id);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Cannot Fetch Drug, Internal Server error!');
    }
  };

  //Update User by ID
exports.updateDrug = async (req, res) => {
    const { 
        commercial_name,
        generic_name,
        brand,
        ingredients,
        form,
        description,
        amount,
        cost_per_unit,
        sell_price_per_unit,
        manufacture_date,
        expiry_date,
        supplier_id
    } = req.body;
    try {
      let drug = await Drug.findById(req.params.id);
      if (!drug) return res.status(404).json({ msg: 'Drug not found' });
  
      drug.commercial_name = commercial_name || drug.commercial_name;
      drug.generic_name = generic_name || drug.generic_name;
      drug.brand = brand || drug.brand;
      drug.ingredients = ingredients || drug.ingredients;
      drug.form = form || drug.form;
      drug.description = description || drug.description;
      drug.amount = amount || drug.amount;
      drug.cost_per_unit = cost_per_unit || drug.cost_per_unit;
      drug.sell_price_per_unit = sell_price_per_unit || drug.sell_price_per_unit;
      drug.manufacture_date = manufacture_date || drug.manufacture_date;
      drug.expiry_date = expiry_date || drug.expiry_date;
      drug.supplier_id = supplier_id || drug.supplier_id;
     
      await drug.save();
      res.json({"msg": "Drug Updated Successfully"});
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Drug Update Failed. Internal Server error!');
    }
  };

  // Search Drugs
  exports.searchDrugs = async (req, res) => {
      const {
          supplier_id,
          commercial_name,
          generic_name,
          brand
      } = req.body;
  
      try {
          // Build the search query object
          let searchQuery = {};
  
          if (supplier_id) searchQuery.supplier_id = supplier_id;
          if (commercial_name) searchQuery.commercial_name = commercial_name;
          if (generic_name) searchQuery.generic_name = generic_name;
          if (brand) searchQuery.brand = brand;
  
          // Find drugs based on the search query
          const drugs = await Drug.find(searchQuery);

          // If no drugs found
          if (drugs.length === 0) return res.status(400).json({ msg: "No Drug Found" });

          // Return the found drugs
          if (drugs)return res.status(200).json({ drugs });
  
      } catch (error) {
          console.error(error.message);
          res.status(500).send('Server error');
      }
  };
  