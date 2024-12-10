import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: String,
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'paid'
  }
}, {
  timestamps: true
});

// Generate invoice number before saving
saleSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.invoiceNumber = `INV${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Sale', saleSchema);