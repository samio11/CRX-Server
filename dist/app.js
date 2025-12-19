"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const GlobalErrorHandler_1 = require("./app/middlewares/GlobalErrorHandler");
const NotFound_1 = require("./app/middlewares/NotFound");
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routes_1.rootRouter);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running successfully🚕" });
});
app.use(GlobalErrorHandler_1.GlobalErrorHandler);
app.use(NotFound_1.NotFound);
exports.default = app;
