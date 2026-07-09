<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hw1_db"; // تأكد أن هذا هو اسم قاعدة البيانات الصحيح

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "فشل الاتصال بقاعدة البيانات: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");

// تفعيل عرض الأخطاء للتصحيح
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>