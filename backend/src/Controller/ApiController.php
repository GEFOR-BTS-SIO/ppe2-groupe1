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
use Symfony\Component\Serializer\Serializer;

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

#[Route('/api/message', name: 'app_api_eleve', methods:['POST'])]
 #[IsGranted('ROLE_USER')]
    public function createMessage(Request $request, MessageRepository $messageRepository, SerializerInterface $serializer): Response
{
    $data = json_decode($request->getContent(), true);
    $message_send = $data['message_send'];
    $user_id = $data['id_user'];

    // Utilisez le serializer pour désérialiser les données si nécessaire
    // $object = $serializer->deserialize($request->getContent(), VotreClasse::class, 'json');

    // Créez une nouvelle instance de l'entité Message
    $message = new Message();
    $message->setMessageSend($message_send);

    

    $message->setUserId($user);

    // Enregistrez l'entité dans la base de données
    $messageRepository->save($message);

    // Retournez une réponse appropriée
    return new Response('Message created', Response::HTTP_CREATED);
}

 
    
}
