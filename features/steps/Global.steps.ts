import { Given, When, Then } from '@cucumber/cucumber';
import request, { Test, Response } from 'supertest';
import assert from 'assert';
import app from '../../app';

const context: {
  req: { url: string } | undefined;
  res: Test | undefined;
} = {
  req: undefined,
  res: undefined,
};

Given('A request with URL: {string}', (url: string) => {
  context.req = { url };
});

When('User sends POST request to {}', (path: string) => {
  context.res = request(app).post(path).send(context.req);
});

When('User sends GET request', () => {
  context.res = request(app).get(`/${context?.req?.url}`).send();
});

Then('expect a {int} status code.', (code: number) => {
  context.res?.expect(code);
});

Then('expect {int} length shorten URL.', (len: number) => {
  context.res?.expect((res: Response) => {
    assert.equal(res.body.short_url.length, len);
  });
});

Then('expect error message: {string}.', (msg: string) => {
  context.res?.expect((res: Response) => {
    assert.equal(res.body.msg, msg);
  });
});
