import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Game, IGame } from "../../../models/game.model";
import upload from "../../../services/upload.service";
import { NONE } from "../../../utils/const.util";

/**
 * Get a game
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access a Game."
      });
      return;
    }

    const { _id } = req.params;

    const result: IGame | null = await Game.findById(_id);

    res.status(httpStatus.OK).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("admin.game.list.controller getById error: ", error);
  } finally {
    next();
  }
}

/**
 * Get game list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Game list."
      });
      return;
    }

    const games = await Game.find()
      .collation({ locale: "en" })
      .sort({ title: "asc" });

    res.status(httpStatus.OK).json({
      success: true,
      result: games
    });
  } catch (error) {
    console.error("admin.game.list.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a game
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function create(req: Request, res: Response, next: NextFunction) {
  upload("games").any()(req, res, async (err: any) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading assets",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can create a new Game."
        });
        return;
      }

      const { _id: creatorId } = req.user;
      const {
        enabled,

        category,
        platform,

        title,
        shortTitle,
        promotional,
        description,
        history,
        releaseDate,
        players,
        availableLanguages,
        gamers,
        price,
        downloadLink,

        overview,

        features,

        story,

        videos,

        credits
      } = req.body;

      let banner = null;
      let splash = null;
      let thumbnail = null;
      let logos: string[] = [];
      let screenshots: string[] = [];
      let overviewCharacterThumbnails: any[] = [];
      let featuresThumbnails: any[] = [];
      let videosThumbnails: any[] = [];

      if (Array.isArray(req.files) && req.files.length > 0) {
        banner = req.files
          .filter((f) => f.fieldname === "banner")[0]
          .path.replace(/\\/g, "/");
        splash = req.files
          .filter((f) => f.fieldname === "splash")[0]
          .path.replace(/\\/g, "/");
        thumbnail = req.files
          .filter((f) => f.fieldname === "thumbnail")[0]
          .path.replace(/\\/g, "/");
        logos = req.files
          .filter((f) => f.fieldname === "logos[]")
          .map((f) => f.path.replace(/\\/g, "/"));
        screenshots = req.files
          .filter((f) => f.fieldname === "screenshots[]")
          .map((f) => f.path.replace(/\\/g, "/"));
        overviewCharacterThumbnails = req.files.filter((f) =>
          f.fieldname.includes("overview[characters]")
        );
        featuresThumbnails = req.files.filter((f) =>
          f.fieldname.includes("features")
        );
        videosThumbnails = req.files.filter((f) =>
          f.fieldname.includes("videos")
        );
      }

      overviewCharacterThumbnails.forEach((oct) => {
        const splittedFieldname = oct.fieldname.split("][");
        const index = Number(splittedFieldname[1]);
        overview.characters[index].thumbnail = oct.path.replace(/\\/g, "/");
      });

      featuresThumbnails.forEach((ft) => {
        const splittedFieldname = ft.fieldname
          .replace("features[", "")
          .split("][");
        const index = Number(splittedFieldname[0]);
        features[index].thumbnail = ft.path.replace(/\\/g, "/");
      });

      videosThumbnails.forEach((vt) => {
        const splittedFieldname = vt.fieldname
          .replace("videos[", "")
          .split("][");
        const index = Number(splittedFieldname[0]);
        videos[index].thumbnail = vt.path.replace(/\\/g, "/");
      });

      const newGame = new Game({
        enabled,

        category: category === NONE ? null : category,
        platform: platform === NONE ? null : platform,

        title,
        shortTitle,
        promotional,
        description,
        history,
        releaseDate,
        players: players === NONE ? null : players,
        availableLanguages,
        gamers,
        price,
        downloadLink,

        banner,
        splash,
        thumbnail,
        logos,
        screenshots,

        overview,

        features,

        story,

        videos,

        credits,

        creatorId
      });
      await newGame.save();

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Game is created successfully."
      });
    } catch (error) {
      console.error("admin.game.list.controller create error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Update a game
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function update(req: Request, res: Response, next: NextFunction) {
  upload("games").any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading assets",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can update a Game."
        });
        return;
      }

      const { _id } = req.params;
      const { _id: modifierId } = req.user;
      const {
        enabled,

        category,
        platform,

        title,
        shortTitle,
        promotional,
        description,
        history,
        releaseDate,
        players,
        availableLanguages,
        gamers,
        price,
        downloadLink,

        overview,

        features,

        story,

        videos,

        credits
      } = req.body;

      let updateItems: Record<string, any> = {
        enabled,

        category: category === NONE ? null : category,
        platform: platform === NONE ? null : platform,

        title,
        shortTitle,
        promotional,
        description,
        history,
        releaseDate,
        players: players === NONE ? null : players,
        availableLanguages,
        gamers,
        price,
        downloadLink,

        overview,

        features,

        story,

        videos,

        credits,

        modifierId
      };

      let banner = null;
      let splash = null;
      let thumbnail = null;
      let logos: string[] = [];
      let screenshots: string[] = [];
      let overviewCharacterThumbnails: any[] = [];
      let featuresThumbnails: any[] = [];
      let videosThumbnails: any[] = [];

      if (Array.isArray(req.files) && req.files.length > 0) {
        banner = req.files
          .filter((f) => f.fieldname === "banner")?.[0]
          ?.path.replace(/\\/g, "/");
        splash = req.files
          .filter((f) => f.fieldname === "splash")?.[0]
          ?.path.replace(/\\/g, "/");
        thumbnail = req.files
          .filter((f) => f.fieldname === "thumbnail")?.[0]
          ?.path.replace(/\\/g, "/");

        logos = req.files
          .filter((f) => f.fieldname === "logos[]")
          .map((f) => f.path.replace(/\\/g, "/"));
        screenshots = req.files
          .filter((f) => f.fieldname === "screenshots[]")
          .map((f) => f.path.replace(/\\/g, "/"));

        overviewCharacterThumbnails = req.files.filter((f) =>
          f.fieldname.includes("overview[characters]")
        );

        featuresThumbnails = req.files.filter((f) =>
          f.fieldname.includes("features")
        );

        videosThumbnails = req.files.filter((f) =>
          f.fieldname.includes("videos")
        );
      }

      if (banner) {
        updateItems = { ...updateItems, banner };
      }

      if (splash) {
        updateItems = { ...updateItems, splash };
      }

      if (thumbnail) {
        updateItems = { ...updateItems, thumbnail };
      }

      if (logos.length > 0) {
        updateItems = { ...updateItems, logos };
      }

      if (screenshots.length > 0) {
        updateItems = { ...updateItems, screenshots };
      }

      overviewCharacterThumbnails.forEach((oct) => {
        const splittedFieldname = oct.fieldname.split("][");
        const index = Number(splittedFieldname[1]);
        updateItems.overview.characters[index].thumbnail = oct.path.replace(
          /\\/g,
          "/"
        );
      });

      featuresThumbnails.forEach((ft) => {
        const splittedFieldname = ft.fieldname
          .replace("features[", "")
          .split("][");
        const index = Number(splittedFieldname[0]);
        updateItems.features[index].thumbnail = ft.path.replace(/\\/g, "/");
      });

      videosThumbnails.forEach((vt) => {
        const splittedFieldname = vt.fieldname
          .replace("videos[", "")
          .split("][");
        const index = Number(splittedFieldname[0]);
        updateItems.videos[index].thumbnail = vt.path.replace(/\\/g, "/");
      });

      await Game.findByIdAndUpdate(_id, updateItems, { new: true });

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Game is updated successfully."
      });
    } catch (error) {
      console.error("admin.game.list.controller update error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Delete a game
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can delete a Game."
      });
      return;
    }

    const { _id } = req.params;

    await Game.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game is removed successfully."
    });
  } catch (error) {
    console.error("admin.game.list.controller destroy error: ", error);
  } finally {
    next();
  }
}

export default {
  getById,
  getList,
  create,
  update,
  destroy
};
