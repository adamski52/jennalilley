import express from "express";

export default abstract class BaseRouter {
    protected router = express.Router({mergeParams: true});

    public getRouter() {
        return this.router;
    }
}
