


    // دالة للعودة للصفحة الرئيسية
    function goToHome() {
    window.location.href = 'HW1.html';
}

    // دالة تسجيل الخروج
    function logoutAdmin() {
    localStorage.removeItem('currentUser');
    alert('تم تسجيل الخروج بنجاح');
    window.location.href = 'HW1.html';
}

    // دالات إدارة المحتوى
    function manageProperties() {
    window.location.href = 'management.html';
}

    function manageUsers() {
    alert('سيتم فتح صفحة إدارة المستخدمين قريباً');
    // window.location.href = 'manage-users.html';
}

    function viewReports() {
    alert('سيتم فتح صفحة التقارير قريباً');
    // window.location.href = 'reports.html';
}

    function addNewProperty() {
    alert('سيتم فتح نموذج إضافة عقار جديد قريباً');
    // window.open('add-property.html', '_blank');
}
