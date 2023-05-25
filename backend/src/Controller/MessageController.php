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
    #[Route('/apimessage', name: 'app_api_eleve', methods:['POST', 'GET'])]
    #[IsGranted('ROLE_USER')]
    public function index(Request $request, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $content = $data['message_send'];
        $user_id = $data['id_user'];

        // Récupérer l'utilisateur correspondant à l'ID fourni
        $user_id = $userRepository->find($user_id);

        // Vérifier si l'utilisateur existe
        if (!$user_id) {
            throw new \Exception('User not found');
        }

        // Vérifier si le champ "content" est renseigné
        if (!$content) {
            throw new \Exception('Message content cannot be empty');
        }

        // Créer une nouvelle instance de l'entité Message
        $message = new Message();
        $message->setMessageSend($content);
        $message->setUser($user_id);


        // Enregistrer l'entité dans la base de données
        //$messageRepository->save($message);
        $em->persist($message);
        $em->flush();
dump($message);

        return new Response(json_encode($message), 200, [
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
            //$message->setSender($user);

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