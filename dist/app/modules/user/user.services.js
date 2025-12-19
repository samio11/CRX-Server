"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const user_model_1 = require("./user.model");
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const userData = userQuery
        .filter()
        .search(["name", "email"])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        yield userData.build(),
        yield userData.getMeta(),
    ]);
    return { data, meta };
});
const getAUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.findById(userId);
    return existUser;
});
const updateUserData = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true });
    return result;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isVerified: false }, { new: true });
    return result;
});
const unBlockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
    return result;
});
exports.userServices = {
    getAllUser,
    getAUser,
    updateUserData,
    blockUser,
    unBlockUser,
};
