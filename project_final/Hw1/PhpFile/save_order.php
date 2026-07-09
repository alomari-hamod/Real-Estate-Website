<?php
global $conn;
header("Content-Type: application/json; charset=UTF-8");
include "config.php"; // ملف الاتصال بقاعدة البيانات

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$customer = $data['customer'];
$orderItems = $data['orderItems'];
$total = $data['total'];
$orderId = $data['orderId'];
$orderDate = $data['orderDate'];

// إدخال الطلب الرئيسي
$sql = "INSERT INTO orders (order_id, full_name, email, phone, address, total_amount, order_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $orderId, $customer['fullName'], $customer['email'], $customer['phone'], $customer['address'], $total, $orderDate);
$stmt->execute();

// إدخال تفاصيل العقارات المطلوبة
$orderDbId = $conn->insert_id;

foreach ($orderItems as $item) {
    $sqlItem = "INSERT INTO order_items (order_id, property_title, price, quantity)
                VALUES (?, ?, ?, ?)";
    $stmtItem = $conn->prepare($sqlItem);
    $stmtItem->bind_param("isdi", $orderDbId, $item['title'], $item['price'], $item['quantity']);
    $stmtItem->execute();
}

echo json_encode(["status" => "success", "message" => "Order saved successfully"]);
$to = $customer['email'];
$subject = "تأكيد طلبك - العقارات الشرقية المميزة";
$message = "تم استلام طلبك رقم $orderId بقيمة $$total. شكرًا لتسوقك معنا!";
$headers = "From: info@yourdomain.com";

mail($to, $subject, $message, $headers);

