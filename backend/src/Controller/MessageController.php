<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;app://resources/notifications.html#
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class MessageController extends AbstractController
{
    #[Route('/apimessage', name: 'app_api_eleve', methods:['POST'])]
    #[IsGranted('ROLE_USER')]
    public function index(Request $request, UserRepository $userRepository, MessageRepository $messageRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $content = $data['message_send'];
        $receiverId = $data['id_user'];

        // Récupérer l'utilisateur correspondant à l'ID fourni
        $receiver = $userRepository->find($receiverId);

        // Vérifier si l'utilisateur existe
        if (!$receiver) {
            throw new \Exception('User not found');
        }

        // Vérifier si le champ "content" est renseigné
        if (!$content) {
            throw new \Exception('Message content cannot be empty');
        }

        // Créer une nouvelle instance de l'entité Message
        $message = new Message();
        $message->setContent($content);

        $sender = $this->getUser();
        $message->setSender($sender);
        $message->setReceiver($receiver);


        // Enregistrer l'entité dans la base de données
        $messageRepository->save($message, true);


        return new Response(json_encode($message), 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}