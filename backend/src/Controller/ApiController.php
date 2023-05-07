<?php

namespace App\Controller;
use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ApiController extends AbstractController
{
    #[Route('/api/users', name: 'app_user_api', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_USER')]
public function index(Request $request, MessageRepository $messageRepository, UserRepository $userRepository, SerializerInterface $serializerInterface): Response
{
   $users = $userRepository->findAll();
//$userArray = array_map(fn(User $user) => $user->toArray(), $user_id);
$jsonContent = $serializerInterface->serialize($users, 'json');
$response = new JsonResponse($jsonContent, 200, [
    'Content-Type' => 'application/json'
]);
return $response;
}




#[Route('/api/messages', name: 'app_messages', methods: ['POST'])]
#[IsGranted('ROLE_USER')]
public function createMessage(Request $request, UserRepository $userRepository, MessageRepository $messageRepository): JsonResponse
{
    $content = json_decode($request->getContent(), true);

    // Vérifie si tous les champs obligatoires sont remplis
    if (!isset($content['user_id']) || !isset($content['message_send'])) {
        return new JsonResponse(['error' => 'missing fields'], 400);
    }
    // Récupère le destinataire du message
    $recipient = $userRepository->findOneBy(['user_id' => $content['user_id']]);


    if (!$recipient) {
        return new JsonResponse(['error' => 'recipient not found'], 404);
    }

    // Crée un nouveau message
    $message = new Message();
    $message->setUserId($recipient['user_id']);
    //$message->setRecipient($recipient);
    $message->setContent($content['message_send']);

    $messageRepository->save($message, true);

    return new JsonResponse(['message' => $content], 201);
}




    
}
