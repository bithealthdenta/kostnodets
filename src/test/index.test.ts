import { describe, test, expect } from "@jest/globals"
import request from "supertest"
import { App } from "../app";
describe('User Endpoint', () =>{
    it("tests get user endpoint", async () => {
        const response = await request(App).get("/v1/user");
       
        expect(response.statusCode).toBe(200);
        // Testing a single element in the array
        // expect(response.body).toEqual(expect.arrayContaining(["Earth"]));
      });
})