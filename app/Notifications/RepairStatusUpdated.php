<?php

namespace App\Notifications;

use App\Models\Repair;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Queue\ShouldQueue;

class RepairStatusUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(protected Repair $repair)
    {
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the array representation of the notification for database storage.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        $isCreator = $notifiable->id === $this->repair->collection->watch->creator_id;
        $repairRoute = $isCreator ? 'repair.show_creator' : 'repair.show';

        $data = [
            'repair_id' => $this->repair->id,
            'status' => $this->repair->status,
            'client_name' => $this->repair->collection->user->first_name . ' ' . $this->repair->collection->user->name,
            'watch_model' => $this->repair->collection->watch->model,
            'repair_route' => $repairRoute,
        ];

        return $data;
    }

    public function toMail($notifiable): MailMessage
    {
        $isCreator = $notifiable->id === $this->repair->collection->watch->creator_id;
        $repairRoute = $isCreator ? 'repair.show_creator' : 'repair.show';

        $message = (new MailMessage)
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->replyTo(config('mail.from.address'), config('mail.from.name'))
            ->greeting('Bonjour')
            ->salutation('Cordialement, L\'équipe Col&MacArthur');

        switch ($this->repair->status) {
            case 'asked':
                $message->subject('Nouvelle demande de réparation - Col&MacArthur-Maintenance');
                break;
            case 'accepted':
                $message->subject('Le devis de réparation a été acceptée - Col&MacArthur-Maintenance');
                break;
            case 'refused':
                $message->subject('Votre demande de réparation a été refusée - Col&MacArthur-Maintenance');
                break;
            case 'in_progress':
                $message->subject('Votre réparation est en cours - Col&MacArthur-Maintenance');
                break;
            case 'completed':
                $message->subject('Votre réparation est terminée - Col&MacArthur-Maintenance');
                break;
            default:
                $message->subject('Mise à jour de votre réparation - Col&MacArthur-Maintenance');
        }

        switch ($this->repair->status) {
            case 'asked':
                $message->line('Une nouvelle demande de réparation a été créée.')
                    ->line('Client : ' . $this->repair->collection->user->first_name . ' ' . $this->repair->collection->user->name)
                    ->line('Montre : ' . $this->repair->collection->watch->model)
                    ->line('Description: ' . $this->repair->description);

                $message->line('Réparations demandées :');
                foreach ($this->repair->revisions as $revision) {
                    $message->line('- ' . $revision['name']);
                }
                $message->action('Voir la réparation', route('repair.show_creator', $this->repair->id));
                break;

            case 'pending':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été évaluée.')
                    ->line('Prix estimé: ' . $this->repair->price . '€')
                    ->line('Dates proposées :');

                foreach ($this->repair->proposed_dates as $date) {
                    $message->line('- ' . (new \DateTime($date))->format('d/m/Y H:i'));
                }
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'accepted':
                $message->line('La réparation a été acceptée par l‘utilisateur.')
                    ->line('Prix: ' . $this->repair->price . '€')
                    ->line('Date prévue: ' . $this->repair->date->format('d/m/Y H:i'));
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'completed':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' est terminée.')
                    ->line('Merci de votre confiance !');
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'rejected':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été refusée.')
                    ->line('Raison: ' . $this->repair->refuse_reason);
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'modified':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été modifiée.')
                    ->line('Modification: ' . $this->repair->modify_reason)
                    ->line('Nouveau prix: ' . $this->repair->price . '€');

                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'canceled':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été annulée par le client.');
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'in_progress':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' est en cours.');
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;
        }

        return $message;
    }
}
