// ApiResponse, tüm API yanıtlarını standardize etmek için kullanılan bir arayüzdür.
// Yanıtın başarı durumu, mesajı, veri, hata bilgileri, sayfalama bilgileri gibi çeşitli alanları içerir.
export interface ApiResponse<T> {
  success: boolean; // Yanıtın başarılı olup olmadığını belirten durum (true/false)
  message: string; // Yanıtla birlikte döndürülen mesaj
  data?: T; // Yanıtın verisi (Opsiyonel, eğer başarı durumunda veri varsa döner)
  error?: {
    // Eğer bir hata oluşmuşsa, hata bilgileri
    code: string; // Hata kodu (örneğin, "INVALID_INPUT")
    message: string; // Hata mesajı
    details?: string; // Hata ile ilgili ek bilgiler (opsiyonel)
    category?: 'validation' | 'authentication' | 'authorization' | 'system'; // Hata kategorisi (hangi türde bir hata olduğu)
    internalMessages?: string[]; // Sadece geliştiriciler için iç mesajlar (hata ayıklama amacıyla)
  };
  pagination?: {
    // Eğer veri bir sayfalanmış liste ise, sayfalama bilgileri
    total: number; // Toplam öğe sayısı
    page: number; // Geçerli sayfa numarası
    pageSize: number; // Sayfada kaç öğe olduğu
    totalPages: number; // Toplam sayfa sayısı
  };
  warnings?: string[]; // Varsayılan uyarılar (isteğe bağlı)
  timestamp: string; // Yanıtın gönderildiği zamanın damgası (ISO formatında)
  statusCode: number; // HTTP durum kodu (örneğin, 200, 400, 500, vb.)
  meta?: {
    // Yanıtla ilgili ek meta veriler (isteğe bağlı)
    processingTime: number; // İşleme süresi (ms olarak)
    dataType?: string; // Verinin türü (örneğin, JSON, XML, vb.)
  };
  contentType?: string; // Yanıtın içerik tipi (örneğin, "application/json")
}

// response fonksiyonu, API yanıtlarını daha tutarlı hale getirmek için kullanılan yardımcı fonksiyondur.
// Belirli bir başarı durumu, mesaj ve diğer meta veriler ile birlikte bir yanıt objesi döner.
export const response = <T>(
  success: boolean, // Yanıtın başarılı olup olmadığı
  message: string, // Yanıt mesajı
  statusCode: number, // HTTP durum kodu
  data?: T, // Yanıtın veri kısmı (isteğe bağlı)
  error?: {
    code: string;
    message: string;
    details?: string;
    category?: 'validation' | 'authentication' | 'authorization' | 'system';
  internalMessages?: string[], // İç mesajlar (isteğe bağlı)

  }, // Hata bilgileri (isteğe bağlı)
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }, // Sayfalama bilgileri (isteğe bağlı)
  warnings?: string[], // Varsayılan uyarılar (isteğe bağlı)
  meta?: { processingTime: number; dataType?: string }, // Meta veriler (isteğe bağlı)
  contentType?: string // Yanıtın içerik tipi (isteğe bağlı)
): ApiResponse<T> => {
  // Fonksiyon, ApiResponse tipinde bir nesne döner
  return {
    success, // Başarı durumu
    message, // Mesaj
    statusCode, // HTTP durum kodu
    data, // Veri (isteğe bağlı)
    error, // Hata bilgisi (isteğe bağlı)
    pagination, // Sayfalama bilgisi (isteğe bağlı)
    warnings, // Uyarılar (isteğe bağlı)
    timestamp: new Date().toISOString(), // Yanıtın zaman damgası (ISO formatında)
    meta, // Meta bilgiler (isteğe bağlı)
    contentType: contentType || 'application/json' // Varsayılan içerik tipi (JSON olarak ayarlanmış)
  };
};
