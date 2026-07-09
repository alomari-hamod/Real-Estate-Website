// // ===== البيانات الأولية للعقارات =====
//
// const apiURL = "/project_final/Hw1/PhpFile/properties_api.php";
//
// // ===== دالة للتحقق من صحة روابط الصور =====
// function isValidImageUrl(url) {
//     if (!url || url.trim() === '') return false;
//
//     // تحقق من أن الرابط يبدأ بـ http:// أو https://
//     if (!url.startsWith('http://') && !url.startsWith('https://')) {
//         return false;
//     }
//
//     // تحقق من أن الرابط يحتوي على امتداد صورة صالح
//     const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
//     const lowerUrl = url.toLowerCase();
//
//     return validExtensions.some(ext => {
//         return lowerUrl.includes(ext) ||
//             lowerUrl.includes(ext.replace('.', ''));
//     });
// }
//
// // تحميل العقارات من قاعدة البيانات
// async function loadProperties() {
//     try {
//         const res = await fetch(`${apiURL}?action=get`);
//         if (res.ok) {
//             allProperties = await res.json();
//             displayedProperties = [...allProperties];
//             displayProperties();
//             updateStatistics();
//             showNotification("تم تحميل العقارات بنجاح", "success");
//         } else {
//             throw new Error("فشل في تحميل العقارات");
//         }
//     } catch (error) {
//         console.error("Error loading properties:", error);
//         showNotification("خطأ في تحميل العقارات", "error");
//         displayedProperties = [...allProperties];
//         displayProperties();
//     }
// }
//
//
// async function goToHome() {
//     window.location.href = "HW1.html";
// }
// async function goToShoppingPage() {
//     window.location.href = "shopping.html";
// }
//
// // إضافة عقار جديد
// async function addProperty(propertyData) {
//     try {
//         // التأكد من أن جميع الحقول مطلوبة
//         if (!propertyData.title || !propertyData.location || !propertyData.type ||
//             !propertyData.price || !propertyData.status || !propertyData.area) {
//             showNotification("الرجاء ملء جميع الحقول المطلوبة", "error");
//             return false;
//         }
//
//         // التحقق من رابط الصورة
//         if (!isValidImageUrl(propertyData.image)) {
//             showNotification("الرجاء إدخال رابط صورة صالح (يجب أن يبدأ بـ http:// أو https:// وينتهي بامتداد صورة مثل .jpg, .png, إلخ)", "error");
//             return false;
//         }
//
//         const formData = new FormData();
//
//         // إضافة جميع الحقول المطلوبة للـ API
//         formData.append("title", propertyData.title);
//         formData.append("location", propertyData.location);
//         formData.append("price", propertyData.price);
//         formData.append("type", propertyData.type);
//         formData.append("status", propertyData.status);
//         formData.append("description", propertyData.description || "لا يوجد وصف");
//         formData.append("rooms", propertyData.rooms || 0);
//         formData.append("bathrooms", propertyData.bathrooms || 0);
//         formData.append("area", propertyData.area);
//         formData.append("image", propertyData.image); // استخدم الرابط المدخل فقط
//         formData.append("featured", propertyData.featured ? 1 : 0);
//
//         const res = await fetch(`${apiURL}?action=add`, {
//             method: "POST",
//             body: formData,
//         });
//
//         const data = await res.json();
//
//         if (data.success) {
//             showNotification("تمت إضافة العقار بنجاح في قاعدة البيانات!", "success");
//             await loadProperties();
//             return true;
//         } else {
//             showNotification("فشل في إضافة العقار: " + data.message, "error");
//             return false;
//         }
//     } catch (error) {
//         console.error("Error adding property:", error);
//         showNotification("خطأ في الاتصال بالخادم", "error");
//         return false;
//     }
// }
//
// // بيانات أولية مؤقتة (ستستبدل بالبيانات من قاعدة البيانات)
// let allProperties = [];
//
// // العقارات المعروضة حالياً
// let displayedProperties = [];
//
// // الفلاتر الحالية
// let currentFilters = {
//     types: ['شقة', 'فيلا', 'استوديو', 'منزل', 'أرض', 'مكتب'],
//     statuses: ['للبيع', 'للإيجار'],
//     minPrice: 0,
//     maxPrice: 1000000,
//     rooms: []
// };
//
// // ===== تهيئة الصفحة =====
// document.addEventListener('DOMContentLoaded', function() {
//     updateCurrentDate();
//     loadProperties();
//     initializeButtons();
//     addInteractiveEffects();
//     initializeTopBar();
//     updatePriceRange();
// });
//
// // ===== تحديث التاريخ الحالي =====
// function updateCurrentDate() {
//     const dateElement = document.getElementById('current-date');
//     if (dateElement) {
//         const now = new Date();
//         const options = {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         };
//         const arabicDate = now.toLocaleDateString('ar-EG', options);
//         dateElement.textContent = `اليوم: ${arabicDate}`;
//     }
// }
//
// // ===== عرض العقارات =====
// function displayProperties() {
//     const propertiesGrid = document.getElementById('properties-grid');
//     if (!propertiesGrid) return;
//
//     propertiesGrid.innerHTML = '';
//
//     if (displayedProperties.length === 0) {
//         propertiesGrid.innerHTML = `
//             <div class="no-results">
//                 <i class="fas fa-search"></i>
//                 <h3>لا توجد عقارات</h3>
//                 <p>لم يتم العثور على أي عقارات. حاول إضافة عقار جديد.</p>
//             </div>
//         `;
//         return;
//     }
//
//     displayedProperties.forEach(property => {
//         const propertyCard = createPropertyCard(property);
//         propertiesGrid.appendChild(propertyCard);
//     });
// }
//
// // ===== إنشاء بطاقة عقار =====
// function createPropertyCard(property) {
//     const card = document.createElement('div');
//     card.className = 'property-card';
//     card.dataset.id = property.id;
//
//     const badgeClass = property.featured == 1 ? 'featured-badge' :
//         property.status === 'للبيع' ? 'sale-badge' :
//             property.status === 'للإيجار' ? 'rent-badge' : 'sale-badge';
//
//     // التحقق من صحة الصورة قبل عرضها
//     const imageUrl = property.image;
//     const hasValidImage = isValidImageUrl(imageUrl);
//
//     let imageHTML = '';
//     if (hasValidImage) {
//         imageHTML = `<img src="${imageUrl}" alt="${property.title}">`;
//     } else {
//         imageHTML = `
//             <div class="no-image-placeholder">
//                 <i class="fas fa-image"></i>
//                 <span>لا توجد صورة متاحة</span>
//             </div>
//         `;
//     }
//
//     card.innerHTML = `
//         <div class="property-image">
//             ${imageHTML}
//             ${property.featured == 1 ? '<span class="property-badge featured-badge">مميز</span>' : ''}
//             ${property.featured != 1 ? `<span class="property-badge ${badgeClass}">${property.status}</span>` : ''}
//             <span class="property-price">$${property.price ? property.price.toLocaleString() : '0'}</span>
//         </div>
//         <div class="property-content">
//             <h3 class="property-title">${property.title}</h3>
//             <p class="property-location">
//                 <i class="fas fa-map-marker-alt"></i>
//                 ${property.location}
//             </p>
//             <p class="property-description">
//                 ${property.description}
//             </p>
//             <div class="property-details">
//                 <span><i class="fas fa-home"></i> ${property.type}</span>
//                 <span><i class="fas fa-bed"></i> ${property.rooms} غرف</span>
//                 <span><i class="fas fa-bath"></i> ${property.bathrooms} حمامات</span>
//                 <span><i class="fas fa-ruler-combined"></i> ${property.area}</span>
//             </div>
//             <div class="property-actions">
//                 <button class="action-btn edit-btn" onclick="showEditPropertyModal(${property.id})">
//                     <i class="fas fa-edit"></i>
//                     تعديل
//                 </button>
//                 <button class="action-btn delete-btn" onclick="deleteProperty(${property.id})">
//                     <i class="fas fa-trash"></i>
//                     حذف
//                 </button>
//                 <button class="action-btn view-btn" onclick="viewPropertyDetails(${property.id})">
//                     <i class="fas fa-eye"></i>
//                     عرض
//                 </button>
//             </div>
//         </div>
//     `;
//
//     return card;
// }
//
// // ===== إرسال نموذج إضافة العقار =====
// async function submitPropertyForm() {
//     const name = document.getElementById('property-name');
//     const location = document.getElementById('property-location');
//     const type = document.getElementById('property-type');
//     const price = document.getElementById('property-price');
//     const rooms = document.getElementById('property-rooms');
//     const bathrooms = document.getElementById('property-bathrooms');
//     const area = document.getElementById('property-area');
//     const status = document.getElementById('property-status');
//     const description = document.getElementById('property-description');
//     const imageUrl = document.getElementById('property-image-url');
//     const featured = document.getElementById('property-featured');
//
//     // التحقق من الحقول المطلوبة
//     if (!name.value || !location.value || !type.value || !price.value || !rooms.value || !bathrooms.value || !area.value || !status.value) {
//         showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
//         return;
//     }
//
//     // التحقق من رابط الصورة - مطلوب الآن
//     const imageUrlValue = imageUrl.value.trim();
//     if (!imageUrlValue) {
//         showNotification('حقل رابط الصورة مطلوب. الرجاء إدخال رابط صالح للصورة', 'error');
//         return;
//     }
//
//     if (!isValidImageUrl(imageUrlValue)) {
//         showNotification('رابط الصورة غير صالح. الرجاء إدخال رابط يبدأ بـ http:// أو https:// وينتهي بامتداد صورة مثل .jpg, .png, .jpeg, .gif, .webp, .bmp', 'error');
//         return;
//     }
//
//     const gallery = document.getElementById('property-gallery');
//
//     // جمع البيانات
//     const propertyData = {
//         title: name.value,
//         location: location.value,
//         type: type.value,
//         price: parseInt(price.value),
//         rooms: parseInt(rooms.value),
//         bathrooms: parseInt(bathrooms.value),
//         area: area.value,
//         status: status.value,
//         description: description.value || "لا يوجد وصف",
//         image: imageUrlValue, // رابط الصورة المطلوب
//         featured: featured ? featured.checked : false,
//         gallery: gallery.value || imageUrlValue
//     };
//
//     // إرسال البيانات للخادم
//     const success = await addProperty(propertyData);
//
//     if (success) {
//         closeModal();
//     }
// }
//
// // ===== تحديث عقار في قاعدة البيانات =====
// async function updateProperty(propertyId) {
//     try {
//         // جمع البيانات من النموذج
//         const title = document.getElementById('edit-property-name').value;
//         const location = document.getElementById('edit-property-location').value;
//         const type = document.getElementById('edit-property-type').value;
//         const price = parseInt(document.getElementById('edit-property-price').value);
//         const rooms = parseInt(document.getElementById('edit-property-rooms').value);
//         const bathrooms = parseInt(document.getElementById('edit-property-bathrooms').value);
//         const area = document.getElementById('edit-property-area').value;
//         const status = document.getElementById('edit-property-status').value;
//         const description = document.getElementById('edit-property-description').value;
//         const featured = document.getElementById('edit-property-featured').checked ? 1 : 0;
//         const imageUrlInput = document.getElementById('edit-property-image-url').value;
//
//         // التحقق من رابط الصورة - مطلوب الآن
//         const imageUrlValue = imageUrlInput.trim();
//         if (!imageUrlValue) {
//             showNotification('حقل رابط الصورة مطلوب. الرجاء إدخال رابط صالح للصورة', 'error');
//             return;
//         }
//
//         if (!isValidImageUrl(imageUrlValue)) {
//             showNotification('رابط الصورة غير صالح. الرجاء إدخال رابط يبدأ بـ http:// أو https:// وينتهي بامتداد صورة مثل .jpg, .png, .jpeg, .gif, .webp, .bmp', 'error');
//             return;
//         }
//
//         // معالجة رفع الصورة الجديدة
//         const imageInput = document.getElementById('edit-property-image-upload');
//         let finalImageUrl = imageUrlValue;
//
//         if (imageInput.files && imageInput.files[0]) {
//             // هنا يمكنك إضافة منطق رفع الصورة إذا أردت
//             // حالياً سنستخدم الرابط المدخل فقط
//             showNotification("تم حفظ التعديلات. ملاحظة: رفع الصور الجديدة يتطلب إعدادات إضافية على الخادم.", "info");
//         }
//
//         // إنشاء FormData لإرسال البيانات
//         const formData = new FormData();
//         formData.append("id", propertyId);
//         formData.append("title", title);
//         formData.append("location", location);
//         formData.append("type", type);
//         formData.append("price", price);
//         formData.append("rooms", rooms);
//         formData.append("bathrooms", bathrooms);
//         formData.append("area", area);
//         formData.append("status", status);
//         formData.append("description", description || "لا يوجد وصف");
//         formData.append("image", finalImageUrl);
//         formData.append("featured", featured);
//         formData.append("gallery", finalImageUrl);
//
//         // إرسال طلب التحديث للخادم
//         const res = await fetch(`${apiURL}?action=update`, {
//             method: "POST",
//             body: formData,
//         });
//
//         const data = await res.json();
//
//         if (data.success) {
//             showNotification("✅ تم تحديث العقار بنجاح في قاعدة البيانات!", "success");
//             await loadProperties();
//             closeEditModal();
//         } else {
//             showNotification("❌ فشل في تحديث العقار: " + data.message, "error");
//         }
//     } catch (error) {
//         console.error("Error updating property:", error);
//         showNotification("خطأ في الاتصال بالخادم", "error");
//     }
// }
//
// // ===== بقية الدوال بدون تعديلات كبيرة =====
//
// // ===== عرض نافذة تعديل العقار =====
// async function showEditPropertyModal(propertyId) {
//     const property = allProperties.find(p => p.id == propertyId);
//     if (!property) {
//         showNotification("العقار غير موجود", "error");
//         return;
//     }
//
//     // إنشاء النافذة المنبثقة
//     const modalHTML = `
//         <div class="modal-overlay" id="edit-property-modal">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h3><i class="fas fa-edit"></i> تعديل العقار: ${property.title}</h3>
//                     <button class="close-modal" onclick="closeEditModal()">&times;</button>
//                 </div>
//                 <div class="modal-body">
//                     <form id="edit-property-form">
//                         <input type="hidden" id="edit-property-id" value="${property.id}">
//
//                         <div class="form-group">
//                             <label for="edit-property-name"><i class="fas fa-signature"></i> اسم العقار *</label>
//                             <input type="text" id="edit-property-name" value="${property.title}" required>
//                         </div>
//
//                         <div class="form-group">
//                             <label for="edit-property-location"><i class="fas fa-map-marker-alt"></i> موقع العقار *</label>
//                             <input type="text" id="edit-property-location" value="${property.location}" required>
//                         </div>
//
//                         <div class="form-row">
//                             <div class="form-group">
//                                 <label for="edit-property-type"><i class="fas fa-home"></i> النوع *</label>
//                                 <select id="edit-property-type" required>
//                                     <option value="">اختر النوع</option>
//                                     <option value="شقة" ${property.type === 'شقة' ? 'selected' : ''}>شقة</option>
//                                     <option value="فيلا" ${property.type === 'فيلا' ? 'selected' : ''}>فيلا</option>
//                                     <option value="استوديو" ${property.type === 'استوديو' ? 'selected' : ''}>استوديو</option>
//                                     <option value="منزل" ${property.type === 'منزل' ? 'selected' : ''}>منزل</option>
//                                     <option value="أرض" ${property.type === 'أرض' ? 'selected' : ''}>أرض</option>
//                                     <option value="مكتب" ${property.type === 'مكتب' ? 'selected' : ''}>مكتب</option>
//                                 </select>
//                             </div>
//
//                             <div class="form-group">
//                                 <label for="edit-property-price"><i class="fas fa-dollar-sign"></i> السعر ($) *</label>
//                                 <input type="number" id="edit-property-price" value="${property.price}" required min="0">
//                             </div>
//                         </div>
//
//                         <div class="form-row">
//                             <div class="form-group">
//                                 <label for="edit-property-rooms"><i class="fas fa-bed"></i> عدد الغرف *</label>
//                                 <select id="edit-property-rooms" required>
//                                     <option value="1" ${property.rooms == 1 ? 'selected' : ''}>1 غرفة</option>
//                                     <option value="2" ${property.rooms == 2 ? 'selected' : ''}>2 غرف</option>
//                                     <option value="3" ${property.rooms == 3 ? 'selected' : ''}>3 غرف</option>
//                                     <option value="4" ${property.rooms == 4 ? 'selected' : ''}>4 غرف</option>
//                                     <option value="5" ${property.rooms == 5 ? 'selected' : ''}>5 غرف</option>
//                                     <option value="6" ${property.rooms >= 6 ? 'selected' : ''}>6 غرف فأكثر</option>
//                                 </select>
//                             </div>
//
//                             <div class="form-group">
//                                 <label for="edit-property-bathrooms"><i class="fas fa-bath"></i> عدد الحمامات *</label>
//                                 <select id="edit-property-bathrooms" required>
//                                     <option value="1" ${property.bathrooms == 1 ? 'selected' : ''}>1 حمام</option>
//                                     <option value="2" ${property.bathrooms == 2 ? 'selected' : ''}>2 حمامات</option>
//                                     <option value="3" ${property.bathrooms == 3 ? 'selected' : ''}>3 حمامات</option>
//                                     <option value="4" ${property.bathrooms == 4 ? 'selected' : ''}>4 حمامات</option>
//                                     <option value="5" ${property.bathrooms >= 5 ? 'selected' : ''}>5 حمامات فأكثر</option>
//                                 </select>
//                             </div>
//                         </div>
//
//                         <div class="form-row">
//                             <div class="form-group">
//                                 <label for="edit-property-area"><i class="fas fa-ruler-combined"></i> المساحة (م²) *</label>
//                                 <input type="text" id="edit-property-area" value="${property.area}" required>
//                             </div>
//
//                             <div class="form-group">
//                                 <label for="edit-property-status"><i class="fas fa-tag"></i> الحالة *</label>
//                                 <select id="edit-property-status" required>
//                                     <option value="للبيع" ${property.status === 'للبيع' ? 'selected' : ''}>للبيع</option>
//                                     <option value="للإيجار" ${property.status === 'للإيجار' ? 'selected' : ''}>للإيجار</option>
//                                 </select>
//                             </div>
//                         </div>
//
//                         <div class="form-group">
//                             <label for="edit-property-description"><i class="fas fa-align-left"></i> وصف العقار</label>
//                             <textarea id="edit-property-description" rows="4">${property.description || ''}</textarea>
//                         </div>
//
//                         <div class="form-group">
//                             <label for="edit-property-image-url"><i class="fas fa-image"></i> رابط صورة العقار *</label>
//                             <input type="url" id="edit-property-image-url" value="${property.image}" placeholder="https://example.com/image.jpg" required>
//                             <small style="color: #f39c12;">رابط الصورة مطلوب ويجب أن يبدأ بـ http:// أو https:// وينتهي بامتداد صورة صالح</small>
//                         </div>
//
//                         <div class="form-group">
//                             <label for="edit-property-image-upload"><i class="fas fa-camera"></i> رفع صورة جديدة (اختياري)</label>
//                             <input type="file" id="edit-property-image-upload" accept="image/*">
//                             <small style="color: #aaa;">ملاحظة: رفع الصورة يتطلب إعدادات إضافية على الخادم</small>
//                         </div>
//
//                         <div class="form-group">
//                             <label class="checkbox-label">
//                                 <input type="checkbox" id="edit-property-featured" ${property.featured == 1 ? 'checked' : ''}>
//                                 <span><i class="fas fa-star"></i> وضع كعقار مميز</span>
//                             </label>
//                         </div>
//                     </form>
//                 </div>
//                 <div class="modal-footer">
//                     <button class="btn-secondary" onclick="closeEditModal()">إلغاء</button>
//                     <button class="btn-primary" onclick="updateProperty(${property.id})">حفظ التعديلات</button>
//                 </div>
//             </div>
//         </div>
//
//         <style>
//             .modal-overlay {
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background: rgba(0, 0, 0, 0.85);
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 z-index: 4000;
//                 backdrop-filter: blur(10px);
//             }
//
//             .modal-content {
//                 background: #1a1a1a;
//                 width: 90%;
//                 max-width: 700px;
//                 border-radius: 20px;
//                 border: 1px solid rgba(255, 255, 255, 0.15);
//                 overflow: hidden;
//                 max-height: 90vh;
//                 display: flex;
//                 flex-direction: column;
//             }
//
//             .modal-header {
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 padding: 25px;
//                 background: linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.2));
//                 border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//             }
//
//             .modal-header h3 {
//                 color: white;
//                 display: flex;
//                 align-items: center;
//                 gap: 15px;
//                 font-size: 1.5rem;
//             }
//
//             .close-modal {
//                 background: none;
//                 border: none;
//                 color: white;
//                 font-size: 2.2rem;
//                 cursor: pointer;
//                 transition: color 0.3s;
//                 width: 40px;
//                 height: 40px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 border-radius: 50%;
//             }
//
//             .close-modal:hover {
//                 color: #e74c3c;
//                 background: rgba(255, 255, 255, 0.1);
//             }
//
//             .modal-body {
//                 padding: 25px;
//                 flex: 1;
//                 overflow-y: auto;
//             }
//
//             .form-group {
//                 margin-bottom: 20px;
//             }
//
//             .form-group label {
//                 display: flex;
//                 align-items: center;
//                 gap: 10px;
//                 margin-bottom: 8px;
//                 color: white;
//                 font-size: 1rem;
//             }
//
//             .form-group input,
//             .form-group select,
//             .form-group textarea {
//                 width: 100%;
//                 padding: 12px;
//                 background: rgba(255, 255, 255, 0.07);
//                 border: 1px solid rgba(255, 255, 255, 0.15);
//                 border-radius: 10px;
//                 background: rgba(255, 255, 255, 0.15);
//                 font-family: 'Cairo', sans-serif;
//                 font-size: 1rem;
//             }
//
//             .form-row {
//                 display: flex;
//                 gap: 15px;
//             }
//
//             .form-row .form-group {
//                 flex: 1;
//             }
//
//             .checkbox-label {
//                 display: flex;
//                 align-items: center;
//                 gap: 10px;
//                 cursor: pointer;
//                 padding: 12px;
//                 background: rgba(255, 255, 255, 0.05);
//                 border-radius: 10px;
//             }
//
//             .modal-footer {
//                 display: flex;
//                 justify-content: flex-end;
//                 gap: 15px;
//                 padding: 20px;
//                 border-top: 1px solid rgba(255, 255, 255, 0.1);
//                 background: rgba(255, 255, 255, 0.03);
//             }
//
//             .modal-footer button {
//                 padding: 12px 30px;
//                 min-width: 120px;
//             }
//
//             .no-image-placeholder {
//                 width: 100%;
//                 height: 250px;
//                 background: rgba(255, 255, 255, 0.05);
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 justify-content: center;
//                 color: #888;
//                 border-radius: 8px;
//             }
//
//             .no-image-placeholder i {
//                 font-size: 48px;
//                 margin-bottom: 10px;
//             }
//
//             .no-image-placeholder span {
//                 font-size: 14px;
//             }
//         </style>
//     `;
//
//     document.body.insertAdjacentHTML('beforeend', modalHTML);
//     document.body.style.overflow = 'hidden';
// }
//
// // ===== إغلاق نافذة التعديل =====
// function closeEditModal() {
//     const modal = document.getElementById('edit-property-modal');
//     if (modal) {
//         modal.remove();
//         document.body.style.overflow = 'auto';
//     }
// }
//
// // ===== بقية الدوال تبقى كما هي مع تعديلات بسيطة في عرض إضافة العقار =====
//
// // ===== عرض نافذة إضافة عقار جديد =====
// function showAddPropertyModal() {
//     console.log("showAddPropertyModal تم استدعاؤه!");
//     console.log("فتح نافذة إضافة عقار جديد");
//
//     // منع فتح نافذتين معاً
//     const existingModal = document.getElementById('addPropertyModal');
//     if (existingModal) {
//         existingModal.remove();
//     }
//
//     const modalHTML = `
//         <div id="addPropertyModal" class="modal-overlay" style="
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.85);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 9999;
//             backdrop-filter: blur(5px);
//         ">
//             <div class="modal-content" style="
//                 background: white;
//                 width: 90%;
//                 max-width: 700px;
//                 max-height: 90vh;
//                 border-radius: 15px;
//                 overflow: hidden;
//                 box-shadow: 0 20px 50px rgba(0,0,0,0.3);
//                 animation: modalSlideIn 0.3s ease;
//             ">
//                 <div class="modal-header" style="
//                     padding: 25px;
//                     background: linear-gradient(135deg, #3498db, #2980b9);
//                     color: white;
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                 ">
//                     <h3 style="margin: 0; font-size: 24px; display: flex; align-items: center; gap: 12px;">
//                         <i class="fas fa-plus-circle"></i>
//                         إضافة عقار جديد
//                     </h3>
//                     <button onclick="closeAddModal()" style="
//                         background: none;
//                         border: none;
//                         color: white;
//                         font-size: 28px;
//                         cursor: pointer;
//                         width: 40px;
//                         height: 40px;
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         border-radius: 50%;
//                         transition: background 0.3s;
//                     ">&times;</button>
//                 </div>
//
//                 <div class="modal-body" style="padding: 25px; overflow-y: auto; max-height: 60vh;">
//                     <form id="addPropertyForm">
//                         <div class="form-group" style="margin-bottom: 20px;">
//                             <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                 <i class="fas fa-signature"></i> اسم العقار *
//                             </label>
//                             <input type="text" id="propTitle" required placeholder="مثال: فيلا فاخرة في الرياض" style="
//                                 width: 100%;
//                                 padding: 14px;
//                                 border: 2px solid #ddd;
//                                 border-radius: 8px;
//                                 font-size: 16px;
//                                 transition: border 0.3s;
//                             ">
//                         </div>
//
//                         <div class="form-group" style="margin-bottom: 20px;">
//                             <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                 <i class="fas fa-map-marker-alt"></i> الموقع *
//                             </label>
//                             <input type="text" id="propLocation" required placeholder="مثال: الرياض، حي النخيل" style="
//                                 width: 100%;
//                                 padding: 14px;
//                                 border: 2px solid #ddd;
//                                 border-radius: 8px;
//                                 font-size: 16px;
//                             ">
//                         </div>
//
//                         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
//                             <div class="form-group">
//                                 <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-home"></i> النوع *
//                                 </label>
//                                 <select id="propType" required style="
//                                     width: 100%;
//                                     padding: 14px;
//                                     border: 2px solid #ddd;
//                                     border-radius: 8px;
//                                     font-size: 16px;
//                                 ">
//                                     <option value="">اختر النوع</option>
//                                     <option value="شقة">شقة</option>
//                                     <option value="فيلا">فيلا</option>
//                                     <option value="منزل">منزل</option>
//                                     <option value="أرض">أرض</option>
//                                     <option value="مكتب">مكتب</option>
//                                     <option value="استوديو">استوديو</option>
//                                 </select>
//                             </div>
//
//                             <div class="form-group">
//                                 <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-dollar-sign"></i> السعر ($) *
//                                 </label>
//                                 <input type="number" id="propPrice" required min="0" placeholder="مثال: 500000" style="
//                                     width: 100%;
//                                     padding: 14px;
//                                     border: 2px solid #ddd;
//                                     border-radius: 8px;
//                                     font-size: 16px;
//                                 ">
//                             </div>
//                         </div>
//
//                         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
//                             <div class="form-group">
//                                 <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-bed"></i> عدد الغرف *
//                                 </label>
//                                 <select id="propRooms" required style="
//                                     width: 100%;
//                                     padding: 14px;
//                                     border: 2px solid #ddd;
//                                     border-radius: 8px;
//                                     font-size: 16px;
//                                 ">
//                                     <option value="1">1 غرفة</option>
//                                     <option value="2">2 غرف</option>
//                                     <option value="3">3 غرف</option>
//                                     <option value="4">4 غرف</option>
//                                     <option value="5">5 غرف</option>
//                                     <option value="6">6+ غرف</option>
//                                 </select>
//                             </div>
//
//                             <div class="form-group">
//                                 <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-bath"></i> عدد الحمامات *
//                                 </label>
//                                 <select id="propBathrooms" required style="
//                                     width: 100%;
//                                     padding: 14px;
//                                     border: 2px solid #ddd;
//                                     border-radius: 8px;
//                                     font-size: 16px;
//                                 ">
//                                     <option value="1">1 حمام</option>
//                                     <option value="2">2 حمامات</option>
//                                     <option value="3">3 حمامات</option>
//                                     <option value="4">4 حمامات</option>
//                                     <option value="5">5+ حمامات</option>
//                                 </select>
//                             </div>
//                         </div>
//
//                         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
//                             <div class="form-group">
//                                 <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-ruler-combined"></i> المساحة (م²) *
//                                 </label>
//                                 <input type="text" id="propArea" required placeholder="مثال: 250" style="
//                                     width: 100%;
//                                     padding: 14px;
//                                     border: 2px solid #ddd;
//                                     border-radius: 8px;
//                                     font-size: 16px;
//                                 ">
//                             </div>
//
//                             <div class="form-group">
//                                 <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-tag"></i> الحالة *
//                                 </label>
//                                 <select id="propStatus" required style="
//                                     width: 100%;
//                                     padding: 14px;
//                                     border: 2px solid #ddd;
//                                     border-radius: 8px;
//                                     font-size: 16px;
//                                 ">
//                                     <option value="للبيع">للبيع</option>
//                                     <option value="للإيجار">للإيجار</option>
//                                 </select>
//                             </div>
//                         </div>
//
//                         <div class="form-group" style="margin-bottom: 20px;">
//                             <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                 <i class="fas fa-align-left"></i> الوصف
//                             </label>
//                             <textarea id="propDescription" rows="4" placeholder="أدخل وصفاً مفصلاً للعقار..." style="
//                                 width: 100%;
//                                 padding: 14px;
//                                 border: 2px solid #ddd;
//                                 border-radius: 8px;
//                                 font-size: 16px;
//                                 resize: vertical;
//                                 min-height: 100px;
//                             "></textarea>
//                         </div>
//
//                         <div class="form-group" style="margin-bottom: 20px;">
//                             <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
//                                 <i class="fas fa-image"></i> رابط الصورة *
//                             </label>
//                             <input type="url" id="propImage" required placeholder="https://example.com/image.jpg" style="
//                                 width: 100%;
//                                 padding: 14px;
//                                 border: 2px solid #ddd;
//                                 border-radius: 8px;
//                                 font-size: 16px;
//                             ">
//                             <small style="display: block; margin-top: 5px; color: #7f8c8d;">
//                                 يجب أن يبدأ الرابط بـ http:// أو https://
//                             </small>
//                         </div>
//
//                         <div class="form-group" style="margin-bottom: 20px;">
//                             <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 15px; background: #f8f9fa; border-radius: 8px;">
//                                 <input type="checkbox" id="propFeatured" style="width: 20px; height: 20px;">
//                                 <span style="font-weight: bold; color: #2c3e50;">
//                                     <i class="fas fa-star"></i> وضع كعقار مميز
//                                 </span>
//                             </label>
//                         </div>
//                     </form>
//                 </div>
//
//                 <div class="modal-footer" style="
//                     padding: 20px 25px;
//                     border-top: 1px solid #eee;
//                     display: flex;
//                     justify-content: flex-end;
//                     gap: 15px;
//                 ">
//                     <button onclick="closeAddModal()" style="
//                         padding: 12px 30px;
//                         background: #95a5a6;
//                         color: white;
//                         border: none;
//                         border-radius: 8px;
//                         cursor: pointer;
//                         font-size: 16px;
//                         font-weight: bold;
//                     ">إلغاء</button>
//
//                     <button onclick="submitAddProperty()" style="
//                         padding: 12px 30px;
//                         background: #2ecc71;
//                         color: white;
//                         border: none;
//                         border-radius: 8px;
//                         cursor: pointer;
//                         font-size: 16px;
//                         font-weight: bold;
//                     ">إضافة العقار</button>
//                 </div>
//             </div>
//         </div>
//     `;
//
//     document.body.insertAdjacentHTML('beforeend', modalHTML);
//     document.body.style.overflow = 'hidden';
//
//     console.log("تم فتح نافذة إضافة عقار");
//
// }
//
// // ===== إغلاق النافذة المنبثقة =====
// function closeModal() {
//     const modal = document.getElementById('property-modal');
//     if (modal) {
//         modal.remove();
//         document.body.style.overflow = 'auto';
//     }
// }
//
// // ===== بقية الدوال (نفس الكود السابق بدون تعديلات كبيرة) =====
// // ... باقي الدوال تبقى كما هي مع التأكد من إزالة أي إشارة للصور الافتراضية
//
// // ===== حذف عقار من قاعدة البيانات =====
// async function deleteProperty(id) {
//     if (!confirm("هل أنت متأكد من حذف العقار؟")) return;
//
//     try {
//         const formData = new FormData();
//         formData.append("id", id);
//
//         const res = await fetch(`${apiURL}?action=delete`, {
//             method: "POST",
//             body: formData,
//         });
//
//         const data = await res.json();
//
//         if (data.success) {
//             showNotification("تم حذف العقار بنجاح من قاعدة البيانات!", "success");
//             await loadProperties();
//         } else {
//             showNotification("فشل في حذف العقار", "error");
//         }
//     } catch (error) {
//         console.error("Error deleting property:", error);
//         showNotification("خطأ في الاتصال بالخادم", "error");
//     }
// }
//
// // ===== بقية الدوال تبقى كما هي =====


// ===== البيانات الأولية للعقارات =====

const apiURL = "/project_final/Hw1/PhpFile/properties_api.php";

// تحميل العقارات من قاعدة البيانات
async function loadProperties() {
    try {
        const res = await fetch(`${apiURL}?action=get`);
        if (res.ok) {
            allProperties = await res.json();
            displayedProperties = [...allProperties];
            displayProperties();
            updateStatistics();
            showNotification("تم تحميل العقارات بنجاح", "success");
        } else {
            throw new Error("فشل في تحميل العقارات");
        }
    } catch (error) {
        console.error("Error loading properties:", error);
        showNotification("خطأ في تحميل العقارات", "error");
        // عرض البيانات المحلية كبديل مؤقت
        displayedProperties = [...allProperties];
        displayProperties();
    }
}

// إضافة عقار جديد
async function addProperty(propertyData) {
    try {
        // التأكد من أن جميع الحقول مطلوبة
        if (!propertyData.title || !propertyData.location || !propertyData.type ||
            !propertyData.price || !propertyData.status || !propertyData.area) {
            showNotification("الرجاء ملء جميع الحقول المطلوبة", "error");
            return false;
        }

        const formData = new FormData();

        // إضافة جميع الحقول المطلوبة للـ API
        formData.append("title", propertyData.title);
        formData.append("location", propertyData.location);
        formData.append("price", propertyData.price);
        formData.append("type", propertyData.type);
        formData.append("status", propertyData.status);
        formData.append("description", propertyData.description || "لا يوجد وصف");
        formData.append("rooms", propertyData.rooms || 0);
        formData.append("bathrooms", propertyData.bathrooms || 0);
        formData.append("area", propertyData.area);
        formData.append("image", propertyData.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop");
        formData.append("featured", propertyData.featured ? 1 : 0);

        const res = await fetch(`${apiURL}?action=add`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.success) {
            showNotification("تمت إضافة العقار بنجاح في قاعدة البيانات!", "success");
            // إعادة تحميل العقارات من قاعدة البيانات
            await loadProperties();
            return true;
        } else {
            showNotification("فشل في إضافة العقار: " + data.message, "error");
            return false;
        }
    } catch (error) {
        console.error("Error adding property:", error);
        showNotification("خطأ في الاتصال بالخادم", "error");
        return false;
    }
}

// حذف عقار من قاعدة البيانات
async function deleteProperty(id) {
    if (!confirm("هل أنت متأكد من حذف العقار؟")) return;

    try {
        const formData = new FormData();
        formData.append("id", id);

        const res = await fetch(`${apiURL}?action=delete`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.success) {
            showNotification("تم حذف العقار بنجاح من قاعدة البيانات!", "success");
            // إعادة تحميل العقارات من قاعدة البيانات
            await loadProperties();
        } else {
            showNotification("فشل في حذف العقار", "error");
        }
    } catch (error) {
        console.error("Error deleting property:", error);
        showNotification("خطأ في الاتصال بالخادم", "error");
    }
}

// بيانات أولية مؤقتة (ستستبدل بالبيانات من قاعدة البيانات)
let allProperties = [];

// العقارات المعروضة حالياً
let displayedProperties = [];

// الفلاتر الحالية
let currentFilters = {
    types: ['شقة', 'فيلا', 'استوديو', 'منزل', 'أرض', 'مكتب'],
    statuses: ['للبيع', 'للإيجار'],
    minPrice: 0,
    maxPrice: 1000000,
    rooms: []
};

// ===== تهيئة الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // تحديث التاريخ الحالي
    updateCurrentDate();

    // تحميل العقارات من قاعدة البيانات
    loadProperties();

    // إضافة تفاعلية للأزرار
    initializeButtons();

    // إضافة تأثيرات تفاعلية
    addInteractiveEffects();

    // تهيئة التوب بار
    initializeTopBar();

    // تحديث تصفية السعر
    updatePriceRange();
});

// ===== تحديث التاريخ الحالي =====
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const arabicDate = now.toLocaleDateString('ar-EG', options);
        dateElement.textContent = `اليوم: ${arabicDate}`;
    }
}

// ===== عرض العقارات =====
function displayProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    if (!propertiesGrid) return;

    propertiesGrid.innerHTML = '';

    if (displayedProperties.length === 0) {
        propertiesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد عقارات</h3>
                <p>لم يتم العثور على أي عقارات. حاول إضافة عقار جديد.</p>
            </div>
        `;
        return;
    }

    displayedProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });
}
// ===== عرض نافذة تعديل العقار =====
async function showEditPropertyModal(propertyId) {
    // البحث عن العقار في البيانات المحملة
    const property = allProperties.find(p => p.id == propertyId);
    if (!property) {
        showNotification("العقار غير موجود", "error");
        return;
    }

    // إنشاء النافذة المنبثقة
    const modalHTML = `
        <div class="modal-overlay" id="edit-property-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-edit"></i> تعديل العقار: ${property.title}</h3>
                    <button class="close-modal" onclick="closeEditModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="edit-property-form">
                        <input type="hidden" id="edit-property-id" value="${property.id}">
                        
                        <div class="form-group">
                            <label for="edit-property-name"><i class="fas fa-signature"></i> اسم العقار</label>
                            <input type="text" id="edit-property-name" value="${property.title}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-property-location"><i class="fas fa-map-marker-alt"></i> موقع العقار</label>
                            <input type="text" id="edit-property-location" value="${property.location}" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-property-type"><i class="fas fa-home"></i> النوع</label>
                                <select id="edit-property-type" required>
                                    <option value="">اختر النوع</option>
                                    <option value="شقة" ${property.type === 'شقة' ? 'selected' : ''}>شقة</option>
                                    <option value="فيلا" ${property.type === 'فيلا' ? 'selected' : ''}>فيلا</option>
                                    <option value="استوديو" ${property.type === 'استوديو' ? 'selected' : ''}>استوديو</option>
                                    <option value="منزل" ${property.type === 'منزل' ? 'selected' : ''}>منزل</option>
                                    <option value="أرض" ${property.type === 'أرض' ? 'selected' : ''}>أرض</option>
                                    <option value="مكتب" ${property.type === 'مكتب' ? 'selected' : ''}>مكتب</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-property-price"><i class="fas fa-dollar-sign"></i> السعر ($)</label>
                                <input type="number" id="edit-property-price" value="${property.price}" required min="0">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-property-rooms"><i class="fas fa-bed"></i> عدد الغرف</label>
                                <select id="edit-property-rooms" required>
                                    <option value="1" ${property.rooms == 1 ? 'selected' : ''}>1 غرفة</option>
                                    <option value="2" ${property.rooms == 2 ? 'selected' : ''}>2 غرف</option>
                                    <option value="3" ${property.rooms == 3 ? 'selected' : ''}>3 غرف</option>
                                    <option value="4" ${property.rooms == 4 ? 'selected' : ''}>4 غرف</option>
                                    <option value="5" ${property.rooms == 5 ? 'selected' : ''}>5 غرف</option>
                                    <option value="6" ${property.rooms >= 6 ? 'selected' : ''}>6 غرف فأكثر</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-property-bathrooms"><i class="fas fa-bath"></i> عدد الحمامات</label>
                                <select id="edit-property-bathrooms" required>
                                    <option value="1" ${property.bathrooms == 1 ? 'selected' : ''}>1 حمام</option>
                                    <option value="2" ${property.bathrooms == 2 ? 'selected' : ''}>2 حمامات</option>
                                    <option value="3" ${property.bathrooms == 3 ? 'selected' : ''}>3 حمامات</option>
                                    <option value="4" ${property.bathrooms == 4 ? 'selected' : ''}>4 حمامات</option>
                                    <option value="5" ${property.bathrooms >= 5 ? 'selected' : ''}>5 حمامات فأكثر</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-property-area"><i class="fas fa-ruler-combined"></i> المساحة (م²)</label>
                                <input type="text" id="edit-property-area" value="${property.area}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-property-status"><i class="fas fa-tag"></i> الحالة</label>
                                <select id="edit-property-status" required>
                                    <option value="للبيع" ${property.status === 'للبيع' ? 'selected' : ''}>للبيع</option>
                                    <option value="للإيجار" ${property.status === 'للإيجار' ? 'selected' : ''}>للإيجار</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-property-description"><i class="fas fa-align-left"></i> وصف العقار</label>
                            <textarea id="edit-property-description" rows="4">${property.description || ''}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-property-image-url"><i class="fas fa-image"></i> رابط صورة العقار</label>
                            <input type="url" id="edit-property-image-url" value="${property.image}" placeholder="https://example.com/image.jpg">
                            <small style="color: #aaa;">اتركه فارغاً لاستخدام صورة افتراضية</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-property-image-upload"><i class="fas fa-camera"></i> رفع صورة جديدة</label>
                            <input type="file" id="edit-property-image-upload" accept="image/*">
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="edit-property-featured" ${property.featured == 1 ? 'checked' : ''}>
                                <span><i class="fas fa-star"></i> وضع كعقار مميز</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeEditModal()">إلغاء</button>
                    <button class="btn-primary" onclick="updateProperty(${property.id})">حفظ التعديلات</button>
                </div>
            </div>
        </div>
        
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 4000;
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                background: #1a1a1a;
                width: 90%;
                max-width: 700px;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                overflow: hidden;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px;
                background: linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.2));
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h3 {
                color: white;
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 1.5rem;
            }
            
            .close-modal {
                background: none;
                border: none;
                color: white;
                font-size: 2.2rem;
                cursor: pointer;
                transition: color 0.3s;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .close-modal:hover {
                color: #e74c3c;
                background: rgba(255, 255, 255, 0.1);
            }
            
            .modal-body {
                padding: 25px;
                flex: 1;
                overflow-y: auto;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 8px;
                color: white;
                font-size: 1rem;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                background: rgba(255, 255, 255, 0.07);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.15);
                font-family: 'Cairo', sans-serif;
                font-size: 1rem;
            }
            
            .form-row {
                display: flex;
                gap: 15px;
            }
            
            .form-row .form-group {
                flex: 1;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 12px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                padding: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(255, 255, 255, 0.03);
            }
            
            .modal-footer button {
                padding: 12px 30px;
                min-width: 120px;
            }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// ===== إغلاق نافذة التعديل =====
function closeEditModal() {
    const modal = document.getElementById('edit-property-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// ===== إنشاء بطاقة عقار =====
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.dataset.id = property.id;

    const badgeClass = property.featured == 1 ? 'featured-badge' :
        property.status === 'للبيع' ? 'sale-badge' :
            property.status === 'للإيجار' ? 'rent-badge' : 'sale-badge';

    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop'">
            ${property.featured == 1 ? '<span class="property-badge featured-badge">مميز</span>' : ''}
            ${property.featured != 1 ? `<span class="property-badge ${badgeClass}">${property.status}</span>` : ''}
            <span class="property-price">$${property.price ? property.price.toLocaleString() : '0'}</span>
        </div>
        <div class="property-content">
            <h3 class="property-title">${property.title}</h3>
            <p class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                ${property.location}
            </p>
            <p class="property-description">
                ${property.description}
            </p>
            <div class="property-details">
                <span><i class="fas fa-home"></i> ${property.type}</span>
                <span><i class="fas fa-bed"></i> ${property.rooms} غرف</span>
                <span><i class="fas fa-bath"></i> ${property.bathrooms} حمامات</span>
                <span><i class="fas fa-ruler-combined"></i> ${property.area}</span>
            </div>
            <div class="property-actions">
                <button class="action-btn edit-btn" onclick="showEditPropertyModal(${property.id})">
                    <i class="fas fa-edit"></i>
                    تعديل
                </button>
                <button class="action-btn delete-btn" onclick="deleteProperty(${property.id})">
                    <i class="fas fa-trash"></i>
                    حذف
                </button>
                <button class="action-btn view-btn" onclick="viewPropertyDetails(${property.id})">
                    <i class="fas fa-eye"></i>
                    عرض
                </button>
            </div>
        </div>
    `;

    return card;
}

// ===== تهيئة الأزرار =====
function initializeButtons() {
    // زر التصفية
    const filterBtn = document.getElementById('filter-properties-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', showFilterModal);
    }

    // أزرار عرض العقارات
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // زر البحث
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // إدخال البحث (عند الضغط على Enter)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // تحديث نطاق السعر
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin && priceMax) {
        priceMin.addEventListener('input', updatePriceLabels);
        priceMax.addEventListener('input', updatePriceLabels);
    }
}

// ===== تحديث نطاق السعر =====
function updatePriceRange() {
    if (allProperties.length === 0) return;

    const minPrice = Math.min(...allProperties.map(p => p.price));
    const maxPrice = Math.max(...allProperties.map(p => p.price));

    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');

    if (priceMin && priceMax) {
        priceMin.min = 0;
        priceMin.max = maxPrice;
        priceMin.value = 0;

        priceMax.min = 0;
        priceMax.max = maxPrice * 1.2;
        priceMax.value = maxPrice * 1.2;

        currentFilters.minPrice = 0;
        currentFilters.maxPrice = maxPrice * 1.2;

        updatePriceLabels();
    }
}

function updatePriceLabels() {
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const minLabel = document.getElementById('min-price-label');
    const maxLabel = document.getElementById('max-price-label');

    if (priceMin && priceMax && minLabel && maxLabel) {
        const minValue = parseInt(priceMin.value);
        const maxValue = parseInt(priceMax.value);

        minLabel.textContent = `$${minValue.toLocaleString()}`;
        maxLabel.textContent = `$${maxValue.toLocaleString()}`;

        currentFilters.minPrice = minValue;
        currentFilters.maxPrice = maxValue;
    }
}

// ===== عرض نافذة التصفية =====
function showFilterModal() {
    const filterModal = document.getElementById('filter-modal');
    if (filterModal) {
        filterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ===== إغلاق نافذة التصفية =====
function closeFilterModal() {
    const filterModal = document.getElementById('filter-modal');
    if (filterModal) {
        filterModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== تطبيق التصفية =====
function applyFilters() {
    // جمع أنواع العقارات المحددة
    const typeCheckboxes = document.querySelectorAll('input[name="property-type"]:checked');
    const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);

    // جمع الحالات المحددة
    const statusCheckboxes = document.querySelectorAll('input[name="property-status"]:checked');
    const selectedStatuses = Array.from(statusCheckboxes).map(cb => cb.value);

    // جمع عدد الغرف المحدد
    const roomCheckboxes = document.querySelectorAll('input[name="rooms"]:checked');
    const selectedRooms = Array.from(roomCheckboxes).map(cb => parseInt(cb.value));

    // تحديث المرشحات
    currentFilters.types = selectedTypes;
    currentFilters.statuses = selectedStatuses;
    currentFilters.rooms = selectedRooms;

    // تطبيق التصفية
    filterProperties();

    // إغلاق النافذة
    closeFilterModal();

    // إظهار إشعار
    showNotification('تم تطبيق التصفية بنجاح', 'success');
}

// ===== تصفية العقارات =====
function filterProperties() {
    displayedProperties = allProperties.filter(property => {
        // تصفية حسب النوع
        if (currentFilters.types.length > 0 && !currentFilters.types.includes(property.type)) {
            return false;
        }

        // تصفية حسب الحالة
        if (currentFilters.statuses.length > 0 && !currentFilters.statuses.includes(property.status)) {
            return false;
        }

        // تصفية حسب السعر
        if (property.price < currentFilters.minPrice || property.price > currentFilters.maxPrice) {
            return false;
        }

        // تصفية حسب عدد الغرف
        if (currentFilters.rooms.length > 0) {
            if (currentFilters.rooms.includes(4)) {
                // 4 غرف فأكثر
                if (property.rooms < 4) return false;
            } else {
                if (!currentFilters.rooms.includes(property.rooms)) return false;
            }
        }

        return true;
    });

    displayProperties();
}

// ===== إعادة تعيين التصفية =====
function resetFilters() {
    // إعادة تعيين جميع المربعات
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(cb => cb.checked = true);

    // إعادة تعيين نطاق السعر
    updatePriceRange();

    // إعادة تعيين المرشحات
    currentFilters = {
        types: ['شقة', 'فيلا', 'استوديو', 'منزل', 'أرض', 'مكتب'],
        statuses: ['للبيع', 'للإيجار'],
        minPrice: 0,
        maxPrice: Math.max(...allProperties.map(p => p.price)) * 1.2 || 1000000,
        rooms: []
    };

    // عرض جميع العقارات
    displayedProperties = [...allProperties];
    displayProperties();

    // إغلاق النافذة إذا كانت مفتوحة
    closeFilterModal();

    // إظهار إشعار
    showNotification('تم إعادة تعيين جميع المرشحات', 'info');
}

// ===== تغيير طريقة العرض =====
function changeViewMode(mode) {
    const propertiesGrid = document.getElementById('properties-grid');

    if (mode === 'grid') {
        propertiesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        propertiesGrid.classList.remove('list-view');
    } else if (mode === 'list') {
        propertiesGrid.style.gridTemplateColumns = '1fr';
        propertiesGrid.classList.add('list-view');

        // تعديل البطاقات لعرض القائمة
        document.querySelectorAll('.property-card').forEach(card => {
            card.style.display = 'flex';
            card.style.flexDirection = 'row';
        });
    }
}

// ===== تحميل جميع العقارات =====
function loadAllProperties() {
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // إظهار حالة التحميل
    const originalText = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تحميل جميع العقارات...';
    loadMoreBtn.disabled = true;

    // محاكاة تحميل جميع العقارات
    setTimeout(() => {
        // عرض جميع العقارات بدون تصفية
        displayedProperties = [...allProperties];
        displayProperties();

        // إعادة الزر لحالته الأصلية
        loadMoreBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم تحميل جميع العقارات';

        // إظهار إشعار
        showNotification(`تم تحميل جميع العقارات (${allProperties.length} عقار)`, 'success');

        // إخفاء الزر بعد 3 ثواني
        setTimeout(() => {
            loadMoreBtn.style.display = 'none';
        }, 3000);
    }, 1500);
}

// ===== البحث عن عقار =====
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        displayedProperties = [...allProperties];
        displayProperties();
        return;
    }

    // إظهار حالة البحث
    showNotification(`جاري البحث عن: "${searchTerm}"`, 'info');

    setTimeout(() => {
        displayedProperties = allProperties.filter(property => {
            return property.title.toLowerCase().includes(searchTerm) ||
                property.location.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm) ||
                property.type.toLowerCase().includes(searchTerm);
        });

        displayProperties();

        const count = displayedProperties.length;
        if (count === 0) {
            showNotification('لم يتم العثور على عقارات مطابقة للبحث', 'warning');
        } else {
            showNotification(`تم العثور على ${count} عقار مطابق للبحث`, 'success');
        }
    }, 500);
}

// ===== إضافة عقار جديد =====
function showAddPropertyModal() {
    const modalHTML = `
        <div class="modal-overlay" id="property-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus-circle"></i> إضافة عقار جديد</h3>
                    <button class="close-modal" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="add-property-form">
                        <div class="form-group">
                            <label for="property-name"><i class="fas fa-signature"></i> اسم العقار</label>
                            <input type="text" id="property-name" placeholder="أدخل اسم العقار" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="property-location"><i class="fas fa-map-marker-alt"></i> موقع العقار</label>
                            <input type="text" id="property-location" placeholder="أدخل موقع العقار" required>
                        </div>
                            <div class="form-group">
                                <label for="property-gallery"><i class="fas fa-images"></i> معرض الصور (افصل بين الصور بفواصل)</label>
                                     <textarea id="property-gallery" rows="3" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"></textarea>
                                    <small style="color: #aaa;">يمكنك إضافة روابط متعددة مفصولة بفواصل</small>
                           </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="property-type"><i class="fas fa-home"></i> النوع</label>
                                <select id="property-type" required style="color: #ffffff; background: rgba(255, 255, 255, 0.05);">
                                    <option value="" style="color: #ffffff; background: #1a1a1a;">اختر النوع</option>
                                    <option value="شقة" style="color: #ffffff; background: #1a1a1a;">شقة</option>
                                    <option value="فيلا" style="color: #ffffff; background: #1a1a1a;">فيلا</option>
                                    <option value="استوديو" style="color: #ffffff; background: #1a1a1a;">استوديو</option>
                                    <option value="منزل" style="color: #ffffff; background: #1a1a1a;">منزل</option>
                                    <option value="أرض" style="color: #ffffff; background: #1a1a1a;">أرض</option>
                                    <option value="مكتب" style="color: #ffffff; background: #1a1a1a;">مكتب</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="property-price"><i class="fas fa-dollar-sign"></i> السعر ($)</label>
                                <input type="number" id="property-price" placeholder="السعر" required min="0">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="property-rooms"><i class="fas fa-bed"></i> عدد الغرف</label>
                                <select id="property-rooms" required style="color: #ffffff; background: rgba(255, 255, 255, 0.05);">
                                    <option value="1" style="color: #ffffff; background: #1a1a1a;">1 غرفة</option>
                                    <option value="2" style="color: #ffffff; background: #1a1a1a;">2 غرف</option>
                                    <option value="3" style="color: #ffffff; background: #1a1a1a;">3 غرف</option>
                                    <option value="4" style="color: #ffffff; background: #1a1a1a;">4 غرف</option>
                                    <option value="5" style="color: #ffffff; background: #1a1a1a;">5 غرف</option>
                                    <option value="6" style="color: #ffffff; background: #1a1a1a;">6 غرف فأكثر</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="property-bathrooms"><i class="fas fa-bath"></i> عدد الحمامات</label>
                                <select id="property-bathrooms" required style="color: #ffffff; background: rgba(255, 255, 255, 0.05);">
                                    <option value="1" style="color: #ffffff; background: #1a1a1a;">1 حمام</option>
                                    <option value="2" style="color: #ffffff; background: #1a1a1a;">2 حمامات</option>
                                    <option value="3" style="color: #ffffff; background: #1a1a1a;">3 حمامات</option>
                                    <option value="4" style="color: #ffffff; background: #1a1a1a;">4 حمامات</option>
                                    <option value="5" style="color: #ffffff; background: #1a1a1a;">5 حمامات فأكثر</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="property-area"><i class="fas fa-ruler-combined"></i> المساحة (م²)</label>
                                <input type="text" id="property-area" placeholder="المساحة بالمتر المربع" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="property-status"><i class="fas fa-tag"></i> الحالة</label>
                                <select id="property-status" required style="color: #ffffff; background: rgba(255, 255, 255, 0.05);">
                                    <option value="للبيع" style="color: #ffffff; background: #1a1a1a;">للبيع</option>
                                    <option value="للإيجار" style="color: #ffffff; background: #1a1a1a;">للإيجار</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="property-description"><i class="fas fa-align-left"></i> وصف العقار</label>
                            <textarea id="property-description" rows="4" placeholder="أدخل وصف مفصل للعقار"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="property-image-url"><i class="fas fa-image"></i> رابط صورة العقار</label>
                            <input type="url" id="property-image-url" placeholder="https://example.com/image.jpg">
                            <small style="color: #aaa;">اتركه فارغاً لاستخدام صورة افتراضية</small>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="property-featured">
                                <span><i class="fas fa-star"></i> وضع كعقار مميز</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()" style="padding: 15px 30px; font-size: 1.1rem;">إلغاء</button>
                    <button class="btn-primary" onclick="submitPropertyForm()" style="padding: 15px 30px; font-size: 1.1rem;">إضافة العقار</button>
                </div>
            </div>
        </div>
        
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 4000;
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                background: #1a1a1a;
                width: 90%;
                max-width: 700px;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                overflow: hidden;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h3 {
                color: white;
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 1.5rem;
            }
            
            .close-modal {
                background: none;
                border: none;
                color: white;
                font-size: 2.2rem;
                cursor: pointer;
                transition: color 0.3s;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .close-modal:hover {
                color: #e74c3c;
                background: rgba(255, 255, 255, 0.1);
            }
            
            .modal-body {
                padding: 25px;
                flex: 1;
                overflow-y: auto;
            }
            
            .form-group {
                margin-bottom: 25px;
            }
            
            .form-group label {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
                color: #ddd;
                font-size: 1.05rem;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 15px;
                background: rgba(255, 255, 255, 0.07);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 10px;
                color: #ffffff !important;
                font-family: 'Cairo', sans-serif;
                font-size: 1.05rem;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
            }
            
            /* حل مشكلة لون النص في القوائم المنسدلة */
            .form-group select option {
                background: #1a1a1a !important;
                color: #ffffff !important;
                padding: 12px !important;
            }
            
            .form-row {
                display: flex;
                gap: 20px;
            }
            
            .form-row .form-group {
                flex: 1;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                transition: background 0.3s ease;
            }
            
            .checkbox-label:hover {
                background: rgba(255, 255, 255, 0.08);
            }
            
            .checkbox-label input[type="checkbox"] {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            
            .checkbox-label span {
                color: #ddd;
                font-size: 1.05rem;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 20px;
                padding: 25px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(255, 255, 255, 0.03);
            }
            
            .modal-footer button {
                min-height: 55px;
                min-width: 150px;
                font-weight: 600;
            }
            
            small {
                display: block;
                margin-top: 5px;
            }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// ===== إغلاق النافذة المنبثقة =====
function closeModal() {
    const modal = document.getElementById('property-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// ===== إرسال نموذج إضافة العقار =====
async function submitPropertyForm() {
    const name = document.getElementById('property-name');
    const location = document.getElementById('property-location');
    const type = document.getElementById('property-type');
    const price = document.getElementById('property-price');
    const rooms = document.getElementById('property-rooms');
    const bathrooms = document.getElementById('property-bathrooms');
    const area = document.getElementById('property-area');
    const status = document.getElementById('property-status');
    const description = document.getElementById('property-description');
    const imageUrl = document.getElementById('property-image-url');
    const featured = document.getElementById('property-featured');

    // التحقق من الحقول المطلوبة
    if (!name.value || !location.value || !type.value || !price.value || !rooms.value || !bathrooms.value || !area.value || !status.value) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    const gallery = document.getElementById('property-gallery');
    // جمع البيانات
    const propertyData = {
        title: name.value,
        location: location.value,
        type: type.value,
        price: parseInt(price.value),
        rooms: parseInt(rooms.value),
        bathrooms: parseInt(bathrooms.value),
        area: area.value,
        status: status.value,
        description: description.value || "لا يوجد وصف",
        image: imageUrl.value || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
        featured: featured ? featured.checked : false,
        gallery: gallery.value || imageUrl.value || ""
    };

    // إرسال البيانات للخادم
    const success = await addProperty(propertyData);

    if (success) {
        // إغلاق النافذة
        closeModal();
    }
}

// ===== تحديث العقار =====
// ===== تحديث عقار في قاعدة البيانات =====
async function updateProperty(propertyId) {
    try {
        // جمع البيانات من النموذج
        const title = document.getElementById('edit-property-name').value;
        const location = document.getElementById('edit-property-location').value;
        const type = document.getElementById('edit-property-type').value;
        const price = parseInt(document.getElementById('edit-property-price').value);
        const rooms = parseInt(document.getElementById('edit-property-rooms').value);
        const bathrooms = parseInt(document.getElementById('edit-property-bathrooms').value);
        const area = document.getElementById('edit-property-area').value;
        const status = document.getElementById('edit-property-status').value;
        const description = document.getElementById('edit-property-description').value;
        const featured = document.getElementById('edit-property-featured').checked ? 1 : 0;

        // معالجة الصورة - هنا تحتاج لمعالجة رفع الصورة بشكل حقيقي
        // حالياً سنستخدم الصورة الحالية أو الافتراضية
        const imageInput = document.getElementById('edit-property-image-upload');
        let imageUrl = '';

        if (imageInput.files && imageInput.files[0]) {
            // في تطبيق حقيقي، هنا ترفع الصورة وتأخذ رابطها
            imageUrl = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop";
            showNotification("تم حفظ التعديلات، سيتم رفع الصورة في النسخة الكاملة", "info");
        } else {
            // استخدم الصورة الحالية
            const property = allProperties.find(p => p.id == propertyId);
            imageUrl = property ? property.image : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop";
        }

        // إنشاء FormData لإرسال البيانات
        const formData = new FormData();
        formData.append("id", propertyId);
        formData.append("title", title);
        formData.append("location", location);
        formData.append("type", type);
        formData.append("price", price);
        formData.append("rooms", rooms);
        formData.append("bathrooms", bathrooms);
        formData.append("area", area);
        formData.append("status", status);
        formData.append("description", description || "لا يوجد وصف");
        formData.append("image", imageUrl);
        formData.append("featured", featured);
        formData.append("gallery", imageUrl); // يمكن تعديله ليدعم معرض صور

        // إرسال طلب التحديث للخادم
        const res = await fetch(`${apiURL}?action=update`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.success) {
            showNotification("✅ تم تحديث العقار بنجاح في قاعدة البيانات!", "success");

            // إعادة تحميل العقارات من قاعدة البيانات
            await loadProperties();

            // إغلاق نافذة التعديل
            closeEditModal();
        } else {
            showNotification("❌ فشل في تحديث العقار: " + data.message, "error");
        }
    } catch (error) {
        console.error("Error updating property:", error);
        showNotification("خطأ في الاتصال بالخادم", "error");
    }
}

// ===== عرض تفاصيل العقار =====
function viewPropertyDetails(propertyId) {
    const property = allProperties.find(p => p.id == propertyId);
    if (!property) return;

    alert(`تفاصيل العقار:\n\n` +
        `الاسم: ${property.title}\n` +
        `الموقع: ${property.location}\n` +
        `النوع: ${property.type}\n` +
        `السعر: $${property.price.toLocaleString()}\n` +
        `الغرف: ${property.rooms}\n` +
        `الحمامات: ${property.bathrooms}\n` +
        `المساحة: ${property.area}\n` +
        `الحالة: ${property.status}\n` +
        `الوصف: ${property.description}\n` +
        `${property.featured == 1 ? '⭐ عقار مميز' : ''}`);
}

// ===== تحديث الإحصائيات =====
function updateStatistics() {
    const totalProperties = allProperties.length;
    const featuredProperties = allProperties.filter(p => p.featured == 1).length;
    const soldProperties = allProperties.filter(p => p.status === 'مباع').length;
    const totalValue = allProperties.reduce((sum, p) => sum + p.price, 0);

    // تحديث الإحصائيات في الواجهة
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = totalProperties;
        statNumbers[1].textContent = featuredProperties;
        statNumbers[2].textContent = `$${(totalValue / 1000000).toFixed(1)}M`;
        statNumbers[3].textContent = soldProperties;
    }
}

// ===== بقية الدوال (باقي الكود الأصلي) =====
function addInteractiveEffects() {
    // تأثير التمرير على البطاقات
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

function showNotification(message, type) {
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }

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
        left: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        margin: 0 auto;
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

function initializeTopBar() {
    const logoutSection = document.getElementById('logout-section');
    if (logoutSection) {
        logoutSection.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                showNotification('جاري تسجيل الخروج...', 'info');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            }
        });
    }
}

// ===== إضافة الأنيميشن للإشعارات =====
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-spinner {
        margin: 20px 0;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    .no-results {
        text-align: center;
        padding: 60px 20px;
        grid-column: 1 / -1;
    }
    
    .no-results i {
        font-size: 4rem;
        color: rgba(255, 255, 255, 0.2);
        margin-bottom: 20px;
    }
    
    .no-results h3 {
        color: #aaa;
        margin-bottom: 10px;
    }
    
    .no-results p {
        color: #777;
        margin-bottom: 20px;
    }
`;
document.head.appendChild(style);

// ===== الدوال الخاصة بالتنقل =====
function goToShoppingPage() {
    window.location.href = "shopping.html";
}

function goToLoginPage() {
    window.location.href = "login.html";
}

function goToHome() {
    window.location.href = "HW1.html";
}

function showMapView() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.innerHTML = `
            <i class="fas fa-map-marked-alt"></i>
            <h3>عرض الخريطة</h3>
            <p>يتم تحميل الخريطة التفاعلية لعرض جميع العقارات...</p>
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
            <button class="btn-secondary" onclick="goBackToListView()">
                <i class="fas fa-arrow-right"></i>
                العودة للقائمة
            </button>
        `;
    }
}

function goBackToListView() {
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(opt => opt.classList.remove('active'));
    viewOptions[0].classList.add('active');
}

// ===== تحديث اللوحة كل دقيقة =====
setInterval(updateCurrentDate, 60000);

console.log('لوحة إدارة العقارات المحدثة جاهزة للاستخدام!');