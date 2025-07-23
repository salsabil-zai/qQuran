<?php
// جزء PHP - معالجة البيانات
session_start();
$error = '';

// الاتصال بقاعدة البيانات
$conn = mysqli_connect("localhost", "root", "", "quran_app");

if (!$conn) {
    die("فشل الاتصال بقاعدة البيانات");
}

// معالجة تسجيل الدخول
if (isset($_POST['login'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['first_name'];
            header("Location: welcome.php");
            exit;
        } else {
            $error = "كلمة المرور غير صحيحة";
        }
    } else {
        $error = "البريد الإلكتروني غير مسجل";
    }
}

// معالجة التسجيل
if (isset($_POST['register'])) {
    $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['last_name']);
    $email = mysqli_real_escape_string($conn, $_POST['new_email']);
    $password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO users (first_name, last_name, email, password) 
            VALUES ('$first_name', '$last_name', '$email', '$password')";
    
    if (mysqli_query($conn, $sql)) {
        $error = "تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن";
    } else {
        $error = "خطأ في التسجيل: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>نظام القرآن الكريم</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .form-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        h2 {
            color: #2ca4ab;
            border-bottom: 2px solid #2ca4ab;
            padding-bottom: 10px;
        }
        input {
            display: block;
            width: 95%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background: #2ca4ab;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        .error {
            color: red;
            padding: 10px;
        }
        .success {
            color: green;
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center; color: #2ca4ab;">نظام القرآن الكريم</h1>

    <?php if ($error): ?>
        <div class="<?= strpos($error, 'نجاح') !== false ? 'success' : 'error' ?>">
            <?= $error ?>
        </div>
    <?php endif; ?>

    <div class="form-container">
        <h2>تسجيل الدخول</h2>
        <form method="POST">
            <input type="email" name="email" placeholder="البريد الإلكتروني" required>
            <input type="password" name="password" placeholder="كلمة المرور" required>
            <button type="submit" name="login">تسجيل الدخول</button>
        </form>
    </div>

    <div class="form-container">
        <h2>تسجيل جديد</h2>
        <form method="POST">
            <input type="text" name="first_name" placeholder="الاسم" required>
            <input type="text" name="last_name" placeholder="اللقب" required>
            <input type="email" name="new_email" placeholder="البريد الإلكتروني" required>
            <input type="password" name="new_password" placeholder="كلمة المرور" required minlength="6">
            <button type="submit" name="register">تسجيل جديد</button>
        </form>
    </div>
</body>
</html>