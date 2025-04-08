# Websockets

## Introduction

Les websockets sont un protocole de communication bidirectionnel et full-duplex entre le client et le serveur.

Contrairement aux API REST, ou le client doit systèmatiquement requêter le serveur pour obtenir des informations à jour, les websockets permettent de maintenir une connexion persistante entre le client et le serveur, permettant ainsi de recevoir des notifications en temps réel émises par le serveur.

## Implémentation

https://docs.nestjs.com/websockets/gateways

NestJS propose un module intégré pour les websockets, il est disponible dans le paquet `@nestjs/websockets`.

L'équivalent d'un contrôleur pour les websockets est la `Gateway`.

```ts
@WebSocketGateway()
export class LiveGateway implements OnGatewayConnection {
{
  // Surveiller les connexions des clients
  handleConnection(client: Socket) {
    console.log(`Client id: ${client.id} connected`);
    // Envoyer un message à un client specifique
    client.emit('hello', { message: 'Hello from the server' });
  }

  // Souscrire à un evenement
  @SubscribeMessage('hello')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: HelloRequestDto,
  ): HelloResponseDto {
    // Recevoir un message d'un client et y répondre
    return {
      message: `Hello ${data.name}`,
    };
  }
}
```
