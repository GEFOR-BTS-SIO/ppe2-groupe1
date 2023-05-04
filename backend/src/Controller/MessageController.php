<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class MessageController extends AbstractController
{
    #[Route('/messages/{id}', name: 'message_show', methods: ['GET'])]
    public function show(Message $message): JsonResponse
    {
        // Serializing the Message entity using the serializer component
        $serializer = $this->getUser('serializer');
        $json = $serializer->serialize($message, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/messages', name: 'message_index', methods: ['GET'])]
    // public function index(MessageRepository $messageRepository): JsonResponse
    // {
    //     // Getting all messages
    //     $messages = $messageRepository->findAll();

    //     // Serializing the messages using the serializer component
    //     $serializer = $this->get('serializer');
    //     $json = $serializer->serialize($messages, 'json', [
    //         'circular_reference_handler' => function ($object) {
    //             return $object->getId();
    //         }
    //     ]);

    //     return new JsonResponse($json, 200, [], true);
    // }
     public function index(Request $request, MessageRepository $messageRepository): Response
    {
    $data = json_decode($request->getContent(), true);


    $message_send = $data['message_send'];

    //$prenom = $request->getContent('prenom');

    $message = new Message();
    $message->setMessageSend($message_send);


    //$user->setNom($nom);

    $messageRepository->save($message, true);

    $response = ['message' => $message_send ];

    return new Response(json_encode($response), 200, [
    'Content-Type' => 'application/json'
]);

}

    #[Route('/messages', name: 'message_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        // Creating a new message
        $message = new Message();

        // Retrieving the authenticated user
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('Vous devez être connecté pour créer un message');
        }

        // Setting the sender of the message to the authenticated user
        $message->setSender($user);

        // Setting the content of the message
        $content = $request->getContent();
        $data = json_decode($content, true);
        $message->setContent($data['content']);

        // Persisting the message to the database
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($message);
        $entityManager->flush();

        // Serializing the created message using the serializer component
        $serializer = $this->get('serializer');
        $json = $serializer->serialize($message, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($json, 201, [], true);
    }

    #[Route('/messages/user', name: 'message_user', methods: ['GET'])]
    public function userMessages(MessageRepository $messageRepository): JsonResponse
    {
        // Retrieving the authenticated user
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('Vous devez être connecté pour accéder à cette ressource');
        }

        // Getting all messages for the authenticated user
        $messages = $messageRepository->findBy(['sender' => $user]);

        // Serializing the messages using the serializer component
        $serializer = $this->get('serializer');
        $json = $serializer->serialize($messages, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($json, 200, [], true);
    }
}
