<?php
// php/actions/like.php — sample endpoint (requires deployment)
require_once __DIR__ . '/../includes/functions.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if(empty($_SESSION['user_id'])) { http_response_code(401); echo json_encode(['success'=>false,'message'=>'Not authenticated']); exit; }

$raw = file_get_contents('php://input'); $data = json_decode($raw, true);
if(!is_array($data)){ http_response_code(400); echo json_encode(['success'=>false,'message'=>'Invalid']); exit; }
$csrf = $data['csrf_token'] ?? ''; if(!csrf_check($csrf)){ http_response_code(400); echo json_encode(['success'=>false,'message'=>'CSRF']); exit; }

$from = (int)$_SESSION['user_id']; $to = isset($data['target_user_id'])?(int)$data['target_user_id']:0;
$pdo = getPDO();
try{
  $ins = $pdo->prepare('INSERT INTO likes (from_user_id,to_user_id,created_at) VALUES (:from,:to,NOW())');
  $ins->execute(['from'=>$from,'to'=>$to]);
  log_action($from,'like:sent',['to'=>$to]);
  echo json_encode(['success'=>true,'message'=>'Like saved']);
}catch(Exception $e){ http_response_code(500); echo json_encode(['success'=>false,'message'=>'Error']); }
