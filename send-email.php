<?php
header('Content-Type: application/json');

// Enable CORS if needed (useful during React dev server testing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$to = 'contact@nextin.space';
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$budget = isset($_POST['budget']) ? strip_tags(trim($_POST['budget'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

if (empty($name) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

$subject = "New Project Inquiry from " . $name;

// Email HTML Body
$body = "
<html>
<head>
  <title>New Project Inquiry</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e4e7; border-radius: 8px;'>
    <h2 style='color: #863bff; border-bottom: 2px solid #863bff; padding-bottom: 10px;'>New Project Inquiry</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
    <p><strong>Budget Range:</strong> {$budget}</p>
    <div style='margin-top: 20px; padding: 15px; background-color: #f9f8fa; border-left: 4px solid #ab7fff; border-radius: 4px;'>
      <p style='margin: 0;'><strong>Message Details:</strong></p>
      <p style='margin-top: 10px; white-space: pre-wrap;'>{$message}</p>
    </div>
  </div>
</body>
</html>
";

// Headers
$boundary = md5(time());
$headers = "From: NextIn Website <no-reply@nextin.space>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// Multipart message
$multipart = "--{$boundary}\r\n";
$multipart .= "Content-Type: text/html; charset=UTF-8\r\n";
$multipart .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$multipart .= $body . "\r\n\r\n";

// Attachment Handling
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['attachment']['tmp_name'];
    $file_name = basename($_FILES['attachment']['name']);
    $file_size = $_FILES['attachment']['size'];
    $file_type = $_FILES['attachment']['type'];
    
    // Read and encode file content
    $handle = fopen($file_tmp, "r");
    $content = fread($handle, $file_size);
    fclose($handle);
    $encoded_content = chunk_split(base64_encode($content));
    
    $multipart .= "--{$boundary}\r\n";
    $multipart .= "Content-Type: {$file_type}; name=\"{$file_name}\"\r\n";
    $multipart .= "Content-Disposition: attachment; filename=\"{$file_name}\"\r\n";
    $multipart .= "Content-Transfer-Encoding: base64\r\n";
    $multipart .= "X-Attachment-Id: " . rand(1000, 99999) . "\r\n\r\n";
    $multipart .= $encoded_content . "\r\n\r\n";
}

$multipart .= "--{$boundary}--";

// Send email
if (mail($to, $subject, $multipart, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email via SMTP service.']);
}
?>
