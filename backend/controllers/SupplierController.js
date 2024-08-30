const Supplier = require('../models/Supplier');

//Supplire Registration
exports.addSupplierDetails = async (req, res) => {
    const {
        supplier_id,
        supplier_company,
        supplier_address,
        supplier_contact_person,
        supplier_contact_no,
        supplier_country,
        contract_start_date,
        contract_end_date,
        supplier_note
    } = req.body;

    try {
        let supplier = await Supplier.findOne({
            supplier_id
        });

        if (supplier) return res.status(400).json({ msg: 'Supplier is Already Exists' });

        // Create a new drug object and save it
        supplier = new Supplier({
            supplier_id,
            supplier_company,
            supplier_address,
            supplier_contact_person,
            supplier_contact_no,
            supplier_country,
            contract_start_date,
            contract_end_date,
            supplier_note
        });
        await supplier.save();
        return res.status(200).json({ msg: "Supplier Registered!" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to Registere Supplier. Internal Server error!");
    }
};

//Get Supplier List
exports.getAllSuppliers = async (req, res) => {
    try {
      const supplier = await Supplier.find();
      res.json(supplier);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Cannot Get Supplier List. Internal Server error!');
    }
  };


// Get Supplier Details by ID
exports.getSupplierDetails = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(400).json({ msg: "Supplier Not Found!" });
        }
        res.json(supplier);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Cannot Fetch Supplier, Internal Server error!');
    }
};


  //Update Supplier by ID
  exports.updateSupplierById = async (req, res) => {
    const {
        supplier_id,
        supplier_company,
        supplier_address,
        supplier_contact_person,
        supplier_contact_no,
        supplier_country,
        contract_start_date,
        contract_end_date,
        supplier_note
    } = req.body;

    try {
        let supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ msg: 'Supplier not found' });

        supplier.supplier_id = supplier_id || supplier.supplier_id;
        supplier.supplier_company = supplier_company || supplier.supplier_company;
        supplier.supplier_address = supplier_address || supplier.supplier_address;
        supplier.supplier_contact_person = supplier_contact_person || supplier.supplier_contact_person;
        supplier.supplier_contact_no = supplier_contact_no || supplier.supplier_contact_no;
        supplier.supplier_country = supplier_country || supplier.supplier_country;
        supplier.contract_start_date = contract_start_date || supplier.contract_start_date;
        supplier.contract_end_date = contract_end_date || supplier.contract_end_date;
        supplier.supplier_note = supplier_note || supplier.supplier_note;

        await supplier.save();
        res.json({"msg": "Supplier Updated Successfully"});
  
    } catch (error) {
        console.error(error.message);
      res.status(500).send('Supplier Update Failed. Internal Server error!');
    }
  };

  // Search Supplier
  exports.searchSupplier = async (req, res) => {
    const {
        supplier_id,
        supplier_company
    } = req.body;

    try {
        // Build the search query object
        let searchQuery = {};

        if (supplier_id) searchQuery.supplier_id = supplier_id;
        if (supplier_company) searchQuery.supplier_company = supplier_company;
        
        // Find drugs based on the search query
        const supplier = await Supplier.find(searchQuery);

        // If no drugs found
        if (supplier.length === 0) return res.status(400).json({ msg: "No Drug Found" });

        // Return the found drugs
        if (supplier)return res.status(200).json({ supplier });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};