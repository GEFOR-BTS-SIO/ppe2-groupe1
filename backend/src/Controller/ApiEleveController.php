<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;

class ApiEleveController extends AbstractController
{
    #[Route('/api/eleve', name: 'app_api_eleve', methods:['POST'])]
    //fonction avec tout les "use" ou "app" utilisés
    public function index(Request $request, MessageRepository $messageRepository, UserRepository $userRepository): Response
    {

        // Réception et ouverture du paquet(JSON)

        $data = json_decode($request->getContent(), true); 
        $message_send = $data['message_send'];

        //Sauvegarde de paquet reçu dans la BDD(entity) message

        $message = new Message();
        $message->setMessageSend($message_send);
        $messageRepository->save($message, true);

        //Je suis un commentaire qui dit que la ligne du dessous 
        //C'est le paquet de réponse (pour postman par exemple)
        //en JSON 

        $response = ['user'=>$user, 'message' => $message_send];

        return new Response(json_encode($response), 200, [
    'Content-Type' => 'application/json', 
        'message'= $message
]);


        //return new Response('prenom créer', $user->getPrenom());
        //return new Response($response);


    }
}
