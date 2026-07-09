<?php
header("Content-Type: application/json; charset=UTF-8");
$conn = new mysqli("localhost", "root", "", "hw1_db");
if ($conn->connect_error) {
    echo json_encode(["success"=>false,"message"=>"فشل الاتصال بقاعدة البيانات"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$action = isset($data["action"]) ? $data["action"] : "";

switch($action){

    case "login":
        $email = $data["email"];
        $password = $data["password"];

        $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            $user = $result->fetch_assoc();
            if($user["password"] === $password){
                echo json_encode([
                    "success"=>true,
                    "message"=>"تم تسجيل الدخول بنجاح",
                    "user"=>$user
                ]);
            } else {
                echo json_encode(["success"=>false,"message"=>"كلمة المرور غير صحيحة"]);
            }
        } else {
            echo json_encode(["success"=>false,"message"=>"المستخدم غير موجود"]);
        }
        break;

    case "owner_login":
        $email = $data["email"];
        $password = $data["password"];

        if($email === "hamoda2004alomari@gmail.com" && $password === "12345"){
            echo json_encode([
                "success"=>true,
                "message"=>"تم تسجيل الدخول كمالك",
                "user"=>["name"=>"المالك","role"=>"owner"]
            ]);
        } else {
            echo json_encode(["success"=>false,"message"=>"بيانات المالك غير صحيحة"]);
        }
        break;

    case "forgot_password":
        $email = $data["email"];
        $stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            echo json_encode(["success"=>true,"message"=>"تم إرسال رابط استعادة كلمة المرور إلى بريدك (محاكاة)"]);
        } else {
            echo json_encode(["success"=>false,"message"=>"البريد غير موجود في النظام"]);
        }
        break;

    default:
        echo json_encode(["success"=>false,"message"=>"طلب غير معروف"]);
}

$conn->close();
?>
