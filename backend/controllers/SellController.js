const Sell = require('../models/Sell');

exports.addSell = async (req, res) => {
    const {
        patient_name,
        bill_id,
        items,
        quantity,
        prices,
        bill_date
    } = req.body;

    try {
        let sell = await Sell.findOne({ bill_id });
        if (sell) return res.status(400).json({ msg: "Bill already exists!" });

        // Calculate the total price based on the quantity and prices arrays
        let total_price = 0;
        for (let i = 0; i < quantity.length; i++) {
            total_price += quantity[i] * prices[i];
        }

        // Create new sell object
        sell = new Sell({
            patient_name,
            bill_id,
            items,
            quantity,
            prices,
            bill_date,
            total_price
        });

        // Save to the database
        await sell.save();
        return res.status(200).json({ msg: "Bill added successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

exports.getAllSells = async (req, res) => {
    try {
        const sellsDetails = await Sell.find();
        res.json(sellsDetails);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Cannot Get Sells Details. Internal Server error!');
      }
}