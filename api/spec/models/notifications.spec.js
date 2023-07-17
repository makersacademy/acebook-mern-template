const mongoose = require("mongoose");
const Notification = require("../../models/notification"); // Assuming the model is in the same directory
require("../mongodb_helper");

describe("Notification model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.notifications.drop(() => {
      done();
    });
  });

  it("has a type", () => {
    const notification = new Notification({ type: "info" });
    expect(notification.type).toEqual("info");
  });

  it("has a postId", () => {
    const postId = new mongoose.Types.ObjectId();
    const notification = new Notification({ postId });
    expect(notification.postId).toEqual(postId);
  });

  it("has a userId", () => {
    const userId = new mongoose.Types.ObjectId();
    const notification = new Notification({ userId });
    expect(notification.userId).toEqual(userId);
  });

  it("has a message", () => {
    const notification = new Notification({
      message: "This is a notification",
    });
    expect(notification.message).toEqual("This is a notification");
  });

  it("can save a notification", (done) => {
    const notificationData = {
      type: "info",
      postId: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      message: "This is a test notification",
    };

    const notification = new Notification(notificationData);

    const saveSpy = jest.spyOn(notification, "save");
    saveSpy.mockImplementationOnce((callback) => callback(null));

    const findSpy = jest.spyOn(Notification, "find");
    findSpy.mockImplementationOnce((callback) =>
      callback(null, [notification])
    );

    notification.save((err) => {
      expect(err).toBeNull();

      Notification.find((err, notifications) => {
        expect(err).toBeNull();
        expect(notifications.length).toEqual(1);

        const savedNotification = notifications[0];
        expect(savedNotification.toObject()).toMatchObject(notificationData);

        done();
      });
    });
  });
});
