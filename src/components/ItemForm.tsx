import React from 'react';
import { ItemData } from '../types/item';
import { generateItemId } from '../utils/urlGenerator';

interface ItemFormProps {
  onSubmit: (data: ItemData) => void;
}

export function ItemForm({ onSubmit }: ItemFormProps) {
  const [formData, setFormData] = React.useState<Omit<ItemData, 'id'>>({
    ownerName: '',
    email: '',
    phone: '',
    itemName: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: ItemData = {
      ...formData,
      id: generateItemId(),
    };
    onSubmit(itemData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
          اسم صاحب الحاجة
        </label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
          value={formData.ownerName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          الإيميل
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          رقم الهاتف
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
          اسم الحاجة
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
          value={formData.itemName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        اوصف المكان و اعطي اي معلومة
        </label>
        <textarea
          id="description"
          name="description"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        إعمل كود كر 
      </button>
    </form>
  );
}
