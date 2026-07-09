const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const ownerLoginBtn = document.getElementById('ownerLoginBtn');
const forgotPassword = document.getElementById('forgotPassword');

// التبديل بين تسجيل الدخول والتسجيل
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// ============ AJAX LOGIN ============
signinForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('loginMessage');

    // إظهار تحميل
    messageDiv.innerHTML = '<div class="loading">جاري التحقق...</div>';
    messageDiv.className = 'message';

    try {
        // إرسال بيانات تسجيل الدخول إلى PHP عبر AJAX
        const response = await fetch('PhpFile/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            // تسجيل الدخول ناجح
            messageDiv.innerHTML = `<div class="success">${result.message}</div>`;
            messageDiv.className = 'message success';

            // حفظ بيانات الجلسة في localStorage (بديل للـ Session)
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.user));
            }

            // توجيه المستخدم حسب نوعه
            setTimeout(() => {
                if (result.user && result.user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else if (result.user && result.user.role === 'owner') {
                    window.location.href = 'order.html';
                } else {
                    window.location.href = 'HW1.html';
                }
            }, 1500);

        } else {
            // فشل تسجيل الدخول
            messageDiv.innerHTML = `<div class="error">${result.message}</div>`;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = '<div class="error">حدث خطأ في الاتصال بالخادم</div>';
        messageDiv.className = 'message error';
    }
});

// ============ AJAX SIGNUP ============
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const messageDiv = document.getElementById('signupMessage');

    // التحقق الأساسي
    if (password !== confirmPassword) {
        messageDiv.innerHTML = '<div class="error">كلمة المرور غير متطابقة</div>';
        messageDiv.className = 'message error';
        return;
    }

    if (password.length < 6) {
        messageDiv.innerHTML = '<div class="error">كلمة المرور يجب أن تكون 6 أحرف على الأقل</div>';
        messageDiv.className = 'message error';
        return;
    }

    // إظهار تحميل
    messageDiv.innerHTML = '<div class="loading">جاري إنشاء الحساب...</div>';
    messageDiv.className = 'message';

    try {
        // إرسال بيانات التسجيل إلى PHP عبر AJAX
        const response = await fetch('PhpFile/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'register',
                name: name,
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            // التسجيل ناجح
            messageDiv.innerHTML = `<div class="success">${result.message}</div>`;
            messageDiv.className = 'message success';

            // الانتقال تلقائياً إلى تسجيل الدخول بعد 2 ثانية
            setTimeout(() => {
                container.classList.remove('right-panel-active');
                // إعادة تعيين النموذج
                signupForm.reset();
            }, 2000);

        } else {
            // فشل التسجيل
            messageDiv.innerHTML = `<div class="error">${result.message}</div>`;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = '<div class="error">حدث خطأ في الاتصال بالخادم</div>';
        messageDiv.className = 'message error';
    }
});

// ============ LOGIN AS OWNER ============
ownerLoginBtn.addEventListener('click', async function() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('loginMessage');

    if (!email || !password) {
        messageDiv.innerHTML = '<div class="error">الرجاء إدخال البريد وكلمة المرور</div>';
        messageDiv.className = 'message error';
        return;
    }

    messageDiv.innerHTML = '<div class="loading">جاري التحقق كمالك...</div>';
    messageDiv.className = 'message';

    try {
        const response = await fetch('PhpFile/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'owner_login',
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            messageDiv.innerHTML = `<div class="success">${result.message}</div>`;
            messageDiv.className = 'message success';

            localStorage.setItem('user', JSON.stringify(result.user));

            setTimeout(() => {
                window.location.href = 'order.html';
            }, 1500);
        } else {
            messageDiv.innerHTML = `<div class="error">${result.message}</div>`;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = '<div class="error">حدث خطأ في الاتصال</div>';
        messageDiv.className = 'message error';
    }
});

// ============ FORGOT PASSWORD ============
forgotPassword.addEventListener('click', async function(e) {
    e.preventDefault();

    const email = prompt("الرجاء إدخال بريدك الإلكتروني:");
    if (!email) return;

    try {
        const response = await fetch('PhpFile/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'forgot_password',
                email: email
            })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('حدث خطأ في إرسال الطلب');
    }
});

// ============ NAVIGATION FUNCTIONS ============
function goToShoppingPage() {
    window.location.href = "shopping.html";
}

function goToLoginPage() {
    window.location.href = "login.html";
}

function goToHome() {
    window.location.href = "HW1.html";
}

// ============ CHECK IF USER IS LOGGED IN ============
function checkLoginStatus() {
    const user = localStorage.getItem('user');
    const logoutSection = document.getElementById('logout-section');

    if (user) {
        const userData = JSON.parse(user);
        logoutSection.style.display = 'flex';

        // تحديث النص ليشير إلى المستخدم
        const logoutText = logoutSection.querySelector('.logout-text');
        logoutText.textContent = `مرحباً ${userData.name} (تسجيل الخروج)`;

        // إضافة حدث تسجيل الخروج
        logoutSection.onclick = function() {
            localStorage.removeItem('user');
            alert('تم تسجيل الخروج بنجاح');
            window.location.reload();
        };
    } else {
        logoutSection.style.display = 'none';
    }
}

// ============ BACKGROUND IMAGES ============
const images = [
    "https://aqar.net.sa/wp-content/uploads/2023/11/digital-camera-sits-front-house-with-lit-window.webp",
];

let index = 0;
function changeBackground() {
    document.body.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحقق من حالة تسجيل الدخول
    checkLoginStatus();

    // تغيير الخلفية كل 8 ثواني
    changeBackground();
    setInterval(changeBackground, 8000);
});