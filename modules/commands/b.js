const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "b",
    version: "1",
      hasPermssion: 0,
        credits: "",
          description: "Ask",
            commandCategory: "ai",
              usages: "bard <ask>",
                cooldowns: 5,
                };
module.exports.run = async function({ api, event }) {
  let { threadID, messageID } = event;
    const token = "XQgeLFWeQO9y2qkZ7mQBKm4ltH4hj7rVJBkuiQDbOAzIsKBy8bIa8trugCJBicwver2UTQ."; // place yoir cookie here
      const response = event.body.slice(5).trim();
  if (!response) {
      api.sendMessage("Please provide a question or query", threadID, messageID);
          return;
            }
  api.sendMessage("Searching for an answer, please wait...", threadID, messageID);
  try {
      const res = await axios.get(`https://api.heckerman06.repl.co/api/other/bard-ai?prompt=${response}&token=${token}`);
          const respond = res.data.content;
              const respond2 = res.data.content2;
    if (respond && respond.length > 0) {
          const photoUrls = [];
      respond.forEach(item => {
              const photoUrl = item[0][0][0];
                      photoUrls.push(photoUrl);
                            });
      const Grey = [];
      if (!fs.existsSync("cache")) {
              fs.mkdirSync("cache");
                    }
      for (let i = 0; i < photoUrls.length; i++) {
              const url = photoUrls[i];
                      const photoPath = `cache/test${i + 1}.png`;
        try {
                  const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
                            fs.writeFileSync(photoPath, imageResponse.data);
          Grey.push(fs.createReadStream(photoPath));
                  } catch (error) {
                            console.error("Error occurred while downloading and saving the photo:", error);
                                    }
                                          }
      api.sendMessage(
              {
                        attachment: Grey,
                                  body: respond2,
                                          },
                                                  threadID,
                                                          messageID
                                                                );
                                                                    } else {
                                                                          api.sendMessage(respond2, threadID, messageID);
                                                                              }
                                                                                } catch (error) {
                                                                                    console.error("Error occurred while fetching data from the Bard API:", error);
                                                                                        api.sendMessage(respond2, threadID, messageID);
                                                                                          }
                                                                                          };