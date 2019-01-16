import socketio from 'socket.io';
import https from 'https';
import CONSTANTS from './constants';

const handler = () => {
  console.log('Server running');
};
const app = https.createServer(handler);
const io = socketio(app);
app.listen(4545);

export default class {
  constructor(client) {
    this.client = client;
    this.s = null;
  }

  async connect() {
    return new Promise((resolve) => {
      io.on('connection', (s) => {
        this.s = s;
        console.log('A client just joined!');

        this.s.on('get-list-users', () => {
          this.updateUsers();
        });

        this.s.on('get-list-channels', () => {
          this.updateChannels();
        });

        this.s.on('ask-is-staff', (id) => {
          this.askIsStaff(id);
        });

        resolve();
      });
    });
  }

  askIsStaff(id) {
    this.s.emit(
      'is-staff',
      this.client.guilds
        .get(CONSTANTS.GUILD_ID)
        .members
        .array()
        .find(m => m.id === id)
        .roles
        .array()
        .find(r => r.id === CONSTANTS.ROLES.STAFF),
    );
  }

  updateUsers() {
    this.s.emit('list-users', this.client.guilds.get(CONSTANTS.GUILD_ID).members.array().map(m => ({
      username: m.user.username,
      avatar: m.user.avatarURL,
      id: m.id,
    })));
  }

  updateChannels() {
    this.s.emit('list-channels', this.client
      .guilds.get(CONSTANTS.GUILD_ID)
      .channels
      .array()
      .filter(m => m.type === 'text')
      .map(m => ({
        name: `#${m.name}`,
        id: m.id,
        type: m.type,
      })));
  }
}