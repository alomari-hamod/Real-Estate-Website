<?php

// تفعيل عرض الأخطاء
error_reporting(E_ALL);
ini_set('display_errors', 1);

// السماح بـ CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json; charset=UTF-8");

// تسجيل المعلومات للتصحيح
file_put_contents('debug.log', date('Y-m-d H:i:s') . " - API Called: " . $_SERVER['REQUEST_URI'] . PHP_EOL, FILE_APPEND);

// ... باقي الكود
global $conn;
header("Content-Type: application/json; charset=UTF-8");
include "config.php"; // ملف الاتصال بقاعدة البيانات

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'get':
        getProperties($conn);
        break;

    case 'add':
        addProperty($conn);
        break;

    case 'delete':
        deleteProperty($conn);
        break;
    case 'update':
        updateProperty($conn);
        break;

    default:
        echo json_encode(["success" => false, "message" => "Invalid action"]);
        break;
}

function getProperties($conn) {
    $result = $conn->query("SELECT * FROM properties ORDER BY id DESC");
    $properties = [];
    while ($row = $result->fetch_assoc()) {
        // تحويل gallery من نص إلى مصفوفة
        if (!empty($row['gallery'])) {
            $row['gallery'] = explode(',', $row['gallery']);
        } else {
            $row['gallery'] = [$row['image']];
        }
        $properties[] = $row;
    }
    echo json_encode($properties);
}

function addProperty($conn) {
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $location = isset($_POST['location']) ? $_POST['location'] : '';
    $price = isset($_POST['price']) ? $_POST['price'] : 0;
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $rooms = isset($_POST['rooms']) ? $_POST['rooms'] : 0;
    $bathrooms = isset($_POST['bathrooms']) ? $_POST['bathrooms'] : 0;
    $area = isset($_POST['area']) ? $_POST['area'] : '';
    $image = isset($_POST['image']) ? $_POST['image'] : '';
    $featured = isset($_POST['featured']) ? 1 : 0;

    // الحصول على gallery كسلسلة مفصولة بفواصل
    $gallery = isset($_POST['gallery']) ? $_POST['gallery'] : $image;

    // تحقق من وجود عمود gallery في الجدول
    $checkColumn = $conn->query("SHOW COLUMNS FROM properties LIKE 'gallery'");
    if ($checkColumn->num_rows == 0) {
        // إضافة عمود gallery إذا لم يكن موجوداً
        $conn->query("ALTER TABLE properties ADD COLUMN gallery TEXT");
    }

    $stmt = $conn->prepare("INSERT INTO properties (title, location, price, type, status, description, rooms, bathrooms, area, image, featured, gallery) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdsssiissss", $title, $location, $price, $type, $status, $description, $rooms, $bathrooms, $area, $image, $featured, $gallery);

    if ($stmt->execute()) {
        $propertyId = $stmt->insert_id;
        echo json_encode([
            "success" => true,
            "message" => "تمت إضافة العقار بنجاح",
            "id" => $propertyId
        ]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}

function deleteProperty($conn) {
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $stmt = $conn->prepare("DELETE FROM properties WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}
function updateProperty($conn) {
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $location = isset($_POST['location']) ? $_POST['location'] : '';
    $price = isset($_POST['price']) ? $_POST['price'] : 0;
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $rooms = isset($_POST['rooms']) ? $_POST['rooms'] : 0;
    $bathrooms = isset($_POST['bathrooms']) ? $_POST['bathrooms'] : 0;
    $area = isset($_POST['area']) ? $_POST['area'] : '';
    $image = isset($_POST['image']) ? $_POST['image'] : '';
    $featured = isset($_POST['featured']) ? 1 : 0;
    $gallery = isset($_POST['gallery']) ? $_POST['gallery'] : $image;

    $stmt = $conn->prepare("UPDATE properties SET 
        title = ?, 
        location = ?, 
        price = ?, 
        type = ?, 
        status = ?, 
        description = ?, 
        rooms = ?, 
        bathrooms = ?, 
        area = ?, 
        image = ?, 
        featured = ?, 
        gallery = ?
        WHERE id = ?");

    $stmt->bind_param("ssdsssiissssi",
        $title, $location, $price, $type, $status,
        $description, $rooms, $bathrooms, $area,
        $image, $featured, $gallery, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "تم تحديث العقار بنجاح",
            "id" => $id
        ]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}
?>