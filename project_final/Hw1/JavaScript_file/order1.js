// // دالة التوجه للصفحة الرئيسية
// function goToHome() {
//     window.location.href = 'HW1.html';
// }
//
// // دالة التوجه لصفحة التسوق
// function goToShoppingPage() {
//     window.location.href = 'shopping.html';
// }
//
// // بيانات الطلب
// let orderItems = [];
// let selectedPayment = 'cash';
// let selectedDeliveryDate = '';
// let selectedDeliveryTime = '';
//
// // دالة تحميل الطلب من localStorage
// function loadOrderFromCart() {
//     try {
//         console.log('🔍 جاري تحميل بيانات الطلب من localStorage...');
//
//         // تحميل البيانات من localStorage
//         const savedOrder = localStorage.getItem('currentOrder');
//
//         if (savedOrder) {
//             const orderData = JSON.parse(savedOrder);
//             console.log('✅ تم تحميل بيانات الطلب:', orderData);
//
//             if (orderData.items && orderData.items.length > 0) {
//                 orderItems = orderData.items;
//                 displayOrderItems();
//                 calculateTotals();
//
//                 // إضافة شريط التحمين لإظهار البيانات
//                 setTimeout(() => {
//                     const orderContainer = document.getElementById('order-items-container');
//                     if (orderContainer && orderContainer.querySelector('.empty-order')) {
//                         orderContainer.innerHTML = '';
//                         displayOrderItems();
//                     }
//                 }, 100);
//
//             } else {
//                 showEmptyCartMessage();
//             }
//         } else {
//             console.log('⚠️ لا توجد بيانات طلب في localStorage');
//             showEmptyCartMessage();
//         }
//     } catch (error) {
//         console.error('❌ خطأ في تحميل الطلب:', error);
//         showEmptyCartMessage();
//     }
// }
//
// // دالة عرض رسالة السلة الفارغة
// function showEmptyCartMessage() {
//     const container = document.getElementById('order-items-container');
//     if (container) {
//         container.innerHTML = `
//             <div class="empty-order">
//                 <p>⚠️ لم يتم العثور على طلب</p>
//                 <p>يبدو أن سلة التسوق فارغة أو لم تقم بإضافة أي عقارات.</p>
//                 <a href="shopping.html" class="back-to-shopping">🛒 العودة للتسوق</a>
//                 <br><br>
//                 <a href="HW1.html" class="back-to-shopping" style="background: #3498db;">🏠 الصفحة الرئيسية</a>
//             </div>
//         `;
//     }
//
//     // تعطيل زر الإرسال
//     const submitBtn = document.getElementById('submit-btn');
//     if (submitBtn) {
//         submitBtn.disabled = true;
//         submitBtn.textContent = 'السلة فارغة';
//     }
// }
//
// // دالة عرض عناصر الطلب
// function displayOrderItems() {
//     const container = document.getElementById('order-items-container');
//
//     if (!container || orderItems.length === 0) {
//         showEmptyCartMessage();
//         return;
//     }
//
//     let html = '<div class="order-summary">';
//
//     orderItems.forEach(item => {
//         const itemTotal = item.price * item.quantity;
//         html += `
//             <div class="order-item">
//                 <div class="item-info">
//                     <h4>${item.title}</h4>
//                     <p>${item.saleType} - ${item.type}</p>
//                     <p><small>الموقع: ${item.location}</small></p>
//                     <p><small>الكمية: ${item.quantity}</small></p>
//                 </div>
//                 <div class="item-price">
//                     $${itemTotal.toLocaleString()}
//                 </div>
//             </div>
//         `;
//     });
//
//     html += '</div>';
//     container.innerHTML = html;
// }
//
// // دالة حساب الإجماليات
// function calculateTotals() {
//     if (!orderItems || orderItems.length === 0) {
//         document.getElementById('subtotal').textContent = "$0.00";
//         document.getElementById('tax').textContent = "$0.00";
//         document.getElementById('total').textContent = "$0.00";
//         return;
//     }
//
//     const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const tax = subtotal * 0.10; // 10% ضريبة
//     const total = subtotal + tax;
//
//     document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
//     document.getElementById('tax').textContent = `$${tax.toLocaleString()}`;
//     document.getElementById('total').textContent = `$${total.toLocaleString()}`;
// }
//
// // دالة اختيار طريقة الدفع
// function selectPayment(method) {
//     selectedPayment = method;
//
//     // إزالة التحديد من جميع العناصر
//     document.querySelectorAll('.payment-method').forEach(el => {
//         el.classList.remove('selected');
//     });
//
//     // إضافة التحديد للعنصر المختار
//     document.getElementById(`${method}-payment`).classList.add('selected');
//
//     // إظهار/إخفاء تفاصيل الدفع
//     document.getElementById('card-details').classList.toggle('show', method === 'card');
//     document.getElementById('cash-details').classList.toggle('show', method === 'cash');
//
//     // إخفاء رسائل الخطأ
//     hideAllErrors();
// }
//
// // دالة اختيار خيار الاستلام
// function selectDeliveryOption(element) {
//     document.querySelectorAll('.delivery-option').forEach(el => {
//         el.classList.remove('selected');
//     });
//     element.classList.add('selected');
// }
//
// // دالة إخفاء جميع رسائل الخطأ
// function hideAllErrors() {
//     document.querySelectorAll('.error-message').forEach(el => {
//         el.classList.remove('show');
//     });
//     document.querySelectorAll('.form-input').forEach(el => {
//         el.classList.remove('error');
//     });
// }
//
// // دالة عرض خطأ
// function showError(fieldId, message) {
//     const field = document.getElementById(fieldId);
//     const errorElement = document.getElementById(fieldId + '-error');
//
//     if (field) field.classList.add('error');
//     if (errorElement) {
//         errorElement.textContent = message;
//         errorElement.classList.add('show');
//     }
// }
//
// // دالة إخفاء خطأ
// function hideError(fieldId) {
//     const field = document.getElementById(fieldId);
//     const errorElement = document.getElementById(fieldId + '-error');
//
//     if (field) field.classList.remove('error');
//     if (errorElement) errorElement.classList.remove('show');
// }
//
// // دالة التحقق من الحقول الأساسية
// function validateRequiredFields() {
//     let isValid = true;
//
//     const requiredFields = [
//         { id: 'full-name', name: 'الاسم الكامل' },
//         { id: 'phone', name: 'رقم الهاتف' },
//         { id: 'email', name: 'البريد الإلكتروني' },
//         { id: 'address', name: 'العنوان' }
//     ];
//
//     requiredFields.forEach(field => {
//         const value = document.getElementById(field.id).value.trim();
//         if (!value) {
//             showError(field.id, `${field.name} مطلوب`);
//             isValid = false;
//         } else {
//             hideError(field.id);
//         }
//     });
//
//     // التحقق من صحة البريد الإلكتروني
//     const email = document.getElementById('email').value.trim();
//     if (email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             showError('email', 'بريد إلكتروني غير صحيح');
//             isValid = false;
//         }
//     }
//
//     // التحقق من رقم الهاتف
//     const phone = document.getElementById('phone').value.trim();
//     if (phone && !/^\d+$/.test(phone.replace(/\s/g, ''))) {
//         showError('phone', 'رقم هاتف غير صحيح');
//         isValid = false;
//     }
//
//     return isValid;
// }
//
// // دالة التحقق من تفاصيل البطاقة
// function validateCardDetails() {
//     if (selectedPayment !== 'card') return true;
//
//     let isValid = true;
//
//     // رقم البطاقة
//     const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
//     if (!cardNumber || cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
//         showError('card-number', 'رقم بطاقة غير صحيح (16 رقم)');
//         isValid = false;
//     } else {
//         hideError('card-number');
//     }
//
//     // اسم حامل البطاقة
//     const cardName = document.getElementById('card-name').value.trim();
//     if (!cardName || cardName.length < 3) {
//         showError('card-name', 'اسم حامل البطاقة مطلوب');
//         isValid = false;
//     } else {
//         hideError('card-name');
//     }
//
//     // تاريخ الانتهاء
//     const cardExpiry = document.getElementById('card-expiry').value.trim();
//     if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
//         showError('card-expiry', 'تاريخ انتهاء غير صحيح (MM/YY)');
//         isValid = false;
//     } else {
//         hideError('card-expiry');
//     }
//
//     // CVC/CVV
//     const cardCvc = document.getElementById('card-cvc').value.trim();
//     if (!cardCvc || !/^\d{3,4}$/.test(cardCvc)) {
//         showError('card-cvc', 'رمز CVC/CVV غير صحيح (3-4 أرقام)');
//         isValid = false;
//     } else {
//         hideError('card-cvc');
//     }
//
//     return isValid;
// }
//
// // دالة التحقق من تفاصيل الاستلام
// function validateDeliveryDetails() {
//     if (selectedPayment !== 'cash') return true;
//
//     let isValid = true;
//
//     // تاريخ الاستلام
//     const deliveryDate = document.getElementById('delivery-date').value;
//     if (!deliveryDate) {
//         showError('delivery-date', 'يرجى اختيار تاريخ الاستلام');
//         isValid = false;
//     } else {
//         hideError('delivery-date');
//         selectedDeliveryDate = deliveryDate;
//     }
//
//     // وقت الاستلام
//     const selectedTimeSlot = document.querySelector('.time-slot.selected');
//     if (!selectedTimeSlot) {
//         showError('delivery-time', 'يرجى اختيار وقت الاستلام');
//         isValid = false;
//     } else {
//         hideError('delivery-time');
//         selectedDeliveryTime = selectedTimeSlot.textContent;
//     }
//
//     return isValid;
// }
//
// // دالة تنسيق رقم البطاقة
// function formatCardNumber(input) {
//     let value = input.value.replace(/\D/g, '');
//     value = value.slice(0, 16);
//
//     // إضافة مسافات كل 4 أرقام
//     let formatted = '';
//     for (let i = 0; i < value.length; i++) {
//         if (i > 0 && i % 4 === 0) {
//             formatted += ' ';
//         }
//         formatted += value[i];
//     }
//
//     input.value = formatted;
//     updateCardVisual();
// }
//
// // دالة تحديث عرض البطاقة
// function updateCardVisual() {
//     const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
//     const cardName = document.getElementById('card-name').value || 'اسم حامل البطاقة';
//     const cardExpiry = document.getElementById('card-expiry').value || 'MM/YY';
//
//     // تحديث رقم البطاقة
//     const cardNumberDisplay = document.getElementById('card-number-display');
//     if (cardNumberDisplay) {
//         if (cardNumber.length >= 4) {
//             const lastFour = cardNumber.slice(-4);
//             const masked = '•••• •••• •••• ' + lastFour;
//             cardNumberDisplay.textContent = masked;
//         } else {
//             cardNumberDisplay.textContent = '•••• •••• •••• ••••';
//         }
//     }
//
//     // تحديث اسم حامل البطاقة
//     const cardNameDisplay = document.getElementById('card-name-display');
//     if (cardNameDisplay) {
//         cardNameDisplay.textContent = cardName;
//     }
//
//     // تحديث تاريخ الانتهاء
//     const cardExpiryDisplay = document.getElementById('card-expiry-display');
//     if (cardExpiryDisplay) {
//         cardExpiryDisplay.textContent = cardExpiry;
//     }
// }
//
// // دالة تنسيق تاريخ الانتهاء
// function formatExpiryDate(input) {
//     let value = input.value.replace(/\D/g, '');
//     value = value.slice(0, 4);
//
//     if (value.length >= 2) {
//         value = value.slice(0, 2) + '/' + value.slice(2, 4);
//     }
//
//     input.value = value;
//     updateCardVisual();
// }
//
// // دالة تنسيق CVC
// function formatCVC(input) {
//     let value = input.value.replace(/\D/g, '');
//     value = value.slice(0, 4);
//     input.value = value;
// }
//
// // دالة إنشاء خيارات الوقت
// function createTimeSlots() {
//     const timeSlotsContainer = document.getElementById('time-slots');
//     if (!timeSlotsContainer) return;
//
//     const timeSlots = [
//         '9:00 صباحاً', '10:00 صباحاً', '11:00 صباحاً',
//         '12:00 ظهراً', '1:00 ظهراً', '2:00 ظهراً',
//         '3:00 عصراً', '4:00 عصراً', '5:00 عصراً'
//     ];
//
//     let html = '';
//     timeSlots.forEach(time => {
//         html += `<div class="time-slot" onclick="selectTimeSlot(this)">${time}</div>`;
//     });
//
//     timeSlotsContainer.innerHTML = html;
//
//     // تحديد الوقت الأول افتراضياً
//     const firstTimeSlot = timeSlotsContainer.querySelector('.time-slot');
//     if (firstTimeSlot) {
//         firstTimeSlot.classList.add('selected');
//         selectedDeliveryTime = firstTimeSlot.textContent;
//     }
// }
//
// // دالة اختيار وقت
// function selectTimeSlot(element) {
//     document.querySelectorAll('.time-slot').forEach(el => {
//         el.classList.remove('selected');
//     });
//     element.classList.add('selected');
//     selectedDeliveryTime = element.textContent;
//     hideError('delivery-time');
// }
//
// // دالة تهيئة منتقي التاريخ
// function setupDatePicker() {
//     const dateInput = document.getElementById('delivery-date');
//     if (!dateInput) return;
//
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
//
//     // تعيين الحد الأدنى لليوم التالي
//     const minDate = tomorrow.toISOString().split('T')[0];
//
//     // تعيين الحد الأقصى لشهر من الآن
//     const maxDate = new Date(today);
//     maxDate.setMonth(maxDate.getMonth() + 1);
//     const maxDateStr = maxDate.toISOString().split('T')[0];
//
//     dateInput.min = minDate;
//     dateInput.max = maxDateStr;
//
//     // تعيين تاريخ افتراضي (بعد 3 أيام)
//     const defaultDate = new Date(today);
//     defaultDate.setDate(defaultDate.getDate() + 3);
//     dateInput.value = defaultDate.toISOString().split('T')[0];
//     selectedDeliveryDate = dateInput.value;
//
//     // إضافة حدث للتغيير
//     dateInput.addEventListener('change', function() {
//         selectedDeliveryDate = this.value;
//         hideError('delivery-date');
//     });
// }
//
// // دالة إتمام الطلب
// async function submitOrder(event) {
//     event.preventDefault();
//
//     // إخفاء جميع الأخطاء السابقة
//     hideAllErrors();
//
//     // التحقق من وجود عناصر في الطلب
//     if (!orderItems || orderItems.length === 0) {
//         alert('⚠️ لا توجد عقارات في الطلب! يرجى العودة للتسوق.');
//         window.location.href = 'shopping.html';
//         return;
//     }
//
//     // التحقق من جميع الشروط
//     if (!validateRequiredFields()) return;
//     if (!validateCardDetails()) return;
//     if (!validateDeliveryDetails()) return;
//
//     // جمع بيانات الطلب
//     const orderData = {
//         customer: {
//             fullName: document.getElementById('full-name').value.trim(),
//             phone: document.getElementById('phone').value.trim(),
//             email: document.getElementById('email').value.trim(),
//             address: document.getElementById('address').value.trim(),
//             deliveryAddress: document.getElementById('delivery-address').value.trim() ||
//                 document.getElementById('address').value.trim(),
//             notes: document.getElementById('notes').value.trim() || ''
//         },
//         payment: {
//             method: selectedPayment,
//             details: selectedPayment === 'card' ? {
//                 cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
//                 cardName: document.getElementById('card-name').value.trim(),
//                 cardExpiry: document.getElementById('card-expiry').value.trim(),
//                 cardCvc: document.getElementById('card-cvc').value.trim()
//             } : {
//                 deliveryDate: selectedDeliveryDate,
//                 deliveryTime: selectedDeliveryTime,
//                 meetingLocation: 'مقر شركة العقارات الشرقية المميزة - وسط المدينة'
//             }
//         },
//         orderItems: orderItems,
//         subtotal: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
//         tax: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.10,
//         total: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.10,
//         orderDate: new Date().toLocaleString('ar-SA'),
//         orderId: 'ORD-' + Date.now()
//     };
//
//     // تغيير حالة زر الإرسال
//     const submitBtn = document.getElementById('submit-btn');
//     const originalText = submitBtn.textContent;
//     submitBtn.disabled = true;
//     submitBtn.textContent = 'جاري معالجة الطلب...';
//
//     try {
//         // حفظ تفاصيل الطلب في localStorage
//         localStorage.setItem('confirmedOrder', JSON.stringify(orderData));
//
//         // مسح سلة التسوق القديمة
//         localStorage.removeItem('currentOrder');
//
//         // إرسال البريد الإلكتروني (محاكاة)
//         await sendEmailConfirmation(orderData);
//
//         // إظهار رسالة النجاح
//         showSuccessMessage(orderData);
//
//     } catch (error) {
//         console.error('❌ خطأ في إرسال الطلب:', error);
//         alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
//         submitBtn.disabled = false;
//         submitBtn.textContent = originalText;
//     }
// }
//
// // دالة إرسال تأكيد البريد الإلكتروني (محاكاة)
// function sendEmailConfirmation(orderData) {
//     return new Promise((resolve) => {
//         console.log('📧 جاري إرسال تأكيد البريد الإلكتروني إلى:', orderData.customer.email);
//
//         // محاكاة إرسال البريد
//         setTimeout(() => {
//             console.log('✅ تم إرسال البريد الإلكتروني بنجاح');
//             console.log('📋 محتوى البريد:', createEmailContent(orderData));
//             resolve(true);
//         }, 2000);
//     });
// }
//
// // دالة إنشاء محتوى البريد
// function createEmailContent(orderData) {
//     const itemsList = orderData.orderItems.map(item =>
//         `- ${item.title} (${item.saleType}): $${item.price.toLocaleString()} × ${item.quantity}`
//     ).join('\n');
//
//     const deliveryInfo = orderData.payment.method === 'cash' ? `
//         📅 تاريخ الاستلام: ${orderData.payment.details.deliveryDate}
//         ⏰ وقت الاستلام: ${orderData.payment.details.deliveryTime}
//         📍 موقع الاستلام: ${orderData.payment.details.meetingLocation}
//     ` : `
//         💳 طريقة الدفع: البطاقة المصرفية
//         ✅ تمت معالجة الدفع بنجاح
//     `;
//
//     return `
//         موضوع: تأكيد طلبك من العقارات الشرقية المميزة
//
//         عزيزي/عزيزتي ${orderData.customer.fullName},
//
//         نود إعلامك بأننا استلمنا طلبك بنجاح. إليك تفاصيل الطلب:
//
//         📋 رقم الطلب: ${orderData.orderId}
//         📅 تاريخ الطلب: ${orderData.orderDate}
//
//         🏠 العقارات المطلوبة:
//         ${itemsList}
//
//         💰 الإجماليات:
//         - المجموع الفرعي: $${orderData.subtotal.toLocaleString()}
//         - الضرائب (10%): $${orderData.tax.toLocaleString()}
//         - الإجمالي النهائي: $${orderData.total.toLocaleString()}
//
//         ${deliveryInfo}
//
//         📝 ملاحظات العميل: ${orderData.customer.notes || 'لا توجد ملاحظات'}
//
//         📧 معلومات التواصل:
//         - الاسم: ${orderData.customer.fullName}
//         - الهاتف: ${orderData.customer.phone}
//         - البريد الإلكتروني: ${orderData.customer.email}
//         - العنوان: ${orderData.customer.address}
//
//         شكراً لاختيارك العقارات الشرقية المميزة!
//
//         مع أطيب التحيات،
//         فريق العقارات الشرقية المميزة
//         📞 1234567890
//         📧 info@eastern-estates.com
//     `;
// }
//
// // دالة عرض رسالة النجاح
// function showSuccessMessage(orderData) {
//     const successMessage = document.getElementById('success-message');
//     const orderForm = document.getElementById('order-form');
//     const submitBtn = document.getElementById('submit-btn');
//
//     if (successMessage) {
//         const deliveryInfo = orderData.payment.method === 'cash' ? `
//             <p><strong>تاريخ الاستلام:</strong> ${orderData.payment.details.deliveryDate}</p>
//             <p><strong>وقت الاستلام:</strong> ${orderData.payment.details.deliveryTime}</p>
//             <p><strong>موقع الاستلام:</strong> ${orderData.payment.details.meetingLocation}</p>
//         ` : `
//             <p><strong>طريقة الدفع:</strong> البطاقة المصرفية</p>
//             <p>✅ تمت معالجة الدفع بنجاح</p>
//         `;
//
//         successMessage.innerHTML = `
//             <h3>🎉 تم تأكيد طلبك بنجاح!</h3>
//             <div class="confirmation-details">
//                 <p><strong>رقم الطلب:</strong> ${orderData.orderId}</p>
//                 <p><strong>الاسم:</strong> ${orderData.customer.fullName}</p>
//                 <p><strong>البريد الإلكتروني:</strong> ${orderData.customer.email}</p>
//                 <p><strong>المبلغ الإجمالي:</strong> $${orderData.total.toLocaleString()}</p>
//                 ${deliveryInfo}
//                 <hr>
//                 <p style="margin-top: 15px; font-style: italic;">
//                     <strong>رسالة من شركة العقارات الشرقية المميزة:</strong><br>
//                     نامل أن تكون بخير! تم إرسال تأكيد طلبك إلى بريدك الإلكتروني.
//                     سيتم التواصل معك قريباً لتأكيد التفاصيل النهائية.
//                 </p>
//             </div>
//             <div style="margin-top: 20px;">
//                 <a href="shopping.html" class="back-to-shopping">🛒 العودة للتسوق</a>
//                 <a href="HW1.html" class="back-to-shopping" style="background: #3498db; margin-right: 10px;">🏠 الصفحة الرئيسية</a>
//             </div>
//         `;
//         successMessage.classList.add('show');
//     }
//
//     if (orderForm) {
//         orderForm.style.display = 'none';
//     }
//
//     if (submitBtn) {
//         submitBtn.style.display = 'none';
//     }
// }
//
// // تهيئة الصفحة عند التحميل
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('🚀 تهيئة صفحة الطلب...');
//
//     // تحميل بيانات الطلب
//     loadOrderFromCart();
//
//     // تهيئة طريقة الدفع الافتراضية
//     selectPayment('cash');
//
//     // إنشاء خيارات الوقت
//     createTimeSlots();
//
//     // تهيئة منتقي التاريخ
//     setupDatePicker();
//
//     // إضافة أحداث لحقول البطاقة
//     const cardNumberInput = document.getElementById('card-number');
//     if (cardNumberInput) {
//         cardNumberInput.addEventListener('input', function() {
//             formatCardNumber(this);
//         });
//         cardNumberInput.addEventListener('blur', function() {
//             updateCardVisual();
//         });
//     }
//
//     const cardExpiryInput = document.getElementById('card-expiry');
//     if (cardExpiryInput) {
//         cardExpiryInput.addEventListener('input', function() {
//             formatExpiryDate(this);
//         });
//     }
//
//     const cardCvcInput = document.getElementById('card-cvc');
//     if (cardCvcInput) {
//         cardCvcInput.addEventListener('input', function() {
//             formatCVC(this);
//         });
//     }
//
//     const cardNameInput = document.getElementById('card-name');
//     if (cardNameInput) {
//         cardNameInput.addEventListener('input', updateCardVisual);
//     }
//
//     // إضافة حدث للنموذج
//     const orderForm = document.getElementById('order-form');
//     if (orderForm) {
//         orderForm.addEventListener('submit', submitOrder);
//     }
//
//     // إضافة أحداث للتحقق من الحقول
//     document.querySelectorAll('.form-input').forEach(input => {
//         input.addEventListener('blur', function() {
//             if (this.value.trim()) {
//                 hideError(this.id);
//             }
//         });
//     });
//
//     console.log('✅ تم تهيئة صفحة الطلب بنجاح');
// });





















    // التنقّل
    function goToHome(){ window.location.href = "HW1.html"; }
    function goToShoppingPage(){ window.location.href = "shopping.html"; }

    // حالة الطلب
    let orderItems = [];
    let selectedPayment = 'cash';
    let selectedDeliveryDate = '';
    let selectedDeliveryTime = '';

    // أدوات
    const $ = (sel, root=document)=> root.querySelector(sel);
    const $$ = (sel, root=document)=> Array.from(root.querySelectorAll(sel));
    const fmtMoney = v => '$' + Number(v || 0).toLocaleString();

    // تحميل الطلب من localStorage
    function loadOrderFromCart(){
    try{
    const savedOrder = localStorage.getItem('currentOrder');
    if(!savedOrder){ showEmptyCartMessage(); return; }
    const orderData = JSON.parse(savedOrder);
    if(orderData?.items?.length){
    orderItems = orderData.items;
    displayOrderItems();
    calculateTotals();
}else{
    showEmptyCartMessage();
}
}catch(e){
    console.error('❌ خطأ تحميل الطلب:', e);
    showEmptyCartMessage();
}
}

    function showEmptyCartMessage(){
    const container = $('#order-items-container');
    if(container){
    container.innerHTML = `
          <div class="empty-order">
            <p>⚠️ لم يتم العثور على طلب</p>
            <p>يبدو أن سلة التسوق فارغة أو لم تقم بإضافة أي عقارات.</p>
            <a href="shopping.html" class="back-to-shopping">🛒 العودة للتسوق</a>
            <br/><br/>
            <a href="HW1.html" class="back-to-shopping" style="background:#3498db;">🏠 الصفحة الرئيسية</a>
          </div>`;
}
    const btn = $('#submit-btn');
    if(btn){ btn.disabled = true; btn.textContent = 'السلة فارغة'; }
}

    function displayOrderItems(){
    const container = $('#order-items-container');
    if(!container || !orderItems.length){ showEmptyCartMessage(); return; }
    let html = '<div class="order-summary">';
    for(const item of orderItems){
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    html += `
          <div class="order-item">
            <div class="item-info">
              <h4>${item.title || 'عنصر'}</h4>
              <p>${item.saleType || ''} - ${item.type || ''}</p>
              <p><small>الموقع: ${item.location || '-'}</small></p>
              <p><small>الكمية: ${item.quantity || 1}</small></p>
            </div>
            <div class="item-price">${fmtMoney(itemTotal)}</div>
          </div>`;
}
    html += '</div>';
    container.innerHTML = html;
}

    function calculateTotals(){
    const subtotal = orderItems.reduce((s,i)=> s + (i.price||0)*(i.quantity||1), 0);
    const tax = subtotal * .10;
    const total = subtotal + tax;
    $('#subtotal').textContent = fmtMoney(subtotal);
    $('#tax').textContent = fmtMoney(tax);
    $('#total').textContent = fmtMoney(total);
}

    // اختيار طريقة الدفع
    function selectPayment(method){
    selectedPayment = method;
    $$('.payment-method').forEach(el => {
    el.classList.remove('selected');
    el.setAttribute('aria-checked','false');
});
    const picked = $('#' + method + '-payment');
    if(picked){ picked.classList.add('selected'); picked.setAttribute('aria-checked','true'); picked.focus(); }

    $('#card-details')?.classList.toggle('show', method === 'card');
    $('#cash-details')?.classList.toggle('show', method === 'cash');

    // تحديث stepper بصريًا
    $('#step-payment')?.classList.add('done');
    if(method === 'cash'){ $('#step-delivery')?.classList.add('active'); }
    else{ $('#step-delivery')?.classList.remove('active'); }
    hideAllErrors();
}

    // اختيار موقع الاستلام
    function selectDeliveryOption(el){
    $$('.delivery-option').forEach(n => { n.classList.remove('selected'); n.setAttribute('aria-pressed','false'); });
    el.classList.add('selected'); el.setAttribute('aria-pressed','true'); el.focus();
}

    // إخفاء/إظهار أخطاء
    function hideAllErrors(){
    $$('.error-message').forEach(e=> e.classList.remove('show'));
    $$('.form-input, .card-input').forEach(i=> i.classList.remove('error'));
}
    function showError(fieldId, message){
    const field = $('#' + fieldId);
    const err = $('#' + fieldId + '-error');
    if(field) field.classList.add('error');
    if(err){ err.textContent = message; err.classList.add('show'); }
}
    function hideError(fieldId){
    $('#' + fieldId)?.classList.remove('error');
    $('#' + fieldId + '-error')?.classList.remove('show');
}

    // تحقق الحقول الأساسية
    function validateRequiredFields(){
    let ok = true;
    const req = [
{ id:'full-name', name:'الاسم الكامل' },
{ id:'phone', name:'رقم الهاتف' },
{ id:'email', name:'البريد الإلكتروني' },
{ id:'address', name:'العنوان' },
    ];
    for(const f of req){
    const v = ($('#' + f.id)?.value || '').trim();
    if(!v){ showError(f.id, `${f.name} مطلوب`); ok = false; } else { hideError(f.id); }
}
    // بريد
    const email = ($('#email')?.value || '').trim();
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError('email','بريد إلكتروني غير صحيح'); ok = false; }
    // هاتف
    const phone = ($('#phone')?.value || '').trim().replace(/\s/g,'');
    if(phone && !/^\d+$/.test(phone)){ showError('phone','رقم هاتف غير صحيح'); ok = false; }
    return ok;
}

    // تحقق البطاقة
    function validateCardDetails(){
    if(selectedPayment !== 'card') return true;
    let ok = true;

    const num = ($('#card-number')?.value || '').replace(/\s/g,'');
    if(!(num && /^\d{16}$/.test(num))){ showError('card-number','رقم بطاقة غير صحيح (16 رقم)'); ok = false; } else hideError('card-number');

    const name = ($('#card-name')?.value || '').trim();
    if(!(name && name.length >= 3)){ showError('card-name','اسم حامل البطاقة مطلوب'); ok = false; } else hideError('card-name');

    const exp = ($('#card-expiry')?.value || '').trim();
    if(!(exp && /^\d{2}\/\d{2}$/.test(exp))){ showError('card-expiry','تاريخ انتهاء غير صحيح (MM/YY)'); ok = false; } else hideError('card-expiry');

    const cvc = ($('#card-cvc')?.value || '').trim();
    if(!(cvc && /^\d{3,4}$/.test(cvc))){ showError('card-cvc','رمز CVC/CVV غير صحيح (3-4 أرقام)'); ok = false; } else hideError('card-cvc');

    return ok;
}

    // تحقق الاستلام
    function validateDeliveryDetails(){
    if(selectedPayment !== 'cash') return true;
    let ok = true;

    const deliveryDate = $('#delivery-date')?.value;
    if(!deliveryDate){ showError('delivery-date','يرجى اختيار تاريخ الاستلام'); ok = false; } else { hideError('delivery-date'); selectedDeliveryDate = deliveryDate; }

    const slot = $('.time-slot.selected');
    if(!slot){ showError('delivery-time','يرجى اختيار وقت الاستلام'); ok = false; } else { hideError('delivery-time'); selectedDeliveryTime = slot.textContent; }

    return ok;
}

    // تنسيقات البطاقة
    function updateCardVisual(){
    const num = ($('#card-number')?.value || '').replace(/\s/g,'');
    const name = ($('#card-name')?.value || '').trim() || 'اسم حامل البطاقة';
    const exp = ($('#card-expiry')?.value || '').trim() || 'MM/YY';
    const disp = $('#card-number-display');
    if(disp){ disp.textContent = (num.length >= 4) ? `•••• •••• •••• ${num.slice(-4)}` : '•••• •••• •••• ••••'; }
    $('#card-name-display') && ($('#card-name-display').textContent = name);
    $('#card-expiry-display') && ($('#card-expiry-display').textContent = exp);
}
    function formatCardNumber(input){
    let v = input.value.replace(/\D/g,'').slice(0,16);
    input.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    updateCardVisual();
}
    function formatExpiryDate(input){
    let v = input.value.replace(/\D/g,'').slice(0,4);
    if(v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    input.value = v; updateCardVisual();
}
    function formatCVC(input){
    input.value = input.value.replace(/\D/g,'').slice(0,4);
}

    // أوقات
    function createTimeSlots(){
    const box = $('#time-slots'); if(!box) return;
    const times = ['9:00 صباحاً','10:00 صباحاً','11:00 صباحاً','12:00 ظهراً','1:00 ظهراً','2:00 ظهراً','3:00 عصراً','4:00 عصراً','5:00 عصراً'];
    box.innerHTML = times.map(t=>`<div class="time-slot" role="button" tabindex="0" aria-pressed="false">${t}</div>`).join('');
    const first = box.querySelector('.time-slot'); if(first){ first.classList.add('selected'); first.setAttribute('aria-pressed','true'); selectedDeliveryTime = first.textContent; }
    box.addEventListener('click', e=>{
    const el = e.target.closest('.time-slot'); if(!el) return;
    $$('.time-slot', box).forEach(n=>{ n.classList.remove('selected'); n.setAttribute('aria-pressed','false'); });
    el.classList.add('selected'); el.setAttribute('aria-pressed','true'); selectedDeliveryTime = el.textContent; hideError('delivery-time');
});
    box.addEventListener('keydown', e=>{
    const items = $$('.time-slot', box); const idx = items.indexOf(document.activeElement);
    if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){ const ni = Math.max(0, idx-1); items[ni]?.focus(); e.preventDefault(); }
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){ const ni = Math.min(items.length-1, idx+1); items[ni]?.focus(); e.preventDefault(); }
    if(e.key === 'Enter' || e.key === ' '){ document.activeElement?.click(); e.preventDefault(); }
});
}
    function goToLoginPage() {
        window.location.href = "login.html";
    }
    // التاريخ
    function setupDatePicker(){
    const input = $('#delivery-date'); if(!input) return;
    const today = new Date(); const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
    const max = new Date(today); max.setMonth(max.getMonth()+1);
    input.min = tomorrow.toISOString().split('T')[0];
    input.max = max.toISOString().split('T')[0];
    const def = new Date(today); def.setDate(def.getDate()+3);
    input.value = def.toISOString().split('T')[0];
    selectedDeliveryDate = input.value;
    input.addEventListener('change', function(){ selectedDeliveryDate = this.value; hideError('delivery-date'); });
}

    // إرسال الطلب
    async function submitOrder(e){
    e.preventDefault();
    hideAllErrors();

    if(!orderItems?.length){
    alert('⚠️ لا توجد عقارات في الطلب! يرجى العودة للتسوق.');
    goToShoppingPage(); return;
}
    if(!validateRequiredFields()) return;
    if(!validateCardDetails()) return;
    if(!validateDeliveryDetails()) return;

    const orderData = {
    customer: {
    fullName: $('#full-name').value.trim(),
    phone: $('#phone').value.trim(),
    email: $('#email').value.trim(),
    address: $('#address').value.trim(),
    deliveryAddress: $('#delivery-address').value.trim() || $('#address').value.trim(),
    notes: $('#notes').value.trim() || ''
},
    payment: selectedPayment === 'card'
    ? { method:'card', details:{
    cardNumber: $('#card-number').value.replace(/\s/g,''),
    cardName: $('#card-name').value.trim(),
    cardExpiry: $('#card-expiry').value.trim(),
    cardCvc: $('#card-cvc').value.trim()
} }
    : { method:'cash', details:{
    deliveryDate: selectedDeliveryDate,
    deliveryTime: selectedDeliveryTime,
    meetingLocation: 'مقر شركة العقارات الشرقية المميزة - وسط المدينة'
} },
    orderItems: orderItems,
    subtotal: orderItems.reduce((s,i)=> s + (i.price||0)*(i.quantity||1), 0),
    tax: orderItems.reduce((s,i)=> s + (i.price||0)*(i.quantity||1), 0) * .10,
    total: orderItems.reduce((s,i)=> s + (i.price||0)*(i.quantity||1), 0) * 1.10,
    orderDate: new Date().toLocaleString('ar-SA'),
    orderId: 'ORD-' + Date.now()
};

    const btn = $('#submit-btn'); const prev = btn.textContent;
    btn.disabled = true; btn.classList.add('loading'); btn.textContent = 'جاري معالجة الطلب...';

    try{
    localStorage.setItem('confirmedOrder', JSON.stringify(orderData));
    localStorage.removeItem('currentOrder');
    await sendEmailConfirmation(orderData);
        await fetch("PhpFile/save_order.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });
    showSuccessMessage(orderData);
}catch(err){
    console.error('❌ خطأ إرسال الطلب:', err);
    alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    btn.disabled = false; btn.classList.remove('loading'); btn.textContent = prev;
}
}

    function sendEmailConfirmation(orderData){
    return new Promise(resolve=>{
    console.log('📧 إرسال تأكيد إلى:', orderData.customer.email);
    setTimeout(()=>{ console.log('✅ تم الإرسال'); console.log('📋 المحتوى:', createEmailContent(orderData)); resolve(true); }, 1200);
});
}

    function createEmailContent(orderData){
    const items = orderData.orderItems.map(i=>`- ${i.title} (${i.saleType}): ${fmtMoney(i.price)} × ${i.quantity}`).join('\n');
    const delivery = orderData.payment.method==='cash'
    ? `📅 ${orderData.payment.details.deliveryDate}\n⏰ ${orderData.payment.details.deliveryTime}\n📍 ${orderData.payment.details.meetingLocation}`
    : `💳 طريقة الدفع: البطاقة المصرفية\n✅ تمت معالجة الدفع بنجاح`;
    return `تأكيد الطلب ${orderData.orderId}\n\nالعناصر:\n${items}\n\nالمجموع: ${fmtMoney(orderData.total)}\n\n${delivery}`;
}

    function showSuccessMessage(orderData){
    const box = $('#success-message'); const form = $('#order-form'); const btn = $('#submit-btn');
    if(box){
    const deliveryInfo = orderData.payment.method==='cash'
    ? `<p><strong>تاريخ الاستلام:</strong> ${orderData.payment.details.deliveryDate}</p>
             <p><strong>وقت الاستلام:</strong> ${orderData.payment.details.deliveryTime}</p>
             <p><strong>موقع الاستلام:</strong> ${orderData.payment.details.meetingLocation}</p>`
    : `<p><strong>طريقة الدفع:</strong> البطاقة المصرفية</p><p>✅ تمت معالجة الدفع بنجاح</p>`;

    box.innerHTML = `
          <h3 style="margin:0 0 6px">🎉 تم تأكيد طلبك بنجاح!</h3>
          <div class="confirmation-details">
            <p><strong>رقم الطلب:</strong> ${orderData.orderId}</p>
            <p><strong>الاسم:</strong> ${orderData.customer.fullName}</p>
            <p><strong>البريد الإلكتروني:</strong> ${orderData.customer.email}</p>
            <p><strong>المبلغ الإجمالي:</strong> ${fmtMoney(orderData.total)}</p>
            ${deliveryInfo}
            <hr>
            <p style="margin-top: 10px; font-style: italic;">
              <strong>رسالة من شركة العقارات الشرقية المميزة:</strong><br>
              تم إرسال تأكيد الطلب إلى بريدك الإلكتروني. سنتواصل معك لتأكيد التفاصيل النهائية.
            </p>
          </div>
          <div style="margin-top: 14px;">
            <a href="shopping.html" class="back-to-shopping">🛒 العودة للتسوق</a>
            <a href="HW1.html" class="back-to-shopping" style="background:#3498db; margin-inline-start:8px;">🏠 الصفحة الرئيسية</a>
          </div>`;
    box.classList.add('show');
}
    if(form) form.style.display = 'none';
    if(btn) btn.style.display = 'none';
    // تحديث stepper
    $('#step-delivery')?.classList.add('done');
    $('#step-review')?.classList.add('active','done');
}

    // تهيئة الصفحة
    document.addEventListener('DOMContentLoaded', ()=>{
    loadOrderFromCart();
    selectPayment('cash');
    createTimeSlots();
    setupDatePicker();

    // مدخلات البطاقة
    $('#card-number')?.addEventListener('input', function(){ formatCardNumber(this); });
    $('#card-number')?.addEventListener('blur', updateCardVisual);
    $('#card-expiry')?.addEventListener('input', function(){ formatExpiryDate(this); });
    $('#card-cvc')?.addEventListener('input', function(){ formatCVC(this); });
    $('#card-name')?.addEventListener('input', updateCardVisual);

    // التحقق عند الخروج من الحقول
    $$('.form-input, .card-input').forEach(inp=>{
    inp.addEventListener('blur', function(){ if(this.value.trim()) hideError(this.id); });
});

    // اختيار الدفع بلوحة المفاتيح
    $$('.payment-method').forEach(pm=>{
    pm.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){ pm.click(); e.preventDefault(); }
});
});

    // إرسال
    $('#order-form')?.addEventListener('submit', submitOrder);
});
