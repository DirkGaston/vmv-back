import SongService from "../../services/song.services.js";
import asyncWrapper from "../../utils/asyncWrapper.js";

export default class SongController {
  static getSongs = asyncWrapper(async (req, res, next) => {
    const songs = await SongService.getSongs();
    res.json(songs);
  });

  static getSong = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const song = await SongService.getSong(id);
    if (!song) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }
    res.json(song);
  });

  static createSong = asyncWrapper(async (req, res, next) => {
    const { title, artist } = req.body;
    const song = await SongService.createSong(title, artist, req.user.id);
    res.json(song);
  });

  static updateSong = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, artist } = req.body;
    const song = await SongService.updateSong(id, title, artist);
    if (!song) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }
    res.json(song);
  });

  static deleteSong = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const song = await SongService.deleteSong(id);
    if (!song) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }
    res.sendStatus(204);
  });
}
