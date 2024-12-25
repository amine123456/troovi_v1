import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Loader2, Mail, Phone, Calendar, MapPin, 
  ArrowLeft, Clock 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ItemData } from '../types/item';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Button, Badge } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<ItemData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setItem(data);
      } catch (err) {
        setError('ما فماش هالشيء');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate('/');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">جاري تحميل تفاصيل العنصر...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <Alert className="max-w-lg shadow-lg">
          <AlertDescription>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">ما فماش هالشيء</h1>
              <p className="text-gray-600 mb-6">
                العنصر اللي قاعد تدور عليه ما عادش موجود أو تم حذفه.
              </p>
              <Button onClick={handleGoBack} variant="outline" className="shadow-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                رجوع للصفحة الرئيسية
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="group mb-4 hover:bg-white/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            رجوع للصفحة الرئيسية
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>آخر تحديث {formatDate(item.updatedAt || item.created_at)}</span>
          </div>
        </div>

        <Card className="shadow-lg border-gray-100">
          <CardHeader className="pb-4">
            <div className="space-y-4">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {item.itemName}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {item.category}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 border-2">
                  {item.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">معلومات التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">البريد الإلكتروني</p>
                      <a href={`mailto:${item.email}`} className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                        {item.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">رقم الهاتف</p>
                      <a href={`tel:${item.phone}`} className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                        {item.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">تفاصيل إضافية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-200">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">تاريخ الإنشاء</p>
                      <p className="text-gray-900 font-medium">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-200">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">الموقع</p>
                      <p className="text-gray-900 font-medium">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ItemDetails;
