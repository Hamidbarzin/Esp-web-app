// سرویس حمل و نقل

// گرفتن لیست محموله‌ها
export const getShipments = async () => {
    try {
      // در یک سناریوی واقعی این API call خواهد بود
      // const response = await api.get('/shipments');
      // return response.data;
      
      // برای نمونه، داده‌های ساختگی برمی‌گردانیم
      const shipments = [
        {
          id: 'SH-001',
          type: 'air',
          origin: 'تهران',
          destination: 'استانبول',
          status: 'در حال حمل',
          date: '1404/01/15',
          weight: '12 کیلوگرم',
          customer: 'شرکت الف'
        },
        {
          id: 'SH-002',
          type: 'sea',
          origin: 'بندرعباس',
          destination: 'دبی',
          status: 'تحویل شده',
          date: '1403/12/10',
          weight: '1500 کیلوگرم',
          customer: 'شرکت ب'
        },
        {
          id: 'SH-003',
          type: 'land',
          origin: 'مشهد',
          destination: 'تهران',
          status: 'در انتظار ارسال',
          date: '1404/01/20',
          weight: '45 کیلوگرم',
          customer: 'شرکت ج'
        }
      ];
      
      return shipments;
    } catch (error) {
      console.error('Error fetching shipments:', error);
      throw error;
    }
  };
  
  // ایجاد محموله جدید
  export const createShipment = async (shipmentData) => {
    try {
      // در یک سناریوی واقعی این API call خواهد بود
      // const response = await api.post('/shipments', shipmentData);
      // return response.data;
      
      // برای نمونه، یک شناسه ساختگی برمی‌گردانیم
      const newShipment = {
        id: `SH-${Math.floor(Math.random() * 1000)}`,
        ...shipmentData,
        date: new Date().toLocaleDateString('fa-IR'),
        status: 'در انتظار ارسال'
      };
      
      return newShipment;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  };
  
  // محاسبه هزینه حمل و نقل
  export const calculateShipping = (originCountry, destinationCountry, weight, type) => {
    // نرخ‌های پایه برای هر نوع حمل و نقل (تومان بر کیلوگرم)
    const baseRates = {
      air: 750000,    // هوایی
      sea: 150000,    // دریایی
      land: 50000     // زمینی
    };
    
    // ضرایب کشورها (تقریبی)
    const countryFactors = {
      'ایران': 1,
      'ترکیه': 1.2,
      'امارات': 1.3,
      'چین': 1.8,
      'آلمان': 2.0,
      'آمریکا': 2.5,
      'انگلستان': 2.2,
      'روسیه': 1.5,
      'عراق': 1.1,
      'قطر': 1.4
    };
    
    // محاسبه بر اساس فرمول: نرخ پایه × وزن × ضریب مبدا × ضریب مقصد
    const originFactor = countryFactors[originCountry] || 1.5;
    const destFactor = countryFactors[destinationCountry] || 1.5;
    const baseRate = baseRates[type] || baseRates.land;
    
    // محاسبه هزینه نهایی
    const cost = baseRate * weight * originFactor * destFactor;
    
    // زمان تخمینی تحویل (روز)
    const estimatedTimes = {
      air: { min: 2, max: 5 },
      sea: { min: 15, max: 30 },
      land: { min: 3, max: 10 }
    };
    
    const time = estimatedTimes[type] || estimatedTimes.land;
    
    const result = {
      cost: Math.round(cost),
      formattedCost: new Intl.NumberFormat('fa-IR').format(Math.round(cost)) + ' تومان',
      estimatedDelivery: `${time.min} تا ${time.max} روز`
    };
    
    return result;
  };
  
  // پیگیری کد رهگیری
  export const trackShipment = async (trackingNumber) => {
    try {
      // در یک سناریوی واقعی این API call خواهد بود
      // const response = await api.get(`/shipments/track/${trackingNumber}`);
      // return response.data;
      
      // برای نمونه، یک نتیجه ساختگی برمی‌گردانیم
      const mockStatuses = [
        'سفارش ثبت شده',
        'در انتظار پردازش',
        'آماده ارسال',
        'تحویل به شرکت حمل و نقل',
        'در حال حمل',
        'رسیده به مقصد',
        'تحویل به گیرنده'
      ];
      
      // وضعیت‌های تصادفی برای شبیه‌سازی
      const randomStatusIndex = Math.floor(Math.random() * 5) + 1; // حداکثر تا 5 مرحله پیش می‌رود
      
      const trackingHistory = [];
      const today = new Date();
      
      for (let i = 0; i <= randomStatusIndex; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (randomStatusIndex - i) * 2);
        
        trackingHistory.push({
          status: mockStatuses[i],
          date: date.toLocaleDateString('fa-IR'),
          time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
          location: i === 0 ? 'تهران، ایران' : i === randomStatusIndex ? 'استانبول، ترکیه' : 'در مسیر'
        });
      }
      
      const trackingResult = {
        trackingNumber,
        currentStatus: mockStatuses[randomStatusIndex],
        origin: 'تهران، ایران',
        destination: 'استانبول، ترکیه',
        estimatedDelivery: new Date(today.setDate(today.getDate() + 5)).toLocaleDateString('fa-IR'),
        history: trackingHistory
      };
      
      return trackingResult;
    } catch (error) {
      console.error('Error tracking shipment:', error);
      throw error;
    }
  };