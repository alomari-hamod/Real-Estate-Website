


   // بيانات العقارات (يمكن استبدالها ببيانات حقيقية من قاعدة البيانات)
    let properties = [
    {
        id: 1,
        title: "فيلا فاخرة",
        location: "وسط المدينة، نيويورك",
        description: "فيلا فاخرة مع وسائل الراحة الحديثة وإطلالات خلابة.",
        price: 350000,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60",
        type: "فيلا"
    },
    {
        id: 2,
        title: "شقة عصرية",
        location: "وسط المدينة، شيكاغو",
        description: "شقة عصرية واسعة في قلب المدينة.",
        price: 180000,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60",
        type: "شقة"
    },
    {
        id: 3,
        title: "منزل عائلي",
        location: "الضاحية، بوسطن",
        description: "منزل عائلي مثالي مع حديقة وكراج.",
        price: 275000,
        image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60",
        type: "منزل"
    },
    {
        id: 4,
        title: "منزل شاطئي",
        location: "ميامي بيتش، فلوريدا",
        description: "عقار خلاب على الشاطئ مع إطلالات على المحيط.",
        price: 550000,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60",
        type: "منزل شاطئي"
    },
    {
        id: 5,
        title: "بنتهاوس فاخر",
        location: "مانهاتن، نيويورك",
        description: "بنتهاوس مذهل مع إطلالات بانورامية على المدينة.",
        price: 1200000,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60",
        type: "بنتهاوس"
    }
    ];

    // دالة لعرض العقارات
    function displayProperties(propertiesToShow = properties) {
    const grid = document.getElementById('properties-grid');

    if (propertiesToShow.length === 0) {
    grid.innerHTML = '<div class="no-properties">لا توجد عقارات تطابق معايير البحث</div>';
    return;
}

    let html = '';

    propertiesToShow.forEach(property => {
    html += `
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.title}">
                        </div>
                        <div class="property-info">
                            <h3 class="property-title">${property.title}</h3>
                            <p class="property-location">📍 ${property.location}</p>
                            <p class="property-description">${property.description}</p>

                            <div class="property-details">
                                <div class="property-price">$${property.price.toLocaleString()}</div>
                                <div class="property-type">${property.type}</div>
                            </div>

                            <div class="property-actions">
                                <button class="edit-btn" onclick="editProperty(${property.id})">
                                    <span>✏️</span> تعديل
                                </button>
                                <button class="delete-btn" onclick="deleteProperty(${property.id})">
                                    <span>🗑️</span> حذف
                                </button>
                            </div>
                        </div>
                    </div>
                `;
});

    grid.innerHTML = html;
}

    // دالة فتح نافذة إضافة عقار جديد
    function openAddModal() {
    document.getElementById('modal-title').textContent = 'إضافة عقار جديد';
    document.getElementById('property-form').reset();
    document.getElementById('property-id').value = '';
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('property-modal').style.display = 'block';
}

    // دالة تعديل عقار
    function editProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    document.getElementById('modal-title').textContent = 'تعديل العقار';
    document.getElementById('property-id').value = property.id;
    document.getElementById('property-title').value = property.title;
    document.getElementById('property-location').value = property.location;
    document.getElementById('property-description').value = property.description;
    document.getElementById('property-price').value = property.price;
    document.getElementById('property-type').value = property.type;
    document.getElementById('property-image').value = property.image;

    // عرض معاينة الصورة
    document.getElementById('preview-img').src = property.image;
    document.getElementById('image-preview').style.display = 'block';

    document.getElementById('property-modal').style.display = 'block';
}

    // دالة حذف عقار
    function deleteProperty(id) {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا العقار؟')) {
    properties = properties.filter(p => p.id !== id);
    displayProperties();
    alert('تم حذف العقار بنجاح');
}
}

    // دالة حفظ العقار (إضافة أو تعديل)
    document.getElementById('property-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('property-id').value;
    const title = document.getElementById('property-title').value;
    const location = document.getElementById('property-location').value;
    const description = document.getElementById('property-description').value;
    const price = parseInt(document.getElementById('property-price').value);
    const type = document.getElementById('property-type').value;
    const image = document.getElementById('property-image').value;

    if (id) {
    // تعديل عقار موجود
    const index = properties.findIndex(p => p.id == id);
    if (index !== -1) {
    properties[index] = { id: parseInt(id), title, location, description, price, type, image };
}
} else {
    // إضافة عقار جديد
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    properties.push({ id: newId, title, location, description, price, type, image });
}

    displayProperties();
    closeModal();
    alert(id ? 'تم تعديل العقار بنجاح' : 'تم إضافة العقار بنجاح');
});

    // دالة إغلاق النافذة المنبثقة
    function closeModal() {
    document.getElementById('property-modal').style.display = 'none';
}

    // دالة البحث عن العقارات
    function searchProperties() {
    const searchText = document.getElementById('search-input').value.toLowerCase();

    if (!searchText) {
    displayProperties();
    return;
}

    const filtered = properties.filter(property =>
    property.title.toLowerCase().includes(searchText) ||
    property.location.toLowerCase().includes(searchText) ||
    property.description.toLowerCase().includes(searchText)
    );

    displayProperties(filtered);
}

    // دالة فلترة العقارات
    function filterProperties() {
    const typeFilter = document.getElementById('type-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filtered = properties;

    // الفلترة بالنوع
    if (typeFilter !== 'all') {
    filtered = filtered.filter(property => property.type === typeFilter);
}

    // الفلترة بالسعر
    if (priceFilter !== 'all') {
    const price = parseInt(priceFilter);
    if (price === 100000) {
    filtered = filtered.filter(property => property.price < 100000);
} else if (price === 300000) {
    filtered = filtered.filter(property => property.price >= 100000 && property.price <= 300000);
} else if (price === 500000) {
    filtered = filtered.filter(property => property.price > 300000 && property.price <= 500000);
} else if (price === 1000000) {
    filtered = filtered.filter(property => property.price > 500000);
}
}

    displayProperties(filtered);
}

    // دالة العودة إلى لوحة التحكم
    function goBack() {
    window.location.href = 'admin.html';
}

    // عرض معاينة الصورة عند تغيير رابط الصورة
    document.getElementById('property-image').addEventListener('input', function() {
    const preview = document.getElementById('image-preview');
    const img = document.getElementById('preview-img');

    if (this.value) {
    img.src = this.value;
    preview.style.display = 'block';
} else {
    preview.style.display = 'none';
}
});

    // تحميل العقارات عند فتح الصفحة
    document.addEventListener('DOMContentLoaded', function() {
    displayProperties();
});
