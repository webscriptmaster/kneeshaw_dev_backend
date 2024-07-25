import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import OpenAI from "openai";

import defaultConfig from "../config/default.config";

/**
 * Get response from OpenAI
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getResponse(req: Request, res: Response, next: NextFunction) {
  try {
    const openai = new OpenAI({
      organization: defaultConfig.openai.organization,
      apiKey: defaultConfig.openai.api_key
    });

    const assistantMsg =
      "Please provide a most attractive answer about user's questions. Please deliver response in JSON format.";
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "assistant",
          content: assistantMsg
        },
        {
          role: "user",
          content:
            "What do you think about the game of Titan Saga: Chains of Kronos?"
        }
      ],
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    res.status(httpStatus.OK).json({
      success: true,
      result: aiResponse
    });
  } catch (error) {
    console.error("chat.controller getResponse error: ", error);
  } finally {
    next();
  }
}

export default {
  getResponse
};
