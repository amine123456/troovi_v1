import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import { ItemForm } from './components/ItemForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';
import { ItemDetails } from './pages/ItemDetails';
import { ItemData } from './types/item';
import { supabase } from './lib/supabase';

function Home() {
  const [generatedData, setGeneratedData] = React.useState<ItemData | null>(null);

  const handleSubmit = async (data: ItemData) => {
    try {
      const { error } = await supabase.from('items').insert([{
        id: data.id,
        owner_name: data.ownerName,
        email: data.email,
        phone: data.phone,
        item_name: data.itemName,
        description: data.description
      }]);

      if (error) throw error;
      setGeneratedData(data);
    } catch (error) {
      console.error('فما مشكلة في الحفظ:', error);
      alert('فشلنا في حفظ العنصر. جرب مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <QrCode size={48} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            مولّد كودات كود كر للأشياء متاعك
          </h1>
          <p className="text-lg text-gray-600">
            اعمل كودات كود كر للأغراض القيمة متاعك باش الناس يعرفوها ويرجعوها إذا ضاعت.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                دخل معلوماتك
              </h2>
              <ItemForm onSubmit={handleSubmit} />
            </div>

            {generatedData && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  كود كر متاعك
                </h2>
                <QRCodeDisplay data={generatedData} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="text-center">
          <p>&copy; 2025 جميع الحقوق محفوظة</p>
          <p>مدعوم من <span className="font-semibold">تروفي</span></p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
