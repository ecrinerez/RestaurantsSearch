const RAW_DATA = [
  { name: "Burger King", cuisines: ["Burger", "Fast Food"], image: "https://cdn.tgoapps.com/mnresize/640/-/tgo2/spm/prod/grocery/media/images/seller/170405/55490d52-c1c1-4ee6-8738-5b2adddcbdf4_1741849034529_org.jpeg" },
  { name: "McDonald's", cuisines: ["Burger", "Fast Food"], image: "https://cdn.tgoapps.com/mnresize/640/-/orangeprod149/dwRpzMgEDhzRDfiY.jpeg" },
  { name: "Popeyes", cuisines: ["Chicken", "Burger", "Fast Food"], image: "https://cdn.tgoapps.com/mnresize/750/-/orangeprod150/rXYiPHYpcFiRUBGJ.jpeg" },
  { name: "Bereket Döner", cuisines: ["Doner"], image: "https://images.unsplash.com/photo-1662116219154-13175788485c?q=80&w=600" },
  { name: "Hey Döner", cuisines: ["Doner"], image: "https://images.unsplash.com/photo-1644158428414-94576302526e?q=80&w=600" },
  { name: "Domino's Pizza", cuisines: ["Pizza"], image: "https://images.unsplash.com/photo-1593560704563-f176a2eb61db?q=80&w=600" },
  { name: "Pizza Bulls", cuisines: ["Pizza"], image: "https://images.unsplash.com/photo-1618365691062-a25e98947f6f?q=80&w=600" },
  { name: "Esto Lahmacun", cuisines: ["Pide & Lahmacun"], image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600" },
  { name: "Oses Çiğ Köfte", cuisines: ["Cig Kofte"], image: "https://images.unsplash.com/photo-1632733737568-d051f654b42b?q=80&w=600" },
  { name: "Midyeci Ahmet", cuisines: ["Street Food", "Seafood"], image: "https://images.unsplash.com/photo-1621260799981-d18b62886e9e?q=80&w=600" },
  { name: "Mr.Kumpir", cuisines: ["Street Food"], image: "https://images.unsplash.com/photo-1513267048331-5611cad27a41?q=80&w=600" },
  { name: "Ekleristan", cuisines: ["Dessert"], image: "https://images.unsplash.com/photo-1558326567-98ae2d43f064?q=80&w=600" },
  { name: "Always Waffle", cuisines: ["Dessert"], image: "https://images.unsplash.com/photo-1506458959157-965f5c17b8d9?q=80&w=600" },
  { name: "Green Salad", cuisines: ["Chicken", "Salad & Healthy"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600" },
  { name: "Tavuk Dünyası", cuisines: ["Chicken"], image: "https://images.unsplash.com/photo-1616781604928-87a2249c30f3?q=80&w=600" },
  { name: "Balkon Cafe & Restaurant", cuisines: ["Home Cooking", "World Cuisine"], image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600" },
  { name: "Köfteci Yusuf", cuisines: ["Meatball", "Burger", "Steak"], image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?q=80&w=600" },
  { name: "Suat Usta Mersin Tantuni", cuisines: ["Tantuni"], image: "https://images.unsplash.com/photo-1618797960309-807e382b01a8?q=80&w=600" },
  { name: "Sinop Mantı", cuisines: ["Manti & Pasta"], image: "https://images.unsplash.com/photo-1628191140046-e56c5a31519d?q=80&w=600" },
  { name: "HD İskender", cuisines: ["Kebab"], image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600" },
  { name: "Subway", cuisines: ["Toast & Sandwich"], image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=600" },
  { name: "Goralı", cuisines: ["Toast & Sandwich", "Street Food"], image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=600" },
  { name: "Tarihi Haliç İşkembecisi", cuisines: ["Soup"], image: "https://images.unsplash.com/photo-1616781604928-87a2249c30f3?q=80&w=600" },
  { name: "Karaköy Çorbacısı", cuisines: ["Soup"], image: "https://images.unsplash.com/photo-1616781604928-87a2249c30f3?q=80&w=600" },
  { name: "Pelit Pastanesi", cuisines: ["Bakery & Pastry", "Dessert"], image: "https://images.unsplash.com/photo-1558326567-98ae2d43f064?q=80&w=600" },
  { name: "Starbucks", cuisines: ["Coffee & Beverages", "Dessert"], image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=600" },
  { name: "Tarihi Karaköy Balıkçısı", cuisines: ["Seafood"], image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600" },
  { name: "Sur Balık", cuisines: ["Seafood"], image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600" },
  { name: "Sushi Inn", cuisines: ["Far Eastern"], image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600" },
  { name: "BigChefs", cuisines: ["World Cuisine", "Breakfast"], image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600" },
  { name: "Meze By Lemon Tree", cuisines: ["Appetizers (Meze)"], image: "https://images.unsplash.com/photo-1632733737568-d051f654b42b?q=80&w=600" },
  { name: "Bülent Börek", cuisines: ["Borek"], image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600" },
  { name: "Tarihi Sarıyer Börekçisi", cuisines: ["Borek"], image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600" },
  { name: "Nusr-Et", cuisines: ["Steak", "Burger"], image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?q=80&w=600" },
  { name: "Hanımeller Gözleme Evi", cuisines: ["Breakfast", "Home Cooking"], image: "https://images.unsplash.com/photo-1563605809890-50b38c2f1f0a?q=80&w=600" },
  { name: "Van Kahvaltı Evi", cuisines: ["Breakfast"], image: "https://images.unsplash.com/photo-1563605809890-50b38c2f1f0a?q=80&w=600" }
];

export const DISTRICT_CENTERS = {
  "Beşiktaş": { lat: 41.0422, lng: 29.0075 },
  "Kadıköy": { lat: 40.9910, lng: 29.0250 },
  "Şişli": { lat: 41.0600, lng: 28.9870 },
  "Fatih": { lat: 41.0130, lng: 28.9490 },
  "Üsküdar": { lat: 41.0267, lng: 29.0133 },
  "Bakırköy": { lat: 40.9782, lng: 28.8715 },
  "Sarıyer": { lat: 41.1666, lng: 29.0500 },
  "Ataşehir": { lat: 40.9850, lng: 29.1100 },
  "Maltepe": { lat: 40.9200, lng: 29.1300 },
  "Beyoğlu": { lat: 41.0333, lng: 28.9770 },
  "Kartal": { lat: 40.8900, lng: 29.1800 },
  "Zeytinburnu": { lat: 40.9900, lng: 28.9000 },
  "Kağıthane": { lat: 41.0800, lng: 28.9700 },
  "Bahçelievler": { lat: 41.0000, lng: 28.8500 },
  "Eyüpsultan": { lat: 41.0500, lng: 28.9300 },
  "Başakşehir": { lat: 41.1000, lng: 28.7800 },
  "Pendik": { lat: 40.8800, lng: 29.2300 },
  "Tuzla": { lat: 40.8200, lng: 29.3000 },
  "Beylikdüzü": { lat: 41.0000, lng: 28.6400 },
  "Esenyurt": { lat: 41.0343, lng: 28.6801 }
};

let globalId = 1;
const restaurantsPool = [];

// İlçe listesini döngüye sokmak için Object.entries kullanıyoruz
Object.entries(DISTRICT_CENTERS).forEach(([distName, coords]) => {
  RAW_DATA.forEach(template => {
    // İlçe merkezi etrafında 1km'lik sapma
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    restaurantsPool.push({
      id: globalId++,
      name: `${template.name} (${distName})`, // İstenen Parantezli Format
      cuisines: template.cuisines,
      rating: (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1),
      lat: (coords.lat + latOffset),
      lng: (coords.lng + lngOffset),
      district: distName,
      image: template.image
    });
  });
});

export const MOCK_RESTAURANTS = restaurantsPool;