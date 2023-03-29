import SongRecordingService from "../../services/songRecordings.services.js";
import asyncWrapper from "../../utils/asyncWrapper.js";

export default class SongRecordingController {
  static getSongRecordings = asyncWrapper(async (req, res, next) => {
    const songRecordings = await SongRecordingService.getSongRecordings();
    res.json(songRecordings);
  });

  static getSongRecording = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const songRecording = await SongRecordingService.getSongRecordingById(id);
    res.json(songRecording);
  });

  static createSongRecording = asyncWrapper(async (req, res, next) => {
    const { recording_url, user_id, song_id } = req.body;
    const songRecording = await SongRecordingService.createSongRecording({
      recording_url,
      user_id,
      song_id,
    });
    res.json(songRecording);
  });

  static updateSongRecording = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const songRecordingData = req.body;
    const songRecording = await SongRecordingService.updateSongRecording(
      id,
      songRecordingData
    );
    res.json(songRecording);
  });

  static deleteSongRecording = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    await SongRecordingService.deleteSongRecording(id);
    res.sendStatus(204);
  });
}
