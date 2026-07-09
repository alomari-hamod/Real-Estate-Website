const apiURL = "http://localhost/project_final/Hw1/PhpFile/properties_api.php";

// تحميل العقارات من قاعدة البيانات
// تحميل العقارات من قاعدة البيانات
async function loadProperties() {
    console.log("🚀 بدأ تحميل العقارات من قاعدة البيانات...");

    try {
        // 1. جلب البيانات من الـ API
        const response = await fetch(`${apiURL}?action=get`);
        console.log("📡 حالة الاتصال:", response.status, response.ok);

        if (!response.ok) {
            throw new Error(`فشل الاتصال: ${response.status}`);
        }

        // 2. تحويل JSON إلى كائنات JavaScript
        const propertiesFromDB = await response.json();
        console.log("✅ عدد العقارات المستلمة:", propertiesFromDB.length);
        console.log("📊 البيانات الخام:", propertiesFromDB);

        // 3. تفريغ المصفوفة القديمة وإضافة البيانات الجديدة
        allProperties.length = 0; // مسح المصفوفة القديمة

        // تحويل كل عقار إلى الشكل المتوقع في الكود
        propertiesFromDB.forEach(property => {
            allProperties.push({
                id: property.id,
                title: property.title,
                location: property.location,
                price: parseFloat(property.price),
                type: property.type,
                // استخدم status إذا كان saleType غير موجود
                saleType: property.saleType || property.status || 'للبيع', // إضافة قيمة افتراضية
                description: property.description,
                image: property.image,
                gallery: property.gallery || [property.image],
                rooms: parseInt(property.rooms),
                bathrooms: parseInt(property.bathrooms),
                area: property.area
            });
        });

        console.log("🔄 عدد العقارات بعد المعالجة:", allProperties.length);
        console.log("🔍 عينة من العقارات:", allProperties[0]);

        // 4. تطبيق الفلترة المخزنة من الصفحة الرئيسية
        applyStoredFilters();

        // 5. إظهار إشعار للمستخدم
        if (allProperties.length > 0) {
            showNotification(`تم تحميل ${allProperties.length} عقار بنجاح`, "success");
        } else {
            showNotification("لا توجد عقارات في قاعدة البيانات", "warning");
        }

    } catch (error) {
        console.error("❌ خطأ في تحميل العقارات:", error);
        showNotification(`خطأ: ${error.message}`, "error");

        // عرض رسالة خطأ في الصفحة
        const grid = document.getElementById('all-properties-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 40px; grid-column: 1/-1;">
                    <h3>⚠️ حدث خطأ في تحميل العقارات</h3>
                    <p><strong>السبب:</strong> ${error.message}</p>
                    <button onclick="loadProperties()" style="margin-top: 20px;">
                        إعادة المحاولة
                    </button>
                </div>
            `;
        }
    }
}

// تطبيق الفلترة المخزنة
function applyStoredFilters() {
    const filterType = localStorage.getItem('filterType'); // 'للبيع' أو 'للإيجار'
    const propertyType = localStorage.getItem('propertyType'); // نوع العقار
    const propertyLocation = localStorage.getItem('propertyLocation'); // الموقع

    console.log("🔍 تطبيق الفلاتر المخزنة:", { filterType, propertyType, propertyLocation });

    let filteredProperties = allProperties;

    // 1. فلترة حسب نوع العملية (بيع/إيجار)
    if (filterType) {
        filteredProperties = filteredProperties.filter(p => {
            // تأكد أن saleType موجود في العقار
            return p.saleType === filterType;
        });
        console.log(`✅ بعد فلترة ${filterType}: ${filteredProperties.length} عقار`);
    }

    // 2. فلترة حسب نوع العقار
    if (propertyType && propertyType !== "أي نوع") {
        filteredProperties = filteredProperties.filter(p => {
            return p.type === propertyType;
        });
    }

    // 3. فلترة حسب الموقع
    if (propertyLocation && propertyLocation.trim() !== "") {
        filteredProperties = filteredProperties.filter(p => {
            return p.location && p.location.includes(propertyLocation);
        });
    }

    // عرض العقارات المصفاة
    displayProperties(filteredProperties);

    // مسح الفلاتر المخزنة بعد استخدامها
    localStorage.removeItem('filterType');
    localStorage.removeItem('propertyType');
    localStorage.removeItem('propertyLocation');
}

// ===== بيانات سلة التسوق =====
let shoppingCart = [];

// ===== مصفوفة تحتوي على جميع العقارات (سيتم ملؤها من قاعدة البيانات) =====
let allProperties = [];

// دالة لعرض العقارات
function displayProperties(properties = allProperties) {
    const grid = document.getElementById('all-properties-grid');
    if (!grid) return;

    let html = '';

    if (properties.length === 0) {
        html = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>لا توجد عقارات متاحة حالياً</h3>
                <p>جاري تحميل العقارات من قاعدة البيانات...</p>
                <button class="btn-primary" onclick="loadProperties()">
                    إعادة تحميل العقارات
                </button>
            </div>
        `;
    } else {
        properties.forEach(property => {
            const saleTypeClass = property.saleType === "للبيع" ? "for-sale" : "for-rent";
            html += `
                <div class="property-card" onclick='openPropertyModal(${JSON.stringify(property).replace(/'/g, "\\'")})'>
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop'">
                        <div class="property-sale-type ${saleTypeClass}">${property.saleType}</div>
                    </div>
                    <div class="property-info">
                        <h3>${property.title}</h3>
                        <p class="property-location">${property.location}</p>
                        <p>${property.description}</p>
                        <div class="property-price">$${property.price ? property.price.toLocaleString() : '0'}</div>
                        <button class="add-to-cart-button" onclick="event.stopPropagation(); addToCart(${property.id})">
                            🛒 أضف إلى السلة
                        </button>
                    </div>
                </div>
            `;
        });
    }

    grid.innerHTML = html;
}

// دالة لفلترة العقارات حسب النوع
function filterProperties() {
    const filter = document.getElementById('property-filter').value;

    if (filter === 'all') {
        displayProperties(allProperties);
    } else {
        const filtered = allProperties.filter(property => property.type === filter);
        displayProperties(filtered);
    }
}

// دالة البحث المتقدم
function searchProperties() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filtered = allProperties.filter(property => {
        let matches = true;

        // البحث بالنص
        if (searchText) {
            matches = property.title.toLowerCase().includes(searchText) ||
                property.location.toLowerCase().includes(searchText) ||
                property.description.toLowerCase().includes(searchText);
        }

        // الفلترة بالنوع
        if (matches && typeFilter !== 'all') {
            matches = property.type === typeFilter;
        }

        // الفلترة بالسعر
        if (matches && priceFilter !== 'all') {
            const price = parseInt(priceFilter);
            if (price === 100000) {
                matches = property.price < 100000;
            } else if (price === 300000) {
                matches = property.price >= 100000 && property.price <= 300000;
            } else if (price === 500000) {
                matches = property.price > 300000 && property.price <= 500000;
            } else if (price === 1000000) {
                matches = property.price > 500000;
            }
        }

        return matches;
    });

    displayProperties(filtered);

    // إظهار عدد النتائج
    if (filtered.length === 0) {
        showNotification("لم يتم العثور على عقارات مطابقة", "info");
    } else {
        showNotification(`تم العثور على ${filtered.length} عقار`, "success");
    }
}

// ===== وظائف سلة التسوق =====

// دالة لحفظ السلة في localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    } catch (error) {
        console.error('خطأ في حفظ السلة:', error);
    }
}

// دالة إضافة عقار إلى السلة
function addToCart(propertyId) {
    const property = allProperties.find(p => p.id == propertyId);

    if (!property) {
        showNotification("العقار غير موجود", "error");
        return;
    }

    // التحقق إذا كان العقار موجود بالفعل في السلة
    const existingItem = shoppingCart.find(item => item.id == propertyId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingCart.push({
            id: property.id,
            title: property.title,
            price: property.price,
            image: property.image,
            saleType: property.saleType,
            type: property.type,
            quantity: 1
        });
    }

    updateCart();
    saveCartToStorage();
    showNotification(`"${property.title}" تمت إضافته إلى السلة`, "success");
}

// دالة تحديث سلة التسوق
function updateCart() {
    // تحديث عداد السلة
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // تحديث محتوى السلة
    updateCartItems();
}

// دالة تحديث عناصر السلة
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (shoppingCart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        if (cartTotalPrice) {
            cartTotalPrice.textContent = "$0.00";
        }
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        }
        return;
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }

    let html = '';
    let totalPrice = 0;

    shoppingCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        html += `
            <div class="cart-item" id="cart-item-${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-details">
                        <span class="cart-item-type">${item.saleType}</span>
                        $${item.price.toLocaleString()}
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toLocaleString()}
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
    });

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = html;
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${totalPrice.toLocaleString()}`;
    }
}

// دالة زيادة كمية العنصر
function increaseQuantity(propertyId) {
    const item = shoppingCart.find(item => item.id == propertyId);
    if (item) {
        item.quantity += 1;
        updateCart();
        saveCartToStorage();
    }
}

// دالة تقليل كمية العنصر
function decreaseQuantity(propertyId) {
    const item = shoppingCart.find(item => item.id == propertyId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCart();
            saveCartToStorage();
        } else {
            removeFromCart(propertyId);
        }
    }
}

// دالة حذف عنصر من السلة
function removeFromCart(propertyId) {
    const item = shoppingCart.find(item => item.id == propertyId);
    if (item) {
        shoppingCart = shoppingCart.filter(item => item.id != propertyId);
        updateCart();
        saveCartToStorage();
        showNotification(`تم حذف "${item.title}" من السلة`, "info");
    }
}

// دالة عرض/إخفاء سلة التسوق
function toggleCart() {
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup) {
        cartPopup.classList.toggle('show');
    }
}

// دالة إغلاق سلة التسوق
function closeCart() {
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup) {
        cartPopup.classList.remove('show');
    }
}

// دالة إتمام الشراء
function checkout() {
    if (shoppingCart.length === 0) {
        alert("سلة التسوق فارغة!");
        return;
    }

    // حفظ السلة في localStorage
    localStorage.setItem("currentOrder", JSON.stringify({ items: shoppingCart }));

    // الانتقال إلى صفحة الطلب
    window.location.href = "order1.html";
}

// دالة عرض إشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'bell';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return 'linear-gradient(135deg, #2ecc71, #27ae60)';
        case 'error': return 'linear-gradient(135deg, #e74c3c, #c0392b)';
        case 'warning': return 'linear-gradient(135deg, #f39c12, #d35400)';
        case 'info': return 'linear-gradient(135deg, #3498db, #2980b9)';
        default: return 'linear-gradient(135deg, #667eea, #764ba2)';
    }
}

// ===== وظائف التنقل =====
function goToHome() {
    window.location.href = 'HW1.html';
}

function goToShoppingPage() {
    window.location.href = 'shopping.html';
}

function goToLoginPage() {
    window.location.href = 'login.html';
}

// ===== وظائف المعرض =====
let galleryImages = [];
let currentIndex = 0;

function openPropertyModal(property) {
    galleryImages = property.gallery || [property.image];
    currentIndex = 0;

    document.getElementById("modalMainImage").src = galleryImages[0];
    document.getElementById("modalTitle").textContent = property.title;
    document.getElementById("modalLocation").textContent = property.location;
    document.getElementById("modalPrice").textContent = "$" + (property.price ? property.price.toLocaleString() : '0');
    document.getElementById("modalType").textContent = property.type;
    document.getElementById("modalSaleType").textContent = property.saleType || property.status;
    document.getElementById("modalDescription").textContent = property.description;

    buildThumbnails();
    document.getElementById("propertyModal").classList.add("show");

    // إضافة زر الإضافة إلى السلة في المودال
    const cartBtn = document.querySelector('.lux-cart-btn');
    if (cartBtn) {
        cartBtn.onclick = function() {
            addToCart(property.id);
            closePropertyModal();
        };
    }
}

function closePropertyModal() {
    document.getElementById("propertyModal").classList.remove("show");
}

function buildThumbnails() {
    const container = document.getElementById("modalThumbnails");
    if (!container) return;

    container.innerHTML = "";

    galleryImages.forEach((img, index) => {
        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.alt = `صورة ${index + 1}`;
        thumb.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop';
        };

        if (index === 0) thumb.classList.add("active");

        thumb.onclick = () => {
            currentIndex = index;
            updateImage();
        };

        container.appendChild(thumb);
    });
}

function updateImage() {
    const mainImg = document.getElementById("modalMainImage");
    if (mainImg && galleryImages[currentIndex]) {
        mainImg.src = galleryImages[currentIndex];
    }

    document.querySelectorAll(".lux-thumbnails img").forEach((img, i) => {
        img.classList.toggle("active", i === currentIndex);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateImage();
}

// ===== تهيئة الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // تحميل العقارات من قاعدة البيانات
    loadProperties();

    // تحميل سلة التسوق من localStorage
    try {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart = JSON.parse(savedCart);
            updateCart();
        }
    } catch (error) {
        console.error('خطأ في تحميل السلة:', error);
        shoppingCart = [];
    }

    // البحث بالضغط على Enter
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchProperties();
            }
        });
    }

    // إغلاق السلة عند النقر خارجها
    document.addEventListener('click', function(event) {
        const cartPopup = document.getElementById('cart-popup');
        const cartSection = document.querySelector('.cart-section');

        if (cartPopup && cartPopup.classList.contains('show') &&
            !cartPopup.contains(event.target) &&
            !cartSection.contains(event.target)) {
            closeCart();
        }
    });

    // إغلاق مودال العقار عند النقر خارجها
    document.addEventListener('click', function(event) {
        const propertyModal = document.getElementById('propertyModal');
        const luxOverlay = document.querySelector('.lux-overlay');

        if (propertyModal && propertyModal.classList.contains('show') &&
            event.target === luxOverlay) {
            closePropertyModal();
        }
    });
});

// إضافة أنماط CSS للتنبيهات
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    .cart-badge {
        display: none;
        position: absolute;
        top: -5px;
        right: -5px;
        background: #e74c3c;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
    }
    
    .no-results {
        text-align: center;
        padding: 60px 20px;
        grid-column: 1 / -1;
    }
`;
document.head.appendChild(notificationStyles);

console.log('صفحة التسوق المحدثة جاهزة للاستخدام!');