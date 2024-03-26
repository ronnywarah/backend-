const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS globally for all routes
app.use(cors());

app.get("/", (req, res) => {
  // Your code for handling GET requests on "/"
});

app.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await collection.findOne({
            $or: [{ email: id }, { username: id }]
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Check if the identifier matches either email or username
        const user = await collection.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (user && user.password === password) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { username, email, phone, password, paymentStatus, connectedDevices, connectionStatus, networkSpeed, signalStrength, Amount, currentBalance, subscriptionStartDate, RemainingDays } = req.body;

    // Default values for networkDevices
    const defaultNetworkDevices = {
        name: "Default Name",
        paymentStatus: "Pending",
        connectedDevices: 0,
        connectionStatus: "Disconnected",
        networkSpeed: "20Mbps",
        signalStrength: "Strong",
        Amount: 0,
        currentBalance: 0,
        subscriptionStartDate: new Date(),
        RemainingDays: 0
    };

    const userData = {
        username: username,
        email: email,
        phone: phone,
        password: password,
        paymentStatus: paymentStatus,
        connectedDevices: connectedDevices,
        connectionStatus: connectionStatus,
        networkSpeed: networkSpeed,
        signalStrength: signalStrength,
        Amount: Amount,
        currentBalance: currentBalance,
        subscriptionStartDate: subscriptionStartDate,
        RemainingDays: RemainingDays
    };

    try {
        const checkEmail = await collection.findOne({ email: email });
        const checkPhone = await collection.findOne({ phone: phone });

        if (checkEmail) {
            res.json("exist");
        } else if (checkPhone) {
            res.json("phoneExist");
        } else {
            // If email and phone are unique, create a new user with default network device values
            await collection.create(userData);
            res.json("notexist");
        }
    } catch (e) {
        console.error("Error signing up user:", e);
        res.status(500).json("fail"); // Internal server error
    }
});



app.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    const userData = req.body;

    try {
        const user = await collection.findOneAndUpdate(
            { $or: [{ email: id }, { username: id }] }, // Find user by email or username
            { $set: userData }, // Update user data with the provided data
            { new: true } // Return the updated document
        );

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(8000, () => {
  console.log("port connected");
});
