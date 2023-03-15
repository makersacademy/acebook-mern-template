const mongoose = require("mongoose");

require("../mongodb_helper");
const Image = require("../../models/image");

describe("Image model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.images.drop(() => {
      done();
    });
  });
  it("creates a schema", () => {
    const image = new Image({ publicId: "abc123", userId: "1" });
    expect(image.publicId).toEqual("abc123");
    expect(image.userId).toEqual("1");
  });

  it("can list all images", async () => {
    try {
      const images = await Image.find();
      expect(images).toEqual([]);
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  it("can save an image", async () => {
    try {
      const image1 = new Image({ publicId: "abc123", userId: "1" });
      const image2 = new Image({ publicId: "abc1234", userId: "2" });

      await image1.save();
      await image2.save();

      const imageData = await Image.find();
      expect(imageData.length).toEqual(2);
      expect(imageData[0].publicId).toEqual("abc123");
      expect(imageData[1].publicId).toEqual("abc1234");
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
