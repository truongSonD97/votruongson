"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import resourceRoutes from './routes/resourceRoutes';
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
// Database connection
// const mongoUri = 'mongodb://localhost:27017/crude-server';
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));
// Routes
// app.use('/api/resources', resourceRoutes);
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
