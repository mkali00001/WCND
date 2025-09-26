import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, DollarSign } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Modal component for creating/editing categories
const CategoryModal = ({ category, onClose, onSave }) => {
  const [form, setForm] = useState(
    category || { type: 'Domestic', feeINR: 0, feeUSD: 0 }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">
            {category ? 'Edit' : 'Add'} Payment Category
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {!category && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                >
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fee (INR)</label>
              <input
                type="number"
                min={0}
                name="feeINR"
                value={form.feeINR}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fee (USD)</label>
              <input
                type="number"
                min={0}
                name="feeUSD"
                value={form.feeUSD}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t rounded-b-xl flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/admin/paymentcategory`,
        { withCredentials: true }
      );

      // Ensure categories is always an array
      const data = res.data.data;
      console.log(data);
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create or update category
  const handleSave = async (categoryData) => {
    try {
      if (categoryData._id) {
        // PATCH update
        const res = await axios.patch(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/admin/updatepaymentcategory/${categoryData._id}`,
          categoryData,
          { withCredentials: true }
        );
        const updatedCategory = res.data?.data || res.data;
        setCategories((prev) =>
          prev.map((c) => (c._id === updatedCategory._id ? updatedCategory : c))
        );
        toast.success("Category updated!");
      } else {
        // POST create
        const res = await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/admin/createpaymentcategory`,
          categoryData,
          { withCredentials: true }
        );
        const newCategory = res.data?.data || res.data;
        setCategories((prev) => [...prev, newCategory]);
        toast.success("Category created!");
      }
      setModalOpen(false);
      setEditingCategory(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save category.");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/admin/deletepaymentcategory/${id}`,
        { withCredentials: true }
      );
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("Category deleted.");
    } catch (err) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="p-6">
      {modalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => { setModalOpen(false); setEditingCategory(null); }}
          onSave={handleSave}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><DollarSign size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payment Categories</h1>
            <p className="text-sm text-slate-600">Manage registration fee categories</p>
          </div>
        </div>
        <button
          onClick={() => { setEditingCategory(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase">Fee (INR)</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase">Fee (USD)</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">{cat.type}</td>
                    <td className="px-6 py-4">{cat.feeINR?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">{cat.feeUSD?.toLocaleString('en-US')}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => { setEditingCategory(cat); setModalOpen(true); }}
                        className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentCategories;
