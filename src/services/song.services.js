import models from "../database/models";

const { Song, SongRecording, User } = models;

export default class SongService {
  static async getSongs() {
    return Song.findAll();
  }

  static async getSongById(id) {
    const song = await Song.findOne({ where: { id } });
    if (!song) {
      throw new Error(`Song with id ${id} not found`);
    }
    return song;
  }

  static async createSong({ title, artist, user_id }) {
    const song = await Song.create({ title, artist, user_id });
    return song;
  }

  static async updateSong(id, { title, artist }) {
    const song = await Song.findOne({ where: { id } });
    if (!song) {
      throw new Error(`Song with id ${id} not found`);
    }
    song.title = title || song.title;
    song.artist = artist || song.artist;
    await song.save();
    return song;
  }

  static async deleteSong(id) {
    const song = await Song.findOne({ where: { id } });
    if (!song) {
      throw new Error(`Song with id ${id} not found`);
    }
    await song.destroy();
  }
}
