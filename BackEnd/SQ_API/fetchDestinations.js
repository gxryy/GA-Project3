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
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    //DEPENDANCIES
    const axios = require("axios");
    const { createHash } = require("crypto");
    //CONSTANTS
    const API_KEY = process.env.Destinations_KEY;
    const API_SECRET = process.env.Destinations_SECRET;
    const url = "https://apigw.singaporeair.com/api/uat/v1/destinations/get";
    //FUNCTIONS
    function hash(string) {
        return createHash("sha256").update(string).digest("hex");
    }
    //MAIN
    const signature = hash(API_KEY.concat(API_SECRET, Math.round(Date.now() / 1000).toString()));
    const params = {
        headers: {
            "Content-Type": "application/json",
            "x-csl-client-uuid": `testing`,
            "x-signature": signature,
            api_key: API_KEY,
        },
        method: "POST",
    };
    const response = yield axios({
        method: "post",
        url,
        headers: {
            "Content-Type": "application/json",
            "x-csl-client-uuid": `testing`,
            "x-signature": signature,
            api_key: API_KEY,
        },
    });
    return response.data;
});
