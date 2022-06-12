from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import Message, Chat, User
from .utils import get_current_chat

class ChatConsumer(WebsocketConsumer):
  def new_message(self, data):
    user = User.objects.get(username=data['from'])
    message = Message.objects.create(
      chat=get_current_chat(data['chatId']),
      user=user,
      content=data['message']
    )
    content = {
      'command': 'new_message',
      'message': self.message_to_json(message)
    }
    return self.send_chat_message(content)

  def message_to_json(self, message):
    return {
      'id': message.id,
      'author': message.user.username,
      'content': message.content,
      'timestamp': str(message.timestamp)
    }

  commands = {
    'new_message': new_message
  }

  def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    self.room_group_name = 'chat_%s' % self.room_name
    
    async_to_sync(self.channel_layer.group_add)(
      self.room_group_name,
      self.channel_name
    )
    self.accept()

  def disconnect(self, close_code):
    async_to_sync(self.channel_layer.group_discard)(
      self.room_group_name,
      self.channel_name
    )

  def receive(self, text_data):
    data = json.loads(text_data)
    self.commands[data['command']](self, data)

  def send_chat_message(self, message):
    async_to_sync(self.channel_layer.group_send)(
      self.room_group_name,
      {
        'type': 'chat_message',
        'message': message
      }
    )

  def send_message(self, message):
    self.send(text_data=json.dumps(message))

  def chat_message(self, event):
    message = event['message']
    self.send(text_data=json.dumps(message))