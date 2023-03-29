import models from "../database/models";

const { SongRecording, User, Song } = models;

export default class SongRecordingService {
  static async getAllSongRecordings() {
    return SongRecording.findAll();
  }

  static async getSongRecordingById(id) {
    const songRecording = await SongRecording.findByPk(id);
    if (!songRecording) {
      throw new Error(`Grabación con ID ${id} no encontrada`);
    }
    return songRecording;
  }

  static async createSongRecording({ recordingUrl, userId, songId }) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`Usuario con ID ${userId} no encontrada`);
    }

    const song = await Song.findByPk(songId);
    if (!song) {
      throw new Error(`Canción con ID ${songId} no encontrada`);
    }

    const songRecording = await SongRecording.create({
      recording_url: recordingUrl,
      user_id: userId,
      song_id: songId,
    });
    return songRecording;
  }

  static async updateSongRecording(id, { recordingUrl }) {
    const songRecording = await SongRecording.findByPk(id);
    if (!songRecording) {
      throw new Error(`Grabación con ID ${id} no encontrada`);
    }
    songRecording.recording_url = recordingUrl;
    await songRecording.save();
    return songRecording;
  }

  static async deleteSongRecording(id) {
    const songRecording = await SongRecording.findByPk(id);
    if (!songRecording) {
      throw new Error(`Grabación con ID ${id} no encontrada`);
    }
    await songRecording.destroy();
  }
}
