<?php
header("Content-Type: application/json; charset=UTF-8");
$conn = new mysqli("localhost", "root", "", "hw1_db");
if ($conn->connect_error) {
    echo json_encode(["success"=>false,"message"=>"فشل الاتصال بقاعدة البيانات"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$name = $data["name"];
$email = $data["email"];
$password = $data["password"];

// التأكد من عدم تكرار البريد
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    echo json_encode(["success"=>false,"message"=>"هذا البريد مستخدم مسبقًا"]);
} else {
    $insert = $conn->prepare("INSERT INTO users (name,email,password,role) VALUES (?,?,?, 'user')");
    $insert->bind_param("sss", $name, $email, $password);
    if($insert->execute()){
        echo json_encode(["success"=>true,"message"=>"تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول"]);
    } else {
        echo json_encode(["success"=>false,"message"=>"حدث خطأ أثناء إنشاء الحساب"]);
    }
}
$conn->close();
?>
