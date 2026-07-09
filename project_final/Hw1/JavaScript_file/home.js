
    // المتغيرات العامة
    let currentRating = 0;
    let userLoggedIn = false;
    let currentUser = null;

    // دوال الخطوات في إنشاء الحساب
    function nextStep(step) {
    document.querySelectorAll('.modal-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step' + step).classList.add('active');

    if (step === 2) {
    const email = document.getElementById('user-email').value;
    setTimeout(() => {
    alert(`تم إرسال رمز التحقق إلى: ${email}\n\nرمز التحقق: 123456`);
}, 500);
}
}

    function prevStep(step) {
    document.querySelectorAll('.modal-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step' + step).classList.add('active');
}


    // تحديث الشريط العلوي
    function updateHeader() {
    const logoutSection = document.getElementById('logout-section');
    const accountSection = document.querySelector('.account-section');

    if (userLoggedIn && currentUser) {
    logoutSection.style.display = 'flex';
    accountSection.style.display = 'none';
} else {
    logoutSection.style.display = 'none';
    accountSection.style.display = 'flex';
}
}

    // تفعيل نظام التقييمات
    function enableReviewSystem() {
    document.getElementById('submit-review-btn').disabled = false;
}

    // تعطيل نظام التقييمات
    function disableReviewSystem() {
    document.getElementById('submit-review-btn').disabled = true;
    document.getElementById('reviewer-name').value = '';
    document.getElementById('review-text').value = '';
    document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('active');
});
    currentRating = 0;
}

    // تغيير الصورة الرئيسية بعد ثانيتين
    setTimeout(() => {
    const heroImage = document.getElementById('heroImage');
    heroImage.style.backgroundImage = 'url("https://www.baymgmtgroup.com/wp-content/uploads/2017/09/top-reasons-choose-property-management-company-1.jpg")';
    document.querySelector('.arabic-text').textContent = 'العقار .. استثمار آمن';
    document.querySelector('.arabic-subtext').textContent = 'حقق أحلامك وابنِ مستقبلك';
}, 2000);

    // إضافة تأثيرات ظهور تدريجي للعناصر
    window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.search-section, .properties, .review-section, .quotes-section');
    const header = document.querySelector('header');

    if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
} else {
    header.style.background = '#fff';
}

    sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
    section.classList.add('visible');
}
});
});

    // التبديل بين نماذج البحث
    function switchTab(tab) {
    const buyForm = document.getElementById('buy-form');
    const rentForm = document.getElementById('rent-form');
    const sellForm = document.getElementById('sell-form');
    const tabs = document.querySelectorAll('.tab');

    buyForm.style.display = 'none';
    rentForm.style.display = 'none';
    sellForm.style.display = 'none';

    tabs.forEach(tabElement => {
    tabElement.classList.remove('active');
});

    if (tab === 'buy') {
    buyForm.style.display = 'grid';
    tabs[0].classList.add('active');
} else if (tab === 'rent') {
    rentForm.style.display = 'grid';
    tabs[1].classList.add('active');
} else if (tab === 'sell') {
    sellForm.style.display = 'grid';
    tabs[2].classList.add('active');
}
}

    // إضافة عقار جديد
    function addProperty() {
    const price = document.getElementById('sell-price').value;
    const location = document.getElementById('sell-location').value;
    const description = document.getElementById('sell-description').value;
    const imageInput = document.getElementById('sell-image');

    if (!price || !location) {
    alert('يرجى ملء جميع الحقول المطلوبة');
    return;
}

    const propertiesGrid = document.getElementById('properties-grid');
    const newProperty = document.createElement('div');
    newProperty.className = 'property-card';

    let imageContent = '<div class="property-image">صورة العقار</div>';
    if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
    newProperty.querySelector('.property-image').innerHTML = `<img src="${e.target.result}" alt="عقار جديد">`;
};
    reader.readAsDataURL(imageInput.files[0]);
}

    newProperty.innerHTML = `
            ${imageContent}
            <div class="property-info">
                <h3>عقار جديد</h3>
                <p class="property-location">${location}</p>
                <p>${description || 'لا يوجد وصف'}</p>
                <div class="property-price">$${parseInt(price).toLocaleString()}</div>
            </div>
        `;

    propertiesGrid.appendChild(newProperty);
    document.getElementById('sell-price').value = '';
    document.getElementById('sell-location').value = '';
    document.getElementById('sell-description').value = '';
    document.getElementById('sell-image').value = '';
    alert('تم إضافة العقار بنجاح!');
}

    // نظام التقييمات
    document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        if (!userLoggedIn) {
            alert('يرجى إنشاء حساب لتقييم العقارات');
            const choice = confirm('هل تريد تسجيل الدخول أو إنشاء حساب جديد؟\n\nموافق: تسجيل الدخول\nإلغاء: إنشاء حساب');
            if (choice) {
                openLoginModal();
            } else {
                openSignupModal();
            }
            return;
        }

        const rating = parseInt(this.getAttribute('data-rating'));
        currentRating = rating;

        document.querySelectorAll('.star').forEach(s => {
            const starRating = parseInt(s.getAttribute('data-rating'));
            if (starRating <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewText = document.getElementById('review-text').value;
        document.getElementById('submit-review-btn').disabled = !reviewerName.trim() || !reviewText.trim() || currentRating === 0;
    });
});

    // تفعيل زر الإرسال عند ملء الحقول
    document.getElementById('reviewer-name').addEventListener('input', checkReviewForm);
    document.getElementById('review-text').addEventListener('input', checkReviewForm);

    function checkReviewForm() {
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;
    const submitBtn = document.getElementById('submit-review-btn');
    submitBtn.disabled = !reviewerName.trim() || !reviewText.trim() || currentRating === 0 || !userLoggedIn;
}

    // إرسال التقييم
    document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!userLoggedIn) {
    alert('يرجى إنشاء حساب لإرسال التقييمات');
    openSignupModal();
    return;
}

    if (currentRating === 0) {
    alert('يرجى اختيار التقييم');
    return;
}

    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;

    if (!reviewerName.trim()) {
    alert('يرجى كتابة اسمك');
    return;
}

    if (!reviewText.trim()) {
    alert('يرجى كتابة تعليقك');
    return;
}

    alert(`شكراً لك ${reviewerName} على تقييمك ${currentRating} نجوم!\n\nتعليقك: ${reviewText}`);
    document.getElementById('reviewer-name').value = '';
    document.getElementById('review-text').value = '';
    document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('active');
});
    currentRating = 0;
    document.getElementById('submit-review-btn').disabled = true;
});



    // إغلاق النوافذ عند النقر خارجها
    document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAllModals();
        }
    });
});

    // التهيئة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
    currentUser = JSON.parse(savedUser);
    userLoggedIn = true;
    updateHeader();
    enableReviewSystem();
}

    document.querySelector('.hero').style.opacity = '1';
    window.dispatchEvent(new Event('scroll'));

    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
    closeAllModals();
}
});
});

    // زر اكتشاف المزيد
    document.querySelector('.explore-btn').addEventListener('click', function() {
    alert('جاري تحميل المزيد من العقارات...');
});

    // تأثيرات إضافية للصورة الرئيسية
    setInterval(() => {
    const arabicText = document.querySelector('.arabic-text');
    const arabicSubtext = document.querySelector('.arabic-subtext');

    const texts = [
    'استثمر في مستقبلك',
    'العقار .. استثمار آمن',
    'ابنِ ثروتك العقارية',
    'امتلك قطعة من الأرض'
    ];

    const subtexts = [
    'امتلك منزلك في أفضل المواقع',
    'احقق أحلامك وابنِ مستقبلك',
    'ابدأ رحلتك نحو الاستقرار المالي',
    'استثمر اليوم .. استمتع غداً'
    ];

    const randomIndex = Math.floor(Math.random() * texts.length);

    arabicText.style.opacity = '0';
    arabicSubtext.style.opacity = '0';

    setTimeout(() => {
    arabicText.textContent = texts[randomIndex];
    arabicSubtext.textContent = subtexts[randomIndex];
    arabicText.style.opacity = '1';
    arabicSubtext.style.opacity = '1';
}, 500);
}, 5000);
    // دالة عرض جميع العقارات
    function showAllProperties() {
    // إنشاء مصفوفة تحتوي على جميع العقارات المتاحة
    const allProperties = [
{
    id: 1,
    title: "فيلا فاخرة",
    location: "وسط المدينة، نيويورك",
    description: "فيلا فاخرة مع وسائل الراحة الحديثة وإطلالات خلابة.",
    price: 350000,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 2,
    title: "شقة عصرية",
    location: "وسط المدينة، شيكاغو",
    description: "شقة عصرية واسعة في قلب المدينة.",
    price: 180000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 3,
    title: "منزل عائلي",
    location: "الضاحية، بوسطن",
    description: "منزل عائلي مثالي مع حديقة وكراج.",
    price: 275000,
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 4,
    title: "منزل شاطئي",
    location: "ميامي بيتش، فلوريدا",
    description: "عقار خلاب على الشاطئ مع إطلالات على المحيط.",
    price: 550000,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 5,
    title: "بنتهاوس فاخر",
    location: "مانهاتن، نيويورك",
    description: "بنتهاوس مذهل مع إطلالات بانورامية على المدينة.",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 6,
    title: "منزل ريفي",
    location: "منطقة ريفية، تكساس",
    description: "منزل ريفي هادئ مع حديقة كبيرة.",
    price: 320000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 7,
    title: "شقة استوديو",
    location: "وسط المدينة، سياتل",
    description: "شقة استوديو مريحة مثالية للطلاب.",
    price: 120000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 8,
    title: "كابينة جبلية",
    location: "جبال روكي، كولورادو",
    description: "كابينة جميلة محاطة بالطبيعة.",
    price: 280000,
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 9,
    title: "شقة دوبلكس",
    location: "وسط المدينة، لوس أنجلوس",
    description: "شقة دوبلكس فاخرة مع تصميم حديث.",
    price: 420000,
    image: "data:image/jpeg;base64,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"
},
{
    id: 10,
    title: "فيلا حديثة",
    location: "بيفرلي هيلز، كاليفورنيا",
    description: "فيلا عصرية مع مسبح خاص وإطلالات خلابة.",
    price: 850000,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 11,
    title: "منزل تقليدي",
    location: "شارلوت، نورث كارولينا",
    description: "منزل تقليدي أنيق مع حديقة خلفية واسعة.",
    price: 310000,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=60"
},
{
    id: 12,
    title: "شقة بنتهاوس",
    location: "داونتاون، ميامي",
    description: "بنتهاوس فاخر مع إطلالات على المدينة والبحر.",
    price: 950000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc75H_hekJ_G5n9YUsJR3H3Bp0HFX8GOT_3w&s"
},
{
    id : 13,
    title: "فيلا فاخرة",
    location: "باريس",
    description: "فيلا واسعة ومجهزة باحدث التقنيات",
    price: 300000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0E6-2EnVMDVqgEgBc74QALuNkxWiVbWXPA&s"
},
{

    id : 14,
    title: "فيلا حديثة",
    location: "ايطاليا",
    description: "فيلا فاخرة وبسعر مميز",
    price: 240000,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoExACvPbZlVzll8VFLi9Zvdz5_rGIZCp6Z7TA8nhRu9LqZRiddutd_5KkzeRrty5vYaQ&usqp=CAU"
},

{
    id : 15,
    title: "منزل ريفي",
    location: "نرويج",
    description: "منزل ريفي أنيق مع حديقة واسعة.",
    price: 120000,
    image: " https://images.homify.com/v1462269366/p/photo/image/1490132/Esterno2.jpg"
},
{
    id : 16,
    title: "منزل ريفي",
    location: "كندا",
    description: "منزل ريفي أنيق مع اطلالة جبلية.",
    price: 160000,
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzI4MzU3NQ%3D%3D/original/482a5aa5-c33a-4b85-921c-fe3db89eb103.jpeg?im_w=720"

}

    ];

    // إنشاء HTML لجميع العقارات
    let propertiesHTML = '';
    allProperties.forEach(property => {
    propertiesHTML += `
            <div class="property-card">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p class="property-location">${property.location}</p>
                    <p>${property.description}</p>
                    <div class="property-price">$${property.price.toLocaleString()}</div>
                </div>
            </div>
        `;
});

    // تحديث قسم العقارات
    const propertiesGrid = document.getElementById('properties-grid');
    propertiesGrid.innerHTML = propertiesHTML;

    // تحديث العنوان
    document.querySelector('.section-title').textContent = 'جميع العقارات المتاحة';

    // التمرير إلى قسم العقارات
    document.querySelector('.properties').scrollIntoView({ behavior: 'smooth' });


}
    // في نهاية قسم event listeners، أضف:
    document.querySelector('.shopping-section').addEventListener('click', function(e) {
    e.preventDefault();
    showAllProperties();
});
    function goToShoppingPage() {
    window.location.href = 'shopping.html';
}
    function goToLoginPage() {
    window.location.href = 'login.html';
}



    // ===== البحث والانتقال إلى صفحة التسوق =====

    // للمشتري (أريد الشراء)
    document.querySelector('#buy-form .search-btn').addEventListener('click', function() {
        const type = document.getElementById('property-type').value;
        const location = document.getElementById('location').value;

        // نخزن نوع العملية (شراء) والبيانات
        localStorage.setItem('filterType', 'للبيع');
        localStorage.setItem('propertyType', type);
        localStorage.setItem('propertyLocation', location);

        // الانتقال إلى صفحة التسوق
        window.location.href = 'shopping.html';
    });

    // للمستأجر (أريد الإيجار)
    document.querySelector('#rent-form .search-btn').addEventListener('click', function() {
        const type = document.getElementById('rent-property-type').value;
        const location = document.getElementById('rent-location').value;

        localStorage.setItem('filterType', 'للإيجار');
        localStorage.setItem('propertyType', type);
        localStorage.setItem('propertyLocation', location);

        window.location.href = 'shopping.html';
    });



    function searchBuy() {
        const type = document.getElementById('property-type').value;
        const location = document.getElementById('location').value;

        // تخزين بيانات البحث في localStorage
        localStorage.setItem('filterType', 'للبيع');
        localStorage.setItem('propertyType', type);
        localStorage.setItem('propertyLocation', location);

        // الانتقال إلى صفحة التسوق
        window.location.href = 'shopping.html';
    }




    function searchRent() {
        const type = document.getElementById('rent-property-type').value;
        const location = document.getElementById('rent-location').value;

        // تخزين بيانات البحث في localStorage
        localStorage.setItem('filterType', 'للإيجار');
        localStorage.setItem('propertyType', type);
        localStorage.setItem('propertyLocation', location);

        // الانتقال إلى صفحة التسوق
        window.location.href = 'shopping.html';
    }


    function saveSellRequest(sellRequest) {
        // جلب الطلبات الحالية من localStorage
        let sellRequests = JSON.parse(localStorage.getItem('sellRequests')) || [];

        // إضافة ID فريد للطلب
        sellRequest.id = Date.now();

        // إضافة الطلب الجديد
        sellRequests.push(sellRequest);

        // حفظ في localStorage
        localStorage.setItem('sellRequests', JSON.stringify(sellRequests));

        alert('تم إرسال طلب البيع بنجاح! سيتم مراجعته من قبل الإدارة.');
    }

    function submitSellRequest() {
        const price = document.getElementById('sell-price').value;
        const location = document.getElementById('sell-location').value;
        const description = document.getElementById('sell-description').value;
        const imageInput = document.getElementById('sell-image').files[0];

        if (!price || !location || !description) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        // تحويل الصورة إلى Base64 إذا كانت موجودة
        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const sellRequest = {
                    price: price,
                    location: location,
                    description: description,
                    image: e.target.result, // الصورة كـ Base64
                    status: 'pending',
                    date: new Date().toLocaleDateString('ar-EG'),
                    userInfo: localStorage.getItem('currentUser') ?
                        JSON.parse(localStorage.getItem('currentUser')).name : 'زائر'
                };

                // حفظ طلب البيع
                saveSellRequest(sellRequest);
                // الانتقال إلى صفحة تأكيد الطلب
                window.location.href = 'order.html?type=sell&status=pending';
            };
            reader.readAsDataURL(imageInput);
        } else {
            // بدون صورة
            const sellRequest = {
                price: price,
                location: location,
                description: description,
                image: '',
                status: 'pending',
                date: new Date().toLocaleDateString('ar-EG'),
                userInfo: localStorage.getItem('currentUser') ?
                    JSON.parse(localStorage.getItem('currentUser')).name : 'زائر'
            };

            saveSellRequest(sellRequest);
            window.location.href = 'order.html?type=sell&status=pending';
        }
    }

    // ربط الأحداث عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        // ... الكود الحالي ...

        // ربط زر الإيجار (إذا كان غير مربوط)
        const rentBtn = document.querySelector('#rent-form .search-btn');
        if (rentBtn) {
            rentBtn.addEventListener('click', searchRent);
        }

        // ربط زر الشراء (إذا كان غير مربوط)
        const buyBtn = document.querySelector('#buy-form .search-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', searchBuy);
        }
    });












