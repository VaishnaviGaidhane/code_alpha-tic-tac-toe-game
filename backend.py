import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TicTacToeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"tictactoe_{self.room_name}"

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data['action']
        index = data['index']
        player = data['player']

        # Broadcast the message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_move',
                'action': action,
                'index': index,
                'player': player,
            }
        )

    # Receive message from room group
    async def game_move(self, event):
        action = event['action']
        index = event['index']
        player = event['player']

        # Send the message to WebSocket
        await self.send(text_data=json.dumps({
            'action': action,
            'index': index,
            'player': player,
        }))
