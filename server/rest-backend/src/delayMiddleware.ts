import express from "express";

export const delay = (ms: number) => (_req: express.Request, _res: express.Response, next: express.NextFunction) =>
    setTimeout(next, ms);
