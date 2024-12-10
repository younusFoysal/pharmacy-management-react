import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import salesRoutes from './routes/sales.js';
// import purchasesRoutes from './routes/purchases.js';
// import supplierRoutes from './routes/suppliers.js';
// import customerRoutes from './routes/customers.js';

dotenv.config();

const app = express();
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
  ]
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
// app.use('/api/purchases', purchasesRoutes);
// app.use('/api/suppliers', supplierRoutes);
// app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});